var grid = [
  [0, 9, 4, 0, 0, 0, 5, 6, 0],
  [2, 0, 0, 0, 5, 8, 7, 9, 0],
  [0, 7, 5, 9, 0, 0, 1, 0, 2],
  [4, 0, 2, 6, 0, 5, 0, 0, 9],
  [6, 0, 7, 0, 2, 0, 0, 1, 0],
  [0, 0, 0, 7, 1, 0, 6, 0, 5],
  [0, 0, 1, 0, 9, 2, 0, 8, 0],
  [0, 8, 0, 0, 6, 0, 2, 0, 0],
  [3, 2, 0, 0, 0, 1, 0, 0, 7],
];

$(document).ready(function () {
  $(".grid")
    .children()
    .each(function () {
      var x;
      var y;

      x = parseInt($(this).attr("id").substring(0, 1));
      y = parseInt($(this).attr("id").substring(1));

      //borders for the cells
      if (y == 2 || y == 5) {
        $(this).css("border-right-width", 3);
      }
      if (x == 2 || x == 5) {
        $(this).css("border-bottom-width", 3);
      }

      //background color for cells
      if (grid[x][y] != 0) {
        $(this).css("background-color", "#8b81fc");
      } else {
        $(this).css("background-color", "#8b81fc");
      }
    });

  for (var x = 0; x < 9; x++) {
    for (var y = 0; y < 9; y++) {
      if (grid[x][y] != 0) {
        var id = "#" + x + y;
        $(id).html(grid[x][y]);
        $(id).attr("data-original", true);
        $(id).css("font-weight", "bold");
      }
    }
  }

  var oldCell = null;
  $(window).keydown(function (evt) {
    if (oldCell != null) {
      evt.preventDefault();
      if (evt.which >= 37 && evt.which <= 40) {
        var x = parseInt(oldCell.attr("id").substring(0, 1));
        var y = parseInt(oldCell.attr("id").substring(1, 2));

        switch (evt.which) {
          case 37: // left
            y = y - 1;
            break;
          case 38: // up
            x = x - 1;
            break;
          case 39: // right
            y = y + 1;
            break;
          case 40: // down
            x = x + 1;
            break;
        }

        if (x >= 0 && x < 9 && y >= 0 && y < 9) {
          var newId = "#" + x + y;
          oldCell.css("background-color", "#8b81fc");
          $(newId).css("background-color", "#054927");
          oldCell = $(newId);
        }
      } else if (evt.which >= 49 && evt.which <= 57) {
        oldCell.html(String.fromCharCode(evt.which));
        var x = parseInt(oldCell.attr("id").substring(0, 1));
        var y = parseInt(oldCell.attr("id").substring(1, 2));
        grid[x][y] = parseInt(String.fromCharCode(evt.which));

        oldCell.css("background-color", "#8b81fc");

        //check for errors
        if (checkForErrors(x, y, grid[x][y])) {
          alert("Oops!! check mate");
          oldCell.html("");
          grid[x][y] = 0;
        } else {
          checkIfGridComplete();
        }
      } else if (evt.which == 8) {
        oldCell.html("");
        var x = parseInt(oldCell.attr("id").substring(0, 1));
        var y = parseInt(oldCell.attr("id").substring(1, 2));
        grid[x][y] = 0;
        checkIfGridComplete();
      }
    }
  });

  $(".cell").click(function () {
    if ($(this).attr("data-original") === "true") {
      return false;
    }
    if (oldCell != null) {
      oldCell.css("background-color", "#8b81fc");
    }
    $(this).css("background-color", "#054927");
    oldCell = $(this);
  });
});

function checkForErrors(x, y, num) {
  //check row
  for (var i = 0; i < 9; i++) {
    if (grid[x][i] == num && i != y) {
      return true;
    }
  }

  //check column
  for (var i = 0; i < 9; i++) {
    if (grid[i][y] == num && i != x) {
      return true;
    }
  }

  //check box
  var startX = Math.floor(x / 3) * 3;
  var startY = Math.floor(y / 3) * 3;
  for (var i = startX; i < startX + 3; i++) {
    for (var j = startY; j < startY + 3; j++) {
      if (grid[i][j] == num && (i != x || j != y)) {
        return true;
      }
    }
  }

  return false;
}

function checkIfGridComplete() {
  for (var x = 0; x < 9; x++) {
    for (var y = 0; y < 9; y++) {
      if (grid[x][y] == 0) {
        return false;
      }
    }
  }
  alert("Congratulations! You've completed the puzzle!");
  return true;
}
