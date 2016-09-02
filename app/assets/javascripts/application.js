// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require bootstrap-sprockets






var gui = new dat.GUI(),
  canvas = document.querySelector("canvas"),
  canvas_m = document.querySelector(".c2"),
  ctx = canvas.getContext("2d"),
  ctx_m = canvas_m.getContext("2d"),
  width = 0,
  height = 0,
  particles = [],
  particles = [],
  particlePool = null,
  config = {
    minDropSize: 2,
    maxDropSize: 5,
    windForce: 10,
    particlesPerSplash: 2,
    dropsPerInterval: 10,
    dropInterval: 100,
    numParticles: 1000
  };

gui.add(config, 'minDropSize', 0, 10);
gui.add(config, 'maxDropSize', 0, 10);
gui.add(config, 'windForce', -100, 100);
gui.add(config, 'particlesPerSplash', 0, 10).step(1);
gui.add(config, 'dropsPerInterval', 0, 10).step(1);
gui.add(config, 'dropInterval', 0, 100);
gui.add(config, 'numParticles', 0, 10000);

var Context = function(ctxs) {
  this.contexts = ctxs;
  this.fillStyle = "#FFF";
};

Context.prototype.proxy = function(f, args) {

  var _this = this;

  this.contexts.forEach(function(ctx, i, array) {

    if (_this.fillStyle) {
      ctx.fillStyle = _this.fillStyle;
    }

    ctx[f].bind(ctx).apply(ctx, args);
  });
};

Context.prototype.clearRect = function(x, y, w, h) {
  this.proxy("clearRect", arguments);
}

Context.prototype.fillRect = function(x, y, w, h) {
  this.proxy("fillRect", arguments);
}

var contexts = new Context([ctx, ctx_m]);

var resize = (function(event) {
  width  = canvas.width  = window.innerWidth;
  height = canvas.height = window.innerHeight;

  canvas_m.width = width;
  canvas_m.height = height;

})();

window.addEventListener("resize", resize);

// Vector
var Vector = function(x, y) {
  this.x = x;
  this.y = y;
}

// Particle
var Particle = function(x, y, size, velocity) {
  this.x = x;
  this.y = y;
  this.size = size || 5;
  this.id = ++Particle.id;
  this.velocity = velocity || new Vector(0, 0);
};

Particle.id = 0;

Particle.prototype.render = function(ctx) {
  ctx.fillStyle = "rgba(128,255,255,.8)";
  ctx.fillRect(this.x, this.y, this.size, this.size);

  return this;
}

Particle.prototype.splash = function(n) {
  times(n, function(i) {

      var p = particlePool.getParticle(false);

      if (p) {

        p.velocity.x = Math.randomRange(-100, 100);
        p.velocity.y = Math.randomRange(-4, -1);
        p.x = this.x;
        p.y = height - 1;
        p.size = this.size / 2;
        p.splashing = true;
        particles.push(p);

      }

  }, this);
}

Particle.prototype.reset = function() {
  this.velocity.x = this.velocity.y = 0;
  this.x = Math.randomRange(-300, width + 0);
  this.y = -100;
  this.size = Math.randomRange(config.minDropSize, config.maxDropSize);
  this.splashing = false;

  return this;
}

Particle.prototype.isOutOfBounds = function() {
  return (this.x > width + 0 || this.x < -300 || this.y > height);
}

Particle.prototype.update = function(dt) {
  var g = (dt/1000) * 9.8 * (this.size / 2);

  this.velocity.y += g;
  this.velocity.x = config.windForce * g;

  this.y += this.velocity.y;
  this.x += this.velocity.x;

  return this;
}

// Particle Pool
var Pool = function(amount) {
  this.particles = [];
  while(amount--) this.storeParticle(this.createParticle());
}

Pool.prototype.getParticle = function(createNewIfNeeded) {

  var createNew = createNewIfNeeded || false;

  if (this.particles.length) {
    return this.particles.pop().reset();
  } else if (createNew || (this.particles.length + particles.length < config.numParticles) ) {
   return this.createParticle().reset();
  } else
    return false;
}

Pool.prototype.storeParticle = function(p) {
  this.particles.push(p);
  return p;
}

Pool.prototype.createParticle = function() {
  var p = new Particle(0, 0);
  return p;
}

Pool.prototype.isAvailable = function() {
  return (this.particles.length || this.increase);
}

particlePool = new Pool(config.numParticles, false);

var delta = 0,
    old_t = 0,
    new_t = 0;

var num_particles = config.numParticles;

var dropTimer = 0;

var update = function(time) {

  contexts.clearRect(0, 0, canvas.width, canvas.height);

  new_t = time;

  old_t ? delta = new_t - old_t : delta = new_t;

  dropTimer += delta;
  if (dropTimer >= config.dropInterval) {
    dropTimer = 0;
    times(config.dropsPerInterval, function() {

      if (particlePool.isAvailable()) particles.push(particlePool.getParticle());

    });
  }

  particles.forEach(function (particle, i, array) {
    particle.update(delta);
    particle.render(contexts);

    if (particle.isOutOfBounds()) {
      if (!particle.splashing) particle.splash(config.particlesPerSplash);
      particlePool.storeParticle(particle);
      array.splice(i, 1);
    }
  });

  ctx.fillStyle = "#FFFFFF";
  ctx.font="12px Arial";
  ctx.fillText("number of particles left in pool: " + particlePool.particles.length, 10, 50);

  ctx.fillText("total number of particles: " + particles.length + particlePool.particles.length, 10, 80);

  ctx.fillText("active particles: " + particles.length, 10, 110);

  window.requestAnimationFrame(update);

  old_t = new_t;
}

var times = function(n, f, c) {
  if (!c) {
    c = this;
  }
  while(n--) f.call(c, n);
}

Math.randomRange = function(min, max) {
  return Math.random() * (max - min) + min;
}

window.requestAnimationFrame(update);
