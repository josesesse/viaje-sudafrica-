export default async function handler(req, res) {

  const apiKey = process.env.GEMINI_API_KEY;

  const respuesta = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models",
    {
      headers: {
        "x-goog-api-key": apiKey
      }
    }
  );

  const datos = await respuesta.json();

  res.status(200).json(datos);

}
