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



export default async function handler(req, res) {

  const apiKey = process.env.GEMINI_API_KEY;
  const { pregunta } = req.body;
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
