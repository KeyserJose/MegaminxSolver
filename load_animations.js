//let moves = [
//    'W', 'W2', 'W2c', 'Wc',
//    'A', 'A2', 'A2c', 'Ac',
//    'F', 'F2', 'F2c', 'Fc',
//    'L', 'L2', 'L2c', 'Lc',
//    'O', 'O2', 'O2c', 'Oc',
//    'R', 'R2', 'R2c', 'Rc',
//   'Y', 'Y2', 'Y2c', 'Yc',
//    'I', 'I2', 'I2c', 'Ic',
//    'B', 'B2', 'B2c', 'Bc',
//    'G', 'G2', 'G2c', 'Gc',
//    'P', 'P2', 'P2c', 'Pc',
//    'S', 'S2', 'S2c', 'Sc'
//];

let moves = ['&#8635', '&#8635 &#8635', '&#8634 &#8634', '&#8634'];

const panel_colors = ['white', 'mediumorchid', 'darkorange', 'red', 'darkgreen', 'lightskyblue'];
let move_colors = ['white', 'lightskyblue', 'darkgreen', 'mediumorchid', 'darkorange', 'red', 'yellow', 'darkslateblue', 'royalblue', 'limegreen', 'pink', 'gray'];

let total;

function createLoadAnimations() {

    total = 0;

    for (var i = 0; i < panel_colors.length; i++) {
        let panel = document.getElementById('solution' + i.toString());
        panel.innerHTML += '<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
        panel.children[1].className += ' ' + panel_colors[i];
    }
    document.getElementById('solution0').children[1].className += ' animtation_class';

    document.getElementById('solve_button').innerText = "Solving...";

    setTimeout(startPhase1, 50);
    
}

function startPhase1() {

    var w = new Worker("get_4_inputs.js");
    w.onmessage = function(event) {
        console.log(event.data);
    };
    //let solution = get4Inputs();

    return
    solution = solution.concat(get3Inputs());
    solution = solution.concat(get3Inputs());

    let panel = document.getElementById('solution0');
    panel.innerHTML = '<div class="solution_heading">1</div>';
    for (var i = 0; i < solution.length; i++) {
        let color_index = Math.floor(solution[i] / 4);
        panel.innerHTML += "<div class='solution_line' id='solution_part" + total.toString() + "' style='color: " + move_colors[color_index] + ";'>" + moves[solution[i] % 4] + "</div>"
        total++;
    }

    for (var i = 0; i < solution.length; i++) {
        let line = document.getElementById('solution_part' + i.toString());
        line.addEventListener("mouseenter", function(event) {
            let idx = event.target.id.substr(13);
            idx = parseInt(idx) + 1;
            paint_megmainx(idx);
        });
        line.addEventListener("mouseout", function(event) {
            paint_megmainx(0);
        });
    }

    document.getElementById('solution1').children[1].className += ' animtation_class';
    setTimeout(startPhase2, 50);

}

function startPhase2() {

    console.log(faces_solved);

    let solution = get3InputsB();
    solution = solution.concat(get5Inputs());

    let panel = document.getElementById('solution1');
    panel.innerHTML = '<div class="solution_heading">2</div>';

    for (var i = 0; i < solution.length; i++) {
        let color_index = Math.floor(solution[i] / 4);
        panel.innerHTML += "<div class='solution_line' id='solution_part" + total.toString() + "' style='color: " + move_colors[color_index] + ";'>" + moves[solution[i] % 4] + "</div>"
        total++;
    }

    for (var i = 0; i < solution.length; i++) {
        let line = document.getElementById('solution_part' + (total - solution.length + i).toString());
        line.addEventListener("mouseenter", function(event) {
            let idx = event.target.id.substr(13);
            idx = parseInt(idx) + 1;
            paint_megmainx(idx);
        });
        line.addEventListener("mouseout", function(event) {
            paint_megmainx(0);
        });
    }

    document.getElementById('solution2').children[1].className += ' animtation_class';
    setTimeout(startPhase3, 50);

}

function startPhase3() {

    let solution = get5Inputs();

    let panel = document.getElementById('solution2');
    panel.innerHTML = '<div class="solution_heading">3</div>';

    for (var i = 0; i < solution.length; i++) {
        let color_index = Math.floor(solution[i] / 4);
        panel.innerHTML += "<div class='solution_line' id='solution_part" + total.toString() + "' style='color: " + move_colors[color_index] + ";'>" + moves[solution[i] % 4] + "</div>"
        total++;
    }

    for (var i = 0; i < solution.length; i++) {
        let line = document.getElementById('solution_part' + (total - solution.length + i).toString());
        line.addEventListener("mouseenter", function(event) {
            let idx = event.target.id.substr(13);
            idx = parseInt(idx) + 1;
            paint_megmainx(idx);
        });
        line.addEventListener("mouseout", function(event) {
            paint_megmainx(0);
        });
    }

    document.getElementById('solution3').children[1].className += ' animtation_class';
    setTimeout(startPhase4, 50);

}

function startPhase4() {

    let solution = get5Inputs();

    let panel = document.getElementById('solution3');
    panel.innerHTML = '<div class="solution_heading">4</div>';

    for (var i = 0; i < solution.length; i++) {
        let color_index = Math.floor(solution[i] / 4);
        panel.innerHTML += "<div class='solution_line' id='solution_part" + total.toString() + "' style='color: " + move_colors[color_index] + ";'>" + moves[solution[i] % 4] + "</div>"
        total++;
    }

    for (var i = 0; i < solution.length; i++) {
        let line = document.getElementById('solution_part' + (total - solution.length + i).toString());
        line.addEventListener("mouseenter", function(event) {
            let idx = event.target.id.substr(13);
            idx = parseInt(idx) + 1;
            paint_megmainx(idx);
        });
        line.addEventListener("mouseout", function(event) {
            paint_megmainx(0);
        });
    }

    document.getElementById('solution4').children[1].className += ' animtation_class';
    console.log(faces_solved);
    setTimeout(startPhase5, 50);

}

function startPhase5() {

    let solution = getLast3Inputs();

    let panel = document.getElementById('solution4');
    panel.innerHTML = '<div class="solution_heading">5</div>';

    for (var i = 0; i < solution.length; i++) {
        let color_index = Math.floor(solution[i] / 4);
        panel.innerHTML += "<div class='solution_line' id='solution_part" + total.toString() + "' style='color: " + move_colors[color_index] + ";'>" + moves[solution[i] % 4] + "</div>"
        total++;
    }

    for (var i = 0; i < solution.length; i++) {
        let line = document.getElementById('solution_part' + (total - solution.length + i).toString());
        line.addEventListener("mouseenter", function(event) {
            let idx = event.target.id.substr(13);
            idx = parseInt(idx) + 1;
            paint_megmainx(idx);
        });
        line.addEventListener("mouseout", function(event) {
            paint_megmainx(0);
        });
    }

    document.getElementById('solution5').children[1].className += ' animtation_class';
    setTimeout(startPhase6, 50);

}

function startPhase6() {

    let solution = getLast2Inputs();

    let panel = document.getElementById('solution5');
    panel.innerHTML = '<div class="solution_heading">6</div>';

    for (var i = 0; i < solution.length; i++) {
        let color_index = Math.floor(solution[i] / 4);
        panel.innerHTML += "<div class='solution_line' id='solution_part" + total.toString() + "' style='color: " + move_colors[color_index] + ";'>" + moves[solution[i] % 4] + "</div>"
        total++;
    }

    for (var i = 0; i < solution.length; i++) {
        let line = document.getElementById('solution_part' + (total - solution.length + i).toString());
        line.addEventListener("mouseenter", function(event) {
            let idx = event.target.id.substr(13);
            idx = parseInt(idx) + 1;
            paint_megmainx(idx);
        });
        line.addEventListener("mouseout", function(event) {
            paint_megmainx(0);
        });
    }

    document.getElementById("solve_button").innerText = "Solution found in " + total.toString() + " moves!";

}

function paint_megmainx(idx) {

    for (var i = 0; i < elements.length; i++) {
        elements[i].graphics._fill.style = html_colors[all_megaminxes[idx][i]];
    }
    stage.update();

}