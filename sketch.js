//Variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//Variaveis da velocidade da bolinha
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;

//variaveis da raquete
let xraquete = 5;
let yraquete = 150;
let raquetecomprimento = 10;
let raquetealtura = 90;

//variavel da raquete do oponente
let xraqueteoponente = 585;
let yraqueteoponente = 150;
let velocidadeyoponente;

let chancedeerrar = 0;

let colisao = false;

//variavel pontos de vida
let meuspontos = 0;
let pontosoponente = 0;

//variavel sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  velocidadeBolinha();
  ricocheteBolinha();
  mostraraquete(xraquete, yraquete);
  movimentaraquete();
  //verificacolisaoraquete();
  colisaonet(xraquete, yraquete);
  mostraraquete(xraqueteoponente, yraqueteoponente);
  movimentaoponente();
  colisaonet(xraqueteoponente, yraqueteoponente);
  placar();
  marcapontos();
  bolinhaNaoFicaPresa( );
  
}

function mostraBolinha(){
  circle (xBolinha, yBolinha, diametro);
}
function mostraraquete(x, y){
  rect (x, y, raquetecomprimento, raquetealtura);
}

function velocidadeBolinha(){
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;
}

function ricocheteBolinha(){
    if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXbolinha *= -1;
  }
    if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYbolinha *= -1;
  }
}
function movimentaraquete(){
  if (keyIsDown(UP_ARROW)){
    yraquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yraquete += 10;
  }
}

function verificacolisaoraquete(){
  if (xBolinha - raio < xraquete + raquetecomprimento && yBolinha - raio < yraquete + raquetealtura && yBolinha + raio > yraquete){
    velocidadeXbolinha *= -1;
  }
}
function colisaonet(x, y){
  colisao = collideRectCircle(x, y, raquetecomprimento, raquetealtura, xBolinha, yBolinha, raio);
  if (colisao){
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
  
}

function movimentaoponente(){
  velocidadeyoponente = (0.84 + (meuspontos - pontosoponente)/100) *     yBolinha - yraqueteoponente - 60 / 2 - 30;
  yraqueteoponente += velocidadeyoponente 
}


function placar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meuspontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosoponente, 470, 26);
}
function marcapontos(){
  if (xBolinha > 590){
    meuspontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosoponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa( ){
    if (xBolinha - raio <= 0){
    xBolinha = 20;

    } else {

      if (xBolinha - raio >= 588){
        xBolinha = 570;
      }
    }
}



