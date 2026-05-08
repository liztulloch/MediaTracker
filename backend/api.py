from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')

from reviews_crud import create_review, get_reviews_by_title, get_all_reviews
from watchlist_crud import create_watchlist_item, get_all_watchlist_items, get_watchlist_item_by_name

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ReviewIn(BaseModel):
    title: str
    rating: int
    review_text: Optional[str] = None
    reviewer: Optional[str] = None
    genre: Optional[str] = None
    extraThoughts: Optional[str] = None


class WatchlistIn(BaseModel):
    name: str
    genre: Optional[str] = None
    recommendedBy: Optional[str] = None


@app.get("/api/reviews", response_model=List[dict])
def list_reviews(title: Optional[str] = None):
    if title:
        return get_reviews_by_title(title)
    return get_all_reviews()


@app.post("/api/reviews")
def add_review(payload: ReviewIn):
    try:
        # map fields from frontend to backend create_review
        review_id = create_review(
            title=payload.title,
            rating=payload.rating,
            review_text=payload.review_text or payload.extraThoughts,
            reviewer=payload.reviewer,
        )
        return {"id": review_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/watchlist", response_model=List[dict])
def list_watchlist():
    return get_all_watchlist_items()


@app.post("/api/watchlist/{media_type}")
def add_watchlist(media_type: str, payload: WatchlistIn):
    try:
        item_id = create_watchlist_item(
            name=payload.name,
            media_type=media_type,
            notes=payload.recommendedBy,
        )
        return {"id": item_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
