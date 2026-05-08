import pytest
import os
from pymongo import MongoClient
from dotenv import load_dotenv
import random

# Load environment variables
load_dotenv(dotenv_path='../.env')
CONNECTION_STRING = os.getenv('CONNECTIONSTRING')


@pytest.fixture
def mongo_client():
    """Fixture to establish MongoDB connection for tests"""
    client = MongoClient(CONNECTION_STRING)
    yield client
    client.close()


@pytest.fixture
def db(mongo_client):
    """Fixture to access the MediaTracker database"""
    return mongo_client['mediatracker']


def test_connect_to_database(mongo_client):
    """Test that we can connect to the MongoDB database"""
    # Attempt to get server info to verify connection
    server_info = mongo_client.server_info()
    assert server_info is not None
    assert 'version' in server_info


def test_database_exists(db):
    """Test that the MediaTracker database exists and has collections"""
    collections = db.list_collection_names()
    assert len(collections) > 0, "Database should have collections"


def test_random_collection_query(db):
    """Test a random query on available collections"""
    collections = db.list_collection_names()
    if collections:
        random_collection = random.choice(collections)
        collection = db[random_collection]
        random_doc = collection.find_one()
        assert random_doc is not None or collection.count_documents({}) == 0


def test_watchlist_collection_exists(db):
    """Test that watchlist collection exists"""
    assert 'watchlist' in db.list_collection_names()


def test_find_substance_in_watchlist(db):
    """Test finding 'The Substance' in the watchlist collection"""
    watchlist = db['watchlist']
    
    # Query for document with name = "the substance"
    result = watchlist.find_one({'name': 'The Substance'})
    
    assert result is not None, "Should find 'The Substance' in watchlist"
    assert result['name'].lower() == 'the substance'
    print(f"Found: {result}")


def test_reviews_collection_exists(db):
    """Test that reviews collection exists"""
    assert 'reviews' in db.list_collection_names()


def test_find_fantastic_mr_fox_five_stars(db):
    """Test finding 'Fantastic Mr Fox' with 5 stars in reviews"""
    reviews = db['reviews']
    
    # Query for review with title "Fantastic Mr Fox" and rating = 5
    result = reviews.find_one({
        'title': 'Fantastic Mr Fox',
        'rating': 5
    })
    
    assert result is not None, "Should find 'Fantastic Mr Fox' with 5 star review"
    assert result['title'].lower() == 'fantastic mr fox'
    assert result['rating'] == 5
    print(f"Found: {result}")


def test_find_all_fantastic_mr_fox_five_stars(db):
    """Test finding all 5-star reviews of 'Fantastic Mr Fox'"""
    reviews = db['reviews']
    
    # Query for all reviews with title "Fantastic Mr Fox" and rating = 5
    results = list(reviews.find({
        'title': 'Fantastic Mr Fox',
        'rating': 5
    }))
    
    assert len(results) > 0, "Should find at least one 5 star review of 'Fantastic Mr Fox'"
    for review in results:
        assert review['rating'] == 5
    print(f"Found {len(results)} five-star reviews")
