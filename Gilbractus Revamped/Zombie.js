class Zombie {
    constructor(scl, x, y) {
        this.scl = scl;
        this.pos = createVector(x, y);
        this.angle = 0;

        this.vel = createVector(0, 0);
        this.maxSpeed = this.scl * 0.05;
    }

    display() {
        ctx.save(); //Push the matrix

        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle);

        ctx.fillStyle = 'black';

        //Arms
        ctx.fillRect(0, this.scl * -0.25, this.scl * 0.4, this.scl * 0.15);
        ctx.fillRect(0, this.scl * 0.25, this.scl * 0.4, this.scl * -0.15);

        ctx.fillStyle = 'green';

        //Head
        ctx.beginPath();
        ctx.arc(0, 0, this.scl * 0.25, 0, Math.PI * 2);
        ctx.closePath();
        
        ctx.fill();
        
        ctx.restore(); //Pop the matrix
    }

    update() {
        this.pos.add(this.vel);
        this.vel.mult(0); //Zero the velocity becuase the streering and avoiding behaviors are additive

    }

    seek(target) {
        let dir = target;
        dir.sub(this.pos); //Vector pointing from Zombie to target

        this.angle = dir.heading(); //Face the target

        let d = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2));

        dir.normalize();
        dir.mult(this.maxSpeed);

        if (d > this.scl / 2) {
            this.vel.add(dir);
        }

    }

    avoid(target) {
        let dir = target;
        dir.sub(this.pos);
        dir.mult(-1); //Vector pointing away from target

        let d = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2));

        dir.normalize();
        dir.mult(map(d, this.scl, 0, 0, this.maxSpeed)); //Magnitude of dir is proportional to distance to target

        if (d < this.scl / 1.2) {
            this.vel.add(dir);
        } 
    }
}

function map(x, min, max, newMin, newMax) {
    let slope = (newMax - newMin) / (max - min);
    output = newMin + slope * (x - min)
    return output;
}