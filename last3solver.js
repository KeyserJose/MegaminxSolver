//const { F_prune } = require('./F_prune.js');
//const { edge_rot_trans } = require('./edge_rot_trans.js');
//const { edge_rot_prune } = require('./edge_rot_prune.js');

//const { corner_pos_trans } = require('./corner_pos_trans.js');
//const { corner_rot_trans } = require('./corner_rot_trans.js');
//const { corner_prune } = require('./corner_prune.js');
//const { edge_pos_trans } = require('./edge_pos_trans.js');
//const { edge_pos_prune } = require('./edge_pos_prune.js');

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

let best_corner_pos_array, best_corner_rot_array, best_edge_pos_array, best_order;

function solveF(remaining_faces) {

  let face0, face1, face2;
  let best_length = 100; //length of best solution so far...
  let best_solution;

  for (var i = 0; i < remaining_faces.length; i++) {

    face0 = remaining_faces[i]; //set top face
  
    //find which is face1/face2
    let index = adjacent_faces[face0].indexOf(remaining_faces[( i + 1) % 3]);
    if (adjacent_faces[face0][(index + 1) % 5] === remaining_faces[( i + 2) % 3]) {
      face1 = remaining_faces[( i + 2) % 3];
      face2 = remaining_faces[( i + 1) % 3];
    } else {
      face1 = remaining_faces[( i + 1) % 3];
      face2 = remaining_faces[( i + 2) % 3];
    }
  
    //establish color transformation
    index = adjacent_faces[face0].indexOf(face1);
  
    let new_letter_order = [
      face0,
      face1,
      face2,
      adjacent_faces[face0][(index + 1) % 5],
      adjacent_faces[face0][(index + 2) % 5],
      adjacent_faces[face0][(index + 3) % 5],
    ];
    new_letter_order.push(opposites[new_letter_order[4]]);
    new_letter_order.push(opposites[new_letter_order[3]]);
    new_letter_order.push(opposites[new_letter_order[1]]);
    new_letter_order.push(opposites[new_letter_order[2]]);
    new_letter_order.push(opposites[new_letter_order[5]]);
    new_letter_order.push(opposites[new_letter_order[0]]);

    //build new list of corners
    new_corner_list = new Array(20);
    for (var j = 0; j < new_corner_list.length; j++) {
      new_str = ''
      for (var k = 0; k < 3; k++) {
        new_str += new_letter_order[first_color_order.indexOf(list_of_corners[j][k])];
      }
      new_corner_list[j] = new_str;
    }

    //build new list of edges
    new_edge_list = new Array(30);
    for (var j = 0; j < new_edge_list.length; j++) {
      new_str = ''
      for (var k = 0; k < 2; k++) {
        new_str += new_letter_order[first_color_order.indexOf(list_of_edges[j][k])];
      }
      new_edge_list[j] = new_str;
    }

    //new corner pos array
    let new_corner_pos_array = new Array(10);
    let new_corner_rot_array = new Array(10);
    for (var j = 0; j < 10; j++) {
  
      let new_corner = new_corner_list[j];      //e.g: new_corner = 'LWA'
  
      for (var k = 0; k < 20; k++) {
  
        if (list_of_corners[k].includes(new_corner[0]) && list_of_corners[k].includes(new_corner[1]) && list_of_corners[k].includes(new_corner[2])) {
  
          //k = index of new_corner in old list.
          let idx = corner_pos_array[k];          //points to idx in old list of corner that occupies this position on the puzzle
          let old_corner = list_of_corners[idx];  //the piece that occupies this space, e.g. 'SBG'
  
          for (var l = 0; l < 20; l++) {
  
            if (new_corner_list[l].includes(old_corner[0]) && new_corner_list[l].includes(old_corner[1]) && new_corner_list[l].includes(old_corner[2])) {
      
              //l = idx of 'SBG' (or variation of) in the new list
              new_corner_pos_array[j] = l;
              let first_letter =  new_corner_list[l][0];    //e.g: first letter of 'GSB', i.e. 'G'
              let idx1 = old_corner.split('').indexOf(first_letter)   //where G appears in old corner format (2)
              idx1 += corner_rot_array[k];                            //add the rotation from old format (+2)
              idx1 %= 3;                                              //apply modulus 3 (=1)
              let letter1 = list_of_corners[k][idx1];                 //which letter does G map to in the puzzle? A
              new_corner_rot_array[j] = new_corner.split('').indexOf(letter1);  //rotation of piece in new format
              break
      
            }
          }
          break
        }
      } 
    }

    //new edge pos array
    let new_edge_pos_array = new Array(12);
    let new_edge_rot_array = new Array(12);
    for (var j = 0; j < 12; j++) {

      let new_edge = new_edge_list[j];      //e.g: new_corner = 'LA'

      for (var k = 0; k < 30; k++) {

        if (list_of_edges[k].includes(new_edge[0]) && list_of_edges[k].includes(new_edge[1])) {

          //j = index of new_edge in old list.
          let idx = edge_pos_array[k];      //points to idx in old list of corner that occupies this position on the puzzle
          let old_edge = list_of_edges[idx];  //the piece that occupies this space, e.g. 'LO'

          for (var l = 0; l < 30; l++) {

            if (new_edge_list[l].includes(old_edge[0]) && new_edge_list[l].includes(old_edge[1])) {
  
              //k = idx of 'LO' (or variation of) in the new list
              new_edge_pos_array[j] = l;
              let first_letter =  new_edge_list[l][0];    //e.g: first letter of 'LO', i.e. 'L'
              let idx1 = old_edge.split('').indexOf(first_letter)   //where L appears in old corner format (0)
              idx1 += edge_rot_array[k];                            //add the rotation from old format (+0)
              idx1 %= 2;                                              //apply modulus 2 (=0)
              let letter1 = list_of_edges[k][idx1];                 //which letter does L map to in the puzzle? A
              new_edge_rot_array[j] = new_edge.split('').indexOf(letter1);  //rotation of piece in new format
              break
  
            }
          }
          break
        }
      }
    }

    let idx_edge = edge_rot_to_index(new_edge_rot_array);

    let idx_a = new_corner_pos_array.indexOf(8);
    idx_a = idx_a * 3 + new_corner_rot_array[idx_a];
  
    let idx_b = new_corner_pos_array.indexOf(9);
    idx_b = idx_b * 3 + new_corner_rot_array[idx_b];
  
    let idx_c = new_edge_pos_array.indexOf(9);
    idx_c = idx_c * 2 + new_edge_rot_array[idx_c];
  
    let idx_d = new_edge_pos_array.indexOf(10);
    idx_d = idx_d * 2 + new_edge_rot_array[idx_d];
  
    let idx_e = new_edge_pos_array.indexOf(11);
    idx_e = idx_e * 2 + new_edge_rot_array[idx_e];

    let solution = solve_iddfs_phaseF(idx_edge, idx_a, idx_b, idx_c, idx_d, idx_e, best_length - 1);
    if (solution) {
      best_length = solution.length;
      best_solution = [...solution];
      best_order = [face0, face1, face2];
      best_corner_pos_array = [...new_corner_pos_array];
      best_corner_rot_array = [...new_corner_rot_array];
      best_edge_pos_array = [...new_edge_pos_array];
    }
  }


  for (var i = 0; i < best_solution.length; i++) {
    let face = Math.floor(best_solution[i] / 4);
    let old_face = first_color_order.indexOf(best_order[face]);
    let turns = best_solution[i] % 4;
    for (var j = 0; j < turns + 1; j++) {
        corner_pos_array = apply_move_corner_pos(corner_pos_array, old_face);
        corner_rot_array = apply_move_corner_rot(corner_rot_array, old_face);
        edge_pos_array = apply_move_edge_pos(edge_pos_array, old_face);
        edge_rot_array = apply_move_edge_rot(edge_rot_array, old_face);
        
        best_corner_pos_array = apply_move_corner_pos(best_corner_pos_array, face);
        best_corner_rot_array = apply_move_corner_rot(best_corner_rot_array, face);
        best_edge_pos_array = apply_move_edge_pos(best_edge_pos_array, face);

    }
    arrays_to_elements();
  }


  return [best_order, best_solution];

}

function solve_iddfs_phaseF(rot_idx, IFR_idx,  FIY_idx, FR_idx, FI_idx, FY_idx, depth_limit) {

  let F_index = 414720 * IFR_idx + 13824 * FIY_idx + 576 * FR_idx + 24 * FI_idx + FY_idx;
  const starting_depth = Math.max(edge_rot_prune[rot_idx], F_prune[F_index]);

  for (var depth = starting_depth; depth <= depth_limit; depth++) {
      let solution = solve_phaseF(rot_idx, IFR_idx,  FIY_idx, FR_idx, FI_idx, FY_idx, [], depth, 12);
      if (solution !== null) {
          return solution
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

function startPhaseAW() {
  
  best_corner_pos_array.splice(8, 2);
  best_corner_rot_array.splice(8, 2);
  best_edge_pos_array.splice(9, 3);

  console.log(best_corner_pos_array);
  console.log(best_edge_pos_array);

  let corner_pos_idx = corner_pos_to_index(best_corner_pos_array);
  let corner_rot_idx = corner_rot_to_index(best_corner_rot_array);
  let edge_pos_idx = edge_pos_to_index(best_edge_pos_array);

  let best_solution =  solve_iddfs_phaseAW(corner_pos_idx, corner_rot_idx, edge_pos_idx, 99);

  for (var i = 0; i < best_solution.length; i++) {
    let face = Math.floor(best_solution[i] / 4);
    let old_face = first_color_order.indexOf(best_order[face]);
    let turns = best_solution[i] % 4;
    for (var j = 0; j < turns + 1; j++) {
        corner_pos_array = apply_move_corner_pos(corner_pos_array, old_face);
        corner_rot_array = apply_move_corner_rot(corner_rot_array, old_face);
        edge_pos_array = apply_move_edge_pos(edge_pos_array, old_face);
        edge_rot_array = apply_move_edge_rot(edge_rot_array, old_face);
    }
    arrays_to_elements();
  }
  return best_solution

}

function solve_iddfs_phaseAW(pos_idx, rot_idx, edge_idx, depth_limit) {

  const starting_depth = Math.max(corner_prune[pos_idx * 2187 + rot_idx], edge_pos_prune[edge_idx]);
  console.log(starting_depth);

  for (var depth = starting_depth; depth <= depth_limit; depth++) {
      let solution = solve_phaseAW(pos_idx, rot_idx, edge_idx, [], depth, 8);
      if (solution !== null) {
          console.log(solution);
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