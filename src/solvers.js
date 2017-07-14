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
        if (!board.hasColConflictAt(x)) {
          traverse(row + 1); 
        }
        board.togglePiece(row, x); 
      }
    }; 
    traverse(0); 
    return solutionCount; 
    
    console.log('Number of solutions for ' + n + ' rooks:', solutionCount);  
    return solutionCount;
  };

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
  window.findNQueensSolution = function(n) {
    var board = new Board({n: n});
    debugger;
    
    if (n === 0) {
      return [];
    }
    if (n === 1) {
      return [[1]];
    }
    
    if (n < 4) {
      return board;
    }

    // traversing all the rows
      // can only be one queen on each row
      // check col and diagonals
    
    var traverse = function(row, col) {
      
      if (row === n) {
        return board;
      }
      
      for (let i = col; i < n; i++) {
        // change the 0 to 1
        board.togglePiece(row, i);
        // is there conflict at column or diagonal? 
        if (!board.hasAnyQueenConflictsOn(row, i)) {
         // if there is no conflict
          // recurse over the next row
          traverse(row + 1, col, queenCount++);
        } 
        // toggle piece back to 0 (and keep iterating over columns)  
        board.togglePiece(row, i);    
        
          // i found something stop 
            // or i didn't find something keep going
      }
    }; 
    
    while (row !== n) {
      
    }
    traverse(0, 0, 0);
    
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(board));
    return board; 
  };

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
  window.countNQueensSolutions = function(n) {
    var solutionCount = 0; 
    var board = new Board({n: n});
    debugger;
    
    // edge cases
    if (n <= 1) {
      return 1;
    }
    if (n < 4) {
      return solutionCount;
    }
    
    var traverse = function(row, col, queenCount) {
      
      if (row === n) {
        solutionCount++;
        return;
      }
      
      for (let i = col; i < n; i++) {
        // change the 0 to 1
        board.togglePiece(row, i);
        // is there conflict at column or diagonal? 
        if (!board.hasAnyQueenConflictsOn(row, i)) {
         // if there is no conflict
          // recurse over the next row
          traverse(row++, col++, queenCount++);
        } else if (i === n-1) {
          traverse(row++, col++, queenCount);
        }
        // toggle piece back to 0 (and keep iterating over columns)  
        board.togglePiece(row, i);  
        
        // edge if 
        while(row > queenCount) {
          traverse(row--, col++, queenCount);
        }

      }
      
      
    }; 
  
    traverse(0, 0, 0);
    
    
    console.log('Number of solutions for ' + n + ' queens:', solutionCount);  
    return solutionCount;
  };
