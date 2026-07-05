import os
import uuid
from datetime import datetime, timezone
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field

from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv()

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")
EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY")

app = FastAPI(title="Facilissimo Web API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]
contacts_collection = db["contact_submissions"]


SYSTEM_INSTRUCTION = """Sei l'assistente virtuale ufficiale di "Facilissimo Web", lo studio di freelance web design di Maria Teresa Rogani (detta M. Teresa Rogani).
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

Rispondi sempre in italiano in modo amichevole, professionale, chiaro ed elegante. Mantieni le risposte connesse al contesto, utili e non eccessivamente lunghe. Usa formattazioni markdown (grassetto, elenchi puntati) per rendere il testo scansionabile. Non inventare informazioni non presenti. Invita sempre a compilare il form nella pagina "Contatti" per iniziare."""


class ChatHistoryItem(BaseModel):
    role: str
    text: str


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatHistoryItem]] = []
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    text: str
    session_id: str


class ContactRequest(BaseModel):
    name: str
    email: str
    company: Optional[str] = ""
    projectType: str
    budget: str
    message: str


class ContactSubmission(BaseModel):
    id: str
    name: str
    email: str
    company: Optional[str] = ""
    projectType: str
    budget: str
    message: str
    date: str


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "facilissimo-web"}


@app.post("/api/contact")
async def create_contact(payload: ContactRequest):
    if not payload.name or not payload.email or not payload.message:
        raise HTTPException(status_code=400, detail="Nome, Email e Messaggio sono obbligatori.")

    submission = ContactSubmission(
        id=uuid.uuid4().hex[:8],
        name=payload.name,
        email=payload.email,
        company=payload.company or "",
        projectType=payload.projectType,
        budget=payload.budget,
        message=payload.message,
        date=datetime.now(timezone.utc).isoformat(),
    )
    await contacts_collection.insert_one(submission.model_dump())
    return {"success": True, "submission": submission.model_dump()}


@app.get("/api/contact/submissions")
async def list_submissions():
    cursor = contacts_collection.find({}, {"_id": 0}).sort("date", -1).limit(50)
    submissions = await cursor.to_list(length=50)
    return submissions


@app.post("/api/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest):
    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="Il messaggio è richiesto.")
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=503, detail="Servizio AI non configurato.")

    session_id = payload.session_id or uuid.uuid4().hex

    # Rebuild context: prepend history as a single conversation prime
    context_prefix = ""
    if payload.history:
        # Take last 6 exchanges to keep context small
        recent = payload.history[-12:]
        lines = []
        for m in recent:
            speaker = "Utente" if m.role == "user" else "Assistente"
            lines.append(f"{speaker}: {m.text}")
        context_prefix = (
            "Ecco la conversazione precedente (per il contesto):\n"
            + "\n".join(lines)
            + "\n\nNuovo messaggio dell'utente:\n"
        )

    chat_client = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=session_id,
        system_message=SYSTEM_INSTRUCTION,
    ).with_model("anthropic", "claude-sonnet-4-6")

    try:
        response = await chat_client.send_message(
            UserMessage(text=context_prefix + payload.message)
        )
        return ChatResponse(text=response, session_id=session_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Errore AI: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
