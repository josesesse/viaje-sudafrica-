import fs from "fs";
import path from "path";

const knowledge = fs.readFileSync(
  path.join(process.cwd(), "knowledge.md"),
  "utf8"
);

export default async function handler(req, res) {

  const apiKey = process.env.GEMINI_API_KEY;
  const { pregunta } = req.body;
  if (!pregunta) {
  return res.status(400).json({
    respuesta: "No se ha recibido ninguna pregunta."
  });
}

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
Eres el copiloto de un viaje por Sudáfrica.

Habla siempre en español.

Dispones de DOS fuentes de información:

1. El documento del viaje que aparece más abajo.
   Contiene el planning, hoteles, rutas, reservas y datos específicos de ESTE viaje.

2. Tu propio conocimiento sobre Sudáfrica y el mundo.

Reglas:

- Si la respuesta está en el documento, úsalo como fuente principal.
- Si el documento no contiene esa información, responde usando tu conocimiento.
- Si es útil, combina ambas fuentes de forma natural.
- Nunca inventes datos del planning.
- Responde de forma cercana, breve y útil.

El documento describe únicamente este viaje. 
Para cualquier información turística, geográfica, histórica, gastronómica o sobre fauna, utiliza tu conocimiento general.


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
