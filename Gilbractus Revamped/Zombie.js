class Zombie {
    constructor(scl, x, y) {
        this.scl = scl;
        this.pos = createVector(x, y);
        this.angle = 0;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = this.scl * 0.15;
    }

    display() {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle);

        ctx.fillStyle = 'black';
        ctx.fillRect(0, this.scl * -0.25, this.scl * 0.4, this.scl * 0.15);
        ctx.fillRect(0, this.scl * 0.25, this.scl * 0.4, this.scl * -0.15);

        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.arc(0, 0, this.scl * 0.25, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    update() {
        // this.vel.add(this.acc);
        // this.angle = this.vel.heading();
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.angle *= 0;
        this.vel.mult(0);
    }

    seek(target) {
        let dir = target;
        dir.sub(this.pos);

        this.angle += dir.heading();
        let d = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2));
        dir.normalize();
        dir.mult(this.maxSpeed);
        if (d > this.scl / 2) {
            this.vel.add(dir);
        } else {
            this.vel.mult(0);
        }

    }

    avoid(target) {
        let dir = target;
        dir.sub(this.pos);
        dir.mult(-1);

        // this.angle += dir.heading();

        let d = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2));

        dir.normalize();
        dir.mult(map(d, this.scl, 0, 0, this.maxSpeed));

        if (d < this.scl / 1.2) {
            this.vel.add(dir);
        } else {
            // this.vel.mult(0);
        }
    }
}

function map(x, min, max, newMin, newMax) {
    let slope = (newMax - newMin) / (max - min);
    output = newMin + slope * (x - min)
    return output;
}