const blockSize=64;
const minX = 32, minY=32;
const maxX = 480, maxY=480;

let x=minX,y=minY;

let imgMaze, imgCherry;
let imgGhost= [];
let imgPacman = [];
let skinPac=0;
let xCherry = 480, yCherry=32;
let eatCherry=0;
let food=[];
let xFood=0, yFood=0;

let restart;
let score=0;


function preload(){
  imgMaze = loadImage("labirinto1.png");
  imgPacman[0] = loadImage("pacmanRight.png");
  imgPacman[1] = loadImage("pacmanLeft.png");
  imgPacman[2] = loadImage("pacmanUp.png");
  imgPacman[3] = loadImage("pacmanDown.png");
  imgGhost[0] = loadImage("fantasmavermelho.png");
  imgGhost[1] = loadImage("fantasmaassustado.png");
  imgCherry = loadImage("cereja.png");
  food = [[0,1,1,2,1,1,1,1],
          [1,1,1,1,1,1,2,1],
          [1,1,2,1,1,1,1,1],
          [1,1,1,1,1,2,1,1],
          [1,1,1,2,1,1,1,1],
          [2,1,1,1,1,1,1,1],
          [1,1,2,1,1,1,2,1],
          [5,1,1,1,2,1,1,0]];
  
}




function setup() {
  createCanvas(576, 576); 
  
}

function draw() {
  background(imgMaze);
  
  
  for (let i=0;i<8;i++){
    for(let j=0;j<8;j++){
      
      if(food[i][j]>=1&&food[i][j]<5){
        circle(blockSize * i+59,blockSize*j+59,10*food[i][j]);
      }
    }
  }
  

  
  image(imgGhost[eatCherry],maxX, maxY, blockSize, blockSize);
  if (eatCherry==0){
    image(imgCherry, xCherry,yCherry,blockSize,blockSize);
  }
  image(imgPacman[skinPac], x,y,blockSize,blockSize);
  
  if(x==maxX&&y==maxY){
    rect(160,160,256,256);
    textSize(35);
    
    if(eatCherry==1){
      
      text("Ganhou! =)",200,300);
      score=score+100;
    }
    else{
      text("Perdeu! =(",200,300);
      score=score-100;
    }
    textSize(20);
    text("Pontuação= " + score,200,350);
    
    restart = createButton("Reiniciar!");
    restart.mousePressed(resetGame);
    noLoop();
    
  }
}


function resetGame(){
  x=minX;
  y=minY;
  eatCherry=0;
  food = [[0,1,1,2,1,1,1,1],
          [1,1,1,1,1,1,2,1],
          [1,1,2,1,1,1,1,1],
          [1,1,1,1,1,2,1,1],
          [1,1,1,2,1,1,1,1],
          [2,1,1,1,1,1,1,1],
          [1,1,2,1,1,1,2,1],
          [5,1,1,1,2,1,1,0]];
  score=0;
  xFood=0;
  yFood=0;
  skinPac=0;
  
  restart.remove();
  loop();
  
}

function keyPressed(){
  if(keyCode==LEFT_ARROW){
    if(x>minX) {
      x=x-blockSize;
      xFood=xFood-1;
      skinPac=1;
      
    }
  }
  else if(keyCode==RIGHT_ARROW){
    if(x<maxX){
      x=x+blockSize;
      xFood=xFood+1;
      skinPac=0;
    }
  }
  else if(keyCode==UP_ARROW){
    if(y>minY){
      y=y-blockSize;
      yFood=yFood-1;
      skinPac=2;
    }
  }
  else if(keyCode==DOWN_ARROW){
    if(y<maxY){
      y=y+blockSize;
      yFood=yFood+1;
      skinPac=3;
    }
  }
  if(food[xFood][yFood]>=1){
        score=score+10*food[xFood][yFood];
  }
  
  food[xFood][yFood]=0;
  
  if(x==xCherry&&y==yCherry){
    eatCherry=1;
    //score=score+50;
  }
  
}