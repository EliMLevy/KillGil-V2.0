class Player {
    constructor(scl, x, y) {
        this.scl = scl;
        this.pos = createVector(x, y);
        this.angle = 0;
        this.speed = 5;
        this.initControls();
    }

    display(ctx) {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle);

        ctx.fillStyle = 'black';
        ctx.fillRect(0, this.scl * -0.25, this.scl * 0.4, this.scl * 0.15);
        ctx.fillRect(0, this.scl * 0.25, this.scl * 0.4, this.scl * -0.15);

        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(0, 0, this.scl * 0.25, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    update() {

        let mouse = createVector(mouseX, mouseY);
        mouse.sub(this.pos);

        this.angle = mouse.heading();
        // console.log(this.angle);

        if(this.left)
            this.pos.x-=this.speed ;
        if(this.right)
            this.pos.x+=this.speed ;
        if(this.up)
            this.pos.y-=this.speed ;
        if(this.down)
            this.pos.y+=this.speed ;

        if(this.pos.x > width) {
            this.pos.x = width;
        }
        if(this.pos.x < 0) {
            this.pos.x = 0;
        }
        if(this.pos.y > height) {
            this.pos.y = height;
        }
        if(this.pos.y < 0) {
            this.pos.y = 0;
        }


    }

    initControls(){
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        window.addEventListener('keydown', (e) => {
            if(e.key == 'w') {
                this.up = true;
            }
            if(e.key == 's') {
                this.down = true;
            }
            if(e.key == 'a') {
                this.left = true;
            } 
            if(e.key == 'd') {
                this.right = true;
            }
        })

        window.addEventListener('keyup', (e) => {
            if(e.key == 'w') {
                this.up = false;
            }
            if(e.key == 's') {
                this.down = false;
            }
            if(e.key == 'a') {
                this.left = false;
            } 
            if(e.key == 'd') {
                this.right = false;
            }
        })

    }
}