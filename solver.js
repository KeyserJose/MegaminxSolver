let move_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47];

const list_of_corners = ['WOR', 'WRF', 'WFA', 'WAL', 'WLO', 'YAF', 'AYP', 'PLA', 'IFR', 'FIY', 'LPG', 'GOL', 'OGB', 'BRO', 'RBI', 'SPY', 'SYI', 'SIB', 'SBG', 'SGP'];
const list_of_edges = ['WR', 'WF', 'WA', 'WL', 'WO', 'FA', 'YA', 'PA', 'LA', 'FR', 'FI', 'FY', 'LP', 'LG', 'LO', 'OG', 'OB', 'OR', 'RB', 'RI', 'YP', 'YS', 'YI', 'IS', 'IB', 'BS', 'BG', 'GS', 'GP', 'SP'];
const first_color_order = ['W', 'A', 'F', 'L', 'O', 'R', 'Y', 'I', 'B', 'G', 'P', 'S'];

const adjacent_faces = {
  'W': ['L', 'O', 'R', 'F', 'A'],
  'L': ['W', 'A', 'P', 'G', 'O'],
  'A': ['W', 'F', 'Y', 'P', 'L'],
  'F': ['W', 'R', 'I', 'Y', 'A'],
  'R': ['W', 'O', 'B', 'I', 'F'],
  'O': ['W', 'L', 'G', 'B', 'R'],
  'S': ['Y', 'I', 'B', 'G', 'P'],
  'Y': ['A', 'F', 'I', 'S', 'P'],
  'I': ['F', 'R', 'B', 'S', 'Y'],
  'B': ['R', 'O', 'G', 'S', 'I'],
  'G': ['L', 'P', 'S', 'B', 'O'],
  'P': ['A', 'Y', 'S', 'G', 'L']
};

const opposites = {
  'W': 'S',
  'L': 'I',
  'A': 'B',
  'F': 'G',
  'R': 'P',
  'O': 'Y',
  'S': 'W',
  'Y': 'O',
  'I': 'L',
  'B': 'A',
  'G': 'F',
  'P': 'R'
};

let faces_solved;

const all_corners = [
  'WOR', 'RWO', 'ORW', 'WRF', 'FWR', 'RFW', 'WFA', 'AWF', 'FAW', 'WAL', 'LWA', 'ALW', 'WLO', 'OWL', 'LOW',
  'YAF', 'FYA', 'AFY', 'AYP', 'PAY', 'YPA', 'PLA', 'APL', 'LAP', 'IFR', 'RIF', 'FRI', 'FIY', 'YFI', 'IYF',
  'LPG', 'GLP', 'PGL', 'GOL', 'LGO', 'OLG', 'OGB', 'BOG', 'GBO', 'BRO', 'OBR', 'ROB', 'RBI', 'IRB', 'BIR',
  'SPY', 'YSP', 'PYS', 'SYI', 'ISY', 'YIS', 'SIB', 'BSI', 'IBS', 'SBG', 'GSB', 'BGS', 'SGP', 'PSG', 'GPS'
];

function get3Inputs() {

  let output = [];

  for (var i = 0; i < all_corners.length; i++) {

    let this_corner = all_corners[i].split('');
    if (!faces_solved.includes(this_corner[0]) && faces_solved.includes(this_corner[1]) && faces_solved.includes(this_corner[2])) {

      let mini_output = [];
      let new_letter_order = getNewLetterOrder(this_corner);
      let new_list_of_corners = getNewListOfCorners(new_letter_order);
      let new_list_of_edges = getNewListOfEdges(new_letter_order);

      mini_output.push(getCornerInput(this_corner[0], this_corner[1], this_corner[2], new_list_of_corners));
      mini_output.push(getEdgeInput(this_corner[0], this_corner[2], new_list_of_edges));
      mini_output.push(getEdgeInput(this_corner[0], this_corner[1], new_list_of_edges));
      output.push([mini_output, new_letter_order]);

    }
  }

  let [best_solution, best_order] = solve_iddfs(output);

  faces_solved.push(best_order[0]);

  for (var i = 0; i < best_solution.length; i++) {
    
    let face = best_order[Math.floor(best_solution[i] / 4)];
    let turns = best_solution[i] % 4;
    let face_old = first_color_order.indexOf(face);
    for (var j = 0; j < turns + 1; j++) {
      corner_pos_array = apply_move_corner_pos(corner_pos_array, face_old); 
      corner_rot_array = apply_move_corner_rot(corner_rot_array, face_old); 
      edge_pos_array = apply_move_edge_pos(edge_pos_array, face_old); 
      edge_rot_array = apply_move_edge_rot(edge_rot_array, face_old); 
    }
    arrays_to_elements();
    best_solution[i] = face_old * 4 + turns;
  }

  return best_solution

}

function get3InputsB() {

  let common_face = getCommonFace()[0];
  let color0 = opposites[common_face];

  let output = [];

  for (var i = 0; i < all_corners.length; i++) {

    let this_corner = all_corners[i].split('');
    if (this_corner[0] === color0 && faces_solved.includes(this_corner[1]) && faces_solved.includes(this_corner[2])) {

      let mini_output = [];
      let new_letter_order = getNewLetterOrder(this_corner);
      let new_list_of_corners = getNewListOfCorners(new_letter_order);
      let new_list_of_edges = getNewListOfEdges(new_letter_order);

      mini_output.push(getCornerInput(this_corner[0], this_corner[1], this_corner[2], new_list_of_corners));
      mini_output.push(getEdgeInput(this_corner[0], this_corner[2], new_list_of_edges));
      mini_output.push(getEdgeInput(this_corner[0], this_corner[1], new_list_of_edges));
      output.push([mini_output, new_letter_order]);

    }
  }

  let [best_solution, best_order] = solve_iddfs(output);

  faces_solved.push(best_order[0]);

  for (var i = 0; i < best_solution.length; i++) {
    
    let face = best_order[Math.floor(best_solution[i] / 4)];
    let turns = best_solution[i] % 4;
    let face_old = first_color_order.indexOf(face);
    for (var j = 0; j < turns + 1; j++) {
      corner_pos_array = apply_move_corner_pos(corner_pos_array, face_old); 
      corner_rot_array = apply_move_corner_rot(corner_rot_array, face_old); 
      edge_pos_array = apply_move_edge_pos(edge_pos_array, face_old); 
      edge_rot_array = apply_move_edge_rot(edge_rot_array, face_old); 
    }
    arrays_to_elements();
    best_solution[i] = face_old * 4 + turns;
  }

  return best_solution

}


function getLast2Inputs() {

  for (var i = 0; i < all_corners.length; i++) {

    let this_corner = all_corners[i].split('');
    if (!faces_solved.includes(this_corner[0]) && faces_solved.includes(this_corner[1]) && faces_solved.includes(this_corner[2])) {

      let new_letter_order = getNewLetterOrder(this_corner);
      if (!faces_solved.includes(new_letter_order[1])) {

        let new_list_of_corners = getNewListOfCorners(new_letter_order);
        let new_list_of_edges = getNewListOfEdges(new_letter_order);

        //new corner array
        let new_corner_pos_array = new Array(8);
        let new_corner_rot_array = new Array(8);

        for (var j = 0; j < 8; j++) {
  
          let new_corner = new_list_of_corners[j].split('');
          let new_value = getCornerInput(new_corner[0], new_corner[1], new_corner[2], new_list_of_corners);
          new_corner_pos_array[ Math.floor(new_value / 3) ] = j;
          new_corner_rot_array[ Math.floor(new_value / 3) ] = new_value % 3;

        }

        //new edge array
        let new_edge_pos_array = new Array(9);

        for (var j = 0; j < 9; j++) {
  
          let new_edge = new_list_of_edges[j].split('');
          let new_value = getEdgeInput(new_edge[0], new_edge[1], new_list_of_edges);
          new_edge_pos_array[ Math.floor(new_value / 2) ] = j;

        }

        let corner_pos_idx = corner_pos_to_index(new_corner_pos_array);
        let corner_rot_idx = corner_rot_to_index(new_corner_rot_array);
        let edge_pos_idx = edge_pos_to_index(new_edge_pos_array);
      
        let best_solution =  solve_iddfs_phaseAW(corner_pos_idx, corner_rot_idx, edge_pos_idx, 99);

        for (var i = 0; i < best_solution.length; i++) {
    
          let face = new_letter_order[Math.floor(best_solution[i] / 4)];
          let turns = best_solution[i] % 4;
          let face_old = first_color_order.indexOf(face);
          for (var j = 0; j < turns + 1; j++) {
            corner_pos_array = apply_move_corner_pos(corner_pos_array, face_old); 
            corner_rot_array = apply_move_corner_rot(corner_rot_array, face_old); 
            edge_pos_array = apply_move_edge_pos(edge_pos_array, face_old); 
            edge_rot_array = apply_move_edge_rot(edge_rot_array, face_old); 
          }
          arrays_to_elements();
          best_solution[i] = face_old * 4 + turns;
        }

        return best_solution
      }
    }
  }
}


function getLast3Inputs() {

  let output = [];

  for (var i = 0; i < all_corners.length; i++) {

    let this_corner = all_corners[i].split('');
    if (!faces_solved.includes(this_corner[0]) && faces_solved.includes(this_corner[1]) && faces_solved.includes(this_corner[2])) {

      let new_letter_order = getNewLetterOrder(this_corner);
      if (!faces_solved.includes(new_letter_order[0]) && !faces_solved.includes(new_letter_order[1]) && !faces_solved.includes(new_letter_order[2])) {

        let new_list_of_corners = getNewListOfCorners(new_letter_order);
        let new_list_of_edges = getNewListOfEdges(new_letter_order);

        //new edge rot array
        let new_edge_rot_array = new Array(12);

        for (var j = 0; j < 12; j++) {
  
          let new_edge = new_list_of_edges[j].split('');      //e.g: new_corner = 'LWA'
          let new_value = getEdgeInput(new_edge[0], new_edge[1], new_list_of_edges);
          new_edge_rot_array[ Math.floor(new_value / 2) ] = new_value % 2;

        }

        let mini_output = [edge_rot_to_index(new_edge_rot_array)];
        mini_output.push(getCornerInput(new_letter_order[7], new_letter_order[2], new_letter_order[5], new_list_of_corners));
        mini_output.push(getCornerInput(new_letter_order[2], new_letter_order[7], new_letter_order[6], new_list_of_corners));
        mini_output.push(getEdgeInput(new_letter_order[2], new_letter_order[5], new_list_of_edges));
        mini_output.push(getEdgeInput(new_letter_order[2], new_letter_order[7], new_list_of_edges));
        mini_output.push(getEdgeInput(new_letter_order[2], new_letter_order[6], new_list_of_edges));

        output.push([mini_output, new_letter_order]);

      }
    }
  }

  let [best_solution, best_order] = solve_iddfsF(output);

  faces_solved.push(best_order[2]);

  for (var i = 0; i < best_solution.length; i++) {
    
    let face = best_order[Math.floor(best_solution[i] / 4)];
    let turns = best_solution[i] % 4;
    let face_old = first_color_order.indexOf(face);
    for (var j = 0; j < turns + 1; j++) {
      corner_pos_array = apply_move_corner_pos(corner_pos_array, face_old); 
      corner_rot_array = apply_move_corner_rot(corner_rot_array, face_old); 
      edge_pos_array = apply_move_edge_pos(edge_pos_array, face_old); 
      edge_rot_array = apply_move_edge_rot(edge_rot_array, face_old);
    }
    arrays_to_elements();
    best_solution[i] = face_old * 4 + turns;
  }

  return best_solution

}


function get5Inputs() {

  let common_faces = getCommonFace();
  let output = [];

  for (var i = 0; i < all_corners.length; i++) {

    let this_corner = all_corners[i].split('');
    if (common_faces.includes(this_corner[0]) && faces_solved.includes(this_corner[1]) && faces_solved.includes(this_corner[2])) {

      let new_letter_order = getNewLetterOrder(this_corner);
      if (faces_solved.includes(new_letter_order[2])) {

        let mini_output = [];
        let new_list_of_corners = getNewListOfCorners(new_letter_order);
        let new_list_of_edges = getNewListOfEdges(new_letter_order);

        mini_output.push(getCornerInput(this_corner[0], this_corner[1], this_corner[2], new_list_of_corners));
        mini_output.push(getEdgeInput(this_corner[0], this_corner[2], new_list_of_edges));
        mini_output.push(getEdgeInput(this_corner[0], this_corner[1], new_list_of_edges));
        mini_output.push(getEdgeInput(this_corner[0], new_letter_order[2], new_list_of_edges));
        mini_output.push(getCornerInput(this_corner[0], this_corner[2], new_letter_order[2], new_list_of_corners));
        console.log(mini_output);
        output.push([mini_output, new_letter_order]);

      }
    }
  }

  let [best_solution, best_order] = solve_iddfs(output);

  faces_solved.push(best_order[0]);

  for (var i = 0; i < best_solution.length; i++) {
    
    let face = best_order[Math.floor(best_solution[i] / 4)];
    let turns = best_solution[i] % 4;
    let face_old = first_color_order.indexOf(face);
    for (var j = 0; j < turns + 1; j++) {
      corner_pos_array = apply_move_corner_pos(corner_pos_array, face_old); 
      corner_rot_array = apply_move_corner_rot(corner_rot_array, face_old); 
      edge_pos_array = apply_move_edge_pos(edge_pos_array, face_old); 
      edge_rot_array = apply_move_edge_rot(edge_rot_array, face_old); 
    }
    arrays_to_elements();
    best_solution[i] = face_old * 4 + turns;
  }

  return best_solution
}

function get4Inputs() {

  faces_solved = [];

  let output = [];

  for (var i = 0; i < list_of_corners.length; i++) {

    let mini_output = [];

    let this_corner = list_of_corners[i].split('');
    let new_letter_order = getNewLetterOrder(this_corner);
    let new_list_of_corners = getNewListOfCorners(new_letter_order);
    let new_list_of_edges = getNewListOfEdges(new_letter_order);

    mini_output.push(getCornerInput(new_letter_order[0], new_letter_order[4], new_letter_order[5], new_list_of_corners));
    mini_output.push(getEdgeInput(new_letter_order[0], new_letter_order[5], new_list_of_edges));
    mini_output.push(getEdgeInput(new_letter_order[0], new_letter_order[4], new_list_of_edges));
    mini_output.push(getEdgeInput(new_letter_order[4], new_letter_order[5], new_list_of_edges));
    output.push([mini_output, new_letter_order]);

  }

  let [best_solution, best_order] = solve_iddfs(output);

  //add to faces solved
  faces_solved.push(best_order[0]);
  faces_solved.push(best_order[4]);
  faces_solved.push(best_order[5]);

  out_solution = [];

  for (var i = 0; i < best_solution.length; i++) {
    
    let face = best_order[Math.floor(best_solution[i] / 4)];
    let turns = best_solution[i] % 4;
    let face_old = first_color_order.indexOf(face);
    for (var j = 0; j < turns + 1; j++) {
      corner_pos_array = apply_move_corner_pos(corner_pos_array, face_old); 
      corner_rot_array = apply_move_corner_rot(corner_rot_array, face_old); 
      edge_pos_array = apply_move_edge_pos(edge_pos_array, face_old); 
      edge_rot_array = apply_move_edge_rot(edge_rot_array, face_old); 
    }
    arrays_to_elements();
    best_solution[i] = face_old * 4 + turns;
  }

  return best_solution

}

function solve_iddfs(inputs) {

  for (var depth = 0; depth <= 99; depth++) {
    console.log(depth);
    for (var i = 0; i < inputs.length; i++) {

      //change move list
      move_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
      for (var j = 0; j < faces_solved.length; j++) {
        let idx0 = inputs[i][1].indexOf(faces_solved[j]);
        move_list.splice(move_list.indexOf(idx0 * 4), 4);
      }

      let solution = solve_phase1(inputs[i][0], [], depth, 12);
      if (solution !== null) {
        return [solution, inputs[i][1]];
      }
    }
  }
}

function solve_phase1(inputs, solution, depth_remaining, prev_face) {

  let prune1_idx = 3600 * inputs[0] + 60 * inputs[1] + inputs[2];
  let prune2_idx, prune3_idx;
  if (inputs.length === 4) {
    prune2_idx = inputs[3];
  }
  if (inputs.length === 5) {
    prune3_idx = 60 * inputs[4] + inputs[3];
  }


  if (inputs.length === 3) {
    if (prune1[prune1_idx] === 0) {
      return solution
    }
  }

  if (inputs.length === 4) {
    if (prune1[prune1_idx] === 0 && prune2[prune2_idx] === 0) {
      return solution
    }
    if (prune2[prune2_idx] > depth_remaining) {
      return null
    }
  }

  if (inputs.length === 5) {
    if (prune1[prune1_idx] === 0 && prune3[prune3_idx] === 0) {
      return solution
    }
    if (prune3[prune3_idx] > depth_remaining) {
      return null
    }
  }
  
  if (prune1[prune1_idx] > depth_remaining) {
    return null
  }

  if (depth_remaining === 0) {
      return null
  }

  for (var i = 0; i < move_list.length; i++) {

      let next_move = move_list[i];
      let next_face = Math.floor(next_move / 4)

      if (next_face !== prev_face) {

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
  
        let result = solve_phase1(new_inputs, [...solution, next_move], depth_remaining - 1, next_face);
        if (result !== null) {
            return result
        }

      }
  }

  return null;

}

function solve_iddfsF(inputs) {

  for (var depth = 0; depth <= 99; depth++) {
    console.log(depth);
    for (var i = 0; i < inputs.length; i++) {

      let solution = solve_phaseF(inputs[i][0][0], inputs[i][0][1], inputs[i][0][2], inputs[i][0][3], inputs[i][0][4], inputs[i][0][5], [], depth, 12);
      if (solution !== null) {
        return [solution, inputs[i][1]];
      }
    }
  }
}

function solve_phaseF(rot_idx, IFR_idx,  FIY_idx, FR_idx, FI_idx, FY_idx, solution, depth_remaining, prev_move) {

  let F_index = 414720 * IFR_idx + 13824 * FIY_idx + 576 * FR_idx + 24 * FI_idx + FY_idx;

  if (edge_rot_prune[rot_idx] === 0 && F_prune[F_index] === 0)  {
      return solution
  }

  if (depth_remaining === 0) {
      return null
  }

  if (edge_rot_prune[rot_idx] > depth_remaining) {
      return null
  }

  if (F_prune[F_index] > depth_remaining) {
      return null
  }

  const move_list = [
          [4, 5, 6, 7, 8, 9, 10, 11],
          [4, 5, 6, 7, 8, 9, 10, 11],
          [4, 5, 6, 7, 8, 9, 10, 11],
          [4, 5, 6, 7, 8, 9, 10, 11],
          [0, 1, 2, 3, 8, 9, 10, 11],
          [0, 1, 2, 3, 8, 9, 10, 11],
          [0, 1, 2, 3, 8, 9, 10, 11],
          [0, 1, 2, 3, 8, 9, 10, 11],
          [0, 1, 2, 3, 4, 5, 6, 7],
          [0, 1, 2, 3, 4, 5, 6, 7],
          [0, 1, 2, 3, 4, 5, 6, 7],
          [0, 1, 2, 3, 4, 5, 6, 7],
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  ];

  for (var i = 0; i < move_list[prev_move].length; i++) {

      let next_move = move_list[prev_move][i];

      var new_rot = edge_rot_trans[rot_idx * 12 + next_move];
      var new_IFR = corner_index_trans[IFR_idx * 48 + next_move];
      var new_FIY = corner_index_trans[FIY_idx * 48 + next_move];
      var new_FR = edge_index_trans[FR_idx * 48 + next_move];
      var new_FI = edge_index_trans[FI_idx * 48 + next_move];
      var new_FY = edge_index_trans[FY_idx * 48 + next_move];

      let result = solve_phaseF(new_rot, new_IFR, new_FIY, new_FR, new_FI, new_FY, [...solution, next_move], depth_remaining - 1, next_move);
      if (result !== null) {
          return result
      }

  }

  return null;

}

function solve_iddfs_phaseAW(pos_idx, rot_idx, edge_idx, depth_limit) {

  const starting_depth = Math.max(corner_prune[pos_idx * 2187 + rot_idx], edge_pos_prune[edge_idx]);
  console.log(starting_depth);

  for (var depth = starting_depth; depth <= depth_limit; depth++) {
      let solution = solve_phaseAW(pos_idx, rot_idx, edge_idx, [], depth, 8);
      if (solution !== null) {
          return solution;
      }
  }
  return null

}

function solve_phaseAW(pos_idx, rot_idx, edge_idx, solution, depth_remaining, prev_move) {

  if (pos_idx === 0 && rot_idx === 0 && edge_idx === 0) {
      return solution
  }

  if (depth_remaining === 0) {
      return null
  }

  if (corner_prune[pos_idx * 2187 + rot_idx] > depth_remaining  || edge_pos_prune[edge_idx] > depth_remaining) {
         return null
     }

  const move_list = [
      [4, 5, 6, 7],
      [4, 5, 6, 7],
      [4, 5, 6, 7],
      [4, 5, 6, 7],
      [0, 1, 2, 3],
      [0, 1, 2, 3],
      [0, 1, 2, 3],
      [0, 1, 2, 3],
      [0, 1, 2, 3, 4, 5, 6, 7]
  ];   

  for (var i = 0; i < move_list[prev_move].length; i++) {

      let next_move = move_list[prev_move][i];

      var new_pos = corner_pos_trans[pos_idx * 8 + next_move];
      var new_rot = corner_rot_trans[rot_idx * 8 + next_move];
      var new_edge = edge_pos_trans[edge_idx * 8 + next_move];

      let result = solve_phaseAW(new_pos, new_rot, new_edge, [...solution, next_move], depth_remaining - 1, next_move);
      if (result !== null) {
          return result
      }

  }

  return null;

}



function getNewListOfCorners(new_letter_order) {

  let new_list_of_corners = new Array(20);
  for (var j = 0; j < list_of_corners.length; j++) {
    str = '';
    for (var k = 0; k < 3; k++) {
      let idxC =  first_color_order.indexOf(list_of_corners[j].split('')[k]);
      str += new_letter_order[idxC];
    }
    new_list_of_corners[j] = str;
  }
  return new_list_of_corners

}

function getNewListOfEdges(new_letter_order) {

  let new_list_of_edges = new Array(30);
  for (var j = 0; j < list_of_edges.length; j++) {
    str = '';
    for (var k = 0; k < 2; k++) {
      let idxC =  first_color_order.indexOf(list_of_edges[j].split('')[k]);
      str += new_letter_order[idxC];
    }
    new_list_of_edges[j] = str;
  }
  return new_list_of_edges

}

function getCornerInput(colorA, colorB, colorC, new_list_of_corners) {

  for (var i = 0; i < list_of_corners.length; i++) {
    if (list_of_corners[i].includes(colorA) && list_of_corners[i].includes(colorB) && list_of_corners[i].includes(colorC)) {

      //old_position is the position of this corner in the old reference
      let idx1 = corner_pos_array.indexOf(i);
      let old_position = list_of_corners[idx1].split('');

      for (var j = 0; j < new_list_of_corners.length; j++) {
    
        if (new_list_of_corners[j].includes(old_position[0]) && new_list_of_corners[j].includes(old_position[1]) && new_list_of_corners[j].includes(old_position[2])) {

          let idx2 = (list_of_corners[i].indexOf(colorA) + corner_rot_array[idx1]) % 3;
          let letter0 = old_position[idx2];
          new_rotation = new_list_of_corners[j].indexOf(letter0);
          return (3 * j + new_rotation);
        
        }
      }
    }
  }
}


function getEdgeInput(colorA, colorB, new_list_of_edges) {

  let edge_array = [colorA, colorB];

  for (var i = 0; i < list_of_edges.length; i++) {

    if (list_of_edges[i].includes(colorA) && list_of_edges[i].includes(colorB)) {

      let idx1 = edge_pos_array.indexOf(i);
      let old_position = list_of_edges[idx1].split('');

      for (var j = 0; j < new_list_of_edges.length; j++) {

        if (new_list_of_edges[j].includes(old_position[0]) && new_list_of_edges[j].includes(old_position[1])) {

          let letter0 = old_position[edge_rot_array[idx1]];
          let idx2 = new_list_of_edges[j].indexOf(letter0);
          let letter1 = list_of_edges[i].split('')[idx2];
          new_rotation = edge_array.indexOf(letter1);
          return (j * 2 + new_rotation);

        }
      }
    }
  }
}

function getNewLetterOrder(corner_to_solve) {

  let idx0 = adjacent_faces[corner_to_solve[0]].indexOf(corner_to_solve[2]);
  let output = [
    corner_to_solve[0],
    adjacent_faces[corner_to_solve[0]][(idx0 + 2) % 5],
    adjacent_faces[corner_to_solve[0]][(idx0 + 1) % 5],
    adjacent_faces[corner_to_solve[0]][(idx0 + 3) % 5],
    corner_to_solve[1],
    corner_to_solve[2],
  ];
  output.push(opposites[output[4]]);
  output.push(opposites[output[3]]);
  output.push(opposites[output[1]]);
  output.push(opposites[output[2]]);
  output.push(opposites[output[5]]);
  output.push(opposites[output[0]]);

  return output

}

function getCommonFace() {

  let output = [];

  for (var i = 0; i < first_color_order.length; i++) {
    let count = 0;
    for (var j = 0; j < adjacent_faces[first_color_order[i]].length; j++) {
      if (faces_solved.includes(adjacent_faces[first_color_order[i]][j])) {
        count++;
      }
    }
    if (count === 3 && !faces_solved.includes(first_color_order[i])) {
      output.push(first_color_order[i]);
    }
  }

  return output

}

function edge_rot_to_index(arr) {

  const powers = [1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1];
  var idx = 0;

  for (var i = 0; i < powers.length; i++) {
      idx += powers[i] * arr[i];
  }
  return idx;

}

function corner_pos_to_index(arr) {

  var idx = 0;
  const factorials = [0, 1, 2, 6, 24, 120, 720, 5040];

  for (var i = 1; i < arr.length; i++) {

      var sum = 0;
      for (var j = 0; j < i; j++) {
          if (arr[j] > arr[i]) {
              sum++;
          }
      }
      idx += sum * factorials[i];
  }

  //divide by 2
  idx = Math.floor(idx / 2)

  return idx;

}

function corner_rot_to_index(arr) {

  const powers = [729, 243, 81, 27, 9, 3, 1];
  var idx = 0;

  for (var i = 0; i < powers.length; i++) {
      idx += powers[i] * arr[i];
  }
  return idx;

}

function edge_pos_to_index(arr) {

  var idx = 0;
  const factorials = [0, 1, 2, 6, 24, 120, 720, 5040, 40320];

  for (var i = 1; i < arr.length; i++) {

      var sum = 0;
      for (var j = 0; j < i; j++) {
          if (arr[j] > arr[i]) {
              sum++;
          }
      }
      idx += sum * factorials[i];
  }

  //divide by 2
  idx = Math.floor(idx / 2)

  return idx;

}