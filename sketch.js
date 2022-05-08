let vs = []
function setup() {
  createCanvas(400, 400);
  v = new Vehicle(200,200);
}

function draw() {
  background(220);
  
  v.display()
  v.batas()
  v.diperbarui();
  v.terbang();
  
}

class Vehicle{
  constructor(x,y){
    this.posisi = createVector(x,y);
    this.kecepatan = createVector(1,0);
    this.percepatan = createVector(0,0);
    this.l = 30.0;
    this.maxspeed = 2;
    this.maxforce = 0.01;
    this.terbangTheta = PI/2;
  }
  
  terbang(){
    let projVector = this.kecepatan.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.posisi);
    
    let terbangRadius = 30;
    let theta = this.terbangTheta + this.kecepatan.heading();
    let xBar = terbangRadius * cos(theta);
    let yBar = terbangRadius * sin(theta);
    
    let terbangPoint = p5.Vector.add(projPoint, createVector(xBar,yBar));
    
    let debug = true;
    
    if (debug){
      push()
      fill(150, 75, 0);
      stroke('red')
      line(this.posisi.x, this.posisi.y, projPoint.x, projPoint.y)
      stroke('red');
      circle(projPoint.x, projPoint.y, 8);
      noFill();
      stroke('red');
      circle(projPoint.x, projPoint.y, terbangRadius*2);
      
      line(this.posisi.x, this.posisi.y, terbangPoint.x, terbangPoint.y)
      stroke('black')
      fill('purple')
      circle(terbangPoint.x, terbangPoint.y, 16);
      pop()
    }
    
    let mengemudiForce = terbangPoint.sub(this.posisi);
    mengemudiForce.setMag(this.maxforce);
    this.applyForce(mengemudiForce);
    
    this.terbangTheta += random(-0.5, 0.5);
    
  }
  
  mencari(vektorTarget){
    var tujuan = p5.Vector.sub(vektorTarget, this.posisi);
    tujuan.normalize();
    tujuan.mult(this.maxspeed);
    
    //kemudi
    var mengendarai = p5.Vector.sub(tujuan, this.kecepatan);
    mengendarai.limit(this.maxforce);
    this.applyForce(mengendarai);
  }
  
  sampai(vektorTarget){
    var tujuan = p5.Vector.sub(vektorTarget, this.posisi);
    var jarak = tujuan.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      tujuan.normalize();
      tujuan.mult(m);
      
    }
    else{
      tujuan.normalize();
      tujuan.mult(this.maxspeed);    
    }

    
    //kemudi
    var mengendarai = p5.Vector.sub(tujuan, this.kecepatan);
    mengendarai.limit(this.maxforce);
    this.applyForce(mengendari);
  }
  
  
  diperbarui(){
    this.kecepatan.add(this.percepatan);
    this.kecepatan.limit(this.maxspeed);
    this.posisi.add(this.kecepatan);
    this.percepatan.mult(0);
  }
  applyForce(force){
    this.percepatan.add(force);
  }
  display(){
    var theta = this.kecepatan.heading()// + PI/2;
    push();
    fill(175);
    stroke(0);
    translate(this.posisi.x, this.posisi.y)
    rotate(theta)
    strokeWeight(0.5)
    fill(255, 0, 0)
    ellipse(-10, 0, 28, 8) //badan pesawat
    arc(-20, -1, 4, 10, radians(180), radians(360)) //ekor
    fill(128)
    arc(-10,-4, 5, 15, radians(180), radians(360)) //sayap kiri
    arc(-10, 2, 5, 20, radians(0), radians(180))  //sayap kanan
    pop();
  }

   batas() {
    if (this.posisi.x > width + 10) {
      this.posisi.x = -10;
    } else if (this.posisi.x < -10) {
      this.posisi.x = width + 10;
    }
    if (this.posisi.y > height + 10) {
      this.posisi.y = -10;
    } else if (this.posisi.y < -10) {
      this.posisi.y = height + 10;
    }
  }

}
