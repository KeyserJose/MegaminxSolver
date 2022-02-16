let move_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47];

let prune1, prune2;
let solved_corners = [];
let solved_edges = [];
let solved_faces = [];

function solveInputs(inputs) {

    let solver_inputs = [];
    prune1 = [];
    prune2 = [];
    for (var i = 0; i < inputs.length; i++) {

        //add solver inputs...
        let idx_a, idx_b, idx_c, idx_d, idx_e, idx_f;

        idx_a = corner_pos_array.indexOf(inputs[i][0]);
        idx_a = idx_a * 3 + corner_rot_array[idx_a];
    
        idx_b = edge_pos_array.indexOf(inputs[i][1]);
        idx_b = idx_b * 2 + edge_rot_array[idx_b];
    
        idx_c = edge_pos_array.indexOf(inputs[i][2]);
        idx_c = idx_c * 2 + edge_rot_array[idx_c];
        
        let solver_input = [idx_a, idx_b, idx_c];

        if (inputs[i].length > 3) {
            idx_d = edge_pos_array.indexOf(inputs[i][3]);
            idx_d = idx_d * 2 + edge_rot_array[idx_d];
            solver_input.push(idx_d);
        }
        
        if (inputs[i].length > 4) {
            idx_e = corner_pos_array.indexOf(inputs[i][4]);
            idx_e = idx_e * 3 + corner_rot_array[idx_e];
            solver_input.push(idx_e);
        }

        if (inputs[i].length > 5) {
            idx_f = edge_pos_array.indexOf(inputs[i][5]);
            idx_f = idx_f * 2 + edge_rot_array[idx_f];
            solver_input.push(idx_f);
        }
        solver_inputs.push(solver_input);

        //generate prune table
        prune1.push(gen_1C2E_prune(inputs[i][0] * 3, inputs[i][1] * 2, inputs[i][2] * 2, 10));

        if (inputs[i].length === 4) {
            prune2.push(gen_1E_prune(inputs[i][3] * 2));
        }

        if (inputs[i].length === 5) {
            prune2.push(gen_1C1E_prune(inputs[i][4] * 3, inputs[i][3] * 2, 8));
        }

        if (inputs[i].length === 6) {
            prune2.push(gen_1C2E_prune(inputs[i][4] * 3, inputs[i][3] * 2, inputs[i][5] * 2, 10));
        }
    }
    
    let [best_solution, best_index] = solve_iddfs(solver_inputs);

    //print best solution so far and apply moves...
    for (var i = 0; i < best_solution.length; i++) {
        let face = Math.floor(best_solution[i] / 4);
        let turns = best_solution[i] % 4;
        for (var j = 0; j < turns + 1; j++) {
            corner_pos_array = apply_move_corner_pos(corner_pos_array, face);
            corner_rot_array = apply_move_corner_rot(corner_rot_array, face);
            edge_pos_array = apply_move_edge_pos(edge_pos_array, face);
            edge_rot_array = apply_move_edge_rot(edge_rot_array, face);
        }
        arrays_to_elements();
    }

    let best_inputs = [...inputs[best_index]];
        
    //add solved corners, edges, faces
    solved_corners.push(best_inputs[0]);
    for (var i = 0; i < 3; i++) {
        let poss_face = adjacents[best_inputs[0]].faces[i];
        if (!solved_faces.includes(poss_face)) {
            solved_faces.push(poss_face);
            move_list.splice(move_list.indexOf(poss_face * 4), 4);
        }
    }

    solved_edges.push(best_inputs[1]);
    solved_edges.push(best_inputs[2]);
    if (best_inputs.length > 3) {
        solved_edges.push(best_inputs[3]);
    }
    if (best_inputs.length > 4) {
        solved_corners.push(best_inputs[4]);
        for (var i = 0; i < 3; i++) {
            let poss_face = adjacents[best_inputs[4]].faces[i];
            if (!solved_faces.includes(poss_face)) {
                solved_faces.push(poss_face);
                move_list.splice(move_list.indexOf(poss_face * 4), 4);
            }
        }
    }
    if (best_inputs.length > 5) {
        solved_edges.push(best_inputs[5]);
    }
    
    return best_solution;
}

function get4Inputs() {

    let output = [];
    for (var i = 0; i < 20; i++) {
        let next_edges = [...adjacents[i].edges];
        output.push([i].concat(next_edges));
    }
    return solveInputs(output);

}

function get3Inputs() {

    let output = [];
    let next_corners = getNextCorners();
    
    for (var i = 0; i < next_corners.length; i++) {
        let next_corner = next_corners[i];
        let next_edges = getNextEdges(next_corner);
        output.push([next_corner].concat(next_edges));
    }

    return solveInputs(output);

}

function get3InputsB() {

    let output = [];

    let common_faces = getCommonFaces();
    let next_corners = getNextCorners();
    
    for (var i = 0; i < next_corners.length; i++) {
        if (!adjacents[next_corners[i]].faces.includes(common_faces[0])) {

            let next_corner = next_corners[i];
            let next_edges = getNextEdges(next_corner);
            output.push([next_corner].concat(next_edges));

        }
    }

    return solveInputs(output);

}

function get5Inputs() {

    let common_faces = getCommonFaces();
    let output = [];

    for (var i = 0; i < common_faces.length; i++) {
        let corner_output = [];
        let edge_output = [];
        for (var j = 0; j < 20; j ++) {

            if (adjacents[j].faces.includes(common_faces[i]) && !solved_corners.includes(j)) {

                let next_corner = j;
                corner_output.push(next_corner);
                for (var k = 0; k < 3; k++){
                    let poss_edge = adjacents[next_corner].edges[k];
                    if (!edge_output.includes(poss_edge) && !solved_edges.includes(poss_edge)) {
                        edge_output.push(poss_edge);
                    }
                }

            }
        }
        output.push([corner_output[0], edge_output[0], edge_output[1], edge_output[2], corner_output[1]]);
    }

    return solveInputs(output);
}

function get6Inputs() {

    let output = [];

    let first_inputs = [];
    let next_corners = getNextCorners();

    for (var i = 0; i < next_corners.length; i++) {
    
        let next_corner = next_corners[i];
        let next_edges = getNextEdges(next_corner);
        first_inputs.push([next_corner].concat(next_edges));
   
    }

    for (var i = 0; i < first_inputs.length; i++) {
        
        //add corner and edges to solved temporarily...
        solved_corners.push(first_inputs[i][0]);
        solved_edges.push(first_inputs[i][1]);
        solved_edges.push(first_inputs[i][2]);

        let next_inputs = [];
        next_corners = getNextCorners();
    
        for (var j = 0; j < next_corners.length; j++) {
        
            let next_corner = next_corners[j];
            let next_edges = getNextEdges(next_corner);
            next_inputs.push([next_corner].concat(next_edges));
       
        }

        output.push(first_inputs[i].concat([next_inputs[2][1], next_inputs[2][0], next_inputs[2][2]]));
        output.push(first_inputs[i].concat([next_inputs[3][1], next_inputs[3][0], next_inputs[3][2]]));

        solved_corners.pop();
        solved_edges.pop();
        solved_edges.pop();

    }

    return solveInputs(output);
}

function solve_iddfs(inputs) {

    for (var depth = 0; depth <= 99; depth++) {
        console.log(depth);
        for (var i = 0; i < inputs.length; i++) {
            let solution = solve_phase1(inputs[i], [], depth, i);
            if (solution !== null) {
                return [solution, i];
            }
        }
    }
}

function solve_phase1(inputs, solution, depth_remaining, index) {

    let prune1_idx, prune2_idx;
    prune1_idx = 3600 * inputs[0] + 60 * inputs[1] + inputs[2];
    if (inputs.length === 4) {
        prune2_idx = inputs[3];
    }
    if (inputs.length === 5) {
        prune2_idx = 60 * inputs[4] + inputs[3];
    }
    if (inputs.length === 6) {
        prune2_idx = 3600 * inputs[4] + 60 * inputs[3] + inputs[5];
    }

    if (inputs.length === 3) {
        if (prune1[index][prune1_idx] === 0) {
            return solution
        }
    } else {
        if (prune1[index][prune1_idx] === 0 && prune2[index][prune2_idx] === 0)  {
            return solution
        }
        if (prune2[index][prune2_idx] > depth_remaining) {
            return null
        }
    }
    if (prune1[index][prune1_idx] > depth_remaining) {
        return null
    }

    if (depth_remaining === 0) {
        return null
    }

    for (var i = 0; i < move_list.length; i++) {

        let next_move = move_list[i];
        let new_a = corner_index_trans[inputs[0] * 48 + next_move];
        let new_b = edge_index_trans[inputs[1] * 48 + next_move];
        let new_c = edge_index_trans[inputs[2] * 48 + next_move];
        let new_inputs = [new_a, new_b, new_c];
        if (inputs.length > 3) {
            let new_d = edge_index_trans[inputs[3] * 48 + next_move];
            new_inputs.push(new_d);
        }
        if (inputs.length > 4) {
            let new_e = corner_index_trans[inputs[4] * 48 + next_move];
            new_inputs.push(new_e);
        }
        if (inputs.length > 5) {
            let new_f = edge_index_trans[inputs[5] * 48 + next_move];
            new_inputs.push(new_f);
        }

        let result = solve_phase1(new_inputs, [...solution, next_move], depth_remaining - 1, index);
        if (result !== null) {
            return result
        }

    }

    return null;

}

function gen_1E_prune(idx_a) {

    let output = new Uint8Array(60).fill(99);
    branch1E(output, idx_a, 0, 6);

    return output

}

function branch1E(output, idx, depth, depth_limit) {

    if (depth < output[idx]) {
        output[idx] = depth;
    } else {
        return
    }

    if (depth === depth_limit) {
        return
    }

    for (var i = 0; i < 48; i++) {

        let new_idx = edge_index_trans[idx * 48 + i]
        branch1E(output, new_idx, depth + 1, depth_limit);

    }
}

function gen_1C2E_prune(idx_a, idx_b, idx_c, target_depth) {

    let output = new Uint8Array(60 * 60 * 60).fill(99);
    let target = 3600 * idx_a + 60 * idx_b + idx_c;
    branch1C2E(output, target, 0, target_depth);

    let count = 0;
    for (var i = 0; i < output.length; i++) {
        if (output[i] !== 99) {
            count++
        }
    }
    console.log(count);

    return output

}

function branch1C2E(output, idx, depth, depth_limit) {

    if (depth < output[idx]) {
        output[idx] = depth;
    } else {
        return
    }

    if (depth === depth_limit) {
        return
    }

    let idx_copy = idx;
    let idx_a = Math.floor(idx_copy / 3600);
    idx_copy %= 3600;
    let idx_b = Math.floor(idx_copy / 60);
    let idx_c = idx_copy % 60;

    for (var i = 0; i < move_list.length; i++) {
        
        let next_move = move_list[i];
        let new_idx_a = corner_index_trans[idx_a * 48 + next_move]
        let new_idx_b = edge_index_trans[idx_b * 48 + next_move];
        let new_idx_c = edge_index_trans[idx_c * 48 + next_move];

        let new_idx = 3600 * new_idx_a + 60 * new_idx_b + new_idx_c;
        branch1C2E(output, new_idx, depth + 1, depth_limit);

    }
}

function gen_1C1E_prune(idx_a, idx_b, target_depth) {

    let output = new Uint8Array(60 * 60).fill(99);
    let target = 60 * idx_a + idx_b;
    branch1C1E(output, target, 0, target_depth);

    let count = 0;
    for (var i = 0; i < output.length; i++) {
        if (output[i] !== 99) {
            count++
        }
    }
    console.log(count);

    return output

}

function branch1C1E(output, idx, depth, depth_limit) {

    if (depth < output[idx]) {
        output[idx] = depth;
    } else {
        return
    }

    if (depth === depth_limit) {
        return
    }

    let idx_copy = idx;
    let idx_a = Math.floor(idx_copy / 60);
    let idx_b = idx_copy % 60;

    for (var i = 0; i < move_list.length; i++) {
        
        let next_move = move_list[i];
        let new_idx_a = corner_index_trans[idx_a * 48 + next_move]
        let new_idx_b = edge_index_trans[idx_b * 48 + next_move];

        let new_idx = 60 * new_idx_a + new_idx_b;
        branch1C1E(output, new_idx, depth + 1, depth_limit);

    }
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

function getNextEdges(corner) {

    let out = [];
    for (var i = 0; i < 3; i++) {
        if (!solved_edges.includes(adjacents[corner].edges[i])) {
            out.push(adjacents[corner].edges[i]);
        }
    }
    return out

}

function getNextCorners() {

    let funOutput = []
    for (var i = 0; i < solved_corners.length; i++) {
        for (var j = 0; j < 3; j++) {
            let poss_corner = adjacents[solved_corners[i]].corners[j];
            if (!solved_corners.includes(poss_corner)) {
                funOutput.push(poss_corner);
            }
        }
    }
    return funOutput

}

function getCommonFaces() {

    let funOutput = [];
    let face_count = new Uint8Array(20).fill(0);
    for (var i = 0; i < solved_corners.length; i++) {
        for (var j = 0; j < 3; j++) {
            face_count[adjacents[solved_corners[i]].faces[j]]++;
        }
    }

    for (var i = 0; i < 20; i++) {
        if (face_count[i] === 3) {
            funOutput.push(i);
        }
    }
    return funOutput
}