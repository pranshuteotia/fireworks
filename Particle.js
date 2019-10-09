class Particle {

  constructor(_x, _y, _r, _color, vel = new Vector(random(-4, 4), random(-4, 4))) {
    this.position = new Vector(_x, _y);
    this.velocity = vel;
    this.acceleration = new Vector(0, 0);
    this.radius = _r;
    this.color = _color;
    this.finished = false;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.multiply(0);

    if(this.position.y > _h) {
      this.finished = true;
    }
  }

  render() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
    c.fill();
    c.closePath();
    this.update();
  }

  apply_force(vector) {
    this.acceleration.add(vector);
  }

  get getPosition() {
    return this.position;
  }

  get getVelocity() {
    return this.velocity;
  }

  get getRadius() {
    return this.radius;
  }

  get hasFinished() {
    return this.finished;
  }
}

class Exploded_Particle extends Particle {
  constructor(_x, _y, _r, _color, vel = new Vel(random(-4, 4), random(-4, 4)), _range) {
    super(_x, _y, _r, hex_to_rgb(_color), vel);
    this.range = _range;
    this.start_range = 0;
    this.steps = 1/this.range;
    this.aplha = 1;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.multiply(0);
    this.start_range++;

    if(this.start_range === this.range) {
      this.finished = true;
    }
  }

  render() {
    c.beginPath();
    c.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.aplha})`;
    c.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
    c.fill();
    c.closePath();
    this.update();
  }

  fade(step) {
    c.beginPath();
    c.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.aplha-(step*this.steps)})`;
    c.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
    c.fill();
    c.closePath();
    this.update();
  }
}
