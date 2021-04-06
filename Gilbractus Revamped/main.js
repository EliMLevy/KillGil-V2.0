const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.65;
canvas.height = canvas.width * 0.55;

let width = canvas.width;
let height = canvas.height;
let scl = width / 10;

let p = new Player(scl * 0.75, width/2,height/2);
let g = new Gun(scl / 2);
p.addWeapon(g);
console.log(p.weapon);

// let z = new Zombie(scl * 0.75, 10,10);

let zombies = [];

function init() {
    for(let i = 0; i < 0; i++) {
        zombies.push(new Zombie(scl * 0.75, Math.random() * width, Math.random() * height));
    }
}
init();


function animate() {
    ctx.fillStyle = 'rgb(120,120,120)';
    ctx.fillRect(0,0,width,height);

    p.display(ctx);
    p.update();

    
    zombies.forEach( z => {
        
        
    })
    
    for (let i = 0; i < zombies.length; i++) {
        const z = zombies[i];
        z.display();
        z.update();
        z.seek(createVector(p.pos.x,p.pos.y));
        for (let j = 0; j < zombies.length; j++) {
            const other = zombies[j];
            z.avoid(createVector(other.pos.x,other.pos.y));
            
        }
    }

    requestAnimationFrame(animate);
}
animate();

