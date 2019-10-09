const canvas = document.querySelector("#canvas");
const c = canvas.getContext("2d");
let _w = canvas.width = window.innerWidth;
let _h = canvas.height = window.innerHeight;

let vel = new Vector(0, -10);

let fireworks = [];

function animate() {
  c.clearRect(0, 0, _w, _h);

  if(Math.random() < 1) {
    fireworks.push(new Firework(random(_w), _h, 5, new Vector(0, random(-15, -20))));
  }

  for(let i=0; i<fireworks.length; ++i) {
    fireworks[i].render();

    if(fireworks[i].hasExploded) {
      fireworks.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("click", () => {
  setTimeout(animate, 2000);
});
