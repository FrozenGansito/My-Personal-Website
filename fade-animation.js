// JavaScript fade-in animation on scroll


const faders = document.querySelectorAll('.fade-in, .card, .feature-option');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
});

faders.forEach(el => observer.observe(el));



// Window Image Animation
const windowImg = document.querySelector('.window-img');

if (windowImg) {
  const parallaxImg = windowImg.querySelector('img');

  const updateParallax = () => {
    const rect = windowImg.getBoundingClientRect();
    const viewH = window.innerHeight;

    // 0 = window just appearing at bottom, 1 = window just leaving top
    const progress = 1 - (rect.bottom / (viewH + rect.height));
    const clamped = Math.max(0, Math.min(1, progress));

    // travel = the extra height we gave the image (40% of container)
    const travel = windowImg.offsetHeight * 0.30;
    parallaxImg.style.transform = `translateY(${clamped * travel}px)`;
  };

  window.addEventListener('scroll', updateParallax, { passive: true });
  window.addEventListener('resize', updateParallax);
  updateParallax();
}



// Home Page CTA Button (touch press effect + delayed navigation)
const homeCta = document.getElementById('home-cta');
if (homeCta) {
  const ctaBtn = homeCta.querySelector('.btn');

  homeCta.addEventListener('touchstart', function() {
    homeCta.classList.add('pressed');
  }, { passive: true });

  homeCta.addEventListener('touchend', function() {
    homeCta.classList.remove('pressed');
  });

  ctaBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const url = this.href;
    setTimeout(() => {
      window.location.href = url;
    }, 500);
  });
}



// Button Click Delay
document.addEventListener("DOMContentLoaded", function () {

  const link = document.getElementById("delayedLink");

  link.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation(); // important for mobile

    const destination = this.getAttribute("href");

    this.textContent = "Opening...";
    this.style.pointerEvents = "none";

    setTimeout(() => {
      window.location.href = destination;
    }, 800);
  });

});