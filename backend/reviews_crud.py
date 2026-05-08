import os
from pymongo import MongoClient
from dotenv import load_dotenv
from bson.objectid import ObjectId

# Load environment variables
load_dotenv(dotenv_path='../.env')
CONNECTION_STRING = os.getenv('CONNECTIONSTRING')

# Initialize MongoDB connection
client = MongoClient(CONNECTION_STRING)
db = client['mediatracker']
reviews_collection = db['reviews']


# CREATE
def create_review(title, rating, review_text=None, reviewer=None):
    """Create a new review"""
    document = {
        'title': title,
        'rating': rating,
        'review_text': review_text,
        'reviewer': reviewer
    }
    result = reviews_collection.insert_one(document)
    return str(result.inserted_id)


# READ
def get_all_reviews():
    reviews = list(reviews_collection.find({}))
    for r in reviews:
        r["_id"] = str(r["_id"])  # convert ObjectId to string
    return reviews

def get_reviews_by_title(title):
    reviews = list(reviews_collection.find({'title': title}))
    for r in reviews:
        r["_id"] = str(r["_id"])
    return reviews

def get_all_reviews():
    """Get all reviews"""
    return list(reviews_collection.find({}))


# UPDATE
def update_review(review_id, title=None, rating=None, review_text=None, reviewer=None):
    """Update a review"""
    update_data = {}
    if title is not None:
        update_data['title'] = title
    if rating is not None:
        update_data['rating'] = rating
    if review_text is not None:
        update_data['review_text'] = review_text
    if reviewer is not None:
        update_data['reviewer'] = reviewer
    
    result = reviews_collection.update_one(
        {'_id': ObjectId(review_id)},
        {'$set': update_data}
    )
    return result.modified_count > 0


# DELETE
def delete_review(review_id):
    """Delete a review by ID"""
    result = reviews_collection.delete_one({'_id': ObjectId(review_id)})
    return result.deleted_count > 0


def delete_reviews_by_title(title):
    """Delete all reviews for a specific title"""
    result = reviews_collection.delete_many({'title': title})
    return result.deleted_count
