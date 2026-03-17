// JavaScript for Galleries in Gallery Styles
// Filename: galleries.js

// Interactive Gallery 
// -- Allows user to click once - zoom in, click again - goes back -- 
const images = document.querySelectorAll(".zoom-img");

images.forEach(img => {
  img.addEventListener("click", () => {
    img.classList.toggle("active");
  });
});



// Filter Gallery
// Each img should include a class="item ( name of item )"
const buttons = document.querySelectorAll(".filter-buttons button");
const items = document.querySelectorAll(".item");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    items.forEach(item => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
});



// Lightbox Gallery
// Collect all gallery images into an array
const galleryImgs = Array.from(document.querySelectorAll('.lightbox-grid img'));

const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lb-img');
const lbClose   = document.getElementById('lb-close');
const lbPrev    = document.getElementById('lb-prev');
const lbNext    = document.getElementById('lb-next');
const lbCounter = document.getElementById('lb-counter');

let currentIndex = 0;

// Open the lightbox at a given index
function openLightbox(index) {
  currentIndex = index;
  lbImg.src = galleryImgs[currentIndex].src;
  lbImg.alt = galleryImgs[currentIndex].alt;
  lbCounter.textContent = `${currentIndex + 1} / ${galleryImgs.length}`;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scrolling
}

// Close the lightbox
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// Navigate between images
function showNext() {
  openLightbox((currentIndex + 1) % galleryImgs.length);
}

function showPrev() {
  openLightbox((currentIndex - 1 + galleryImgs.length) % galleryImgs.length);
}

// Attach click listeners to each thumbnail
galleryImgs.forEach((img, index) => {
  img.addEventListener('click', () => openLightbox(index));
});

// Button listeners
lbClose.addEventListener('click', closeLightbox);
lbNext.addEventListener('click', showNext);
lbPrev.addEventListener('click', showPrev);

// Click the dark backdrop (not the image) to close
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft')  showPrev();
  if (e.key === 'Escape')     closeLightbox();
});

// Touch support
let touchStartX = 0;

lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

lightbox.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {   /* 50px threshold to count as a swipe */
    diff > 0 ? showNext() : showPrev();
  }
});