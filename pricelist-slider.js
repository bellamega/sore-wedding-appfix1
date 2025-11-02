// Pricelist Package Vendor Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('pricelistTrack');
    const slides = track.getElementsByClassName('pricelist-img');
    const prevButton = document.getElementById('pricelistPrev');
    const nextButton = document.getElementById('pricelistNext');
    const modal = document.getElementById('pricelistModal');
    const modalImg = document.getElementById('previewImage');
    const closeModal = document.querySelector('.modal-close');

    let currentSlide = 0;
    const slidesCount = slides.length;

    // Create dots container
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'pricelist-dots';
    track.parentElement.appendChild(dotsContainer);

    // Create dots
    for (let i = 0; i < slidesCount; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    function updateDots() {
        const dots = document.getElementsByClassName('dot');
        Array.from(dots).forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function updateSlidePosition() {
        const slideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${currentSlide * (slideWidth + 20)}px)`;
        updateDots();
        
        // Update buttons state
        prevButton.disabled = currentSlide === 0;
        nextButton.disabled = currentSlide === slidesCount - 1;
    }

    function nextSlide() {
        if (currentSlide < slidesCount - 1) {
            currentSlide++;
            updateSlidePosition();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlidePosition();
        }
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlidePosition();
    }

    // Event Listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Modal functionality
    Array.from(slides).forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        } else {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Initial setup
    updateSlidePosition();

    // Window resize handler
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateSlidePosition();
        }, 250);
    });
});