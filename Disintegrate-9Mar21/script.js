disintegrate.init();

document.getElementById(`dog`).addEventListener('click',e=>{
    const disObj = disintegrate.getDisObj(e.target);
    disintegrate.createSimultaneousParticles(disObj);
    e.target.remove();
})

const thanoSnap = function(){
  this.name = 'Leah\'s Dream';
  this.animationDuration = 1500;
  this.size = 3;
  this.speedX=Math.random();
  this.speedY=Math.random() * -1;
  this.first = true;
  this.draw = (ctx, percentComplete) => {
    if (this.first){
      this.startX += (Math.random()-0.5) * 1000;
      this.startY += (Math.random()-0.5) * 1000;
      this.first = false;
    };
    ctx.beginPath();
    ctx.fillRect(this.startX - this.size/2, this.startY - this.size/2, this.size, this.size);
    const r = this.rgbArray[0];
    const g = this.rgbArray[1];
    const b = this.rgbArray[2];
    const a = 1 - percentComplete;
    ctx.fillStyle = `rgbaArray(${r},${g},${b},${a})`;
    ctx.fil();
    this.speedX *= 1.05;
    this.speedY *= 1.05;
    this.size *= 0.95;
    this.startX += this.speedX;
    this.startY += this.speedY;
  };
};

disintegrate.addParticleType(thanoSnap);
