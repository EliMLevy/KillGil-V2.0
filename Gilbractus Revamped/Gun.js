class Gun {
    constructor(scl) {
        this.pos;
        this.angle;

        this.bullets = []; //These are the fired bullets
        this.maxAmmo = 50;
        this.ammoCount = this.maxAmmo; //Ammo avaliable
        this.reloadTime = 10;
        this.reloading = false;
        this.BPS = 5; //Cooldown between shots
        this.timer = -1; //used for fire and reload cooldown
        this.scl = scl;

        this.spray = 3; //The magnatude of the innaccuracy of the gun
    }

    display(ctx, x, y, angle) { //Displaying the gun relative to the player that is using it
        this.pos = createVector(x, y);
        this.angle = angle;

        //Displaying all fired bullets
        for (let i = 0; i < this.bullets.length; i++) {
            let b = this.bullets[i];
            b.display(ctx);
        }

        ctx.save(); //Push the matrix

        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;

        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle);

        //Gun body
        ctx.fillRect(0, 0, this.scl * 0.8, this.scl * 0.2);
        ctx.strokeRect(0, 0, this.scl * 0.8, this.scl * 0.2);
        //Gun end
        ctx.fillRect(this.scl * 0.8, this.scl * 0.05, this.scl * 0.1, this.scl * 0.1);
        ctx.strokeRect(this.scl * 0.8, this.scl * 0.05, this.scl * 0.1, this.scl * 0.1);

        ctx.restore(); //Pop matrix


        //Draw ammo indicator around mouse
        ctx.beginPath();
        ctx.arc(mouseX,mouseY,scl / 6,0,map(this.ammoCount,0,this.maxAmmo,0,2 * Math.PI),false); 
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'black'
        ctx.stroke();
        ctx.lineWidth = 1;



    }

    update() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            let b = this.bullets[i];
            b.update();
            if (b.pos.x > width ||
                b.pos.x < 0 ||
                b.pos.y > height ||
                b.pos.v < 0) {
                this.bullets.splice(i, 1);
            }
        }
        if (this.timer >= -1) {
            this.timer--;
            if(this.reloading) {
                this.ammoCount = map(this.timer, this.reloadTime, 0,0, this.maxAmmo);
                // console.log('reloading');
            }
        } else if (this.reloading) {
            this.ammoCount = this.maxAmmo;
            this.reloading = false;
        }
    }

    fire() {
        if (this.timer < 0 && this.ammoCount > 0 && !this.reloading) {
            //Location where the bullet gets initialized
            let gunEnd = createVector(this.pos.x + Math.cos(this.angle + 0.1) * this.scl,
                this.pos.y + Math.sin(this.angle + 0.1) * this.scl);

            //Direction of the bullet
            let bulletVel = createVector(Math.cos(this.angle), Math.sin(this.angle));
            bulletVel.normalize();
            bulletVel.mult(10);
            //Incorporate a left or right leaning of the bullet
            let lean = createVector(Math.cos(this.angle + ((Math.random() * Math.PI / 2) - Math.PI / 4)),Math.sin(this.angle + ((Math.random() * Math.PI / 2) - Math.PI / 4)))
            lean.mult(this.spray);
            bulletVel.add(lean);
            //TODO incoporate the velocity of the player into the velocity of the bullets

            this.bullets.push(new Bullet(this.scl, gunEnd.x, gunEnd.y, bulletVel));
            this.timer = this.BPS; //Reset cooldown timer
            this.ammoCount--;
        }
    }

    reload() {
        this.timer = this.reloadTime;
        this.reloading = true;
    }



}

class Bullet {
    constructor(scl, x, y, vel) {
        this.pos = createVector(x, y);
        this.vel = vel;
        this.scl = scl;
        this.damage = 5;
    }

    display(ctx) {
        ctx.fillStyle = 'black';

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.scl * 0.1, 0, 2 * Math.PI);
        ctx.closePath();

        ctx.fill();
    }

    update() {
        this.pos.add(this.vel);
    }
}