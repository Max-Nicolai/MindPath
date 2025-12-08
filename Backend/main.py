import os
import httpx
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Union
from dotenv import load_dotenv

# Import our mapping logic
from mappings import get_keywords_for_code

# Load environment variables
load_dotenv()

app = FastAPI(title="MindPath Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",                  # For local development
        "https://mindpath-ebc2144.netlify.app",   # Your specific Netlify URL
        "https://mindpath-quiz.netlify.app",     # (Optional) If you have other aliases
        "https://mindpath-r0ru.onrender.com" # the right one
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Configuration ---
THEIRSTACK_API_KEY = os.getenv("THEIRSTACK_API_KEY")
THEIRSTACK_URL = "https://api.theirstack.com/v1/jobs/search"

# --- Data Models ---
class Job(BaseModel):
    id: str 
    title: str
    company: str
    location: str
    url: str
    salary_string: Optional[str] = None
    date_posted: Optional[str] = None

# --- Helper Function to Call TheirStack ---
async def fetch_jobs_from_theirstack(keywords: List[str], limit: int = 1):
    if not THEIRSTACK_API_KEY:
        print("WARNING: No THEIRSTACK_API_KEY found. Returning mock data.")
        return []

    headers = {
        "Authorization": f"Bearer {THEIRSTACK_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "posted_at_max_age_days": 45,
        "limit": limit,
        "job_title_or": keywords, 
        "include_total_results": False
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(THEIRSTACK_URL, json=payload, headers=headers, timeout=10.0)
            response.raise_for_status()
            data = response.json()
            return data.get("data", []) 
        except Exception as e:
            print(f"Error fetching jobs: {e}")
            return []

# --- Endpoints ---

@app.get("/")
def read_root():
    return {"status": "MindPath Backend is running"}

@app.get("/api/jobs", response_model=List[Job])
async def get_jobs(
    code: str = Query(..., min_length=1, description="The user's RIASEC code (e.g. IAS)"),
    limit: int = 4
):
    print(f"Fetching jobs for RIASEC code: {code}")
    
    # 1. Translate Code to Keywords
    keywords = get_keywords_for_code(code)
    print(f"Search Keywords: {keywords}")

    # 2. Call TheirStack
    raw_jobs = await fetch_jobs_from_theirstack(keywords, limit)

    # 3. Format for Frontend
    formatted_jobs = []
    for j in raw_jobs:
        loc = j.get("job_location_names", ["Unknown"])[0] if j.get("job_location_names") else "Unknown"
        company_name = j.get("company_object", {}).get("name", "Unknown Company")

        # --- FIX IS HERE: str() converts the ID number to text ---
        formatted_jobs.append(Job(
            id=str(j.get("id", "0")), 
            title=j.get("job_title", "Untitled Role"),
            company=company_name,
            location=loc,
            url=j.get("url", "#"),
            salary_string=j.get("salary_string", "Not listed"),
            date_posted=j.get("date_posted", "")
        ))

    return formatted_jobs