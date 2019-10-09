const COLORS2 = ["#273469", "#FAFAFF", "#E59500", "#840032", "#61E786", "#C97C5D", "#3454D1", "#D1345B", "#C98CA7", "#7FB069", "#FFFF82"];
const COLORS = ["#F4F9E9", "#89FC00", "#DC0073", "#00A1E4", "#EFCB68", "#FF0048", "#FF5400", "#FFFA00", "#88FF00", "#00F6FF"];

class Firework {
  constructor(_x, _y, _r, vel=new Vector(0, -2)) {
    this.particle_array = [];
    this.exploded = false;
    this.gravity = new Vector(0, 0.3);
    this.num_particles = random(30, 15);
    this.color = COLORS[random(COLORS.length)];
    this.starting_particle = new Particle(_x, _y, _r, this.color, vel);

    this.all_done = false;

    if(this.num_particles%2 != 0) {
      this.num_particles++;
    }

    this.theta = 360/this.num_particles;
  }

  update(particle) {
    particle.apply_force(this.gravity);
  }

  render() {
    if(!this.exploded) {
      this.starting_particle.render();
      this.update(this.starting_particle);

      if(this.starting_particle.getVelocity.y >= 0) {
        this.starting_particle.getVelocity.multiply(0);

        let r = random(5, 2);
        let x = this.starting_particle.getPosition.x;
        let y = this.starting_particle.getPosition.y;
        let particle_radius = this.starting_particle.getRadius/2;
        let c = this.starting_particle.color;

        if(Math.random() < 0.1) {
          this.make_heart(r, x, y, particle_radius, c);

        } else {
          this.default(r, x, y, particle_radius, c);
        }

        this.exploded = true;
      }

    } else {

      for(let particle of this.particle_array) {
        particle.render();
        // this.update(particle);
      }

      this.all_done = true;

      for(let particle of this.particle_array) {
        if(!particle.hasFinished) {
          this.all_done = false;
          break;
        }
      }

    }

  }

  get hasExploded() {
    return this.all_done;
  }

  make_heart(r, x, y, particle_radius, c) {
    let func_r_array = [];

    for(let t=0; t<=360; t+=5) {
      let aar = heart_funtion(deg_to_rad(t));
      func_r_array.push([aar, deg_to_rad(t)+Math.PI]);
      func_r_array.push([0.2*aar, deg_to_rad(t)+Math.PI]);
      func_r_array.push([0.4*aar, deg_to_rad(t)+Math.PI]);
      func_r_array.push([0.6*aar, deg_to_rad(t)+Math.PI]);
      func_r_array.push([0.8*aar, deg_to_rad(t)+Math.PI]);
    }

    for(let i=0; i<func_r_array.length; ++i) {
        let range = random(40, 30);
        let x_r = func_r_array[i][0] * Math.cos( func_r_array[i][1] );
        let y_r = func_r_array[i][0] * Math.sin( func_r_array[i][1] );
        let vel = new Vector(x_r, y_r);

        this.particle_array.push( new Exploded_Particle(x, y, particle_radius, c, vel, range) );
    }
  }

  default(r, x, y, particle_radius, c) {

    for(r; r>0; r-= 0.5) {
      for(let i=0; i<this.num_particles; ++i) {
        let range = random(30, 10);
        let vel = new Vector( r*Math.cos( deg_to_rad(i*this.theta) ), r*Math.sin( deg_to_rad(i*this.theta) ) );

        this.particle_array.push( new Exploded_Particle(x, y, particle_radius, c, vel, range) );
      }
    }

  }

}
