import fs from "fs";
import path from "path";

const knowledge = fs.readFileSync(
  path.join(process.cwd(), "knowledge.md"),
  "utf8"
);


// ======================================================
// CONFIGURACIÓN
// ======================================================

// Durante el desarrollo puedes fijar una fecha.
// Formato: "YYYY-MM-DD"
// Ejemplo: "2026-08-19"
//
// Cuando publiques la aplicación,
// cambia DEBUG_DATE a null.

const DEBUG_DATE = "2026-08-19";
// const DEBUG_DATE = null;

const TRIP_DAYS_LOCATIONS = [
  { day:1,  date:"2026-08-15", lat:-24.9209, lon:30.8305, label:"Graskop" },
  { day:2,  date:"2026-08-16", lat:-25.1793, lon:31.2582, label:"Pretoriuskop" },
  { day:3,  date:"2026-08-17", lat:-24.3936, lon:31.7784, label:"Satara" },
  { day:4,  date:"2026-08-18", lat:-24.4300, lon:31.6200, label:"Tamboti" },
  { day:5,  date:"2026-08-19", lat:-25.3508, lon:31.8999, label:"Crocodile Bridge" },
  { day:6,  date:"2026-08-20", lat:-24.9209, lon:30.8305, label:"Graskop" },
  { day:7,  date:"2026-08-21", lat:-33.9249, lon:18.4108, label:"Ciudad del Cabo" },
  { day:8,  date:"2026-08-22", lat:-33.9249, lon:18.4108, label:"Ciudad del Cabo" },
  { day:9,  date:"2026-08-23", lat:-34.1929, lon:18.4291, label:"Simon's Town" },
  { day:10, date:"2026-08-24", lat:-34.4187, lon:19.2345, label:"Hermanus" },
  { day:11, date:"2026-08-25", lat:-33.9346, lon:18.8600, label:"Stellenbosch" },
  { day:12, date:"2026-08-26", lat:-33.9346, lon:18.8600, label:"Stellenbosch" },
  { day:13, date:"2026-08-27", lat:-33.9715, lon:18.6021, label:"Zona aeropuerto Ciudad del Cabo" },
];

async function obtenerPrevisionReal(hoy){
  const MS_DIA = 1000 * 60 * 60 * 24;
  const limite = new Date(hoy.getTime() + 15 * MS_DIA);

  const diasEnRango = TRIP_DAYS_LOCATIONS.filter(d=>{
    const fecha = new Date(d.date + "T12:00:00");
    return fecha >= hoy && fecha <= limite;
  });

  if(diasEnRango.length === 0) return "";

  const resultados = await Promise.all(diasEnRango.map(async (d)=>{
    try{
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${d.lat}&longitude=${d.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&start_date=${d.date}&end_date=${d.date}`;
      const r = await fetch(url);
      const j = await r.json();
      const max = j?.daily?.temperature_2m_max?.[0];
      const min = j?.daily?.temperature_2m_min?.[0];
      const lluvia = j?.daily?.precipitation_probability_max?.[0];
      if(max === undefined) return null;
      return `- Día ${d.day} (${d.date}, ${d.label}): previsión real máx ${max}°C / mín ${min}°C, probabilidad de lluvia ${lluvia}%.`;
    }catch(e){
      return null;
    }
  }));

  const lineas = resultados.filter(Boolean);
  if(lineas.length === 0) return "";

  return `
PREVISIÓN METEOROLÓGICA REAL (actualizada, solo disponible para los próximos días del viaje que ya tienen pronóstico)

${lineas.join("\n")}

Si el usuario pregunta por el tiempo de alguno de estos días, utiliza estos datos reales en vez de estimaciones genéricas o de la tabla fija del planning.
`;
}

async function obtenerCambioActual(){
  try{
    const r = await fetch("https://api.frankfurter.app/latest?from=ZAR&to=EUR");
    const j = await r.json();
    const cambio = j?.rates?.EUR;
    if(!cambio) return "";
    return `
CAMBIO DE DIVISA ACTUAL (dato en vivo, fuente Banco Central Europeo)

1 ZAR ≈ ${cambio.toFixed(4)} EUR · 1 EUR ≈ ${(1/cambio).toFixed(2)} ZAR.

Si el usuario pregunta por conversiones de dinero, utiliza este cambio real en vez de una cifra fija o inventada.
`;
  }catch(e){
    return "";
  }
}

export default async function handler(req, res) {

  const apiKey = process.env.GEMINI_API_KEY;
  const { pregunta, ubicacion } = req.body;
  if (!pregunta) {
  return res.status(400).json({
    respuesta: "No se ha recibido ninguna pregunta."
  });
}

const hoy = DEBUG_DATE
  ? new Date(DEBUG_DATE + "T12:00:00")
  : new Date();

const inicioViaje = new Date("2026-08-15T12:00:00");

const MS_DIA = 1000 * 60 * 60 * 24;

const diasRestantes = Math.floor(
  (inicioViaje - hoy) / MS_DIA
);

let estadoViaje = "";

if (diasRestantes > 0) {

  estadoViaje = `
El viaje todavía no ha comenzado.

Comienza el 15 de agosto de 2026.

Faltan ${diasRestantes} días para el inicio del viaje.
`;

} else {

  estadoViaje = `
El viaje ya ha comenzado.

Todas las preguntas sobre "hoy", "mañana", "esta tarde", "esta noche" o fechas relativas deben interpretarse tomando esta fecha como referencia.

El documento del viaje debe interpretarse utilizando esta fecha actual.
`;

}

const contextoActual = `
Hoy es ${hoy.toLocaleDateString("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric"
})}.

${estadoViaje}



Debes utilizar SIEMPRE esta fecha para interpretar expresiones como:

- hoy
- mañana
- esta tarde
- esta noche
- ayer
- pasado mañana

El documento del viaje debe interpretarse tomando esta fecha como referencia.
`;

  const contextoUbicacion = ubicacion
  ? `
UBICACIÓN ACTUAL

Latitud: ${ubicacion.lat}
Longitud: ${ubicacion.lng}
Precisión aproximada: ${Math.round(ubicacion.accuracy)} metros.
`
  : "";

const previsionReal = await obtenerPrevisionReal(hoy);
const cambioActual = await obtenerCambioActual();

console.log("=== UBICACIÓN RECIBIDA ===");
console.log(ubicacion);

console.log("=== CONTEXTO UBICACIÓN ===");
console.log(contextoUbicacion);
  
  
  const respuesta = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
Eres el copiloto inteligente de un viaje por Sudáfrica.

Tu misión es ayudar a los viajeros durante todo el viaje de forma útil, natural y práctica.

Habla siempre en español.

Dispones de DOS fuentes de información:

1. El documento del viaje que aparece más abajo.
   Contiene el planning, hoteles, reservas, rutas, restaurantes y toda la información específica de ESTE viaje.

2. Tu propio conocimiento sobre Sudáfrica y el mundo.

=================
REGLAS
=================

- Utiliza el documento del viaje siempre que contenga la respuesta.
- Si el documento no contiene esa información, utiliza tu conocimiento general.
- Si es útil, combina ambas fuentes de forma natural.
- Nunca inventes datos del planning ni de las reservas.
- Si no conoces una respuesta, dilo claramente.
- Cuando menciones un día concreto del itinerario, añade justo después la marca [[DIA:n]] (n = número de día, 1 a 13).
- Cuando menciones el alojamiento/hotel de un día, añade la marca [[ALOJAMIENTO:n]].
- Cuando la respuesta hable de la ubicación de un lugar concreto (un hotel, un mirador, una parada de ruta, un pueblo, una reserva de fauna...) y un mapa realmente ayude a situarlo, añade la marca [[MAPA:lat,lng,Nombre del lugar]] con las coordenadas aproximadas de ese lugar, usando tu propio conocimiento geográfico.
- Si el usuario pregunta por SU PROPIA ubicación actual y tienes sus coordenadas en el CONTEXTO ACTUAL, usa esas coordenadas exactas en la marca MAPA con la etiqueta "Tu ubicación actual".
- No abuses de la marca MAPA: solo úsala cuando aporte valor real para situar un lugar. No la uses en respuestas puramente conversacionales, ni la repitas varias veces para el mismo lugar en una misma respuesta.
- Cuando la respuesta mencione una zona, ciudad o alojamiento donde el usuario podría necesitar buscar hotel (especialmente si es una noche marcada como "zona a confirmar"), añade la marca [[BOOKING:Nombre del lugar o zona]] con el nombre a buscar en Booking.com.
- No expliques estas marcas al usuario ni digas que las usas.
- Usa cada marca una sola vez por mención relevante.

El documento describe únicamente este viaje.

Para cualquier información turística, geográfica, histórica, cultural, gastronómica, meteorológica o sobre fauna y flora utiliza tu conocimiento.

=================
CONTEXTO TEMPORAL
=================

La fecha actual y el estado del viaje se proporcionarán en cada consulta.

Utiliza siempre ese contexto para interpretar expresiones como:

- hoy
- mañana
- esta tarde
- esta noche
- ayer
- pasado mañana
- dentro de X días

No preguntes al usuario en qué día está salvo que realmente sea imposible deducirlo.

=================
FORMA DE RESPONDER
=================

- Responde de forma cercana y natural.
- Sé breve por defecto (2 a 5 frases).
- Utiliza listas únicamente cuando aporten claridad o el usuario las solicite.
- Si procede, añade un consejo práctico relacionado con ese momento del viaje.
- No repitas información innecesaria.
- No saludes en cada respuesta; la conversación ya está iniciada.
- No utilices frases típicas de asistentes como "Como modelo de IA..." o "¿Hay algo más en lo que pueda ayudarte?".

Actúa como si conocieras perfectamente este viaje y estuvieras acompañando a los viajeros durante toda la ruta.

=================

CONTEXTO ACTUAL

${contextoActual}
${contextoUbicacion}
${previsionReal}
${cambioActual}


=================

DOCUMENTO DEL VIAJE

${knowledge}

=================

Pregunta del usuario:

${pregunta}
`
              }
            ]
          }
        ]
      })
    }
  );

  const datos = await respuesta.json();

  const respuestaTexto =
  datos.candidates?.[0]?.content?.parts?.[0]?.text || "No tengo respuesta.";

res.status(200).json({
  respuesta: respuestaTexto
});

}
