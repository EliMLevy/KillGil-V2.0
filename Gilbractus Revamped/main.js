//Main game canvas setup
const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.55;
canvas.height = canvas.width * 0.55;

let width = canvas.width;
let height = canvas.height;

//Main canvas bounding rect to position the side canvas
const canvasBoundingRect = canvas.getBoundingClientRect();

//Sidebar player status canvas setup
const PScanvas = document.getElementById('player-status');
const PSctx = PScanvas.getContext('2d');

PScanvas.width = window.innerWidth * 0.15;
PScanvas.height = canvas.height;



//Set up scale for different size screens
let scl = width / 10;

//Set up the player and his weapon
let p = new Player(scl * 0.75, width/2,height/2);
let g = new Gun(scl / 2);
p.addWeapon(g);

let zombies = [];

function init() {
    //Initialize zombies
    for(let i = 0; i < 1; i++) {
        zombies.push(new Zombie(scl * 0.75, Math.random() * width, Math.random() * height));
    }
}
init();


function animate() {
    
    //Background
    ctx.fillStyle = 'rgb(120,120,120)';
    ctx.fillRect(0,0,width,height);
    
    drawStatusBar(scl, p);

    //Player animation
    p.display(ctx);
    p.update();
    
    //Zombie animation
    for (let i = zombies.length - 1; i >= 0; i--) {
        const z = zombies[i];
        
        //check if he is still alive
        if(z.dead) {
            zombies.splice(i,1);
        }


        z.display();
        z.update();

        //Player seeking behavior 
        // @TODO add probabilistic steering to navigate around boundaries 
        if(z.seek(createVector(p.pos.x,p.pos.y))) {
            p.health -= z.damage;
        } 

        //Anti clumping behavior
        for (let j = 0; j < zombies.length; j++) {
            const other = zombies[j];
            z.avoid(createVector(other.pos.x,other.pos.y));
        }

        //Check for bullet collisions
        for (let j = p.weapon.bullets.length - 1; j >= 0; j--) {
            const b = p.weapon.bullets[j];
            if(z.hitBy(b)) {
                p.weapon.bullets.splice(j,1);
            }
        }
    }

    requestAnimationFrame(animate);
}
animate();

