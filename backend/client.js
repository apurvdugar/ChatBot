import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { anshuman_singh_persona } from './persona_AnshumanSingh.js';
import { kshitij_mishra_persona } from './persona_KshitijMishra.js';
import { abhimanyu_saxena_persona } from './persona_AbhimanyuSaxena.js';
import OpenAI from 'openai';
dotenv.config();    

const app = express();
app.use(cors());

app.use(express.json()); 

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.APP_URL || "http://localhost:3000",
    "X-Title": "Scaler Persona Chatbot",
  },
});

let messages = [{role: "system", content: anshuman_singh_persona.systemPrompt}];

let personas = {
    "anshuman": anshuman_singh_persona.systemPrompt,
    "kshitij": kshitij_mishra_persona.systemPrompt,
    "abhimanyu": abhimanyu_saxena_persona.systemPrompt
}

app.post("/chat", async (req, res) => {
    const message = req.body.message;
    messages.push({role: "user", content: message});
    // console.log(messages);
    const response = await client.chat.completions.create({
        model: 'openai/gpt-oss-20b:free',
        messages: messages
    });
    messages.push({
        role: "assistant", 
        content: response.choices[0].message.content,
    })

    res.json({response: response.choices[0].message.content});
});

app.put("/changePersona/:persona", (req,res) => {
    const persona = req.params.persona;
    messages = [{   
        role: "system",
        content: personas[persona]
    }];
    
    res.json({response: "Persona Changed Successfully"});
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});