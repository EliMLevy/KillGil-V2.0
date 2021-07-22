function createVector (x, y) {
  return new Vector(x, y)
}

class Vector {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  add (other) {
    this.x += other.x
    this.y += other.y
  }

  sub (other) {
    this.x -= other.x
    this.y -= other.y
  }

  mult (scl) {
    this.x *= scl
    this.y *= scl
  }

  div (scl) {
    if (scl !== 0) {
      this.x /= scl
      this.y /= scl
    } else {
      console.log('YOU SHALL NOT DIVIDE BY ZERO!!')
    }
  }

  mag () {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }

  normalize () {
    const len = this.mag()
    if (len !== 0) this.mult(1 / len)
    return this.mag()
  }

  heading () {
    return Math.atan2(this.y, this.x)
  }

  rotate (angle) {
    /*
        rotation matrix
        cos(a) -sin(a)
        sin(a) cos(a)
        */
    const tempX = this.x
    const tempY = this.y
    this.x = tempX * Math.cos(angle) + tempY * -Math.sin(angle)
    this.y = tempX * Math.sin(angle) + tempY * Math.cos(angle)
  }
}
