steps to add review:
// Make a new model with userId, productId, rating and text. Text is string and the rest integer.

// Seed it.

//Set up relations.
product has many reviews/
user has many reviews/
add userId and productId to review.
when making model if we add userId and productId to review, we don't need to add/remove column in review-relations migration.
modify product to include comments
