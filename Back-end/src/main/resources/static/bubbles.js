const canvas = document.getElementById('bubble-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bubblesArray = [];

class Bubble {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.x = initial ? Math.random() * canvas.width : (Math.random() < 0.5 ? 0 : canvas.width);
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 20 + 10;
    this.vx = (Math.random() - 0.5) * 0.3;  // gentler horizontal drift
    this.vy = (Math.random() - 0.5) * 0.3;  // gentler vertical drift    
    this.alpha = Math.random() * 0.3 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.vx *= -1;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.vy *= -1;
    }
  }

  draw() {
    const gradient = ctx.createRadialGradient(
      this.x, this.y, this.radius * 0.3,
      this.x, this.y, this.radius
    );
  
    gradient.addColorStop(0, `rgba(102, 248, 231, ${this.alpha})`);
    gradient.addColorStop(0.4, `rgba(255, 255, 255, ${this.alpha * 0.3})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
  
    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  
}

function initBubbles(count) {
  bubblesArray = [];
  for (let i = 0; i < count; i++) {
    bubblesArray.push(new Bubble());
  }
}

function animateBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let bubble of bubblesArray) {
    bubble.update();
    bubble.draw();
  }

  requestAnimationFrame(animateBubbles);
}

initBubbles(100);
animateBubbles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initBubbles(100);
});
