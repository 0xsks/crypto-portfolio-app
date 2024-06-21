const canvas = document.getElementById('bitcoinCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const coins = [];
const numberOfCoins = 50; // Adjust number of coins here

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
}

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
  requestAnimationFrame(animate);
}

init();
animate();