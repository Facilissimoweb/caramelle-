import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { Groq } from "groq-sdk";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is missing.");
}

// Memory array for contacts (simulating database for demonstration, simple persistence can be added or just kept in-memory)
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budget: string;
  message: string;
  date: string;
}

const contactSubmissions: ContactSubmission[] = [];

// Google Analytics 4 Measurement Protocol server-side event helper
async function trackServerEvent(eventName: string, params: Record<string, any> = {}) {
  const apiSecret = process.env.GA_API_SECRET;
  const measurementId = process.env.GA_MEASUREMENT_ID || process.env.VITE_GA_MEASUREMENT_ID;

  if (!apiSecret || !measurementId) {
    console.log(`[GA Server Tracking Skipped] Missing GA_API_SECRET or GA_MEASUREMENT_ID for event: ${eventName}`);
    return;
  }

  try {
    const url = `https://www.google-analytics.com/mp/collect?api_secret=${apiSecret}&measurement_id=${measurementId}`;
    const payload = {
      client_id: params.clientId || `server_${Math.random().toString(36).substring(2, 15)}`,
      events: [
        {
          name: eventName,
          params: {
            engagement_time_msec: "100",
            ...params,
          },
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log(`[GA Server Tracking] Event "${eventName}" sent. Status: ${response.status}`);
  } catch (err) {
    console.error("[GA Server Tracking Error]:", err);
  }
}


// API routes first
app.get("/api/health", async (req, res) => {
  const hasGeminiKey = !!process.env.GEMINI_API_KEY;
  const hasGroqKey = !!process.env.GROQ_API_KEY;
  let geminiApiStatus = "unconfigured";
  let groqApiStatus = "unconfigured";
  
  if (hasGeminiKey && ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: "Hi",
      });
      if (response && response.text) {
        geminiApiStatus = "active";
      } else {
        geminiApiStatus = "empty_response";
      }
    } catch (err: any) {
      geminiApiStatus = "error";
    }
  }

  if (hasGroqKey) {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: "Hi" }],
          max_tokens: 5
        })
      });
      if (response.ok) {
        groqApiStatus = "active";
      } else {
        groqApiStatus = "error_response_" + response.status;
      }
    } catch (err: any) {
      groqApiStatus = "error";
    }
  }

  res.json({
    status: "ok",
    geminiKeyConfigured: hasGeminiKey,
    geminiApiStatus: geminiApiStatus,
    groqKeyConfigured: hasGroqKey,
    groqApiStatus: groqApiStatus,
    activeChatEngine: hasGroqKey ? "groq" : "gemini",
    timestamp: new Date().toISOString()
  });
});

app.post("/api/contact", (req, res) => {
  const { name, email, company, projectType, budget, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Nome, Email e Messaggio sono obbligatori." });
  }

  const submission: ContactSubmission = {
    id: Math.random().toString(36).substring(2, 9),
    name,
    email,
    company,
    projectType,
    budget,
    message,
    date: new Date().toISOString(),
  };

  contactSubmissions.push(submission);
  
  // Track contact form submission server-side in Google Analytics
  trackServerEvent("contact_form_submission", {
    project_type: projectType || "general",
    budget: budget || "none",
    company_provided: !!company,
  });

  res.status(201).json({ success: true, submission });
});

app.get("/api/contact/submissions", (req, res) => {
  res.json(contactSubmissions);
});

// AI Chatbot with Groq exclusively
app.post("/api/chat", async (req, res) => {
  const { message, history, stream } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Il messaggio è richiesto." });
  }

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) {
    return res.status(503).json({
      error: "Servizio AI non configurato. Inserisci la chiave GROQ_API_KEY nei Secrets per abilitare la chat."
    });
  }

  try {
    // Lazy initialize the Groq client as recommended
    const groq = new Groq({ apiKey: groqKey });

    const systemInstruction = `Sei l'assistente virtuale ufficiale di "Facilissimo Web", lo studio di freelance web design di Maria Teresa Rogani (detta M. Teresa Rogani).
Maria Teresa Rogani è l'unica titolare, designer e sviluppatrice di Facilissimo Web. Non c'è nessun team, lavora da sola come Freelance Web Designer per garantire la massima cura, attenzione diretta, velocità e trasparenza per ciascun cliente.
Il tuo ruolo è rispondere ai potenziali clienti, spiegare i servizi offerti, descrivere le tariffe/proposte e invitarli a contattarla direttamente per un preventivo personalizzato.

Ecco i dettagli chiave su Facilissimo Web e M. Teresa Rogani:
1. **La Filosofia**: "Facilissimo Web" unisce il design d'avanguardia con l'intelligenza artificiale per creare siti web moderni, veloci ed economici che aiutano i business a crescere. Lavorare con una freelance singola significa comunicare direttamente con chi realizza il sito, con tempi di consegna dimezzati e senza costi di agenzia o intermediari.
2. **I Servizi principali**:
   - Web Design & Sviluppo AI-Driven (siti web ad alte prestazioni, landing page, e-commerce completi).
   - Brand Kit & Loghi assistiti da IA con rifinitura manuale di Teresa.
   - Copywriting e SEO predittiva basati su algoritmi di linguaggio naturale.
3. **Le Proposte (Prezzi chiari e trasparenti)**:
   - **AI Starter (€950)**: Sito One-Page perfetto per un'attività o portfolio, logo design (3 concept iniziali), setup dominio ed email aziendale, supporto tecnico per 3 mesi.
   - **AI Professional (€1.900)**: Sito Multi-pagina professionale con copywriting personalizzato, SEO avanzata basata su IA, social media kit, manuale del brand (Brand Book) e analisi delle performance mensili per 3 mesi.
   - **AI Enterprise (€3.800)**: Web App o E-commerce custom complessi, integrazione personalizzata delle API di Intelligenza Artificiale per l'azienda, dashboard di analisi dati, supporto prioritario 24/7.
4. **Chi è Teresa**: È una web designer freelance appassionata di tecnologia, basata in Italia, che usa l'IA non per sostituire la creatività umana, ma per potenziarla, offrendo siti web incredibili a prezzi fino a 3 volte più bassi delle agenzie tradizionali.

Rispondi sempre in italiano in modo amichevole, professionale, chiaro ed elegante. Mantieni le risposte connesse al contesto, utili e non eccessivamente lunghe. Usa formattazioni markdown (grassetto, elenchi puntati) per rendere il testo scansionabile. Non inventare informazioni non presenti. Invita sempre a compilare il form nella pagina "Contatti" per iniziare.`;

    const messagesPayload: any[] = [
      { role: "system", content: systemInstruction }
    ];

    if (history && Array.isArray(history)) {
      history.forEach((item: any) => {
        const text = item.text || item.content || "";
        if (text) {
          messagesPayload.push({
            role: item.role === 'user' ? 'user' : 'assistant',
            content: text
          });
        }
      });
    }

    // Add current user message
    messagesPayload.push({
      role: "user",
      content: message
    });

    if (stream) {
      // Setup Server-Sent Events (SSE) headers
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      console.log("Calling Groq SDK client in streaming mode with model: llama-3.3-70b-versatile...");
      const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: messagesPayload,
        temperature: 0.7,
        max_tokens: 1024,
        stream: true
      });

      let fullResponseText = "";
      for await (const chunk of chatCompletion) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          fullResponseText += content;
          res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
        }
      }

      trackServerEvent("chatbot_message_processed_groq_stream", {
        model: "llama-3.3-70b-versatile",
        message_length: message.length,
        response_length: fullResponseText.length,
        has_history: !!(history && history.length),
      });

      res.write("data: [DONE]\n\n");
      res.end();
      return;
    }

    console.log("Calling Groq SDK client in standard mode with model: llama-3.3-70b-versatile...");
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: messagesPayload,
      temperature: 0.7,
      max_tokens: 1024
    });

    const text = completion.choices[0]?.message?.content;
    if (text) {
      // Track chatbot interaction server-side in Google Analytics
      trackServerEvent("chatbot_message_processed_groq", {
        model: "llama-3.3-70b-versatile",
        message_length: message.length,
        response_length: text.length,
        has_history: !!(history && history.length),
      });

      return res.json({ text: text, provider: "groq", model: "llama-3.3-70b-versatile" });
    } else {
      throw new Error("Il client Groq ha restituito un completamento vuoto.");
    }
  } catch (error: any) {
    console.error("Errore chiamata Groq Client:", error);
    // If it's a stream error, we might have already sent headers
    if (stream && !res.headersSent) {
      res.status(500).json({ error: error.message || "Errore del server durante l'elaborazione dell'AI." });
    } else if (!res.headersSent) {
      res.status(500).json({ error: error.message || "Errore del server durante l'elaborazione dell'AI." });
    } else {
      res.end();
    }
  }
});

// Vite/Static handler setup
async function setupViteOrStatic() {
  if (process.env.VERCEL) {
    console.log("Running on Vercel - serverless environment. Skipping app.listen().");
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupViteOrStatic();

export default app;
