const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let width = canvas.width;
let height = canvas.height;

let gravity = createVector(0,0.1);

class Emitter {
    constructor(x,y) {
        this.pos = createVector(x,y);
        this.particles = [];
        for (let i = 0; i < 50; i++) {
            this.particles.push(new Particle(this.pos.x,this.pos.y,createVector(Math.random() * 2 - 1,Math.random() * 2 - 1)));
            
        }
    }

    update() {
        // this.particles.forEach(p => {
        //     p.update();
        //     p.applyForce(gravity);
        //     if(p.pos.y > height) {
        //         this.particles.splice(p,1);
        //     }
        // })

        for(let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.update();
            p.applyForce(gravity);
            if(p.pos.y > height) {
                this.particles.splice(i,1);
            }
        }

        while(this.particles.length < 50) {
            this.particles.push(new Particle(this.pos.x,this.pos.y,createVector(Math.random() * 2 - 1,Math.random() * 2 - 1)));
        }
    }

    display() {
        
        this.particles.forEach(p => {
            p.display();
        })
        // ctx.fillStyle = 'rgb(0,0,0)';
        // ctx.beginPath();
        // ctx.arc(this.pos.x,this.pos.y,50,0, 2 * Math.PI);
        // ctx.closePath();
        // ctx.fill();

        
    }


}

class Particle {
    constructor(x,y,dir) {
        this.pos = createVector(x,y);
        this.vel = createVector(dir.x,dir.y);
        this.vel.mult(Math.random() * 20);
        this.acc = createVector(0,0);
    }

    display() {
        ctx.fillStyle = 'rgb(255,0,0)';
        ctx.beginPath();
        ctx.arc(this.pos.x,this.pos.y,10,0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        // console.log('displaying particle')
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        // this.acc.mult(0);
    }

    applyForce(force) {
        this.acc.add(force);
    }
}

let e = new Emitter(width/2,height/2);
function animate() {
    ctx.fillStyle = 'rgba(255,255,255)';
    ctx.fillRect(0,0,width,height)
    e.update();
    e.display();



    requestAnimationFrame(animate);
}

animate();