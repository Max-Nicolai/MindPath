# Maps RIASEC letters to specific job titles for the search engine

RIASEC_KEYWORDS = {
    "R": [ # Realistic (Doers)
        "Mechanical Engineer", "Electrical Engineer", "Civil Engineer", 
        "Technician", "Mechanic", "Carpenter", "Electrician", 
        "Driver", "Construction Manager", "Safety Officer", "Network Engineer"
    ],
    "I": [ # Investigative (Thinkers)
        "Data Scientist", "Software Engineer", "Research Scientist", 
        "Data Analyst", "Biologist", "Chemist", "Pharmacist", 
        "Systems Analyst", "Backend Developer", "Algorithm Engineer"
    ],
    "A": [ # Artistic (Creators)
        "Graphic Designer", "UX Designer", "Product Designer", 
        "Art Director", "Copywriter", "Content Creator", 
        "Architect", "Illustrator", "Video Editor", "Frontend Developer"
    ],
    "S": [ # Social (Helpers)
        "Registered Nurse", "Teacher", "Social Worker", "Counselor", 
        "Human Resources Manager", "Recruiter", "Customer Success Manager",
        "Physical Therapist", "Occupational Therapist", "Corporate Trainer"
    ],
    "E": [ # Enterprising (Persuaders)
        "Sales Manager", "Account Executive", "Product Manager", 
        "Marketing Manager", "Business Development Representative", 
        "Real Estate Agent", "Project Manager", "Chief of Staff"
    ],
    "C": [ # Conventional (Organizers)
        "Accountant", "Financial Analyst", "Auditor", "Bookkeeper",
        "Administrative Assistant", "Compliance Officer", "Data Entry",
        "Bank Teller", "Logistics Coordinator", "Quality Assurance"
    ]
}

def get_keywords_for_code(riasec_code: str) -> list[str]:
    """
    Generates a list of job titles based on the top 2 letters of the user's code.
    Example: 'ISA' -> Combines keywords for 'I' and 'S'.
    """
    if not riasec_code:
        return ["Remote"] # Fallback

    # We focus on the primary and secondary traits for the most relevant matches
    primary = riasec_code[0].upper()
    secondary = riasec_code[1].upper() if len(riasec_code) > 1 else None

    keywords = []
    
    # Add all primary keywords
    if primary in RIASEC_KEYWORDS:
        keywords.extend(RIASEC_KEYWORDS[primary])
    
    # Add top 5 keywords from the secondary trait to mix it up
    if secondary and secondary in RIASEC_KEYWORDS:
        secondary_jobs = RIASEC_KEYWORDS[secondary]
        keywords.extend(secondary_jobs[:5])

    return list(set(keywords)) # Remove duplicates