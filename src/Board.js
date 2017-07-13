// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var total = 0; 
      for (var x = 0; x < rowIndex.length; x += 1) {
        if (rowIndex[x]) {
          total += 1; 
        }
      }
      return (total > 1); 
      
      // var total = rowIndex.reduce(function(sum, element) {
      //   return sum + element;
      // });
      // return (total > 1); 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this.rows();
      var collision = false;
      
      for (var i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(board[i])) {
          collision = true;
        }
      }
      
      return collision;
      // return board.every(function(row) {
      //   return !this.hasRowConflictAt(row);
      // });
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var tally = 0;
      
      // var has 1
      
      for (var i = 0; i < board.length; i++) {
        if (board[i][colIndex] === 1) {
          tally++;
        }
      }
      
      return (tally > 1);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.rows();
      var collision = false;
      
      for (var j = 0; j < board.length; j++) {
        if (this.hasColConflictAt(j)) {
          collision = true;
        }
      }
      return collision;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows(); 
      var tally = 0; 
      var index = majorDiagonalColumnIndexAtFirstRow; 

      if (index > 0) {
        for (let i = 0; i < board.length - index; i += 1) {
          if (board[i][i + index] === 1) {
            tally += 1; 
          }
        }
      } else if (index === 0) {
        for (let i = 0; i < (board.length - 1); i += 1){
          if (board[i][i] === 1) {
            tally += 1; 
          }
        }
      } else if (index < 0) { 
        for (let i = 0; i < board.length - Math.abs(index); i++) {
          if (board[Math.abs(index) + i][i] === 1) {
            tally += 1; 
          }
        }             
      }
      return (tally > 1); 
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows(); 
      var collision = false; 
      
      for (let j = -(board.length - 1); j < board.length; j += 1) {
        if (this.hasMajorDiagonalConflictAt(j)) {
          collision = true; 
        }
      }
      return collision; 

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows(); 
      var tally = 0; 
      var index = minorDiagonalColumnIndexAtFirstRow; 
      
      if (index < board.length - 1) { 
        for (let i = 0; i < (index + 1); i += 1) {
          if (board[i][index - i] === 1) {
            tally += 1;
          }
        }
      } else if (index === board.length - 1) {
        for (let i = 0; i < board.length - 1; i += 1) {
          if (board[i][index - i] === 1) {
            tally += 1; 
          }
        }
      } else if (index > board.length - 1) {
        for (let i = 0; i < ((2 * board.length) - 1 - index); i += 1) {
          if ( board[Math.abs(board.length - 1 - index) + i][board.length - 1 - i] === 1) {
            tally += 1;
          }
        }
      }
      
      return (tally > 1); 
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows(); 
      var collision = false; 
      
      for (let j = 0; j < (board.length - 1) * 2; j += 1) {
        if (this.hasMinorDiagonalConflictAt(j)) {
          collision = true; 
        }
      }
      return collision; 
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
