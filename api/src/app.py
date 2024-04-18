from datetime import datetime
from typing import TypedDict

from fastapi import FastAPI, Form, status
from fastapi.responses import RedirectResponse

from services.database import JSONDatabase

app = FastAPI()


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@app.on_event("startup")
def on_startup() -> None:
    """Initialize database when starting API server."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []


@app.on_event("shutdown")
def on_shutdown() -> None:
    """Close database when stopping API server."""
    database.close()


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now().replace(microsecond=0)

    quote = Quote(name=name, message=message, time=now.isoformat())
    database["quotes"].append(quote)

    # You may modify the return value as needed to support other functionality
    return RedirectResponse("/", status.HTTP_303_SEE_OTHER)


# TODO: add another API route with a query parameter to retrieve quotes based on max age
@app.get("/retrieve")
def retrieve_message(max_age: str) -> list[Quote]:
    """
    Retrieve and return a list of quotes from the database that are below the maximum age.
    """
    now = datetime.now().replace(microsecond=0)
    quotes = []
   
    if max_age == "all":
        return database["quotes"]
    
    max_seconds = 0
    if max_age == "day":
        max_seconds = 86400
    elif max_age == "week":
        max_seconds = 604800
    elif max_age == "month":
        max_seconds = 2592000
    elif max_age == "year":
        max_seconds = 31536000
    
    # Select only the quotes that are within the max_age
    for quote in database["quotes"]:
        quote_time = datetime.fromisoformat(quote['time'])
        if (now - quote_time).total_seconds() <= max_seconds:
            quotes.append(quote)
            
    return quotes

