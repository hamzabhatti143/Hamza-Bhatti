# agents-backend

Python FastAPI backend powering the AI chatbots for Hamza Bhatti's portfolio. It runs two agents built with the OpenAI Agents SDK — one for visitors asking about the portfolio, and one for the admin to manage portfolio content via natural language.

## Prerequisites

- Python 3.10+
- An OpenAI API key from [platform.openai.com](https://platform.openai.com)

## Setup

```bash
cd agents-backend
pip install -r requirements.txt
cp .env.example .env
```

Open `.env` and fill in your values:

```
OPENAI_API_KEY=sk-...
ADMIN_PASSWORD=your_secret_password_here
```

Start the server:

```bash
uvicorn main:app --reload --port 8000
```

The backend will be available at `http://localhost:8000`.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Returns `{"status": "ok"}` — use to confirm the server is up |
| `POST` | `/visitor-chat` | Public chatbot for portfolio visitors |
| `POST` | `/admin-chat` | Password-protected agent for managing portfolio content |

### `/visitor-chat`

```json
// Request
{ "message": "What projects has Hamza built?" }

// Response
{ "reply": "Hamza has built 17 projects including..." }
```

### `/admin-chat`

```json
// Request
{ "message": "Show me all my projects", "password": "your_secret_password_here" }

// Response
{ "reply": "Current projects (17):..." }
```

Returns `403 Forbidden` if the password is wrong.

## Example Admin Commands

Once the server is running, try these in the admin panel at `/admin` on your Next.js site:

```
Show me all my projects
```
```
Add a new project called AI Portfolio Manager, built with Next.js and Python
```
```
Remove the Number Guessing Game
```
```
Add React to my skills
```
```
Update my tagline to Full Stack AI Developer
```
```
Add a new education entry: Cloud Computing at XYZ Institute
```

## Persistence

Portfolio changes made through the admin agent are saved to `portfolio_state.json` in this folder. On the next server restart, that file is loaded automatically so no changes are lost. The file is created after the first admin edit — until then, the default data from `portfolio_data.py` is used.
