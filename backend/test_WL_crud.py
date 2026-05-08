# script to add test data to the database and verify that CRUD operations work as expected
from watchlist_crud import create_watchlist_item, get_watchlist_item_by_name, update_watchlist_item, delete_watchlist_item

# CREATE
print("Creating item...")
item_id = create_watchlist_item(
    name="The Substance",
    media_type="movie",
    notes="cool sci-fi movie coming out in 2024"
)
print(f"✓ Created: {item_id}")

# READ
print("\nReading item...")
item = get_watchlist_item_by_name("The Substance")
print(f"✓ Found: {item}")

# UPDATE
print("\nUpdating item...")
updated = update_watchlist_item(item_id, status="watched")
print(f"✓ Updated: {updated}")

# # DELETE
# print("\nDeleting item...")
# deleted = delete_watchlist_item(item_id)
# print(f"✓ Deleted: {deleted}")