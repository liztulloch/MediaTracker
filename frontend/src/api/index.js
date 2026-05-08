const BASE_URL = "http://localhost:8000/api"

// REVIEWS
export async function submitReview(type, data) {
  const response = await fetch(`${BASE_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: data.name,
      rating: data.stars,
      review_text: data.why,
      genre: data.genre,
      extraThoughts: data.extraThoughts,
    })
  })
  if (!response.ok) throw new Error("Failed to submit review")
  return response.json()
}

// WATCHLIST
export async function submitWatchlistItem(type, data) {
  const response = await fetch(`${BASE_URL}/watchlist/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      genre: data.genre,
      recommendedBy: data.recommendedBy,
    })
  })
  if (!response.ok) throw new Error("Failed to add to watchlist")
  return response.json()
}