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
watchlist_collection = db['watchlist']


# CREATE
def create_watchlist_item(name, media_type, status='unwatched', notes=None):
    """Create a new watchlist item"""
    document = {
        'name': name,
        'media_type': media_type,
        'status': status,
        'notes': notes
    }
    result = watchlist_collection.insert_one(document)
    return str(result.inserted_id)


# READ
def get_watchlist_item_by_id(item_id):
    """Get a watchlist item by ID"""
    return watchlist_collection.find_one({'_id': ObjectId(item_id)})


def get_watchlist_item_by_name(name):
    """Get a watchlist item by name"""
    return watchlist_collection.find_one({'name': name})


def get_all_watchlist_items():
    """Get all items in the watchlist"""
    return list(watchlist_collection.find({}))


# UPDATE
def update_watchlist_item(item_id, name=None, media_type=None, status=None, notes=None):
    """Update a watchlist item"""
    update_data = {}
    if name is not None:
        update_data['name'] = name
    if media_type is not None:
        update_data['media_type'] = media_type
    if status is not None:
        update_data['status'] = status
    if notes is not None:
        update_data['notes'] = notes
    
    result = watchlist_collection.update_one(
        {'_id': ObjectId(item_id)},
        {'$set': update_data}
    )
    return result.modified_count > 0


# DELETE
def delete_watchlist_item(item_id):
    """Delete a watchlist item by ID"""
    result = watchlist_collection.delete_one({'_id': ObjectId(item_id)})
    return result.deleted_count > 0
