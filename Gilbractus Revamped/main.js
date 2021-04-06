const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.65;
canvas.height = canvas.width * 0.55;

let width = canvas.width;
let height = canvas.height;
let scl = width / 10;

let p = new Player(scl, width/2,height/2);

let z = new Zombie(scl, 10,10);

function init() {

}
init();


function animate() {
    ctx.fillStyle = 'rgb(120,120,120)';
    ctx.fillRect(0,0,width,height);

    p.display(ctx);
    p.update();

    z.display();
    z.update();
    z.seek(createVector(p.pos.x,p.pos.y));


    requestAnimationFrame(animate);
}
animate();

