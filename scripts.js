document.addEventListener('DOMContentLoaded', function() {
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    
    document.querySelectorAll('.btn-primary').forEach(button => {
        if (button.textContent.includes('Add to Cart')) {
            button.addEventListener('click', function() {
                cartCount++;
                cartCountElement.textContent = cartCount;
                const originalText = this.textContent;
                this.textContent = 'Added!';
                this.classList.add('btn-success');
                this.classList.remove('btn-primary');
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('btn-success');
                    this.classList.add('btn-primary');
                }, 1500);
            });
        }
    });

    const modalRating = document.getElementById('modalRating');
    modalRating.querySelectorAll('i').forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            const stars = modalRating.querySelectorAll('i');
            
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
    
    document.getElementById('submitReview').addEventListener('click', function() {
        const product = document.getElementById('reviewProduct').value;
        const title = document.getElementById('reviewTitle').value;
        const reviewText = document.getElementById('reviewText').value;
        const reviewerName = document.getElementById('reviewerName').value;
        const stars = modalRating.querySelectorAll('.fas').length;
        
        if (!product || !title || !reviewText || !reviewerName || stars === 0) {
            alert("Please fill all fields");
            return;
        }
        
        const reviewCard = `
            <div class="col-md-4 mb-4">
                <div class="review-card">
                    <div class="rating mb-3">
                        ${'<i class="fas fa-star"></i>'.repeat(stars)}
                        ${'<i class="far fa-star"></i>'.repeat(5 - stars)}
                        <small class="text-muted ms-2">(${product})</small>
                    </div>
                    <h5>${title}</h5>
                    <p class="mb-4">"${reviewText}"</p>
                    <div class="d-flex align-items-center">
                        <div>
                            <h6 class="mb-0">${reviewerName}</h6>
                            <small class="text-muted">Verified Buyer</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('reviewsContainer').insertAdjacentHTML('afterbegin', reviewCard);
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
        modal.hide();
        
        document.getElementById('reviewForm').reset();
        modalRating.querySelectorAll('i').forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
        });
    });
});