img = "";
objects = [];
function preload(){
img = loadImage("dog_cat.jpg");
}
function setup(){
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();
}
status ="";
function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects...";
}
function modelLoaded(){
    console.log("Model is Loaded");
    status = true;
}
function draw(){
    image(video, 0,0,400,400);
    if (status != "") {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResults);
        for (let i = 0; i < objects.length; i++) {
            console.log(objects[i].x)
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected : "+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label +" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function gotResults(error, results){
    if (error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
        
    }
}