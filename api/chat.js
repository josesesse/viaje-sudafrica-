export default async function handler(req, res) {

  const apiKey = process.env.GEMINI_API_KEY;

  const respuesta = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
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
                text: "Di únicamente: Hola, soy el copiloto del viaje."
              }
            ]
          }
        ]
      })
    }
  );

  const datos = await respuesta.json();

  res.status(200).json(datos);

}
