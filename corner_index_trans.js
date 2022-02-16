const corner_index_trans = [3,6,9,12,0,0,0,0,0,0,0,0,0,0,0,0,13,33,38,40,41,43,24,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,7,10,13,1,1,1,1,1,1,1,1,1,1,1,1,14,34,36,41,39,44,25,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,8,11,14,2,2,2,2,2,2,2,2,2,2,2,2,12,35,37,39,40,42,26,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,6,9,12,0,3,3,3,3,26,28,15,8,3,3,3,3,3,3,3,3,1,39,44,25,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,7,10,13,1,4,4,4,4,24,29,16,6,4,4,4,4,4,4,4,4,2,40,42,26,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,11,14,2,5,5,5,5,25,27,17,7,5,5,5,5,5,5,5,5,0,41,43,24,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,9,12,0,3,17,19,21,11,4,24,29,16,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,10,13,1,4,15,20,22,9,5,25,27,17,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,11,14,2,5,16,18,23,10,3,26,28,15,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,12,0,3,6,7,15,20,22,9,9,9,9,23,31,33,14,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,13,1,4,7,8,16,18,23,10,10,10,10,21,32,34,12,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,14,2,5,8,6,17,19,21,11,11,11,11,22,30,35,13,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,0,3,6,9,12,12,12,12,12,12,12,12,10,21,32,34,35,37,39,2,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,1,4,7,10,13,13,13,13,13,13,13,13,11,22,30,35,33,38,40,0,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,2,5,8,11,14,14,14,14,14,14,14,14,9,23,31,33,34,36,41,1,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,20,22,9,7,8,3,26,28,15,15,15,15,15,15,15,15,15,15,15,15,29,49,47,19,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,16,16,16,16,18,23,10,8,6,4,24,29,16,16,16,16,16,16,16,16,16,16,16,16,27,50,45,20,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,17,17,17,17,19,21,11,6,7,5,25,27,17,17,17,17,17,17,17,17,17,17,17,17,28,48,46,18,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,17,18,18,18,18,23,10,8,16,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,17,28,48,46,18,18,18,18,18,18,18,18,18,18,18,18,47,57,32,22,18,18,18,18,19,19,19,19,21,11,6,17,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,15,29,49,47,19,19,19,19,19,19,19,19,19,19,19,19,45,58,30,23,19,19,19,19,20,20,20,20,22,9,7,15,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,16,27,50,45,20,20,20,20,20,20,20,20,20,20,20,20,46,59,31,21,20,20,20,20,21,21,21,21,11,6,17,19,21,21,21,21,32,34,12,10,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,20,46,59,31,21,21,21,21,22,22,22,22,9,7,15,20,22,22,22,22,30,35,13,11,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,18,47,57,32,22,22,22,22,23,23,23,23,10,8,16,18,23,23,23,23,31,33,14,9,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,19,45,58,30,23,23,23,23,24,24,24,24,24,24,24,24,29,16,6,4,24,24,24,24,24,24,24,24,5,0,41,43,24,24,24,24,44,52,50,28,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,25,25,25,25,25,25,25,27,17,7,5,25,25,25,25,25,25,25,25,3,1,39,44,25,25,25,25,42,53,48,29,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,26,26,26,26,26,28,15,8,3,26,26,26,26,26,26,26,26,4,2,40,42,26,26,26,26,43,51,49,27,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,17,7,5,25,27,27,27,27,27,27,27,27,27,27,27,27,50,45,20,16,26,43,51,49,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,28,28,28,28,28,28,28,28,15,8,3,26,28,28,28,28,28,28,28,28,28,28,28,28,48,46,18,17,24,44,52,50,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,29,29,29,29,29,29,29,29,16,6,4,24,29,29,29,29,29,29,29,29,29,29,29,29,49,47,19,15,25,42,53,48,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,30,30,30,30,30,30,30,30,30,30,30,30,35,13,11,22,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,59,54,38,34,23,19,45,58,30,30,30,30,31,31,31,31,31,31,31,31,31,31,31,31,33,14,9,23,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,57,55,36,35,21,20,46,59,31,31,31,31,32,32,32,32,32,32,32,32,32,32,32,32,34,12,10,21,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,58,56,37,33,22,18,47,57,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,33,14,9,23,31,38,40,0,13,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,33,32,58,56,37,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,34,12,10,21,32,36,41,1,14,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,30,59,54,38,34,34,34,34,34,34,34,34,35,35,35,35,35,35,35,35,35,35,35,35,13,11,22,30,37,39,2,12,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,31,57,55,36,35,35,35,35,35,35,35,35,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,36,41,1,14,34,36,36,36,36,36,36,36,36,36,36,36,36,56,51,44,40,35,31,57,55,36,36,36,36,36,36,36,36,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,37,39,2,12,35,37,37,37,37,37,37,37,37,37,37,37,37,54,52,42,41,33,32,58,56,37,37,37,37,37,37,37,37,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,40,0,13,33,38,38,38,38,38,38,38,38,38,38,38,38,55,53,43,39,34,30,59,54,38,38,38,38,38,38,38,38,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,2,12,35,37,44,25,3,1,39,39,39,39,39,39,39,39,38,55,53,43,39,39,39,39,39,39,39,39,39,39,39,39,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,0,13,33,38,42,26,4,2,40,40,40,40,40,40,40,40,36,56,51,44,40,40,40,40,40,40,40,40,40,40,40,40,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,41,1,14,34,36,43,24,5,0,41,41,41,41,41,41,41,41,37,54,52,42,41,41,41,41,41,41,41,41,41,41,41,41,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,42,26,4,2,40,42,42,42,42,53,48,29,25,41,37,54,52,42,42,42,42,42,42,42,42,42,42,42,42,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,43,24,5,0,41,43,43,43,43,51,49,27,26,39,38,55,53,43,43,43,43,43,43,43,43,43,43,43,43,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,44,25,3,1,39,44,44,44,44,52,50,28,24,40,36,56,51,44,44,44,44,44,44,44,44,44,44,44,44,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,20,16,27,50,45,45,45,45,45,45,45,45,45,45,45,45,58,30,23,19,48,51,54,57,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,18,17,28,48,46,46,46,46,46,46,46,46,46,46,46,46,59,31,21,20,49,52,55,58,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,19,15,29,49,47,47,47,47,47,47,47,47,47,47,47,47,57,32,22,18,50,53,56,59,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,46,18,17,28,29,25,42,53,48,48,48,48,48,48,48,48,48,48,48,48,51,54,57,45,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,47,19,15,29,27,26,43,51,49,49,49,49,49,49,49,49,49,49,49,49,52,55,58,46,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,45,20,16,27,28,24,44,52,50,50,50,50,50,50,50,50,50,50,50,50,53,56,59,47,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,51,49,27,26,43,44,40,36,56,51,51,51,51,51,51,51,51,54,57,45,48,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,52,50,28,24,44,42,41,37,54,52,52,52,52,52,52,52,52,55,58,46,49,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,53,48,29,25,42,43,39,38,55,53,53,53,53,53,53,53,53,56,59,47,50,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,54,52,42,41,37,38,34,30,59,54,54,54,54,57,45,48,51,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,55,53,43,39,38,36,35,31,57,55,55,55,55,58,46,49,52,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,56,51,44,40,36,37,33,32,58,56,56,56,56,59,47,50,53,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,57,55,36,35,31,32,22,18,47,45,48,51,54,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,58,56,37,33,32,30,23,19,45,46,49,52,55,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,54,38,34,30,31,21,20,46,47,50,53,56];