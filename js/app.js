const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Star {
  constructor(radius, x, y) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.velocityX = 0;
    this.velocityY = 0;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.shadowColor = "white";
    ctx.shadowBlur = this.radius * 2;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    this.draw();
    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.x <= 0) {
      this.x = canvas.width - 10;
    }

    if (this.y <= 0) {
      this.y = canvas.height - 10;
    }

    if (this.x >= canvas.width) {
      this.x = 10;
    }
    if (this.y >= canvas.height) {
      this.y = 10;
    }
  }
}

var starsFront = [];
var starsMid = [];
var starsBack = [];

window.addEventListener("mousemove", function (e) {
  let x = e.clientX,
    y = e.clientY;

  let radian = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
  let cos = Math.cos(radian);
  let sin = Math.sin(radian);

  starsFront.forEach((element) => {
    element.velocityX = cos * 14 * -1;
    element.velocityY = sin * 14 * -1;
  });

  starsMid.forEach((element) => {
    element.velocityX = cos * 12 * -1;
    element.velocityY = sin * 12 * -1;
  });

  starsBack.forEach((element) => {
    element.velocityX = cos * 10 * -1;
    element.velocityY = sin * 10 * -1;
  });
});

for (let i = 0; i < 20; i++) {
  starsFront.push(
    new Star(
      getRandomNumberBetween(6, 10),
      Math.random() * innerWidth,
      Math.random() * innerHeight
    )
  );
}

for (let i = 0; i < 45; i++) {
  starsMid.push(
    new Star(
      getRandomNumberBetween(4, 6),
      Math.random() * innerWidth,
      Math.random() * innerHeight
    )
  );
}

for (let i = 0; i < 70; i++) {
  starsBack.push(
    new Star(
      getRandomNumberBetween(2, 4),
      Math.random() * innerWidth,
      Math.random() * innerHeight
    )
  );
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  starsFront.forEach((element) => {
    element.update();
  });
  starsMid.forEach((element) => {
    element.update();
  });
  starsBack.forEach((element) => {
    element.update();
  });
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
