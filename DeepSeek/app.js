import dotenv from "dotenv";
import OpenAI from "openai";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
});

// Ruta POST para recibir preguntas y devolver respuestas
app.post("/preguntar", async (req, res) => {
    const { pregunta } = req.body;

    try {
        const chat = await openai.chat.completions.create({
            model: "deepseek/deepseek-r1:free",
            messages: [{ role: "user", content: pregunta }],
        });

        const respuesta = chat.choices[0].message.content;
        res.json({ respuesta });
    } catch (error) {
        console.error("Error en la solicitud:", error);
        res.status(500).json({ error: "Error al obtener respuesta." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});