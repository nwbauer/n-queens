// /*           _
//    ___  ___ | |_   _____ _ __ ___
//   / __|/ _ \| \ \ / / _ \ '__/ __|
//   \__ \ (_) | |\ V /  __/ |  \__ \
//   |___/\___/|_| \_/ \___|_|  |___/

// */

// // hint: you'll need to do a full-search of all possible arrangements of pieces!
// // (There are also optimizations that will allow you to skip a lot of the dead search space)
// // take a look at solversSpec.js to see what the tests are expecting


// // return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// window.findNRooksSolution = function(n, startRow, startColumn, memo) {
//   // var solution = //fixme

//   //Create a board
//   var numberOfPieces = 0;
//   var newboard = new Board({n:n});
//   console.log(newboard);
//   //Place the first piece
//   if(startRow !== undefined && startColumn !== undefined){
//     newboard.togglePiece(startRow, startColumn);
//     memo[startRow][startColumn]= true;

//   }
//   // iterate through every place on the board
//   for (var i = 0; i < newboard.attributes.n; i++) {
//     for (var j = 0; j < newboard.attributes.n; j++) {
//       if(i === startRow && j === startColumn){
//         // continue
//       } else {
//         newboard.togglePiece(i,j);
      
//         if(newboard.hasColConflictAt(j) ||
//           newboard.hasRowConflictAt(i)){
//           newboard.togglePiece(i,j);
//           // if(memo!==undefined){
//           //   console.log('freeing', i , j)
//           //   // memo[i][j]= false;
//           // }

//           // debugger;
//         } else {

//         // if(newboard.get(i)[j]){
//           console.log('used', i, j)
//           if(memo !== undefined){
//             memo[i][j]= true;
//           }
//         }

//       }
//     };
//   };
//   // debugger
//   // console.log(matrix)
//   var result = [];
//   for (var i = 0; i < newboard.attributes.n; i++) {
//     result.push(newboard.attributes[i])
//   };
//   //  check if there is a conflict on that row and column
//   // if there is no conflict, put a piece there

//   // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return result;
// };



// // return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
//   var solution = undefined; //fixme
//   // debugger;
//   console.log('now solving dimension', n)
//   var alreadyBeenTried = makeEmptyMatrix(n);
//   debugger;
//   console.log('alreadyBeenTried right after its been made',alreadyBeenTried.toString());

//   var solutionSet = [];

//   for (var i = 0; i < n; i++) {
//     for (var j = 0; j < n; j++) {
//       if(!alreadyBeenTried[i][j]){
//         console.log('alreadyBeenTriedBefore',alreadyBeenTried.toString());
//         console.log('currentSet',solutionSet.toString());
//         console.log('trying...',i,j);
//         solutionSet.push(findNRooksSolution(n, i, j, alreadyBeenTried));
//       }
//     };
//   };

//   console.log('completed dimension ', n, 'found: ', solutionSet.length,'solutions', solutionSet)

//   // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionSet.length;
// };


// // return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// window.findNQueensSolution = function(n) {
//   var solution = undefined; //fixme

//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return solution;
// };


// // return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// window.countNQueensSolutions = function(n) {
//   var solution = undefined; //fixme

//   console.log('Number of solutions for ' + n + ' queens:', solutionCount);
//   return solutionCount;
// };
window.findNRooksSolution = function(n, startRow, startColumn, memo) {
  var numberOfPieces = 0;
  var newboard = new Board({n:n});
  for (var i = 0; i < newboard.attributes.n; i++) {
    for (var j = 0; j < newboard.attributes.n; j++) {
        newboard.togglePiece(i,j);      
        if(newboard.hasColConflictAt(j) ||
          newboard.hasRowConflictAt(i)){
          newboard.togglePiece(i,j);
        }
    };
  };
  var result = [];
  for (var i = 0; i < newboard.attributes.n; i++) {
    result.push(newboard.attributes[i])
  };
  //  check if there is a conflict on that row and column
  // if there is no conflict, put a piece there
  return result;
};
window.countNRooksSolutions = function(n){
  //declare an array that will keep track of the taken position
  
  var taken = [];
  //initalize all columns to be available

  var solutionSet = [];
  
  //Create and emptyMatrix, that will used as the root
  var seed = makeEmptyMatrix(n);
  
  //declare a recFun
  var recFun = function(rowLevel, board){

    if (rowLevel > n-1){

      solutionSet.push(copyBoard(board));
      return;
    }
    //iterate through the column
    for (var column = 0; column < n; column++) {
      if(!taken[column]){
        //place a piece on the board and mark the column as unavailable
        board[rowLevel][column]=1;
        taken[column]=true;

        //recurse down
        recFun(rowLevel+1, board.slice());
        
        //take the piece off the board and make the column available again
        board[rowLevel][column]=0
        taken[column]=false;
                  // console.log('taken list after set to false',taken)

      } 
    };
  }

  //Initialize the recFun
  recFun(0, seed);
  
  //print solutions
  if(n<=4){
    for (var i = 0; i < solutionSet.length; i++) {
      printBoard(solutionSet[i]);
      console.log("==========================")
    };
  } 

  //return the number of solutions
  return solutionSet.length;
}



var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

var printBoard = function(board){
  // for (var i = board.length - 1; i >= 0; i--) {
    for (var i = 0; i < board.length; i++) {
      console.log(board[i].toString())
    };
    // console.log(board[i].toString());
  // };
}

var copyBoard = function(board){
  var newBoard = [];
  for (var i = 0; i < board.length; i++) {
    newBoard.push(board[i].slice());
  };
  return newBoard;
}




