from agents import Agent, Runner, function_tool
from portfolio_data import PORTFOLIO_DATA, save_portfolio, format_portfolio

# In-memory session store: session_id -> conversation history
_sessions: dict[str, list] = {}


@function_tool
def get_portfolio() -> str:
    """Returns the full current portfolio as a formatted string."""
    return format_portfolio()


@function_tool
def list_projects() -> str:
    """Returns a numbered list of all current projects."""
    projects = PORTFOLIO_DATA.get("projects", [])
    if not projects:
        return "No projects found."
    lines = [
        f"{i + 1}. {p['title']} [{p.get('category', 'General')}] — {', '.join(p.get('tech', []))}"
        for i, p in enumerate(projects)
    ]
    return f"Current projects ({len(projects)}):\n" + "\n".join(lines)


@function_tool
def list_skills() -> str:
    """Returns all skills grouped by category."""
    skills = PORTFOLIO_DATA.get("skills", {})
    if not skills:
        return "No skills found."
    lines = [f"{cat}: {', '.join(skill_list)}" for cat, skill_list in skills.items()]
    return "Current skills by category:\n" + "\n".join(lines)


@function_tool
def add_project(name: str, description: str, tech_stack: str) -> str:
    """Adds a new project to the portfolio and updates the website. tech_stack should be comma-separated."""
    projects = PORTFOLIO_DATA.setdefault("projects", [])
    if any(p["title"].lower() == name.lower() for p in projects):
        return f"A project named '{name}' already exists."
    tech = [t.strip() for t in tech_stack.split(",") if t.strip()]
    projects.append({"title": name, "description": description, "tech": tech, "category": "General"})
    save_portfolio()
    return f"✓ Added '{name}' to the portfolio and updated the website. Total projects: {len(projects)}."


@function_tool
def remove_project(name: str) -> str:
    """Removes a project by title (case-insensitive) and updates the website."""
    projects = PORTFOLIO_DATA.get("projects", [])
    updated = [p for p in projects if p["title"].lower() != name.lower()]
    if len(updated) == len(projects):
        return f"No project named '{name}' found. Check the title and try again."
    PORTFOLIO_DATA["projects"] = updated
    save_portfolio()
    return f"✓ Removed '{name}' from the portfolio and updated the website. Total projects: {len(updated)}."


@function_tool
def add_skill(category: str, skill: str) -> str:
    """Adds a skill to an existing or new category and updates the website."""
    skills = PORTFOLIO_DATA.setdefault("skills", {})
    category_skills = skills.setdefault(category, [])
    if skill in category_skills:
        return f"'{skill}' is already listed under '{category}'."
    category_skills.append(skill)
    save_portfolio()
    return f"✓ Added '{skill}' to '{category}' and updated the website."


@function_tool
def remove_skill(skill: str) -> str:
    """Removes a skill from whichever category it belongs to and updates the website."""
    for category, skill_list in PORTFOLIO_DATA.get("skills", {}).items():
        match = next((s for s in skill_list if s.lower() == skill.lower()), None)
        if match:
            skill_list.remove(match)
            save_portfolio()
            return f"✓ Removed '{match}' from '{category}' and updated the website."
    return f"Skill '{skill}' was not found in any category."


@function_tool
def update_tagline(new_tagline: str) -> str:
    """Updates the portfolio tagline and updates the website."""
    old = PORTFOLIO_DATA.get("tagline", "")
    PORTFOLIO_DATA["tagline"] = new_tagline
    save_portfolio()
    return f"✓ Tagline updated on the website.\n  Before: {old}\n  After:  {new_tagline}"


@function_tool
def add_education(degree: str, institution: str) -> str:
    """Adds a new education entry to the portfolio and updates the website."""
    education = PORTFOLIO_DATA.setdefault("education", [])
    education.append({"degree": degree, "institution": institution, "description": ""})
    save_portfolio()
    return f"✓ Added '{degree}' at '{institution}' and updated the website. Total entries: {len(education)}."


_TOOLS = [
    get_portfolio,
    list_projects,
    list_skills,
    add_project,
    remove_project,
    add_skill,
    remove_skill,
    update_tagline,
    add_education,
]


async def run_admin_agent(message: str, session_id: str = "") -> str:
    agent = Agent(
        name="PortfolioManager",
        instructions=(
            "You are Hamza Bhatti's private portfolio manager. "
            "Help him manage his portfolio using the available tools. "
            "Every tool call also updates the live portfolio website instantly. "
            "Always confirm what changed. "
            "If asked to add something, gather all needed details before calling the tool. "
            "Remember the conversation context — refer back to earlier messages when relevant. "
            "Be conversational and helpful."
        ),
        tools=_TOOLS,
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
        return f"Error: {exc}"
