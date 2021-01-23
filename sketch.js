var blimp,blimpimg,Hollywood,database;
var position;

function preload(){
blimpimg = loadAnimation("goodyear blimp.png")
Hollywood = loadImage("Hollywood_O.jpg")
}
function setup(){
    database = firebase.database();
    console.log(database);

    createCanvas(500,500);
    blimp = createSprite(250,250,10,10);
    blimp.addAnimation("blimp",blimpimg)
    blimp.scale = 0.2;

    var blimpHeight = database.ref('blimp/position');
    blimpHeight.on("value",readHeight,showError)
}

function draw(){
    background(Hollywood);
    stroke("black");
    text("Use the arrow keys to control the blimp!",50,25)
    
    if(keyDown(LEFT_ARROW)){
        writeHeight(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writeHeight(1,0);
    }
    else if(keyDown(UP_ARROW)){
      if(blimp.y>25)
 {
     blimp.y = blimp.y-10;
 } 
        blimp.addAnimation("blimp",blimpimg);
        blimp.scale = blimp.scale - 0.01;
    }
    else if(keyDown(DOWN_ARROW)){
      if (blimp.y <400)
  {
    blimp.y = blimp.y+10;
  }
        blimp.addAnimation("blimpie",blimpimg);
        blimp.scale = blimp.scale + 0.01;
    }
    drawSprites();
}



function readHeight(data){
position = data.val();
console.log(position);
blimp.x = position.x;
blimp.y = position.y;
}

function showError(){
    console.log(showError);
}

function writeHeight(x,y){
    database.ref('blimp/position').set({
        'x':position.x + x,
        'y':position.y + y
    })
    

    
}

