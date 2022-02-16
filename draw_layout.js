const a = 24;                                           //distance from centre to base of central pentagon tile
const gap = 0.2 * a;                                    //gap between tiles
const b = 1.2 * a;                                      //height of trapezium tile

const origin = [205, 200];                              //origin of white face

var c = 4 * a / (Math.sqrt(5) + 1);                     //distance from centre to corner for pentagon tile
var d = a * Math.tan(Math.PI * 36 / 180);               //half length of side of pentagon tile
var e = d - gap * Math.tan(Math.PI * 18 / 180);         //half length of short base of trapezium tile
var f = e - b * Math.tan(Math.PI * 18 / 180);           //half length of long base of trapezium tile

//measurement from centre of pentagon to SE rhombus
var g = (a + gap) * Math.tan(Math.PI * 36 / 180);       //horizontal distance to NW corner     
var h = f + gap / Math.cos(Math.PI * 18 / 180);         //horizontal distance to SW corner
var z = (a + gap + b) * Math.tan(Math.PI * 36 / 180);   //horizontal distance to SE corner
var y = g + z - h;                                      //horizontal distance to NE corner

var D = 2 * a + 2 * b + 3 * gap;        //distance between the centres of two faces

var centers = [origin[0], origin[1]];
for (var i = 0; i < 5; i++){
    centers.push(origin[0] + D * Math.sin(i * Math.PI * 72 / 180));
    centers.push(origin[1] + D * Math.cos(i * Math.PI * 72 / 180));
}

centers.push(origin[0] + D * Math.sin(Math.PI * 36 / 180));
centers.push(origin[1] + 2* D + D * Math.cos(Math.PI * 36 / 180));

for (var i = 0; i < 5; i++){
    centers.push(centers[12] + D * Math.sin(i * Math.PI * 72 / 180));
    centers.push(centers[13] - D * Math.cos(i * Math.PI * 72 / 180));
}

var pentagon = [];      //alternating X and Y coordinates of corners of pentagon
for (var i = 0; i < 5; i++){
    pentagon.push(c * Math.sin(i * Math.PI * 72 / 180));
    pentagon.push(-1 * c * Math.cos(i * Math.PI * 72 / 180));
}

var trapezium = [];     //alternating X and Y coordinates of corners of trapezium
trapezium.push(e);
trapezium.push(a + gap);
trapezium.push(0 - e);
trapezium.push(0 + a + gap);
trapezium.push(0 - f);
trapezium.push(0 + a + gap + b);
trapezium.push(0 + f);
trapezium.push(0 + a + gap + b);

var rhombus = [];     //alternating X and Y coordinates of corners of rhombus
rhombus.push(g);
rhombus.push(a + gap);
rhombus.push(h);
rhombus.push(a + gap + b);
rhombus.push(z);
rhombus.push(a + gap + b);
rhombus.push(y);
rhombus.push(a + gap);

var stage;
const html_colors = ['white', 'mediumorchid', 'lightskyblue', 'darkgreen', 'red', 'darkorange', 'gray', 'pink', 'yellow', 'darkslateblue', 'royalblue', 'limegreen'];

var selected_color = 'white';
var pantones = [];

var elements = [];

function init() {

    document.getElementById("canvas_container").innerHTML = "<canvas id='demoCanvas' width='480' height='750'></canvas>"
    
    stage = new createjs.Stage("demoCanvas");

    var cont1 = new createjs.Container();
    cont1.x = centers[0];
    cont1.y =  centers[1];
    drawSide(cont1, html_colors[0]);

    for (var i = 2; i < 12; i += 2) {

        var cont2 = new createjs.Container();
        cont2.x = centers[i];
        cont2.y =  centers[i + 1];
        drawSide(cont2, html_colors[i / 2]);
        cont2.rotation = 36;

    }

    cont1 = new createjs.Container();
    cont1.x = centers[12];
    cont1.y =  centers[13];
    drawSide(cont1, html_colors[6]);
    cont1.rotation = 36;

    for (var i = 14; i < 24; i += 2) {

        var cont2 = new createjs.Container();
        cont2.x = centers[i];
        cont2.y =  centers[i + 1];
        drawSide(cont2, html_colors[i / 2]);

    }

    stage.update();

}

function drawSide(container, color) {

    var pent = new createjs.Shape();
    pent.graphics.beginStroke('#36393f').beginFill(color).moveTo(pentagon[0], pentagon[1]);
    for (var i = 2; i < 10; i += 2) {
        pent.graphics.lineTo(pentagon[i], pentagon[i+1]);
    }
    pent.graphics.lineTo(pentagon[0], pentagon[1]);

    pent.addEventListener("click", function(event) {
        console.log(elements.indexOf(event.target));
    });

    elements.push(pent);
    container.addChild(pent);

    for (var j = 0; j < 5; j++){

        var trap = new createjs.Shape();

        trap.graphics.beginStroke('#36393f').setStrokeStyle(1).beginFill(color).moveTo(trapezium[0], trapezium[1]);
        for (var i = 0; i < trapezium.length; i += 2) {
            trap.graphics.lineTo(trapezium[i], trapezium[i + 1]);
        }
        trap.graphics.lineTo(trapezium[0], trapezium[1]);
        trap.rotation = 72 * j;

        trap.addEventListener("click", function(event) {
            event.target.graphics._fill.style = selected_color;
            stage.update();
            document.getElementById('solve_button').innerText = "SOLVE";
            console.log(elements.indexOf(event.target));
        });

        elements.push(trap);
        container.addChild(trap);

    }

    for (var j = 0; j < 5; j++){

        var rhom = new createjs.Shape();

        rhom.graphics.beginStroke('#36393f').setStrokeStyle(1).beginFill(color).moveTo(rhombus[0], rhombus[1]);
        for (var i = 0; i < rhombus.length; i += 2) {
            rhom.graphics.lineTo(rhombus[i], rhombus[i + 1]);
        }
        rhom.graphics.lineTo(rhombus[0], rhombus[1]);
        rhom.rotation = 72 * j;

        rhom.addEventListener("click", function(event) {
            event.target.graphics._fill.style = selected_color;
            stage.update();
            document.getElementById('solve_button').innerText = "SOLVE";
            console.log(elements.indexOf(event.target));
        });

        elements.push(rhom);
        container.addChild(rhom);

    }

    stage.addChild(container);

}

function selectColor(element) {

    //deselect previously selected color
    let unselect = document.getElementsByClassName("selected_panton");
    unselect[0].className = "panton_border";

    //select new color
    selected_color = element.children[0].style.backgroundColor;
    element.className = "selected_panton";

}