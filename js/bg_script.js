 const MOBILE_DEVICE_SCREEN_WIDTH = 690;
  const FULL_HD_DEVICE_SCREEN_WIDTH = 1920;
  const img = document.getElementById('img');

  class Director {

  _setup() {
  this._el = document.getElementById('main');
  this.rect = this._el.getBoundingClientRect();

  this.onMouseMove = this.onMouseMove.bind(this);
  this.onMouseLeave = this.onMouseLeave.bind(this);
  this.resize = this.resize.bind(this);

  this.isMobile = false;
  this.isFullHD = false;
  this.mobileFlagChanged = false;
  this.width = window.innerWidth;

  // base canvas settings
  this.canvasSetings = {
  startingX: 0,
  startingY: 0,
  baseSpeed: 0.0001,
  lineGroupsQuantity: 4,
  scale: [2, 3.1, 3.6, 2.5, 2.2, 3, 2.6, 4, 4.5, 5, 7, 8, 9, 10, 12],
  canvas: this._el.querySelector('#canvas'),
  mouseX: 0,
  mouseY: 0,
  mouseParallaxCoef: 3,
};


  // canvas desktop settings
  this.fullHDCanvasSettings = {
  count: 600,
  particleSizeY: 39,
  particleSizeX: 0.48,
  fatLineQuantity: 9,
  fatLineWidth: 15,
  fatLineHeight: 250,
  floatAmplitude: 10,
};

  // canvas desktop settings
  this.desktopCanvasSettings = {
  count: 400,
  particleSizeY: 30,
  particleSizeX: 0.4,
  fatLineQuantity: 8,
  fatLineWidth: 13,
  fatLineHeight: 200,
  floatAmplitude: 10,
};

  // canvas mobile settings
  this.mobileCanvasSettings = {
  count: 100,
  particleSizeY: 18,
  particleSizeX: 0.4,
  fatLineQuantity: 4,
  fatLineWidth: 7,
  fatLineHeight: 100,
  floatAmplitude: 0,
};

  // canvas init
  this._canvas = new Canvas(this.canvasSetings);
  if (this.updateMobileFlag(this.width)) {
  this.setCanvasSettings();
  this._canvas.setup();
  this.resize();
} else {
  this._canvas.setCanvasSize();
}
}

  resize() {
  this.width = window.innerWidth;

  if (this.updateMobileFlag(this.width)) {
  this.setCanvasSettings();
  this._canvas.setup();
} else {
  this._canvas.setCanvasSize();
}

  this._canvas.renderOnce();
}

  setCanvasSettings() {
  if (this.isMobile) {
  Object.assign(
  this.canvasSetings,
  this.mobileCanvasSettings,
  );
}

  if (this.isFullHD) {
  Object.assign(
  this.canvasSetings,
  this.fullHDCanvasSettings,
  );
}

  if (!this.isFullHD && !this.isMobile) {
  Object.assign(
  this.canvasSetings,
  this.desktopCanvasSettings,
  );
}
}

  updateMobileFlag(width) {
  const isMobile = width < MOBILE_DEVICE_SCREEN_WIDTH;
  const isFullHD = width > FULL_HD_DEVICE_SCREEN_WIDTH;

  if (isMobile !== this.isMobile) {
  this.isMobile = isMobile;

  return true;
}

  if (isFullHD !== this.isFullHD) {
  this.isFullHD = isFullHD;

  return true;
}

  if (!this.isFullHD && !this.isMobile) {
  return true;
}


  return false;
}

  addMouseMoveFloat() {
  this._el.addEventListener('mousemove', this.onMouseMove);
  this._el.addEventListener('mouseleave', this.onMouseLeave);
}

  removeMouseEventListener() {
  this._el.removeEventListener('mousemove', this.onMouseMove);
  this._el.removeEventListener('mouseleave', this.onMouseLeave);
}

  onMouseMove(e) {
  TweenLite.killTweensOf(this.canvasSetings);
  const { rect } = this;

  TweenLite.to(this.canvasSetings, 0.5, {
  mouseX: (e.clientX - rect.left) / rect.width - 0.5,
  mouseY: (e.clientY - rect.top) / rect.height - 0.5,
});
}

  onMouseLeave() {
  TweenLite.to(this.canvasSetings, 2, { mouseX: 0, mouseY: 0, delay: 0.5 });
}

  _activate() {
  window.addEventListener('resize', this.resize);
  if (!this.isMobile) {
  this._canvas.play();
  this.addMouseMoveFloat();
}
}

  _deactivate() {
  window.removeEventListener('resize', this.resize);
  this._canvas.pause();
  this.removeMouseEventListener();
}
}

  class Canvas {
  constructor(settings) {

  this.settings = settings;
  this.canvas = this.settings.canvas;
  this.context = this.canvas && this.canvas.getContext('2d');

  this.context.mozImageSmoothingEnabled = true;
  this.context.webkitImageSmoothingEnabled = true;
  this.context.msImageSmoothingEnabled = true;
  this.context.imageSmoothingEnabled = true;
  this.context.imageSmoothingQuality = 'high';
  this.particles = [];

  this.isPlaying = false;
  this.animationWorker = this.animationWorker.bind(this);
  this.startTime = null;
  this.drawTimer = null;
  this.renderingAllowed = false;
  this._doLoading();
}

  _doLoading() {
  this.renderingAllowed = true;
  TweenLite.fromTo(this.canvas, 1.5, { autoAlpha: 0 }, { autoAlpha: 1, delay: 1 });
  this.renderOnce();
  return Promise.resolve();
}

  play() {
  if (this.isPlaying) {
  return;
}

  this.isPlaying = true;
  this.startTime = performance.now();
  this.enqueueAnimation();
}

  pause() {
  this.isPlaying = false;
}

  setup() {
  if (!this.canvas)
  return;

  this.setCanvasSize(false);

  this.particles = [];

  const lineGroupCount = Math.round(this.settings.count / this.settings.lineGroupsQuantity);


  for (let i = 0; i < lineGroupCount; i++) {
  this.particles.push(new RectParticle1(this.settings));
}

  for (let i = 0; i < lineGroupCount; i++) {
  this.particles.push(new RectParticle2(this.settings));
}

  for (let i = 0; i < lineGroupCount; i++) {
  this.particles.push(new RectParticle3(this.settings));
}

  for (let i = 0; i < lineGroupCount; i++) {
  this.particles.push(new RectParticle4(this.settings));
}

  for (let i = 0; i < this.settings.fatLineQuantity; i++) {
  this.particles.push(new RectParticle5(this.settings));
}
}

  renderOnce() {
  if (this.isPlaying || !this.renderingAllowed)
  return;

  window.requestAnimationFrame(this.drawCanvas.bind(this));
}

  setCanvasSize(udpateParticles = true) {
  if (!this.canvas) {
  return;
}

  this.canvas.width = this.canvas.parentNode.offsetWidth;
  this.canvas.height = this.canvas.parentNode.offsetHeight;
  this.settings.canvasWidth = this.canvas.width;
  this.settings.canvasHeight = this.canvas.height;

  if (udpateParticles) {
  this.particles.forEach((p) => {
  p.changePosition();
});
}
}

  animationWorker(timeStamp) {
  this.drawCanvas(timeStamp);
  this.enqueueAnimation();
}

  enqueueAnimation() {
  if (this.isPlaying)
  window.requestAnimationFrame(this.animationWorker);
}

  drawCanvas(timeStamp) {
  if (!this.renderingAllowed)
  return;

  this.context.setTransform(1, 0, 0, 1, 0, 0);
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  const deltaTime = timeStamp - this.startTime;
  this.startTime = timeStamp;

  for (let i = 0; i < this.particles.length; i++) {
  const p = this.particles[i];
  p.float(deltaTime);
  p.draw(this.context);
}
}

}

  class Particle {
  constructor(settings) {
  this.scale = settings.scale[Math.floor(Math.random() * settings.scale.length)];
  this.speed = settings.baseSpeed * this.scale;
  this.width = settings.particleSizeX * this.scale;
  this.height = settings.particleSizeY * this.scale;
  this.dy = 0;
  this.floatAmplitude = Math.random() * (settings.floatAmplitude || 0);
  this.settings = settings;
  this.changePosition();
  this.doPrepareDraw = context => this.prepareDraw(context);
}

  changePosition() {
  this.x = this.getRandomXCoords();
  this.y = this.getRandomYCoords();
  this.baseX = this.x;
  this.baseY = this.y;
}

  getRandomXCoords() {
  return Math.floor(Math.random() * (this.settings.canvasWidth - this.settings.particleSizeX * 2));
}

  getRandomYCoords() {
  return Math.floor((this.settings.canvasHeight / 2) - (this.height * Math.random()));
}

  float(deltaTime) {
  this.dy += this.speed * deltaTime;
  let offsetY = Math.sin(this.dy) * this.floatAmplitude;
  let offsetX = 0;

  offsetY += this.settings.mouseY * this.width * this.settings.mouseParallaxCoef;
  offsetX += this.settings.mouseX * this.width * this.settings.mouseParallaxCoef;

  this.y = this.baseY + offsetY;
  this.x = this.baseX + offsetX;
}

  prepareDraw(ctx) {
  this.doPrepareDraw = () => { };
}

  draw(ctx) {
  this.doPrepareDraw(ctx);
}
}

  class RectParticle1 extends Particle {

  prepareDraw(ctx) {
  this.line1Grd1 = ctx.createLinearGradient(0, 0, this.width, this.height);
  this.line1Grd1.addColorStop(0.04, 'rgba(0,85,144,0.00)');
  this.line1Grd1.addColorStop(0.18, '#0C4B5B');
  this.line1Grd1.addColorStop(0.82, 'rgba(10,76,98,0.69)');
  this.line1Grd1.addColorStop(0.97, 'rgba(0,85,144,0.00)');

  this.line1Grd2 = ctx.createLinearGradient(0, 0, 0, this.height);
  this.line1Grd2.addColorStop(0, '#09C2CE');
  this.line1Grd2.addColorStop(0.02, '#0B6877');
  this.line1Grd2.addColorStop(0.09, 'rgba(12,71,87,0.30)');
  this.line1Grd2.addColorStop(0.17, 'rgba(12,62,78,0.22)');
  this.line1Grd2.addColorStop(0.28, 'rgba(11,47,65,0.10)');
  this.line1Grd2.addColorStop(0.49, 'rgba(11,36,55,0.00)');
  this.line1Grd2.addColorStop(0.72, 'rgba(11,51,69,0.10)');
  this.line1Grd2.addColorStop(0.88, 'rgba(12,75,91,0.30)');
  this.line1Grd2.addColorStop(0.98, '#0B8694');
  this.line1Grd2.addColorStop(1, '#09C2CE');

  this.alphaMultiplier = this.scale < 8 ? 0.6 : 1;

  super.prepareDraw(ctx);
}

  draw(ctx) {
  super.draw(ctx);

  ctx.setTransform(1, 0, 0, 1, (this.x - this.width), this.y);

  const alpha = ctx.globalAlpha;

  ctx.globalAlpha = alpha * this.alphaMultiplier;

  ctx.fillStyle = this.line1Grd1;
  ctx.fillRect(0, 0, this.width, this.height);

  ctx.fillStyle = this.line1Grd2;
  ctx.fillRect(0, 0, this.width, this.height);

  ctx.globalAlpha = alpha;
}
}

  class RectParticle2 extends Particle {

  prepareDraw(ctx) {
  this.line2Grd1 = ctx.createLinearGradient(0, 0, 0, this.height);
  this.line2Grd1.addColorStop(0, '#62FFA9');
  this.line2Grd1.addColorStop(1, '#09C2CE');
  super.prepareDraw(ctx);
}

  draw(ctx) {
  super.draw(ctx);

  ctx.setTransform(1, 0, 0, 1, 1, this.y);

  ctx.fillStyle = this.line2Grd1;
  ctx.fillRect((this.x - this.width), 0, this.width, this.height);

}
}

  class RectParticle3 extends Particle {

  prepareDraw(ctx) {
  this.line3Grd1 = ctx.createLinearGradient(0, 0, 0, this.height);
  this.line3Grd1.addColorStop(0, '#00FFFF');
  this.line3Grd1.addColorStop(0.01, '#0A95A2');
  this.line3Grd1.addColorStop(0.08, '#0B717F');
  this.line3Grd1.addColorStop(0.21, '#0C4757');
  this.line3Grd1.addColorStop(0.26, '#0B2F41');
  this.line3Grd1.addColorStop(0.46, '#0B2437');
  this.line3Grd1.addColorStop(0.67, '#0B3345');
  this.line3Grd1.addColorStop(0.90, '#0C4B5B');
  this.line3Grd1.addColorStop(1, '#09C2CE');
  super.prepareDraw(ctx);
}

  draw(ctx) {
  super.draw(ctx);

  ctx.setTransform(1, 0, 0, 1, 1, this.y);

  ctx.fillStyle = this.line3Grd1;
  ctx.fillRect((this.x - this.width), 0, this.width, this.height);

}
}

  class RectParticle4 extends Particle {

  prepareDraw(ctx) {
  this.line4Grd1 = ctx.createLinearGradient(0, 0, 0, this.height);
  this.line4Grd1.addColorStop(0, '#09C2CE');
  this.line4Grd1.addColorStop(0.02, '#0C4757');
  this.line4Grd1.addColorStop(0.27, '#0B2F41');
  this.line4Grd1.addColorStop(0.48, '#0B2437');
  this.line4Grd1.addColorStop(0.26, '#0B2F41');
  this.line4Grd1.addColorStop(0.46, '#0B2437');
  this.line4Grd1.addColorStop(0.71, '#0B3345');
  this.line4Grd1.addColorStop(0.90, '#0C4B5B');
  this.line4Grd1.addColorStop(1, '#09C2CE');
  super.prepareDraw(ctx);
}

  draw(ctx) {
  super.draw(ctx);

  ctx.setTransform(1, 0, 0, 1, 1, this.y);

  ctx.fillStyle = this.line4Grd1;
  ctx.fillRect((this.x - this.width), 0, this.width, this.height);

}
}

  const rect5FillStyle = '#72fec5';

  class RectParticle5 extends Particle {
  constructor(settings) {
  super(settings);

  this.width = settings.fatLineWidth;
  this.height = settings.fatLineHeight;
}

  draw(ctx) {
  super.draw(ctx);

  ctx.setTransform(1, 0, 0, 1, 1, this.y);

  ctx.fillStyle = rect5FillStyle;
  ctx.fillRect(this.x, 0, this.width, this.height);

}
}

  const dir = new Director();
  dir._setup();
  dir._activate();

  img.onload = img.classList.add('loaded')