const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

let currentImageIndex = 0;
let startX = 0;
let isDragging = false;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = item.src;
        currentImageIndex = index;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});

lightboxImg.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

lightboxImg.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const currentX = e.clientX;
        const diffX = startX - currentX;

        if (Math.abs(diffX) > 50) {  
            if (diffX > 0) {
                showNextImage();  
            } else {
                showPrevImage();  
            }
            isDragging = false;  
        }
    }
});

lightboxImg.addEventListener('mouseup', () => {
    isDragging = false;  
});

lightboxImg.addEventListener('mouseleave', () => {
    isDragging = false;  
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowRight') {
            showNextImage();  
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();  
        }
    }
});

lightboxImg.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

lightboxImg.addEventListener('touchmove', (e) => {
    const endX = e.touches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {  
        if (diffX > 0) {
            showNextImage();  
        } else {
            showPrevImage();  
        }
    }
});

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    lightboxImg.src = galleryItems[currentImageIndex].src;
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentImageIndex].src;
}