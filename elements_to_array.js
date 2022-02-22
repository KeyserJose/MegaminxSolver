const corner_list = [
    [8, 64, 50],
    [9, 54, 40],
    [10, 39, 30],
    [6, 29, 20],
    [7, 19, 65],
    [98, 31, 43],
    [32, 97, 87],
    [86, 21, 28],
    [105, 41, 53],
    [42, 109, 94],
    [17, 85, 130],
    [129, 61, 18],
    [62, 128, 118],
    [117, 51, 63],
    [52, 116, 106],
    [75, 83, 96],
    [76, 95, 108],
    [72, 107, 120],
    [73, 119, 127],
    [74, 131, 84]
];

const edge_list = [
    [3, 49],
    [4, 34],
    [5, 24],
    [1, 14],
    [2, 59],
    [38, 25],
    [92, 26],
    [81, 27],
    [15, 23],
    [35, 48],
    [36, 104],
    [37, 93],
    [16, 80],
    [12, 124],
    [13, 60],
    [56, 123],
    [57, 112],
    [58, 45],
    [46, 111],
    [47, 100],
    [91, 82],
    [90, 70],
    [89, 103],
    [102, 71],
    [101, 115],
    [114, 67],
    [113, 122],
    [126, 68],
    [125, 79],
    [69, 78]
];

let megaminx;
let all_megaminxes = [];

function resetPuzzle(scramble) {

    //remove previous solution
    for (var i = 0; i < 6; i++) {
        let panel = document.getElementById('solution' + i.toString());
        panel.innerHTML = '<div class="solution_heading">' + (i + 1).toString() + '</div>';
    }

    //remove error lines on canvas
    for (var i = 0; i < elements.length; i++) {
        elements[i].graphics._stroke.style = '#36393f';
        elements[i].graphics._oldStrokeStyle.width = 1;
    }

    all_megaminxes = [];
    corner_pos_array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    corner_rot_array = new Array(20).fill(0);
    edge_pos_array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
    edge_rot_array = new Array(30).fill(0);

    if (scramble) {

        //apply 100 random moves
        for (var i = 0; i < 100; i++) {

            let face =  Math.floor(12 * Math.random());
            let turns = Math.floor(4 * Math.random());
            for (var j = 0; j < turns + 1; j++) {
                corner_pos_array = apply_move_corner_pos(corner_pos_array, face);
                corner_rot_array = apply_move_corner_rot(corner_rot_array, face);
                edge_pos_array = apply_move_edge_pos(edge_pos_array, face);
                edge_rot_array = apply_move_edge_rot(edge_rot_array, face);
            }
    
        }
    }

    arrays_to_elements();
    for (var i = 0; i < 132; i++) {
        elements[i].graphics._fill.style = html_colors[all_megaminxes[0][i]];
    }
    stage.update();

    document.getElementById("solve_button").innerText = "Solve";

}

function getArrays() {

    corner_pos_array = [];
    corner_rot_array = [];
    edge_pos_array = [];
    edge_rot_array = [];

    megaminx = new Uint8Array(132);
    for (var i = 0; i < 132; i++) {
        megaminx[i] = html_colors.indexOf(elements[i].graphics._fill.style);
    }

    all_megaminxes = [megaminx];

    for (var i = 0; i < corner_list.length; i++) {
        let idx = 144 * megaminx[corner_list[i][0]] + 12 * megaminx[corner_list[i][1]] + megaminx[corner_list[i][2]];
        corner_pos_array.push(Math.floor(corner_values[idx] / 3));
        corner_rot_array.push(corner_values[idx] % 3);
    }

    for (var i = 0; i < edge_list.length; i++) {
        let idx = 12 * megaminx[edge_list[i][0]] + megaminx[edge_list[i][1]];
        edge_pos_array.push(Math.floor(edge_values[idx] / 2));
        edge_rot_array.push(edge_values[idx] % 2);
    }

    if (!checkValidity(corner_pos_array, corner_list) || !checkValidity(edge_pos_array, edge_list)) {
        document.getElementById('solve_button').innerText = 'Invalid pattern detected! Please correct.';
        return
    }
    if (!checkMultiples(corner_pos_array, corner_list) || !checkMultiples(edge_pos_array, edge_list)) {
        document.getElementById('solve_button').innerText = 'Invalid pattern detected! Please correct.';
        return
    }

    if ( !checkParity(corner_rot_array, edge_rot_array) ) {
        document.getElementById('solve_button').innerText = 'Invalid parity detected! Please correct.';
        return
    }

    createLoadAnimations();
}

function checkMultiples(arr1, arr2) {

    valid = true;

    let count = new Uint8Array(arr1.length).fill(0);
    for (var i = 0; i < arr1.length; i++) {
        count[arr1[i]]++;
    }

    for (var i = 0; i < count.length; i++) {
        if (count[i] > 1) {
            valid = false;
            for (var j = 0; j < arr1.length; j++) {
                if (arr1[j] === i) {
                    for (var k = 0; k < arr2[j].length; k++) {
                        elements[arr2[j][k]].graphics._stroke.style = '#FFBF00';
                        elements[arr2[j][k]].graphics._oldStrokeStyle.width = 3;
                    }
                }
            }
        }
    }

    stage.update();
    return valid

}

function checkValidity(arr1, arr2) {

    let valid = true;

    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] === -1) {
            valid = false;
            for (var j = 0; j < arr2[i].length; j++) {
                elements[arr2[i][j]].graphics._stroke.style = '#800020';
                elements[arr2[i][j]].graphics._oldStrokeStyle.width = 3;
            }
        } else {
            for (var j = 0; j < arr2[i].length; j++) {
                elements[arr2[i][j]].graphics._stroke.style = '#36393f';
                elements[arr2[i][j]].graphics._oldStrokeStyle.width = 1;
            }
        }
    }

    stage.update();
    return valid

}

function checkParity(arr1, arr2) {

    //no way of identifying the offending puzzle piece so just return a validity status...
    let valid = true;

    let sum = 0;
    for (var i = 0; i < arr1.length; i++) {
        sum += arr1[i];
    }
    if (sum % 3 !== 0) {
        valid = false;
    }

    sum = 0;
    for (var i = 0; i < arr2.length; i++) {
        sum += arr2[i];
    }
    if (sum % 2 !== 0) {
        valid = false;
    }
    
    return valid

}


function arrays_to_elements() {

    let new_megaminx = new Uint8Array(132);

    const centers = [0, 11, 22, 33, 44, 55, 66, 77, 88, 99, 110, 121];
    for (var i = 0; i < centers.length; i++) {
        new_megaminx[centers[i]] = i;
    }

    for (var i = 0; i < corner_pos_array.length; i++) {

        let value = 3 * corner_pos_array[i] + corner_rot_array[i];
        let idx = corner_values.indexOf(value);

        let A = Math.floor(idx / 144);
        idx -= A * 144;
        let B = Math.floor(idx / 12);
        let C = idx % 12;

        new_megaminx[corner_list[i][0]] = A;
        new_megaminx[corner_list[i][1]] = B;
        new_megaminx[corner_list[i][2]] = C;
    
    }

    for (var i = 0; i < edge_pos_array.length; i++) {

        let value = 2 * edge_pos_array[i] + edge_rot_array[i];
        let idx = edge_values.indexOf(value);

        let A = Math.floor(idx / 12);
        let B = idx % 12;

        new_megaminx[edge_list[i][0]] = A;
        new_megaminx[edge_list[i][1]] = B;
   
    }

    all_megaminxes.push(new_megaminx);
}

function apply_move_corner_pos(arr, move) {

    let pos_table = [
        [4,0,1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],    //W
        [0,1,3,7,4,2,5,6,8,9,10,11,12,13,14,15,16,17,18,19],    //A
        [0,2,5,3,4,9,6,7,1,8,10,11,12,13,14,15,16,17,18,19],    //F
        [0,1,2,4,11,5,6,3,8,9,7,10,12,13,14,15,16,17,18,19],    //L
        [13,1,2,3,0,5,6,7,8,9,10,4,11,12,14,15,16,17,18,19],    //O
        [1,8,2,3,4,5,6,7,14,9,10,11,12,0,13,15,16,17,18,19],    //R
        [0,1,2,3,4,6,15,7,8,5,10,11,12,13,14,16,9,17,18,19],    //Y
        [0,1,2,3,4,5,6,7,9,16,10,11,12,13,8,15,17,14,18,19],    //I
        [0,1,2,3,4,5,6,7,8,9,10,11,13,14,17,15,16,18,12,19],    //B
        [0,1,2,3,4,5,6,7,8,9,11,12,18,13,14,15,16,17,19,10],    //G
        [0,1,2,3,4,5,7,10,8,9,19,11,12,13,14,6,16,17,18,15],    //P
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,19,15,16,17,18]     //S
    ];

    let new_arr = new Array(arr.length);

    for (var i = 0; i < arr.length; i++) {
         new_arr[i] = arr[pos_table[move][i]];
    }
 
    return new_arr

}

function apply_move_corner_rot(arr, move) {

    let pos_table = [
        [4,0,1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],    //W
        [0,1,3,7,4,2,5,6,8,9,10,11,12,13,14,15,16,17,18,19],    //A
        [0,2,5,3,4,9,6,7,1,8,10,11,12,13,14,15,16,17,18,19],    //F
        [0,1,2,4,11,5,6,3,8,9,7,10,12,13,14,15,16,17,18,19],    //L
        [13,1,2,3,0,5,6,7,8,9,10,4,11,12,14,15,16,17,18,19],    //O
        [1,8,2,3,4,5,6,7,14,9,10,11,12,0,13,15,16,17,18,19],    //R
        [0,1,2,3,4,6,15,7,8,5,10,11,12,13,14,16,9,17,18,19],    //Y
        [0,1,2,3,4,5,6,7,9,16,10,11,12,13,8,15,17,14,18,19],    //I
        [0,1,2,3,4,5,6,7,8,9,10,11,13,14,17,15,16,18,12,19],    //B
        [0,1,2,3,4,5,6,7,8,9,11,12,18,13,14,15,16,17,19,10],    //G
        [0,1,2,3,4,5,7,10,8,9,19,11,12,13,14,6,16,17,18,15],    //P
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,19,15,16,17,18]     //S
    ];

     const rot_table = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   //W
        [0, 0, 1, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   //A
        [0, 1, 2, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],   //F
        [0, 0, 0, 1, 2, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],   //L
        [2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0],   //O
        [1, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0],   //R
        [0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0],   //Y
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 0, 1, 2, 0, 0],   //I
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1, 2, 0],   //B
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 1, 2],   //G
        [0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 1],   //P
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]    //S
    ];

    var new_arr = new Array(arr.length);

    for (var i = 0; i < arr.length; i++) {
        new_arr[i] = arr[pos_table[move][i]];
        new_arr[i] += rot_table[move][i];
        new_arr[i] %= 3;
    }

    return new_arr;

}

function apply_move_edge_pos(arr, move) {

    const pos_table = [
        [4,0,1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],  //W
        [0,1,8,3,4,2,5,6,7,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],  //A
        [0,5,2,3,4,11,6,7,8,1,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],  //F
        [0,1,2,14,4,5,6,7,3,9,10,11,8,12,13,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],  //L
        [0,1,2,3,17,5,6,7,8,9,10,11,12,13,4,14,15,16,18,19,20,21,22,23,24,25,26,27,28,29],  //O
        [9,1,2,3,4,5,6,7,8,19,10,11,12,13,14,15,16,0,17,18,20,21,22,23,24,25,26,27,28,29],  //R
        [0,1,2,3,4,5,20,7,8,9,10,6,12,13,14,15,16,17,18,19,21,22,11,23,24,25,26,27,28,29],  //Y
        [0,1,2,3,4,5,6,7,8,9,22,11,12,13,14,15,16,17,18,10,20,21,23,24,19,25,26,27,28,29],  //I
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,18,17,24,19,20,21,22,23,25,26,16,27,28,29],  //B
        [0,1,2,3,4,5,6,7,8,9,10,11,12,15,14,26,16,17,18,19,20,21,22,23,24,25,27,28,13,29],  //G
        [0,1,2,3,4,5,6,12,8,9,10,11,28,13,14,15,16,17,18,19,7,21,22,23,24,25,26,27,29,20],  //P
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,29,22,21,24,23,26,25,28,27]   //S
    ];

    var new_arr = new Array(arr.length);

    for (var i = 0; i < arr.length; i++) {
        new_arr[i] = arr[pos_table[move][i]];
    }

    return new_arr;

}

function apply_move_edge_rot(arr, move) {

    const pos_table = [
        [4,0,1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],  //W
        [0,1,8,3,4,2,5,6,7,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],  //A
        [0,5,2,3,4,11,6,7,8,1,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],  //F
        [0,1,2,14,4,5,6,7,3,9,10,11,8,12,13,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29],  //L
        [0,1,2,3,17,5,6,7,8,9,10,11,12,13,4,14,15,16,18,19,20,21,22,23,24,25,26,27,28,29],  //O
        [9,1,2,3,4,5,6,7,8,19,10,11,12,13,14,15,16,0,17,18,20,21,22,23,24,25,26,27,28,29],  //R
        [0,1,2,3,4,5,20,7,8,9,10,6,12,13,14,15,16,17,18,19,21,22,11,23,24,25,26,27,28,29],  //Y
        [0,1,2,3,4,5,6,7,8,9,22,11,12,13,14,15,16,17,18,10,20,21,23,24,19,25,26,27,28,29],  //I
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,18,17,24,19,20,21,22,23,25,26,16,27,28,29],  //B
        [0,1,2,3,4,5,6,7,8,9,10,11,12,15,14,26,16,17,18,19,20,21,22,23,24,25,27,28,13,29],  //G
        [0,1,2,3,4,5,6,12,8,9,10,11,28,13,14,15,16,17,18,19,7,21,22,23,24,25,26,27,29,20],  //P
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,29,22,21,24,23,26,25,28,27]   //S
    ];

    const rot_table = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],     //W
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],     //A
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],     //F
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],     //L
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],     //O
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],     //R
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],     //Y
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],     //I
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],     //B
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],     //G
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],    //P
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1]     //S
    ];

    var new_arr = new Array(arr.length);

    for (var i = 0; i < arr.length; i++) {
        new_arr[i] = arr[pos_table[move][i]];
        new_arr[i] += rot_table[move][i];
        new_arr[i] %= 2;
    }

    return new_arr;

}