class Vector {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }

  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }
}
