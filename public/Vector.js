function createVector(x,y) {
    return new Vector(x,y);
}

class Vector {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
    }

    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
    }

    mult(scl) {
        this.x *= scl;
        this.y *= scl;
    }

    div(scl) {
        if(scl != 0) {
            this.x / scl;
            this.y / scl;
        } else {
            console.log("YOU SHALL NOT DIVIDE BY ZERO!!");
        }
    }

    mag() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y,2));
    }

    normalize() {
        let len = this.mag();
        if(len != 0) this.mult(1/len);
        return this.mag();
    }

    heading() {
        return Math.atan2(this.y, this.x);

    }
}