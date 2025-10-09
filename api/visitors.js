export default async function handler(req, res) {
    const API_URL = "https://api.counterapi.dev/v2/clock/clock-visitors/";
    const TOKEN = process.env.VITE_API_TOKEN;
  
    try {
      await fetch(`${API_URL}up`, {
        method: "GET",
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
  
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const data = await response.json();
  
      res.status(200).json(data);
    } catch (error) {
      console.error("Error in serverless function:", error);
      res.status(500).json({ error: "Failed to fetch visitor count" });
    }
  }
  