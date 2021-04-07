class Player {
    constructor(scl, x, y) {
        this.scl = scl;
        this.pos = createVector(x, y);
        this.angle = 0;

        this.speed = this.scl * 0.1;

        this.initControls();

        this.weapon;
        this.shooting = false;

        this.armor = 0.01;

        this.health = 100;
    }

    display(ctx) {

        ctx.save(); //Push the matrix

        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle);

        ctx.fillStyle = 'black';

        //Arms
        ctx.fillRect(0, this.scl * -0.25, this.scl * 0.4, this.scl * 0.15);
        ctx.fillRect(0, this.scl * 0.25, this.scl * 0.4, this.scl * -0.15);

        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'rgb(0,0,255)';

        //Head
        ctx.beginPath();
        ctx.arc(0, 0, this.scl * 0.25, 0, Math.PI * 2);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();

        ctx.restore(); //Pop the matrix

        if (this.weapon != undefined) {
            this.weapon.display(ctx, this.pos.x + Math.cos(this.angle + 0.3) * this.scl * 0.2, this.pos.y + Math.sin(this.angle + 0.3) * this.scl * 0.2, this.angle);

        }

    }

    update() {
        //Turn towards the mouse
        let mouse = createVector(mouseX, mouseY);
        mouse.sub(this.pos);
        this.angle = mouse.heading();

        //These variables are initialized in the init()
        if (this.left)
            this.pos.x -= this.speed;
        if (this.right)
            this.pos.x += this.speed;
        if (this.up)
            this.pos.y -= this.speed;
        if (this.down)
            this.pos.y += this.speed;

        //Constrain pos to the canvas
        if (this.pos.x > width) 
            this.pos.x = width;
        if (this.pos.x < 0) 
            this.pos.x = 0;
        if (this.pos.y > height) 
            this.pos.y = height;
        if (this.pos.y < 0) 
            this.pos.y = 0;


        if (this.weapon) {
            this.weapon.update();
            if (this.shooting) { 
                this.weapon.fire();
            }
        }


    }

    initControls() {
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        window.addEventListener('keydown', (e) => {
            if (e.key == 'w') {
                this.up = true;
            }
            if (e.key == 's') {
                this.down = true;
            }
            if (e.key == 'a') {
                this.left = true;
            }
            if (e.key == 'd') {
                this.right = true;
            }
        })

        window.addEventListener('keyup', (e) => {
            if (e.key == 'w') {
                this.up = false;
            }
            if (e.key == 's') {
                this.down = false;
            }
            if (e.key == 'a') {
                this.left = false;
            }
            if (e.key == 'd') {
                this.right = false;
            }
            if(e.key == ' ') {
                this.weapon.reload();
                console.log('reload triggered');
            }
        })

        window.addEventListener('mousedown', e => {
            this.shooting = true;
        })

        window.addEventListener('mouseup', (e) => {
            this.shooting = false;
        })
    }

    addWeapon(weapon) {
        this.weapon = weapon;
    }
}