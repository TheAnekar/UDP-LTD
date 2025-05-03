// Carousel Logic
let track = document.getElementById('carouselTrack');
let position = 0;

function nextSlide() {
  if (position > -((track.children.length - 1) * 320)) {
    position -= 320;
    track.style.transform = `translateX(${position}px)`;
  }
}

function prevSlide() {
  if (position < 0) {
    position += 320;
    track.style.transform = `translateX(${position}px)`;
  }
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
