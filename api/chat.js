export default async function handler(req, res) {

  const apiKey = process.env.GEMINI_API_KEY;

  res.status(200).json({
    encontrada: !!apiKey,
    longitud: apiKey ? apiKey.length : 0
  });

}
