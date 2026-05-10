import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

from openai import AsyncOpenAI
from agents import set_default_openai_client

set_default_openai_client(AsyncOpenAI(
    api_key=os.environ.get("GEMINI_API_KEY", ""),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
))

from portfolio_data import load_portfolio
from visitor_agent import run_visitor_agent
from admin_agent import run_admin_agent


@asynccontextmanager
async def lifespan(app: FastAPI):
    load_portfolio()
    yield


app = FastAPI(title="Portfolio Agents Backend", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://hamza-bhatti.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class VisitorMessage(BaseModel):
    message: str
    session_id: str = ""


class AdminMessage(BaseModel):
    message: str
    session_id: str = ""


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/visitor-chat")
async def visitor_chat(body: VisitorMessage):
    if not body.message.strip():
        raise HTTPException(status_code=400, detail="message is required")
    reply = await run_visitor_agent(body.message, body.session_id)
    return {"reply": reply}


@app.post("/admin-chat")
async def admin_chat(body: AdminMessage):
    if not body.message.strip():
        raise HTTPException(status_code=400, detail="message is required")
    reply = await run_admin_agent(body.message, body.session_id)
    return {"reply": reply}
