/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

/*
[[1, 0, 0, 0], 
 [0, 1, 0, 0],
 [0, 0, 1, 0],
 [0, 0, 0, 1]]
 
*/

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };


  window.findNRooksSolution = function(n) {
    //var solution = makeEmptyMatrix(n);
    var solution = new Board({n: n});
    var board = solution.rows();
  
    
    for (let i = 0; i < n; i++) {
      board[i][i] = 1;
    }
    
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
    return board; 
   
  };


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
  window.countNRooksSolutions = function(n) {
    // for loop to iterate the recursion
    var board = new Board({n: n});
    var solutionCount = 0; 
   
    if (n === 0 || n === 1) {
      solutionCount += 1; 
      return solutionCount; 
    } 
    
    var traverse = function(row) {
      if (row === n) {
        solutionCount += 1; 
        return; 
      }
      
      for (var x = 0; x < n; x += 1) {
        board.togglePiece(row, x); 
        if (!board.hasAnyRooksConflicts()) {
          traverse(row + 1); 
        }
        board.togglePiece(row, x); 
      }
    }; 
    traverse(0); 
    return solutionCount; 
    
    // var solution = new Board({n: n}); 
    // var solutionCount = 0;
    // debugger;
    
   
    // // need to increase the solution count every time we decide to keep the 
    // var recurse = function(row, counter) {
    //   if (row === 0) {
    //     if (counter === n) {
    //       solutionCount++; 
    //     } 
    //     return; 
    //   } 
      
    //   for (let i = 0; i < n; i++) {
    //     solution.togglePiece(row - 1, i);
    //     counter++;   

    //     if (solution.hasAnyRooksConflicts()) {
    //       solution.togglePiece(row - 1, i);  // removing the 1
    //       counter--;
    //     } else {
    //       recurse(row - 1, counter); 
    //     }
        
    //   }
      
    // }; 
    
    // if (n === 0 || n === 1) {
    //   solutionCount++;
    // } else {
    //   recurse(n, 0); 
    // }
    // for (var x = 0; x < n; x++) {
    //   solution.togglePiece(n - 1, x); 
    // }
    //solution.hasRowConflictAt(row - 1) || solution.hasColConflictAt(i)
    
    console.log('Number of solutions for ' + n + ' rooks:', solutionCount);  
    return solutionCount;
  };

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
  window.findNQueensSolution = function(n) {
    var board = makeEmptyMatrix(n); 
    
    var traverse = function() {
      
    }; 
    
    
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution; 
  };

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
  window.countNQueensSolutions = function(n) {
    var solutionCount = undefined; //fixme

    console.log('Number of solutions for ' + n + ' queens:', solutionCount);  
    return solutionCount;
  };
