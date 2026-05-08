# script to add test data to the database and verify that CRUD operations work as expected
from reviews_crud import create_review, get_reviews_by_title, update_review, delete_review

# CREATE
print("Creating review...")
review_id = create_review(
    title="Fantastic Mr Fox",
    rating=5,
    review_text="Amazing stop-motion film, beautifully crafted",
    reviewer="Test User"
)
print(f"✓ Created: {review_id}")

# READ
print("\nReading review...")
reviews = get_reviews_by_title("Fantastic Mr Fox")
print(f"✓ Found: {reviews}")

# UPDATE
print("\nUpdating review...")
updated = update_review(review_id, rating=5, review_text="Incredible masterpiece!")
print(f"✓ Updated: {updated}")

# # DELETE
# print("\nDeleting review...")
# deleted = delete_review(review_id)
# print(f"✓ Deleted: {deleted}")
