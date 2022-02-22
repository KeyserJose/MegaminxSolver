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
  
    postMessage(best_solution);
  
  }

  get4Inputs();