let vs = []
function setup() {
  createCanvas(400, 400);
  v = new Pesawat(200, 200)
}

function draw() {
  background(220);
  v.tampil()
  v.tepi()
  v.perbaharui()
  v.terbang()
}

class Pesawat{
  constructor(x,y){
    this.tempat = createVector(x,y)
    this.cepat = createVector(1,0)
    this.percepatan = createVector(0,0)
    this.a = 30.0;
    this.maxspeed = 2;
    this.maxforce = 0.01;
    this.terbangTheta = PI/2;
  }
  
  terbang(){
    let projVector = this.cepat.copy()
    projVector.setMag(100)
    let projPoint = projVector.add(this.tempat)
    let terbangRadius = 30;
    let theta = this.terbangTheta + this.cepat.heading()
    let xBar = terbangRadius * cos(theta)
    let yBar = terbangRadius * sin(theta)
    let terbangPoint = p5.Vector.add(projPoint,createVector(xBar,yBar))
    let debug = true;
    
    if (debug){
    push()
    fill(150, 75, 0);
    stroke('red')
    line(this.tempat.x, this.tempat.y, projPoint.x, projPoint.y)
    stroke('red');
    circle(projPoint.x, projPoint.y, 8);
    noFill();
    stroke('red');
    circle(projPoint.x, projPoint.y, terbangRadius*2);

    line(this.tempat.x, this.tempat.y, terbangPoint.x, terbangPoint.y)
    stroke('black')
    fill('purple')
    circle(terbangPoint.x, terbangPoint.y, 16);
    pop()
  }

    let driveForce = terbangPoint.sub(this.tempat);
    driveForce.setMag(this.maxForce)
    this.applyForce(driveForce)
    this.terbangTheta += random(-0.5, 0.5)
  }
  
  search(vectorTarget){
    var menuju = p5.Vector.sub(vectorTraget, this.tempat)
    menuju.normalize()
    menuju.mult(this.maxspeed)
    var drive = p5.Vector.sub(menuju, this.cepat)
    drive.limit(this.maxForce)
    this.applyForce(drive)
  }
  
  tiba(vectorTarget){
    var menuju = p5.Vector.sub(vectorTarget, this.tempat)
    var jarak = menuju.mag()
    if(jarak<100){
      var b = map(jarak, 0, 100, 0, this.maxspeed)
      menuju.normalize()
      menuju.mult(b)
    }
    
    else{
      menuju.normalize()
      menuju.mult(this.maxspeed)
    }
    
    var drive = p5.Vector.sub(menuju, this.cepat)
    drive.limit(this.maxForce)
    this.applyForce(drive)
  }
  
  perbaharui(){
    this.cepat.add(this.percepatan)
    this.cepat.limit(this.maxspeed)
    this.tempat.add(this.cepat)
    this.percepatan.mult(0)
  }
  
  applyForce(force){
    this.percepatan.add(force)
  }
  
  tampil(){
    var theta = this.cepat.heading()
    push()
    fill(71,92,108)
    translate(this.tempat.x, this.tempat.y)
    rotate(theta)
    strokeWeight(0.5)
    ellipse(-10, 0, 28, 8) //badan pesawat
    arc(-20, -1, 4, 10, radians(180), radians(360)) //ekor
    fill(138,133,131)
    arc(-10,-4, 5, 15, radians(180), radians(360)) //sayap kiri
    arc(-10, 2, 5, 20, radians(0), radians(180))  //sayap kanan
    pop()
  }
  
  tepi(){
    if(this.tempat.x>width+10){
      this.tempat.x = -10;
    }
    
    else if(this.tempat.x<-10){
      this.tempat.x = width+10;
    }
    
    if(this.tempat.y>height+10){
      this.tempat.y = -10;
    }
    
    else if(this.tempat.y<-10){
      this.tempat.y = height+10;
    }

  }
}
