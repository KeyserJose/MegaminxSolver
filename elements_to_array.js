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

function getArrays() {

    corner_pos_array = [];
    corner_rot_array = [];
    edge_pos_array = [];
    edge_rot_array = [];

    megaminx = new Uint8Array(132);
    for (var i = 0; i < 132; i++) {
        megaminx[i] = html_colors.indexOf(elements[i].graphics._fill.style);
    }

    //megaminx = [0,1,1,8,8,7,0,6,6,1,10,1,7,6,0,4,11,11,3,8,5,7,2,10,1,8,10,0,1,1,5,0,5,3,2,4,8,5,6,4,2,10,11,3,4,2,2,9,3,7,8,9,4,9,0,5,5,10,0,2,10,4,9,8,7,9,6,7,4,10,4,6,3,11,3,5,2,7,5,9,1,3,7,11,9,1,2,11,8,5,5,2,9,11,10,8,10,1,2,9,3,8,11,1,3,4,5,8,7,6,10,3,11,4,11,9,0,3,6,7,2,11,9,0,6,6,0,6,10,0,7,4];
    megaminx = [0,10,5,3,9,4,2,9,2,9,7,1,6,5,9,7,10,3,8,4,7,1,2,6,3,2,6,3,5,8,1,10,9,3,4,11,3,1,8,11,4,1,4,6,4,2,0,1,7,2,0,6,6,11,3,5,8,8,0,11,10,3,2,10,1,10,6,0,0,7,11,7,8,11,4,4,10,7,2,10,6,9,1,3,10,2,0,3,8,4,10,0,11,5,5,5,0,8,9,9,2,11,1,5,8,5,8,9,11,0,10,3,9,9,4,1,7,11,1,7,6,11,6,7,8,4,5,6,7,2,0,5];

    for (var i = 0; i < 132; i++) {
        elements[i].graphics._fill.style = html_colors[megaminx[i]];
    }
    stage.update();

    all_megaminxes.push(megaminx);

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
        document.getElementById('solve_button').innerText = 'Invalid pattern detected!';
        return
    }
    if (!checkMultiples(corner_pos_array, corner_list) || !checkMultiples(edge_pos_array, edge_list)) {
        document.getElementById('solve_button').innerText = 'Invalid pattern detected!';
        return
    }

    //console.log(corner_pos_array);
    //console.log(corner_rot_array);
    //console.log(edge_pos_array);
    //console.log(edge_rot_array);

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
                        elements[arr2[j][k]].graphics._stroke.style = 'orange';
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
                elements[arr2[i][j]].graphics._stroke.style = '#FF5733';
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