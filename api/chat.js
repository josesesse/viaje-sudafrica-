import fs from "fs";
import path from "path";

const knowledge = fs.readFileSync(
  path.join(process.cwd(), "knowledge.md"),
  "utf8"
);

// CONFIGURACIÓN
const DEBUG_DATE = "2026-08-19";
// const DEBUG_DATE = null;

const TRIP_DAYS_LOCATIONS = [
  { day: 1, date: "2026-08-15", lat: -24.9209, lon: 30.8305, label: "Graskop" },
  { day: 2, date: "2026-08-16", lat: -25.1793, lon: 31.2582, label: "Pretoriuskop" },
  { day: 3, date: "2026-08-17", lat: -24.3936, lon: 31.7784, label: "Satara" },
  { day: 4, date: "2026-08-18", lat: -24.4300, lon: 31.6200, label: "Tamboti" },
  { day: 5, date: "2026-08-19", lat: -25.3508, lon: 31.8999, label: "Crocodile Bridge" },
  { day: 6, date: "2026-08-20", lat: -24.9209, lon: 30.8305, label: "Graskop" },
  { day: 7, date: "2026-08-21", lat: -33.9249, lon: 18.4108, label: "Ciudad del Cabo" },
  { day: 8, date: "2026-08-22", lat: -33.9249, lon: 18.4108, label: "Ciudad del Cabo" },
  { day: 9, date: "2026-08-23", lat: -34.1929, lon: 18.4291, label: "Simon's Town" },
  { day: 10, date: "2026-08-24", lat: -34.4187, lon: 19.2345, label: "Hermanus" },
  { day: 11, date: "2026-08-25", lat: -33.9346, lon: 18.8600, label: "Stellenbosch" },
  { day: 12, date: "2026-08-26", lat: -33.9346, lon: 18.8600, label: "Stellenbosch" },
  { day: 13, date: "2026-08-27", lat: -33.9715, lon: 18.6021, label: "Zona aeropuerto Ciudad del Cabo" },
];

async function obtenerPrevisionReal(hoy, pregunta) {
  // OPTIMIZACIÓN: Solo consultar si la pregunta menciona clima, tiempo, lluvia, temperatura o qué llevar puesto.
  const regexClima = /(tiempo|clima|lluvia|llover|temperatura|calor|frio|frío|pronostico|pronóstico)/i;
  if (!regexClima.test(pregunta)) return "";

  const MS_DIA = 1000 * 60 * 60 * 24;
  const limite = new Date(hoy.getTime() + 15 * MS_DIA);

  const diasEnRango = TRIP_DAYS_LOCATIONS.filter((d) => {
    const fecha = new Date(d.date + "T12:00:00");
    return fecha >= hoy && fecha <= limite;
  });

  if (diasEnRango.length === 0) return "";

  const resultados = await Promise.all(
    diasEnRango.map(async (d) => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${d.lat}&longitude=${d.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&start_date=${d.date}&end_date=${d.date}`;
        const r = await fetch(url);
        const j = await r.json();
        const max = j?.daily?.temperature_2m_max?.[0];
        const min = j?.daily?.temperature_2m_min?.[0];
        const lluvia = j?.daily?.precipitation_probability_max?.[0];
        if (max === undefined) return null;
        return `- D${d.day} (${d.date}, ${d.label}): ${max}°C/${min}°C, lluvia ${lluvia}%.`;
      } catch (e) {
        return null;
      }
    })
  );

  const lineas = resultados.filter(Boolean);
  return lineas.length === 0 ? "" : `\nPREVISIÓN TIEMPO REAL:\n${lineas.join("\n")}\n`;
}

async function obtenerCambioActual(pregunta) {
  // OPTIMIZACIÓN: Solo consultar si la pregunta habla de dinero, divisa, euros, rands o costes.
  const regexDinero = /(precio|coste|costo|cambio|divisa|euro|eur|rand|zar|dinero|pagar|cuanto cuesta)/i;
  if (!regexDinero.test(pregunta)) return "";

  try {
    const r = await fetch("https://api.frankfurter.app/latest?from=ZAR&to=EUR");
    const j = await r.json();
    const cambio = j?.rates?.EUR;
    if (!cambio) return "";
    return `\nCAMBIO ZAR/EUR: 1 ZAR ≈ ${cambio.toFixed(4)} EUR | 1 EUR ≈ ${(1 / cambio).toFixed(2)} ZAR.\n`;
  } catch (e) {
    return "";
  }
}

export default async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  const { pregunta, ubicacion } = req.body;

  if (!pregunta) {
    return res.status(400).json({ respuesta: "No se ha recibido ninguna pregunta." });
  }

  const hoy = DEBUG_DATE ? new Date(DEBUG_DATE + "T12:00:00") : new Date();
  const inicioViaje = new Date("2026-08-15T12:00:00");
  const diasRestantes = Math.floor((inicioViaje - hoy) / (1000 * 60 * 60 * 24));

  const fechaFormateada = hoy.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const estadoViaje = diasRestantes > 0
    ? `El viaje empieza el 15/08/2026 (faltan ${diasRestantes} días).`
    : `El viaje ya ha comenzado.`;

  const contextoUbicacion = ubicacion
    ? `Ubicación usuario: Lat ${ubicacion.lat}, Lng ${ubicacion.lng} (precisión ${Math.round(ubicacion.accuracy)}m).`
    : "";

  // Solo se ejecutan las llamadas a APIs externas si la pregunta lo amerita
  const [previsionReal, cambioActual] = await Promise.all([
    obtenerPrevisionReal(hoy, pregunta),
    obtenerCambioActual(pregunta),
  ]);

  // SYSTEM INSTRUCTION (Reglas y contexto estático)
  const systemInstructionText = `Eres el copiloto inteligente de un viaje por Sudáfrica. Responde en español, de forma cercana y breve (2 a 5 frases).

REGLAS DE RESPUESTA:
- Utiliza prioritariamente el DOCUMENTO DEL VIAJE adjunto.
- Para datos turísticos/geográficos generales usa tu conocimiento.
- No inventes datos de reservas ni planning.
- Usa estas marcas especiales solo si aplica:
  - [[DIA:n]] al mencionar un día concreto (1-13).
  - [[ALOJAMIENTO:n]] al mencionar el hotel del día n.
  - [[MAPA:lat,lng,Nombre]] cuando sea relevante situar un lugar en el mapa.
  - [[BOOKING:Lugar]] para zonas donde haga falta reservar hotel.
- No expliques estas marcas ni saludes en cada respuesta.

DOCUMENTO DEL VIAJE:
${knowledge}`;

  // PROMPT DINÁMICO (Cosas que cambian en cada llamada)
  const promptUsuario = `CONTEXTO DE HOY:
Fecha: ${fechaFormateada}. ${estadoViaje}
${contextoUbicacion}
${previsionReal}
${cambioActual}

PREGUNTA DEL USUARIO:
${pregunta}`;

  try {
    const respuesta = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          // Definir systemInstruction ahorra procesamiento en el motor del modelo
          systemInstruction: {
            parts: [{ text: systemInstructionText }],
          },
          contents: [
            {
              parts: [{ text: promptUsuario }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 400,
            temperature: 0.7
          },
        }),
      }
    );

    const datos = await respuesta.json();
    const respuestaTexto =
      datos.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Estoy recibiendo muchas consultas en este momento. Inténtalo de nuevo en unos segundos.";

    return res.status(200).json({ respuesta: respuestaTexto });
  } catch (error) {
    return res.status(500).json({ respuesta: "Error al procesar la respuesta." });
  }
}
