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
let p = new Player(scl * 0.75, width / 2, height / 2);
let g = new Gun(scl / 2);
p.addWeapon(g);

let currentRoom = createVector(2, 2); //The indices of the starting room in the map

let zombies = [];
wallThickness = scl * 0.7;

function init() {
    //Initialize zombies
    for (let i = 0; i < 1; i++) {
        zombies.push(new Zombie(scl * 0.75, Math.random() * (width - wallThickness * 2) + wallThickness, Math.random() *  (height - wallThickness * 2) + wallThickness));
    }
}
init();

function initRoom(num) {
    zombies = [];
    if(num == 1) {
        for (let i = 0; i < 10; i++) {
            zombies.push(new Zombie(scl * 0.75, Math.random() * (width - wallThickness * 2) + wallThickness, Math.random() *  (height - wallThickness * 2) + wallThickness));
        }
    }
    if(num == 2) {
        for (let i = 0; i < 10; i++) {
            zombies.push(new Zombie(scl * 0.75, Math.random() * (width - wallThickness * 2) + wallThickness, Math.random() *  (height - wallThickness * 2) + wallThickness));
        }
    }
    if(num == 3) {
        for (let i = 0; i < 10; i++) {
            zombies.push(new Zombie(scl * 0.75, Math.random() * (width - wallThickness * 2) + wallThickness, Math.random() *  (height - wallThickness * 2) + wallThickness));
        }
    }
    if(num == 4) {
        for (let i = 0; i < 10; i++) {
            zombies.push(new Zombie(scl * 0.75, Math.random() * (width - wallThickness * 2) + wallThickness, Math.random() *  (height - wallThickness * 2) + wallThickness));
        }
    }
}


function animate() {


    // drawRoom(ctx,currentRoom);
    room0(ctx);

    drawStatusBar(scl, p);


    //Player animation
    p.display(ctx);
    p.update();
    if(p.entering) {
        if(p.pos.x < wallThickness + 5 && p.pos.y > height/2 - scl/3 && p.pos.y < height/2 + scl/3) {
        }
        
        if(p.pos.y > height/2 - scl/3 && p.pos.y < height/2 + scl/3) { //Going left or right
            if(p.pos.x < wallThickness + 5) {
                currentRoom.x--;
                initRoom(rooms[currentRoom.y][currentRoom.x]);
                p.pos.x = width - wallThickness - 5;
            }

            if(p.pos.x > width - wallThickness - 5) {
                currentRoom.x++;
                initRoom(rooms[currentRoom.y][currentRoom.x]);
                p.pos.x = wallThickness + 5;
            }
        }

        if(p.pos.x > width/2 - scl/3 && p.pos.x < width/2 + scl/3) { //Going up or down
            if(p.pos.y < wallThickness + 5) {
                currentRoom.y--;
                initRoom(rooms[currentRoom.y][currentRoom.x]);
                p.pos.y = height - wallThickness - 5;
                console.log(rooms[currentRoom.y][currentRoom.x]);
            }

            if(p.pos.y > height - wallThickness - 5) {
                currentRoom.y++;
                initRoom(rooms[currentRoom.y][currentRoom.x]);
                p.pos.y = wallThickness + 5;
            }
        }
    }

    //Zombie animation
    for (let i = zombies.length - 1; i >= 0; i--) {
        const z = zombies[i];

        //check if he is still alive
        if (z.dead) {
            zombies.splice(i, 1);
        }


        z.display();
        z.update();

        //Player seeking behavior 
        // @TODO add probabilistic steering to navigate around boundaries 
        if (z.seek(createVector(p.pos.x, p.pos.y))) {
            p.health -= z.damage * (1 - p.armor);
        }

        //Anti clumping behavior
        for (let j = 0; j < zombies.length; j++) {
            const other = zombies[j];
            z.avoid(createVector(other.pos.x, other.pos.y));
        }

        //Check for bullet collisions
        for (let j = p.weapon.bullets.length - 1; j >= 0; j--) {
            const b = p.weapon.bullets[j];
            if (z.hitBy(b)) {
                p.weapon.bullets.splice(j, 1);
            }
        }
    }

    requestAnimationFrame(animate);
}
animate();



