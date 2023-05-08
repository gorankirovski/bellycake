import './ListReviews.css';
const ListReviews = ({ reviews }) => {
    return (
    <div className='entireReviewPage'>
    <h3>Customer reviews</h3>
    <hr />
        <div class="allReviewsBox">
            {reviews && reviews.map(review => (
                <div key={review._id} class="singleReviewBox">
                    <div class="rating-outer">
                        <div class="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                    </div>
                    <p class="review_user">by {review.name}</p>
                    <p class="review_comment">{review.comment}</p>

                    <hr />
                </div>
            ))}
        </div>
    </div>
    )
}

export default ListReviews