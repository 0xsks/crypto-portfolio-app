const canvas = document.getElementById('bitcoinCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const coins = [];
const numberOfCoins = 50; // Adjust number of coins here

// Load explosion sounds
const explosionSounds = [
  new Audio('exp.mp3'),
  new Audio('exp.mp3'),
  new Audio('exp.mp3')
];
let currentSound = 0;

function playExplosionSound() {
  explosionSounds[currentSound].play();
  currentSound = (currentSound + 1) % explosionSounds.length; // Cycle through the sounds
}

class Coin {
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.width = 5; // Width of the candlestick
    this.height = Math.random() * 20 + 10; // Height of the candlestick
    this.speed = Math.random() * 3 + 1; // Falling speed
  }
  update(){
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = 0 - this.height;
      this.x = Math.random() * canvas.width;
      this.speed = Math.random() * 3 + 1;
    }
  }
  draw(){
    ctx.fillStyle = '#00FF00'; // Green color for candlesticks
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  
  isClicked(mx, my) {
    const hitboxPadding = 10; // Increase this value to make the hitbox larger
    return mx >= this.x - hitboxPadding && mx <= this.x + this.width + hitboxPadding &&
           my >= this.y - hitboxPadding && my <= this.y + this.height + hitboxPadding;
  }
}

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 10; // Initial radius of the explosion
    this.maxRadius = 50; // Maximum radius of the explosion
    this.opacity = 1; // Starting opacity
  }

  update() {
    if (this.radius < this.maxRadius) {
      this.radius += 2; // Speed of explosion expansion
      this.opacity -= 0.05; // Rate of fading
    } else {
      this.opacity = 0; // Ensures explosion disappears after reaching max size
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.restore();
  }

  isDone() {
    return this.opacity <= 0;
  }
}

const explosions = []; // Array to hold active explosions

function init(){
  for(let i = 0; i < numberOfCoins; i++){
    coins.push(new Coin());
  }
}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i = 0; i < coins.length; i++){
    coins[i].update();
    coins[i].draw();
  }
  for (let i = explosions.length - 1; i >= 0; i--) {
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].isDone()) {
      explosions.splice(i, 1);
    }
  }
  requestAnimationFrame(animate);
}

function handleMouseClick(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  
  for (let i = coins.length - 1; i >= 0; i--) {
    if (coins[i].isClicked(mouseX, mouseY)) {
      explosions.push(new Explosion(coins[i].x + coins[i].width / 2, coins[i].y + coins[i].height / 2));
      coins.splice(i, 1); // Remove the coin
      playExplosionSound(); // Play explosion sound using the new function
      break; // Stop checking after the first coin is found and removed
    }
  }
}

canvas.addEventListener('click', handleMouseClick);

init();
animate();