var numLevel =6;
var color = generateColor(numLevel);

// var color = [
//     "rgb(255, 0, 0)",
//     "rgb(255, 255, 0)",
//     "rgb(0, 255, 0)",
//     "rgb(0, 255, 255)",
//     "rgb(0, 0, 255)",
//     "rgb(255, 0, 255)"
// ];
var colorDisplay = document.getElementById("colorDisplay");
var box = document.querySelectorAll(".box");
var pickedColor = pickColor();
var message = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var easyButton = document.getElementById("easy");
var hardButton = document.getElementById("hard");

colorDisplay.textContent = pickedColor;

easyButton.addEventListener("click", function(){
    easyButton.classList.add('selected');
    hardButton.classList.remove('selected');
    numLevel = 3;
    color = generateColor(numLevel);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (var i = 0; i < box.length; i++) {
        box[i].style.backgroundColor = color[i];
        h1.style.backgroundColor = 'steelblue';
        if (color[i])
        {
            box[i].style.display = "block";
        }
        else{
            box[i].style.display = "none";
        }
        // console.log(i);
    }
});
hardButton.addEventListener("click", function(){
    hardButton.classList.add('selected');
    easyButton.classList.remove('selected');
    numLevel = 6;
    color = generateColor(numLevel);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (var i = 0; i < box.length; i++) {
        box[i].style.backgroundColor = color[i];
        // console.log(i);
        h1.style.backgroundColor = 'steelblue';
        box[i].style.display = "block";
        
    }

});


resetButton.addEventListener("click", function(){
    color = generateColor(numLevel);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (var i = 0; i < box.length; i++) {
        box[i].style.backgroundColor = color[i];}
    h1.style.backgroundColor = 'steelblue';
    message.textContent = "";
    this.textContent = "New Color";
});


// console.log(box);
for (var i = 0; i < box.length; i++) {
    box[i].style.backgroundColor = color[i];
    // console.log(i);
    
    // add監聽
    box[i].addEventListener("click", function () {
        // grab color
        var clickedColor = this.style.backgroundColor;
        //checked color
        //console.log(clickedColor, pickedColor);
        if( clickedColor === pickedColor){
            changeColor(clickedColor);
            message.textContent = "Correct";
            resetButton.textContent = "Play Again?";
        }
        else{
            this.style.backgroundColor = "#232323";
            message.textContent = "Try again!";
        }
    });
    
}



function changeColor(color) {
    for (var i = 0; i<box.length; i++) {
        box[i].style.backgroundColor = color;
        
    }
    h1.style.backgroundColor = color;
}

function pickColor() {
    var random = Math.floor(Math.random()*color.length);
    return color[random];
}

function generateColor(num) {
    var arr=[];
    for (var i = 0; i < num ; i++){
        arr.push( randomColor());
    }
    return arr
}

function randomColor(){
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    

    return ("rgb("+r+", "+g+", "+b+")")
}