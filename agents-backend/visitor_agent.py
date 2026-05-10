from agents import Agent, Runner
from portfolio_data import format_portfolio

# session_id -> list of {"role": "user"|"assistant", "content": str}
_sessions: dict[str, list] = {}


async def run_visitor_agent(message: str, session_id: str = "") -> str:
    portfolio_context = format_portfolio()

    agent = Agent(
        name="PortfolioAssistant",
        instructions=(
            "You are a friendly assistant representing Hamza Bhatti. "
            "Answer visitor questions about his skills, projects, education, and experience. "
            "Be concise and professional. Only use the portfolio data provided below. "
            "If asked something not in the data, politely say you do not have that info. "
            "Remember the full conversation history — if the visitor refers to something said earlier, use it.\n\n"
            f"{portfolio_context}"
        ),
        model="gemini-2.5-flash",
    )

    history = _sessions.get(session_id, []) if session_id else []
    input_messages = history + [{"role": "user", "content": message}]

    try:
        result = await Runner.run(agent, input_messages)
        if session_id:
            _sessions[session_id] = input_messages + [
                {"role": "assistant", "content": result.final_output}
            ]
        return result.final_output
    except Exception as exc:
        return f"Sorry, I encountered an error: {exc}"
