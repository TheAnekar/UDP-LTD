/// Circular Carousel Logic
const track = document.getElementById('carouselTrack');
const items = track.children;
const itemWidth = 320; // including margin
let currentIndex = 0;

function updateCarouselPosition() {
  const offset = -currentIndex * itemWidth;
  track.style.transform = `translateX(${offset}px)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarouselPosition();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarouselPosition();
}


// Countdown Timer
const countdown = document.getElementById('countdown');
const endTime = new Date();
endTime.setHours(endTime.getHours() + 5); // 5 hours from now

function updateCountdown() {
  const now = new Date();
  const diff = endTime - now;

  if (diff <= 0) {
    countdown.textContent = 'Offer expired!';
    return;
  }

  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdown.textContent = `${hours}h ${minutes}m ${seconds}s left`;
}

setInterval(updateCountdown, 1000);
