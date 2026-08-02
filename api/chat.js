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

Responde de forma natural, amable y muy concisa.
No inventes información.
Si no sabes algo, dilo claramente.
No utilices listas largas salvo que el usuario las pida.
La respuesta debe ser corta, normalmente entre 2 y 5 frases.

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
