var counter = 0;

var currentPiceMovingId = 0;

var turnCounter = 0;

var cols,
  rows,
  flag = 0,
  sequence,
  q = 0,
  g = 0,
  L = 0,
  V = 0;

var screen_width = screen.width;
var screen_height = screen.height;

var board_array;

var rowArray;
var colArray;
var alOneArray;
var alTwoArray;

var colPressed;
var rowPressed;
var numColorPressed;

var isMarkedMove = -1;

var whiteKingHasMoved = 0;
var blackKingHasMoved = 0;

var whiteRookAHasMoved = 0;
var whiteRookBHasMoved = 0;
var blackRookAHasMoved = 0;
var blackRookBHasMoved = 0;

var isCastle = 0;
var isKingSide = 0;

var whiteUnPassantableSquares = [];
var blackUnPassantableSquares = [];

//#region valueTables
var pawnTable = [
  0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30,
  20, 10, 10, 5, 5, 10, 25, 25, 10, 5, 5, 0, 0, 0, 20, 20, 0, 0, 0, 5, -5, -10,
  0, 0, -10, -5, 5, 5, 10, 10, -20, -20, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0,
];
var knightTable = [
  -50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0, 0, 0, -20, -40, -30,
  0, 10, 15, 15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30, -30, 0, 15, 20, 20,
  15, 0, -30, -30, 5, 10, 15, 15, 10, 5, -30, -40, -20, 0, 5, 5, 0, -20, -40,
  -50, -40, -30, -30, -30, -30, -40, -50,
];
var bishopTable = [
  -20, -10, -10, -10, -10, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5,
  10, 10, 5, 0, -10, -10, 5, 5, 10, 10, 5, 5, -10, -10, 0, 10, 10, 10, 10, 0,
  -10, -10, 10, 10, 10, 10, 10, 10, -10, -10, 5, 0, 0, 0, 0, 5, -10, -20, -10,
  -10, -10, -10, -10, -10, -20,
];
var rookTable = [
  0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 10, 10, 10, 10, 10, 5, -5, 0, 0, 0, 0, 0, 0,
  -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0,
  -5, -5, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 5, 5, 0, 0, 0,
];
var quinTable = [
  -20, -10, -10, -5, -5, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5,
  5, 5, 5, 0, -10, -5, 0, 5, 5, 5, 5, 0, -5, 0, 0, 5, 5, 5, 5, 0, -5, -10, 5, 5,
  5, 5, 5, 0, -10, -10, 0, 5, 0, 0, 0, 0, -10, -20, -10, -10, -5, -5, -10, -10,
  -20,
];
var kingMidTable = [
  -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40,
  -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40,
  -40, -30, -20, -30, -30, -40, -40, -30, -30, -20, -10, -20, -20, -20, -20,
  -20, -20, -10, 20, 20, 0, 0, 0, 0, 20, 20, 20, 30, 10, 0, 0, 10, 30, 20,
];
var kingEndTable = [
  -50, -40, -30, -20, -20, -30, -40, -50, -30, -20, -10, 0, 0, -10, -20, -30,
  -30, -10, 20, 30, 30, 20, -10, -30, -30, -10, 30, 40, 40, 30, -10, -30, -30,
  -10, 30, 40, 40, 30, -10, -30, -30, -10, 20, 30, 30, 20, -10, -30, -30, -30,
  0, 0, 0, 0, -30, -30, -50, -30, -30, -30, -30, -30, -30, -50,
];
//#endregion

function BuildTable() {
  flag = 0;
  rows = 8;
  cols = 8;
  turnCounter = 0;
  board_array = new Array(rows);
  for (var i = 0; i < rows; i++) {
    board_array[i] = new Array(cols);
    for (var x = 0; x < cols; x++) {
      //black
      if (i == 1) {
        //pawn
        board_array[i][x] = -1;
      } else if (i == 0 && (x == 0 || x == 7)) {
        //rook
        board_array[i][x] = -4;
      } else if (i == 0 && (x == 1 || x == 6)) {
        //knight
        board_array[i][x] = -2;
      } else if (i == 0 && (x == 2 || x == 5)) {
        //bishop
        board_array[i][x] = -3;
      } else if (i == 0 && x == 3) {
        //quin
        board_array[i][x] = -7;
      } else if (i == 0 && x == 4) {
        //king
        board_array[i][x] = -8;
      }
      //white
      else if (i == 6) {
        //pawn
        board_array[i][x] = 1;
      } else if (i == 7 && (x == 0 || x == 7)) {
        //rook
        board_array[i][x] = 4;
      } else if (i == 7 && (x == 1 || x == 6)) {
        //knight
        board_array[i][x] = 2;
      } else if (i == 7 && (x == 2 || x == 5)) {
        //bishop
        board_array[i][x] = 3;
      } else if (i == 7 && x == 3) {
        //quin
        board_array[i][x] = 7;
      } else if (i == 7 && x == 4) {
        //king
        board_array[i][x] = 8;
      } else if (i == 6) {
        board_array[i][x] = 1;
      } else {
        board_array[i][x] = 0;
      }
    }
  }

  var r = 0;
  var c;
  var s = "<table border='1' id='bored-table'>";
  var num = 0;
  var squareColorNum = 1;
  if (flag == 0) {
    while (r < rows) {
      c = 0;
      s = s + "<tr>";
      while (c < cols) {
        var piceNum = board_array[r][c];
        var picePicture = "";
        if (r == 1) {
          //pawn
          picePicture = "pictures/black_pawn.png";
        } else if (r == 0 && (c == 0 || c == 7)) {
          //rook
          picePicture = "pictures/black_rook.png";
        } else if (r == 0 && (c == 1 || c == 6)) {
          //knight
          picePicture = "pictures/black_knight.png";
        } else if (r == 0 && (c == 2 || c == 5)) {
          //bishop
          picePicture = "pictures/black_bishop.png";
        } else if (r == 0 && c == 3) {
          //quin
          picePicture = "pictures/black_quin.png";
        } else if (r == 0 && c == 4) {
          //king
          picePicture = "pictures/black_king.png";
        }
        //white
        else if (r == 6) {
          //pawn
          picePicture = "pictures/white_pawn.png";
        } else if (r == 7 && (c == 0 || c == 7)) {
          //rook
          picePicture = "pictures/white_rook.png";
        } else if (r == 7 && (c == 1 || c == 6)) {
          //knight
          picePicture = "pictures/white_knight.png";
        } else if (r == 7 && (c == 2 || c == 5)) {
          //bishop
          picePicture = "pictures/white_bishop.png";
        } else if (r == 7 && c == 3) {
          //quin
          picePicture = "pictures/white_quin.png";
        } else if (r == 7 && c == 4) {
          //king
          picePicture = "pictures/white_king.png";
        } else {
          piceNum = "";
        }
        //endGame

        if (squareColorNum == 1) {
          var squareColor = "white";
        } else {
          var squareColor = "green";
        }
        s =
          s +
          "<td class='table-datas'" +
          " id='" +
          num.toString() +
          "'  onclick='getAvalibleSquares(this,board_array)'   style='background-color:" +
          squareColor +
          "'" +
          ">";
        if (picePicture != "") {
          s = s + "<img src=" + picePicture + ">";
        }
        s = s + "</td>";
        c++;
        num++;
        squareColorNum *= -1;
      }
      s = s + "</tr>";
      r++;
      squareColorNum *= -1;
    }
  }

  s = s + "</table>";
  document.getElementById("fff").innerHTML = s;
}
function colorSquares(movesToColor) {
  var length = movesToColor.length;

  for (var i = 0; i < length; i++) {
    var squareX = movesToColor[i][0];
    var squareY = movesToColor[i][1];

    var cellId = squareX * 8 + squareY;

    document.getElementById(cellId).style.backgroundColor = "red";
  }
  isMarkedMove = 1;
}
function cleanBoard() {
  var r = 0;
  var c = 0;
  var color = "";
  for (r = 0; r < 8; r++) {
    for (c = 0; c < 8; c++) {
      var cellId = r * 8 + c;

      if (r % 2 == 0) {
        if (c % 2 == 0) {
          color = "white";
        } else {
          color = "green";
        }
      } else {
        if (c % 2 == 0) {
          color = "green";
        } else {
          color = "white";
        }
      }
      document.getElementById(cellId).style.backgroundColor = color;
    }
  }
}
function playMove(pieceToMove, placeToMove,isComp) {
  var oldColPressed = pieceToMove % cols;
  var oldRowPressed = Math.floor(pieceToMove / cols);
  var piceType = board_array[oldRowPressed][oldColPressed];

  var newColPressed = placeToMove % cols;
  var newRowPressed = Math.floor(placeToMove / cols);

  var pictureName = "pictures/";
  if (piceType < 0) {
    pictureName += "black_";
  } else {
    pictureName += "white_";
  }
  if (Math.abs(piceType) == 1) {
    pictureName += "pawn";

    if (piceType == 1) {
      if (Math.abs(oldRowPressed - newRowPressed) == 2) {
        whiteUnPassantableSquares.push(placeToMove);
      }
    } else if (piceType == -1) {
      if (Math.abs(oldRowPressed - newRowPressed) == 2) {
        blackUnPassantableSquares.push(placeToMove);
      }
    }

    if (
      newRowPressed != oldRowPressed &&
      newColPressed != oldColPressed &&
      board_array[newRowPressed][newColPressed] == 0
    ) {
      if (piceType == 1) {
        board_array[newRowPressed + 1][newColPressed] = 0;

        var image_x = document.getElementById(
          (newRowPressed + 1) * 8 + newColPressed
        ).childNodes[0];
        image_x.remove();
      } else {
        board_array[newRowPressed - 1][newColPressed] = 0;

        var image_x = document.getElementById(
          (newRowPressed - 1) * 8 + newColPressed
        ).childNodes[0];
        image_x.remove();
      }
    }

    var isQuining = 0;
    if (
      (oldRowPressed == 6 && piceType < 0) ||
      (oldRowPressed == 1 && piceType > 0)
    ) {
      var isQuining = 1;
      if(isComp==-1){
        var quinTo = +prompt("2:knight 3:bishop 4:rook 7  :quin");
      }else{
        var quinTo=7;
      }
     
      if (piceType < 0) {
        quinTo *= -1;
      }
    }
  } else if (Math.abs(piceType) == 2) {
    pictureName += "knight";
  } else if (Math.abs(piceType) == 3) {
    pictureName += "bishop";
  } else if (Math.abs(piceType) == 4) {
    pictureName += "rook";

    if (oldRowPressed == 7) {
      //white

      if (oldColPressed == 0) {
        whiteRookAHasMoved = 1;
      } else if (oldColPressed == 7) {
        whiteRookBHasMoved = 1;
      }
    } else if (oldRowPressed == 0) {
      if (oldColPressed == 0) {
        blackRookAHasMoved = 1;
      } else if (oldColPressed == 7) {
        blackRookBHasMoved = 1;
      }
    }
  } else if (Math.abs(piceType) == 7) {
    pictureName += "quin";
  } else if (Math.abs(piceType) == 8) {
    pictureName += "king";

    if (oldRowPressed == 0 && oldColPressed == 4) {
      blackKingHasMoved = 1;
    }
    if (oldRowPressed == 7 && oldColPressed == 4) {
      whiteKingHasMoved = 1;
    }
  }
  pictureName += ".png";

  board_array[oldRowPressed][oldColPressed] = 0;
  board_array[newRowPressed][newColPressed] = piceType;

  var img = document.createElement("img");
  img.src = pictureName;
  document.getElementById(placeToMove).appendChild(img);

  var image_x = document.getElementById(pieceToMove).childNodes[0];
  image_x.remove();

  if (document.getElementById(placeToMove).childElementCount == 2) {
    var image_y = document.getElementById(placeToMove).childNodes[0];
    image_y.remove();
  }

  if (
    Math.abs(oldColPressed - newColPressed) == 2 &&
    Math.abs(board_array[newRowPressed][newColPressed]) == 8
  ) {
    isCastle = 1;
  } else {
    isCastle = 0;
  }
  if (isCastle == 1) {
    if (oldColPressed < newColPressed) {
      //ks
      if (piceType < 0) {
        var rookX = 7;
        var rookY = 0;

        var moveRookToX = 5;
        var moveRookToY = 0;

        var PRName = "pictures/black_rook.png";
        var PTRNum = -4;
      } else {
        var rookX = 7;
        var rookY = 7;

        var moveRookToX = 5;
        var moveRookToY = 7;

        var PRName = "pictures/white_rook.png";
        var PTRNum = 4;
      }
    } else {
      if (piceType < 0) {
        var rookX = 0;
        var rookY = 0;

        var moveRookToX = 3;
        var moveRookToY = 0;
        var PRName = "pictures/black_rook.png";
        var PTRNum = -4;
      } else {
        var rookX = 0;
        var rookY = 7;

        var moveRookToX = 3;
        var moveRookToY = 7;
        var PRName = "pictures/white_rook.png";
        var PTRNum = 4;
      }
    }

    board_array[rookY][rookX] = 0;
    board_array[moveRookToY][moveRookToX] = PTRNum;

    var img = document.createElement("img");
    img.src = PRName;
    document.getElementById(moveRookToY * rows + moveRookToX).appendChild(img);

    var image_x = document.getElementById(rookY * rows + rookX).childNodes[0];
    image_x.remove();

    isCastle = 0;
    isKingSide = 0;
  }
  if (isQuining == 1) {
    if (piceType < 0) {
      var quinColor = -1;
    } else {
      quinColor = 1;
    }

    var pictureName = "pictures/";
    if (piceType < 0) {
      pictureName += "black_";
    } else {
      pictureName += "white_";
    }
    if (Math.abs(quinTo) == 2) {
      pictureName += "knight";
    } else if (Math.abs(quinTo) == 3) {
      pictureName += "bishop";
    } else if (Math.abs(quinTo) == 4) {
      pictureName += "rook";
    } else if (Math.abs(quinTo) == 7) {
      pictureName += "quin";
    }
    pictureName += ".png";

    board_array[newRowPressed][newColPressed] = quinTo;

    var img = document.createElement("img");
    img.src = pictureName;
    document.getElementById(placeToMove).appendChild(img);

    if (document.getElementById(placeToMove).childElementCount == 2) {
      var image_y = document.getElementById(placeToMove).childNodes[0];
      image_y.remove();
    }
  }

  var otherColor = 1;
  if (piceType > 0) {
    otherColor = -1;
  }
  isThereMate(otherColor, board_array);
  cleanBoard();
  turnCounter++;
  
}
function visualizeMove(pieceToMove, placeToMove) {
  var retBoardArray = new Array(rows);
  for (var i = 0; i < rows; i++) {
    retBoardArray[i] = new Array(cols);
  }
  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      retBoardArray[r][c] = board_array[r][c];
    }
  }
  var colPressed = pieceToMove % cols;
  var rowPressed = Math.floor(pieceToMove / cols);
  var pieceThatMove = board_array[rowPressed][colPressed];

  var colPressedToMove = placeToMove % cols;
  var rowPressedToMove = Math.floor(placeToMove / cols);

  retBoardArray[rowPressed][colPressed] = 0;
  retBoardArray[rowPressedToMove][colPressedToMove] = pieceThatMove;

  return retBoardArray;
}
function isThereCheck(pieceToMove, placeToMove, mateColor) {
  if (mateColor == -1) {
    afterMoveArray = visualizeMove(pieceToMove, placeToMove);
    var colPressed = pieceToMove % cols;
    var rowPressed = Math.floor(pieceToMove / cols);

    var colorPressed = 1;
    if (board_array[rowPressed][colPressed] < 0) {
      colorPressed = -1;
    }
  } else {
    var afterMoveArray = new Array(rows);
    for (var i = 0; i < rows; i++) {
      afterMoveArray[i] = new Array(cols);
    }
    for (var r = 0; r < 8; r++) {
      for (var c = 0; c < 8; c++) {
        afterMoveArray[r][c] = board_array[r][c];
      }
    }
    if (mateColor == 1) {
      var colorPressed = 1;
    } else {
      var colorPressed = -1;
    }
  }

  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      if (afterMoveArray[r][c] == colorPressed * 8) {
        var kingsRow = r;
        var kingsCol = c;
      }
    }
  }
  var isChecked = -1;
  //#region pawnChecking
  if (colorPressed == 1) {
    if (kingsCol + 1 < 8 && kingsRow - 1 > -1) {
      if (afterMoveArray[kingsRow - 1][kingsCol + 1] == -1) {
        isChecked = 1;
      }
    }
    if (kingsCol - 1 > -1 && kingsRow - 1 > -1) {
      if (afterMoveArray[kingsRow - 1][kingsCol - 1] == -1) {
        isChecked = 1;
      }
    }
  } else {
    if (kingsCol + 1 < 8 && kingsRow + 1 < 8) {
      if (afterMoveArray[kingsRow + 1][kingsCol + 1] == 1) {
        isChecked = 1;
      }
    }
    if (kingsCol - 1 > -1 && kingsRow + 1 < 8) {
      if (afterMoveArray[kingsRow + 1][kingsCol - 1] == 1) {
        isChecked = 1;
      }
    }
  }
  //#endregion

  //#region knightChecking

  if (kingsRow + 2 <= 7 && kingsCol + 1 <= 7) {
    if (afterMoveArray[kingsRow + 2][kingsCol + 1] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  if (kingsRow + 2 <= 7 && kingsCol - 1 >= 0) {
    if (afterMoveArray[kingsRow + 2][kingsCol - 1] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  if (kingsRow - 2 >= 0 && kingsCol + 1 <= 7) {
    if (afterMoveArray[kingsRow - 2][kingsCol + 1] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  if (kingsRow - 2 >= 0 && kingsCol - 1 >= 0) {
    if (afterMoveArray[kingsRow - 2][kingsCol - 1] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  if (kingsRow + 1 <= 7 && kingsCol + 2 <= 7) {
    if (afterMoveArray[kingsRow + 1][kingsCol + 2] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  if (kingsRow - 1 >= 0 && kingsCol + 2 <= 7) {
    if (afterMoveArray[kingsRow - 1][kingsCol + 2] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  if (kingsRow + 1 <= 7 && kingsCol - 2 >= 0) {
    if (afterMoveArray[kingsRow + 1][kingsCol - 2] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  if (kingsRow - 1 >= 0 && kingsCol - 2 >= 0) {
    if (afterMoveArray[kingsRow - 1][kingsCol - 2] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  //#endregion

  //#region kingChecking
  if (
    kingsRow + 1 < 8 &&
    afterMoveArray[kingsRow + 1][kingsCol] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  if (
    kingsRow + 1 < 8 &&
    kingsCol + 1 < 8 &&
    afterMoveArray[kingsRow + 1][kingsCol + 1] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  if (
    kingsCol + 1 < 8 &&
    afterMoveArray[kingsRow][kingsCol + 1] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  if (
    kingsRow - 1 > -1 &&
    kingsCol + 1 < 8 &&
    afterMoveArray[kingsRow - 1][kingsCol + 1] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  if (
    kingsRow - 1 > -1 &&
    afterMoveArray[kingsRow - 1][kingsCol] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  if (
    kingsRow - 1 > -1 &&
    kingsCol - 1 > -1 &&
    afterMoveArray[kingsRow - 1][kingsCol - 1] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  if (
    kingsCol - 1 > -1 &&
    afterMoveArray[kingsRow][kingsCol - 1] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  if (
    kingsRow + 1 < 8 &&
    kingsCol - 1 > -1 &&
    afterMoveArray[kingsRow + 1][kingsCol - 1] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  //#endregion

  //#region rooksChecking
  var end = 0;
  var RP = 0; // row plus ...
  var RM = 0;
  var CP = 0;
  var CM = 0;
  var i = 1;
  while (end == 0) {
    if (kingsRow + i < 8 && RP == 0) {
      if (
        (afterMoveArray[kingsRow + i][kingsCol] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow + i][kingsCol] < 0 && colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol]) == 2 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol]) == 1 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol]) == 3 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol]) == 8
      ) {
        RP = 1;
      } else if (
        (afterMoveArray[kingsRow + i][kingsCol] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow + i][kingsCol] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        RP = 1;
      }
    } else {
      RP = 1;
    }
    if (kingsRow - i > -1 && RM == 0) {
      if (
        (afterMoveArray[kingsRow - i][kingsCol] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow - i][kingsCol] < 0 && colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol]) == 2 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol]) == 1 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol]) == 3 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol]) == 8
      ) {
        RM = 1;
      } else if (
        (afterMoveArray[kingsRow - i][kingsCol] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow - i][kingsCol] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        RM = 1;
      }
    } else {
      RM = 1;
    }
    if (kingsCol - i > -1 && CM == 0) {
      if (
        (afterMoveArray[kingsRow][kingsCol - i] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow][kingsCol - i] < 0 && colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow][kingsCol - i]) == 2 ||
        Math.abs(afterMoveArray[kingsRow][kingsCol - i]) == 1 ||
        Math.abs(afterMoveArray[kingsRow][kingsCol - i]) == 3 ||
        Math.abs(afterMoveArray[kingsRow][kingsCol - i]) == 8
      ) {
        CM = 1;
      } else if (
        (afterMoveArray[kingsRow][kingsCol - i] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow][kingsCol - i] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        CM = 1;
      }
    } else {
      CM = 1;
    }
    if (kingsCol + i < 8 && CP == 0) {
      if (
        (afterMoveArray[kingsRow][kingsCol + i] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow][kingsCol + i] < 0 && colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow][kingsCol + i]) == 2 ||
        Math.abs(afterMoveArray[kingsRow][kingsCol + i]) == 1 ||
        Math.abs(afterMoveArray[kingsRow][kingsCol + i]) == 3 ||
        Math.abs(afterMoveArray[kingsRow][kingsCol + i]) == 8
      ) {
        CP = 1;
      } else if (
        (afterMoveArray[kingsRow][kingsCol + i] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow][kingsCol + i] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        CP = 1;
      }
    } else {
      CP = 1;
    }

    if (CM == 1 && CP == 1 && RM == 1 && RP == 1) {
      end = 1;
    }
    i++;
  }

  //#endregion

  //#region bishopChecking
  var end = 0;
  var PP = 0; // al plus plus ...
  var PM = 0;
  var MP = 0;
  var MM = 0;
  var i = 1;
  // var colorPressed = 1;
  // if (afterMoveArray[kingsRow][kingsCol] < 0) {
  //   colorPressed = -1;
  // }
  while (end == 0) {
    if (kingsRow + i < 8 && kingsCol + i < 8 && PP == 0) {
      if (
        (afterMoveArray[kingsRow + i][kingsCol + i] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow + i][kingsCol + i] < 0 &&
          colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol + i]) == 2 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol + i]) == 1 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol + i]) == 4 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol + i]) == 8
      ) {
        PP = 1;
      } else if (
        (afterMoveArray[kingsRow + i][kingsCol + i] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow + i][kingsCol + i] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        PP = 1;
      }
    } else {
      PP = 1;
    }
    if (kingsRow - i > -1 && kingsCol + i < 8 && MP == 0) {
      if (
        (afterMoveArray[kingsRow - i][kingsCol + i] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow - i][kingsCol + i] < 0 &&
          colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol + i]) == 2 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol + i]) == 1 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol + i]) == 4 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol + i]) == 8
      ) {
        MP = 1;
      } else if (
        (afterMoveArray[kingsRow - i][kingsCol + i] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow - i][kingsCol + i] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        MP = 1;
      }
    } else {
      MP = 1;
    }
    if (kingsRow + i < 8 && kingsCol - i > -1 && PM == 0) {
      if (
        (afterMoveArray[kingsRow + i][kingsCol - i] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow + i][kingsCol - i] < 0 &&
          colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol - i]) == 2 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol - i]) == 1 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol - i]) == 4 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol - i]) == 8
      ) {
        PM = 1;
      } else if (
        (afterMoveArray[kingsRow + i][kingsCol - i] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow + i][kingsCol - i] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        PM = 1;
      }
    } else {
      PM = 1;
    }
    if (kingsRow - i > -1 && kingsCol - i > -1 && MM == 0) {
      if (
        (afterMoveArray[kingsRow - i][kingsCol - i] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow - i][kingsCol - i] < 0 &&
          colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol - i]) == 2 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol - i]) == 1 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol - i]) == 4 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol - i]) == 8
      ) {
        MM = 1;
      } else if (
        (afterMoveArray[kingsRow - i][kingsCol - i] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow - i][kingsCol - i] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        MM = 1;
      }
    } else {
      MM = 1;
    }
    if (MM == 1 && PM == 1 && PP == 1 && MP == 1) {
      end = 1;
    }
    i++;
  }
  //#endregion
  var isLegal = 1;
  if (isChecked == 1) {
    isLegal = -1;
  }
  return isLegal;
}
function isThereMate(otherColorNum, board) {
  var passToCheck = otherColorNum;
  if (passToCheck == -1) {
    passToCheck = -2;
  }
  var isMate = 1;
  var isPat = 1;
  if (isThereCheckComp(-1, -1, passToCheck, board) == -1) {
    isPat = -1;
    if (otherColorNum == 1) {
      for (var r = 0; r < 8; r++) {
        for (var c = 0; c < 8; c++) {
          if (board[r][c] >= 1) {
            var defenceMoves = getAvalibleSquaresRR(r * 8 + c, board);
            if (defenceMoves.length > 0) {
              r = 8;
              c = 8;
              isMate = -1;
            }
          }
        }
      }
      if (isMate == 1) {
        isMate = 99;
      }
    } else if (otherColorNum == -1) {
      for (var r = 0; r < 8; r++) {
        for (var c = 0; c < 8; c++) {
          if (board[r][c] <= -1) {
            var defenceMoves = getAvalibleSquaresRR(r * 8 + c, board);
            if (defenceMoves.length > 0) {
              r = 8;
              c = 8;
              isMate = -1;
            }
          }
        }
      }
      if (isMate == 1) {
        isMate = -99;
      }
    }
  } else {
    isMate = -1;
    if (otherColorNum == 1) {
      for (var r = 0; r < 8; r++) {
        for (var c = 0; c < 8; c++) {
          if (board[r][c] >= 1) {
            var defenceMoves = getAvalibleSquaresRR(r * 8 + c, board);
            if (defenceMoves.length > 0) {
              r = 8;
              c = 8;
              isPat = -1;
            }
          }
        }
      }
    } else if (otherColorNum == -1) {
      for (var r = 0; r < 8; r++) {
        for (var c = 0; c < 8; c++) {
          if (board[r][c] <= -1) {
            var defenceMoves = getAvalibleSquaresRR(r * 8 + c, board);
            if (defenceMoves.length > 0) {
              r = 8;
              c = 8;
              isPat = -1;
            }
          }
        }
      }
    }
  }
  var ret = -1;
  if (isPat == 1) {
    ret = 0;
  }
  if (isMate == 99) {
    ret = -10000000;
  } else if (isMate == -99) {
    ret = 10000000;
  }
  if (ret == 10000000 || ret == -10000000 || isMate == 99 || isMate == -99) {
    //alert("Mate");
  }
  return ret;
}
function getAvalibleSquares(pressedButton, board) {
  var pressedId = pressedButton.id;
  var colPressed = pressedId % cols;

  getAvalibleSquaresR(pressedId, board_array);
}
function getAvalibleSquaresR(pressedId, board) {
  var colPressed = pressedId % cols;
  var rowPressed = Math.floor(pressedId / cols);

  var colorPressed = 1;
  if (board_array[rowPressed][colPressed] < 0) {
    colorPressed = -1;
  }

  if (
    isMarkedMove == -1 &&
    ((turnCounter % 2 == 0 && board_array[rowPressed][colPressed] > 0) ||
      (turnCounter % 2 == 1 && board_array[rowPressed][colPressed] < 0))
  ) {
    if (board_array[rowPressed][colPressed] > 0) {
      whiteUnPassantableSquares = [];
    } else {
      blackUnPassantableSquares = [];
    }
    var a = getAvalibleSquaresRR(pressedId, board_array);
    colorSquares(a);
  } else {
    // מסומן מהלך לכן או לשחק או למחוק
    if (document.getElementById(pressedId).style.backgroundColor != "red") {
      cleanBoard();
      isMarkedMove = -1;
    } else {
      playMove(currentPiceMovingId, pressedId,-1);
      isMarkedMove = -1;
    }
  }
}
function getAvalibleSquaresRR(pressedId, board) {
  currentPiceMovingId = pressedId;
  var colPressed = pressedId % cols;
  var rowPressed = Math.floor(pressedId / cols);
  var avalibleSquares = [];

  var colorPressed = 1;
  if (board[rowPressed][colPressed] < 0) {
    colorPressed = -1;
  }

  if (board[rowPressed][colPressed] == 1) {
    //Pawn
    // White Pawn
    if (rowPressed - 1 > -1) {
      if (board[rowPressed - 1][colPressed] == 0) {
        if (
          isThereCheckComp(
            pressedId,
            rows * (rowPressed - 1) + colPressed,
            -1,
            board
          ) == 1
        ) {
          var av1 = [rowPressed - 1, colPressed];
          avalibleSquares.push(av1);
        }
      }
    }
    if (rowPressed - 2 > -1) {
      if (
        rowPressed == 6 &&
        board[rowPressed - 2][colPressed] == 0 &&
        board[rowPressed - 1][colPressed] == 0
      ) {
        if (
          isThereCheckComp(
            pressedId,
            rows * (rowPressed - 2) + colPressed,
            -1,
            board
          ) == 1
        ) {
          var av2 = [rowPressed - 2, colPressed];
          avalibleSquares.push(av2);
        }
      }
    }
    if (rowPressed - 1 > -1 && colPressed + 1 < 8) {
      if (colPressed + 1 < 8) {
        if (board[rowPressed - 1][colPressed + 1] < 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed - 1) + (colPressed + 1),
              -1,
              board
            ) == 1
          ) {
            var k1 = [rowPressed - 1, colPressed + 1];
            avalibleSquares.push(k1);
          }
        }
      }
    }
    if (rowPressed - 1 > -1 && colPressed - 1 > -1) {
      if (board[rowPressed - 1][colPressed - 1] < 0) {
        if (
          isThereCheckComp(
            pressedId,
            rows * (rowPressed - 1) + (colPressed - 1),
            -1,
            board
          ) == 1
        ) {
          var k2 = [rowPressed - 1, colPressed - 1];
          avalibleSquares.push(k2);
        }
      }
    }

    //unPass
    if (rowPressed - 1 > -1 && colPressed + 1 < 8) {
      if (board[rowPressed][colPressed + 1] == -1) {
        for (var q = 0; q < blackUnPassantableSquares.length; q++) {
          if (rowPressed * 8 + colPressed + 1 == blackUnPassantableSquares[q]) {
            if (
              isThereCheckComp(
                pressedId,
                rows * (rowPressed - 1) + (colPressed + 1),
                -1,
                board
              ) == 1
            ) {
              var k10 = [rowPressed - 1, colPressed + 1];
              avalibleSquares.push(k10);
            }
          }
        }
      }
    }
    if (rowPressed - 1 > -1 && colPressed - 1 > -1) {
      if (board[rowPressed][colPressed - 1] == -1) {
        for (var q = 0; q < blackUnPassantableSquares.length; q++) {
          if (rowPressed * 8 + colPressed - 1 == blackUnPassantableSquares[q]) {
            if (
              isThereCheckComp(
                pressedId,
                rows * (rowPressed - 1) + (colPressed - 1),
                -1,
                board
              ) == 1
            ) {
              var k11 = [rowPressed - 1, colPressed - 1];
              avalibleSquares.push(k11);
            }
          }
        }
      }
    }
  } else if (board[rowPressed][colPressed] == -1) {
    // black Pawn
    if (rowPressed + 1 < 8) {
      if (board[rowPressed + 1][colPressed] == 0) {
        if (
          isThereCheckComp(
            pressedId,
            rows * (rowPressed + 1) + colPressed,
            -1,
            board
          ) == 1
        ) {
          var av1 = [rowPressed + 1, colPressed];
          avalibleSquares.push(av1);
        }
      }
    }

    if (
      rowPressed == 1 &&
      board[rowPressed + 2][colPressed] == 0 &&
      board[rowPressed + 1][colPressed] == 0
    ) {
      if (
        isThereCheckComp(
          pressedId,
          rows * (rowPressed + 2) + colPressed,
          -1,
          board
        ) == 1
      ) {
        var av2 = [rowPressed + 2, colPressed];
        avalibleSquares.push(av2);
      }
    }
    if (colPressed + 1 < 8 && rowPressed + 1 < 8) {
      if (board[rowPressed + 1][colPressed + 1] > 0) {
        if (
          isThereCheckComp(
            pressedId,
            rows * (rowPressed + 1) + colPressed + 1,
            -1,
            board
          ) == 1
        ) {
          var k1 = [rowPressed + 1, colPressed + 1];
          avalibleSquares.push(k1);
        }
      }
    }
    if (colPressed - 1 > -1 && rowPressed + 1 < 8) {
      if (board[rowPressed + 1][colPressed - 1] > 0) {
        if (
          isThereCheckComp(
            pressedId,
            rows * (rowPressed + 1) + (colPressed - 1),
            -1,
            board
          ) == 1
        ) {
          var k2 = [rowPressed + 1, colPressed - 1];
          avalibleSquares.push(k2);
        }
      }
    }
    //unPass
    if (rowPressed + 1 < 8 && colPressed + 1 < 8) {
      if (board[rowPressed][colPressed + 1] == 1) {
        for (var q = 0; q < whiteUnPassantableSquares.length; q++) {
          if (rowPressed * 8 + colPressed + 1 == whiteUnPassantableSquares[q]) {
            if (
              isThereCheckComp(
                pressedId,
                rows * (rowPressed + 1) + (colPressed + 1),
                -1,
                board
              ) == 1
            ) {
              var k10 = [rowPressed + 1, colPressed + 1];
              avalibleSquares.push(k10);
            }
          }
        }
      }
    }
    if (rowPressed + 1 > -1 && colPressed - 1 > -1) {
      if (board[rowPressed][colPressed - 1] == 1) {
        for (var q = 0; q < whiteUnPassantableSquares.length; q++) {
          if (rowPressed * 8 + colPressed - 1 == whiteUnPassantableSquares[q]) {
            if (
              isThereCheckComp(
                pressedId,
                rows * (rowPressed + 1) + (colPressed - 1),
                -1,
                board
              ) == 1
            ) {
              var k11 = [rowPressed + 1, colPressed - 1];
              avalibleSquares.push(k11);
            }
          }
        }
      }
    }
  } else if (
    // knight
    board[rowPressed][colPressed] == 2 ||
    board[rowPressed][colPressed] == -2
  ) {
    var isWhite = 1;
    if (board[rowPressed][colPressed] < 0) {
      isWhite = -1;
    }

    if (rowPressed + 2 <= 7 && colPressed + 1 <= 7) {
      if (
        (board[rowPressed + 2][colPressed + 1] >= 0 && isWhite == -1) ||
        (board[rowPressed + 2][colPressed + 1] <= 0 && isWhite == 1)
      ) {
        if (
          isThereCheckComp(
            pressedId,
            rows * (rowPressed + 2) + (colPressed + 1),
            -1,
            board
          ) == 1
        ) {
          var av1 = [rowPressed + 2, colPressed + 1];
          avalibleSquares.push(av1);
        }
      }
    }
    if (rowPressed + 2 <= 7 && colPressed - 1 >= 0) {
      if (
        (board[rowPressed + 2][colPressed - 1] >= 0 && isWhite == -1) ||
        (board[rowPressed + 2][colPressed - 1] <= 0 && isWhite == 1)
      ) {
        if (
          isThereCheckComp(
            pressedId,
            rows * (rowPressed + 2) + (colPressed - 1),
            -1,
            board
          ) == 1
        ) {
          var av2 = [rowPressed + 2, colPressed - 1];
          avalibleSquares.push(av2);
        }
      }
    }
    if (rowPressed - 2 >= 0 && colPressed + 1 <= 7) {
      if (
        (board[rowPressed - 2][colPressed + 1] >= 0 && isWhite == -1) ||
        (board[rowPressed - 2][colPressed + 1] <= 0 && isWhite == 1)
      ) {
        if (
          isThereCheckComp(
            pressedId,
            rows * (rowPressed - 2) + (colPressed + 1),
            -1,
            board
          ) == 1
        ) {
          var av3 = [rowPressed - 2, colPressed + 1];
          avalibleSquares.push(av3);
        }
      }
    }
    if (rowPressed - 2 >= 0 && colPressed - 1 >= 0) {
      if (
        (board[rowPressed - 2][colPressed - 1] >= 0 && isWhite == -1) ||
        (board[rowPressed - 2][colPressed - 1] <= 0 && isWhite == 1)
      ) {
        if (
          isThereCheckComp(
            pressedId,
            rows * (rowPressed - 2) + (colPressed - 1),
            -1,
            board
          ) == 1
        ) {
          var av4 = [rowPressed - 2, colPressed - 1];
          avalibleSquares.push(av4);
        }
      }
    }
    if (rowPressed + 1 <= 7 && colPressed + 2 <= 7) {
      if (
        (board[rowPressed + 1][colPressed + 2] >= 0 && isWhite == -1) ||
        (board[rowPressed + 1][colPressed + 2] <= 0 && isWhite == 1)
      ) {
        if (
          isThereCheckComp(
            pressedId,
            rows * (rowPressed + 1) + (colPressed + 2),
            -1,
            board
          ) == 1
        ) {
          var av5 = [rowPressed + 1, colPressed + 2];
          avalibleSquares.push(av5);
        }
      }
    }
    if (rowPressed - 1 >= 0 && colPressed + 2 <= 7) {
      if (
        (board[rowPressed - 1][colPressed + 2] >= 0 && isWhite == -1) ||
        (board[rowPressed - 1][colPressed + 2] <= 0 && isWhite == 1)
      ) {
        if (
          isThereCheckComp(
            pressedId,
            rows * (rowPressed - 1) + (colPressed + 2),
            -1,
            board
          ) == 1
        ) {
          var av6 = [rowPressed - 1, colPressed + 2];
          avalibleSquares.push(av6);
        }
      }
    }
    if (rowPressed + 1 <= 7 && colPressed - 2 >= 0) {
      if (
        (board[rowPressed + 1][colPressed - 2] >= 0 && isWhite == -1) ||
        (board[rowPressed + 1][colPressed - 2] <= 0 && isWhite == 1)
      ) {
        if (
          isThereCheckComp(
            pressedId,
            rows * (rowPressed + 1) + (colPressed - 2),
            -1,
            board
          ) == 1
        ) {
          var av7 = [rowPressed + 1, colPressed - 2];
          avalibleSquares.push(av7);
        }
      }
    }
    if (rowPressed - 1 >= 0 && colPressed - 2 >= 0) {
      if (
        (board[rowPressed - 1][colPressed - 2] >= 0 && isWhite == -1) ||
        (board[rowPressed - 1][colPressed - 2] <= 0 && isWhite == 1)
      ) {
        if (
          isThereCheckComp(
            pressedId,
            rows * (rowPressed - 1) + (colPressed - 2),
            -1,
            board
          ) == 1
        ) {
          var av8 = [rowPressed - 1, colPressed - 2];
          avalibleSquares.push(av8);
        }
      }
    }
  } else if (
    //bishop
    board[rowPressed][colPressed] == 3 ||
    board[rowPressed][colPressed] == -3
  ) {
    var end = 0;
    var PP = 0; // al plus plus ...
    var PM = 0;
    var MP = 0;
    var MM = 0;
    var i = 1;

    while (end == 0) {
      if (rowPressed + i < 8 && colPressed + i < 8 && PP == 0) {
        if (board[rowPressed + i][colPressed + i] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed + i) + colPressed + i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed + i, colPressed + i]);
          }
        } else if (
          (board[rowPressed + i][colPressed + i] < 0 && colorPressed == 1) ||
          (board[rowPressed + i][colPressed + i] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed + i) + colPressed + i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed + i, colPressed + i]);
          }
          PP = 1;
        } else {
          PP = 1;
        }
      } else {
        PP = 1;
      }
      if (rowPressed - i > -1 && colPressed + i < 8 && MP == 0) {
        if (board[rowPressed - i][colPressed + i] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed - i) + colPressed + i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed - i, colPressed + i]);
          }
        } else if (
          (board[rowPressed - i][colPressed + i] < 0 && colorPressed == 1) ||
          (board[rowPressed - i][colPressed + i] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed - i) + colPressed + i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed - i, colPressed + i]);
          }
          MP = 1;
        } else {
          MP = 1;
        }
      } else {
        MP = 1;
      }
      if (rowPressed + i < 8 && colPressed - i > -1 && PM == 0) {
        if (board[rowPressed + i][colPressed - i] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed + i) + colPressed - i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed + i, colPressed - i]);
          }
        } else if (
          (board[rowPressed + i][colPressed - i] < 0 && colorPressed == 1) ||
          (board[rowPressed + i][colPressed - i] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed + i) + colPressed - i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed + i, colPressed - i]);
          }
          PM = 1;
        } else {
          PM = 1;
        }
      } else {
        PM = 1;
      }
      if (rowPressed - i > -1 && colPressed - i > -1 && MM == 0) {
        if (board[rowPressed - i][colPressed - i] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed - i) + colPressed - i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed - i, colPressed - i]);
          }
        } else if (
          (board[rowPressed - i][colPressed - i] < 0 && colorPressed == 1) ||
          (board[rowPressed - i][colPressed - i] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed - i) + colPressed - i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed - i, colPressed - i]);
          }
          MM = 1;
        } else {
          MM = 1;
        }
      } else {
        MM = 1;
      }
      if (MM == 1 && PM == 1 && PP == 1 && MP == 1) {
        end = 1;
      }
      i++;
    }
  } else if (
    // rook
    board[rowPressed][colPressed] == 4 ||
    board[rowPressed][colPressed] == -4
  ) {
    var end = 0;
    var RP = 0; // row plus ...
    var RM = 0;
    var CP = 0;
    var CM = 0;
    var i = 1;
    while (end == 0) {
      if (rowPressed + i < 8 && RP == 0) {
        if (board[rowPressed + i][colPressed] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed + i) + colPressed,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed + i, colPressed]);
          }
        } else if (
          (board[rowPressed + i][colPressed] < 0 && colorPressed == 1) ||
          (board[rowPressed + i][colPressed] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed + i) + colPressed,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed + i, colPressed]);
          }
          RP = 1;
        } else {
          RP = 1;
        }
      } else {
        RP = 1;
      }
      if (rowPressed - i > -1 && RM == 0) {
        if (board[rowPressed - i][colPressed] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed - i) + colPressed,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed - i, colPressed]);
          }
        } else if (
          (board[rowPressed - i][colPressed] < 0 && colorPressed == 1) ||
          (board[rowPressed - i][colPressed] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed - i) + colPressed,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed - i, colPressed]);
          }
          RM = 1;
        } else {
          RM = 1;
        }
      } else {
        RM = 1;
      }
      if (colPressed - i > -1 && CM == 0) {
        if (board[rowPressed][colPressed - i] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * rowPressed + (colPressed - i),
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed, colPressed - i]);
          }
        } else if (
          (board[rowPressed][colPressed - i] < 0 && colorPressed == 1) ||
          (board[rowPressed][colPressed - i] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * rowPressed + (colPressed - i),
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed, colPressed - i]);
          }
          CM = 1;
        } else {
          CM = 1;
        }
      } else {
        CM = 1;
      }
      if (colPressed + i < 8 && CP == 0) {
        if (board[rowPressed][colPressed + i] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * rowPressed + (colPressed + i),
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed, colPressed + i]);
          }
        } else if (
          (board[rowPressed][colPressed + i] < 0 && colorPressed == 1) ||
          (board[rowPressed][colPressed + i] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * rowPressed + (colPressed + i),
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed, colPressed + i]);
          }
          CP = 1;
        } else {
          CP = 1;
        }
      } else {
        CP = 1;
      }

      if (CM == 1 && CP == 1 && RM == 1 && RP == 1) {
        end = 1;
      }
      i++;
    }
  } else if (
    board[rowPressed][colPressed] == 7 || // quin
    board[rowPressed][colPressed] == -7
  ) {
    var end = 0;
    var RP = 0; // row plus ...
    var RM = 0;
    var CP = 0;
    var CM = 0;
    var i = 1;
    while (end == 0) {
      if (rowPressed + i < 8 && RP == 0) {
        if (board[rowPressed + i][colPressed] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed + i) + colPressed,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed + i, colPressed]);
          }
        } else if (
          (board[rowPressed + i][colPressed] < 0 && colorPressed == 1) ||
          (board[rowPressed + i][colPressed] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed + i) + colPressed,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed + i, colPressed]);
          }
          RP = 1;
        } else {
          RP = 1;
        }
      } else {
        RP = 1;
      }
      if (rowPressed - i > -1 && RM == 0) {
        if (board[rowPressed - i][colPressed] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed - i) + colPressed,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed - i, colPressed]);
          }
        } else if (
          (board[rowPressed - i][colPressed] < 0 && colorPressed == 1) ||
          (board[rowPressed - i][colPressed] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed - i) + colPressed,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed - i, colPressed]);
          }
          RM = 1;
        } else {
          RM = 1;
        }
      } else {
        RM = 1;
      }
      if (colPressed - i > -1 && CM == 0) {
        if (board[rowPressed][colPressed - i] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * rowPressed + (colPressed - i),
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed, colPressed - i]);
          }
        } else if (
          (board[rowPressed][colPressed - i] < 0 && colorPressed == 1) ||
          (board[rowPressed][colPressed - i] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * rowPressed + (colPressed - i),
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed, colPressed - i]);
          }
          CM = 1;
        } else {
          CM = 1;
        }
      } else {
        CM = 1;
      }
      if (colPressed + i < 8 && CP == 0) {
        if (board[rowPressed][colPressed + i] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * rowPressed + (colPressed + i),
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed, colPressed + i]);
          }
        } else if (
          (board[rowPressed][colPressed + i] < 0 && colorPressed == 1) ||
          (board[rowPressed][colPressed + i] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * rowPressed + (colPressed + i),
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed, colPressed + i]);
          }
          CP = 1;
        } else {
          CP = 1;
        }
      } else {
        CP = 1;
      }

      if (CM == 1 && CP == 1 && RM == 1 && RP == 1) {
        end = 1;
      }
      i++;
    }

    var end = 0;
    var PP = 0; // al plus plus ...
    var PM = 0;
    var MP = 0;
    var MM = 0;
    var i = 1;

    while (end == 0) {
      if (rowPressed + i < 8 && colPressed + i < 8 && PP == 0) {
        if (board[rowPressed + i][colPressed + i] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed + i) + colPressed + i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed + i, colPressed + i]);
          }
        } else if (
          (board[rowPressed + i][colPressed + i] < 0 && colorPressed == 1) ||
          (board[rowPressed + i][colPressed + i] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed + i) + colPressed + i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed + i, colPressed + i]);
          }
          PP = 1;
        } else {
          PP = 1;
        }
      } else {
        PP = 1;
      }
      if (rowPressed - i > -1 && colPressed + i < 8 && MP == 0) {
        if (board[rowPressed - i][colPressed + i] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed - i) + colPressed + i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed - i, colPressed + i]);
          }
        } else if (
          (board[rowPressed - i][colPressed + i] < 0 && colorPressed == 1) ||
          (board[rowPressed - i][colPressed + i] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed - i) + colPressed + i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed - i, colPressed + i]);
          }
          MP = 1;
        } else {
          MP = 1;
        }
      } else {
        MP = 1;
      }
      if (rowPressed + i < 8 && colPressed - i > -1 && PM == 0) {
        if (board[rowPressed + i][colPressed - i] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed + i) + colPressed - i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed + i, colPressed - i]);
          }
        } else if (
          (board[rowPressed + i][colPressed - i] < 0 && colorPressed == 1) ||
          (board[rowPressed + i][colPressed - i] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed + i) + colPressed - i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed + i, colPressed - i]);
          }
          PM = 1;
        } else {
          PM = 1;
        }
      } else {
        PM = 1;
      }
      if (rowPressed - i > -1 && colPressed - i > -1 && MM == 0) {
        if (board[rowPressed - i][colPressed - i] == 0) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed - i) + colPressed - i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed - i, colPressed - i]);
          }
        } else if (
          (board[rowPressed - i][colPressed - i] < 0 && colorPressed == 1) ||
          (board[rowPressed - i][colPressed - i] > 0 && colorPressed == -1)
        ) {
          if (
            isThereCheckComp(
              pressedId,
              rows * (rowPressed - i) + colPressed - i,
              -1,
              board
            ) == 1
          ) {
            avalibleSquares.push([rowPressed - i, colPressed - i]);
          }
          MM = 1;
        } else {
          MM = 1;
        }
      } else {
        MM = 1;
      }
      if (MM == 1 && PM == 1 && PP == 1 && MP == 1) {
        end = 1;
      }
      i++;
    }
  } else if (
    // king
    board[rowPressed][colPressed] == 8 ||
    board[rowPressed][colPressed] == -8
  ) {
    var isWhite = 1;
    if (board[rowPressed][colPressed] < 0) {
      isWhite = -1;
    }
    //#region KingMove
    if (
      rowPressed + 1 < 8 &&
      ((board[rowPressed + 1][colPressed] >= 0 && isWhite == -1) ||
        (board[rowPressed + 1][colPressed] <= 0 && isWhite == 1))
    ) {
      if (
        isThereCheckComp(
          pressedId,
          rows * (rowPressed + 1) + colPressed,
          -1,
          board
        ) == 1
      ) {
        avalibleSquares.push([rowPressed + 1, colPressed]);
      }
    }
    if (
      rowPressed + 1 < 8 &&
      colPressed + 1 < 8 &&
      ((board[rowPressed + 1][colPressed + 1] >= 0 && isWhite == -1) ||
        (board[rowPressed + 1][colPressed + 1] <= 0 && isWhite == 1))
    ) {
      if (
        isThereCheckComp(
          pressedId,
          rows * (rowPressed + 1) + colPressed + 1,
          -1,
          board
        ) == 1
      ) {
        avalibleSquares.push([rowPressed + 1, colPressed + 1]);
      }
    }
    if (
      colPressed + 1 < 8 &&
      ((board[rowPressed][colPressed + 1] >= 0 && isWhite == -1) ||
        (board[rowPressed][colPressed + 1] <= 0 && isWhite == 1))
    ) {
      if (
        isThereCheckComp(
          pressedId,
          rows * rowPressed + colPressed + 1,
          -1,
          board
        ) == 1
      ) {
        avalibleSquares.push([rowPressed, colPressed + 1]);
      }
    }
    if (
      rowPressed - 1 > -1 &&
      colPressed + 1 < 8 &&
      ((board[rowPressed - 1][colPressed + 1] >= 0 && isWhite == -1) ||
        (board[rowPressed - 1][colPressed + 1] <= 0 && isWhite == 1))
    ) {
      if (
        isThereCheckComp(
          pressedId,
          rows * (rowPressed - 1) + colPressed + 1,
          -1,
          board
        ) == 1
      ) {
        avalibleSquares.push([rowPressed - 1, colPressed + 1]);
      }
    }
    if (
      rowPressed - 1 > -1 &&
      ((board[rowPressed - 1][colPressed] >= 0 && isWhite == -1) ||
        (board[rowPressed - 1][colPressed] <= 0 && isWhite == 1))
    ) {
      if (
        isThereCheckComp(
          pressedId,
          rows * (rowPressed - 1) + colPressed,
          -1,
          board
        ) == 1
      ) {
        avalibleSquares.push([rowPressed - 1, colPressed]);
      }
    }
    if (
      rowPressed - 1 > -1 &&
      colPressed - 1 > -1 &&
      ((board[rowPressed - 1][colPressed - 1] >= 0 && isWhite == -1) ||
        (board[rowPressed - 1][colPressed - 1] <= 0 && isWhite == 1))
    ) {
      if (
        isThereCheckComp(
          pressedId,
          rows * (rowPressed - 1) + colPressed - 1,
          -1,
          board
        ) == 1
      ) {
        avalibleSquares.push([rowPressed - 1, colPressed - 1]);
      }
    }
    if (
      colPressed - 1 > -1 &&
      ((board[rowPressed][colPressed - 1] >= 0 && isWhite == -1) ||
        (board[rowPressed][colPressed - 1] <= 0 && isWhite == 1))
    ) {
      if (
        isThereCheckComp(
          pressedId,
          rows * rowPressed + colPressed - 1,
          -1,
          board
        ) == 1
      ) {
        avalibleSquares.push([rowPressed, colPressed - 1]);
      }
    }
    if (
      rowPressed + 1 < 8 &&
      colPressed - 1 > -1 &&
      ((board[rowPressed + 1][colPressed - 1] >= 0 && isWhite == -1) ||
        (board[rowPressed + 1][colPressed - 1] <= 0 && isWhite == 1))
    ) {
      if (
        isThereCheckComp(
          pressedId,
          rows * (rowPressed + 1) + colPressed - 1,
          -1,
          board
        ) == 1
      ) {
        avalibleSquares.push([rowPressed + 1, colPressed - 1]);
      }
    }

    //#endregion
    //#region castle
    var isChecked = -1;

    var passToCheck = isWhite;
    if (passToCheck == -1) {
      passToCheck = -2;
    }
    if (isThereCheckComp(-1, -1, passToCheck, board) == -1) {
      isChecked = 1;
    }

    if (isChecked == -1) {
      if (
        (rowPressed == 7 && colPressed == 4) ||
        (rowPressed == 0 && colPressed == 4)
      ) {
        if (rowPressed == 7) {
          if (
            whiteKingHasMoved == 0 &&
            whiteRookAHasMoved == 0 &&
            board[7][0] == 4 &&
            board[7][1] == 0 &&
            board[7][2] == 0 &&
            board[7][3] == 0
          ) {
            avalibleSquares.push([7, 2]);
          }
          if (
            whiteKingHasMoved == 0 &&
            whiteRookBHasMoved == 0 &&
            board[7][7] == 4 &&
            board[7][6] == 0 &&
            board[7][5] == 0
          ) {
            avalibleSquares.push([7, 6]);
          }
        } else if (rowPressed == 0) {
          if (
            blackKingHasMoved == 0 &&
            blackRookAHasMoved == 0 &&
            board[0][0] == -4 &&
            board[0][1] == 0 &&
            board[0][2] == 0 &&
            board[0][3] == 0
          ) {
            avalibleSquares.push([0, 2]);
          }
          if (
            blackKingHasMoved == 0 &&
            blackRookBHasMoved == 0 &&
            board[0][7] == -4 &&
            board[0][6] == 0 &&
            board[0][5] == 0
          ) {
            avalibleSquares.push([0, 6]);
          }
        }
      }
    }
    //#endregion
  }
  return avalibleSquares;
}
function endGameHelpEvaluateBoard(
  friendlyKingsquare,
  enemyKingSquare,
  endGameWeight
) {
  var evaluation = 0;

  var friendRow = Math.floor(friendlyKingsquare / cols);
  var friendCol = friendlyKingsquare % cols;
  var enemyRow = Math.floor(enemyKingSquare / cols);
  var enemyCol = enemyKingSquare % cols;

  var eponentKingDstToCentralCol = Math.max(3 - enemyCol, enemyCol - 4);
  var eponentKingDstToCentralRow = Math.max(3 - enemyRow, enemyRow - 4);
  var eponentKingDstFromCentere =
    eponentKingDstToCentralCol + eponentKingDstToCentralRow;
  evaluation += eponentKingDstFromCentere * 4;

  var dstBetweenKingsCol = Math.abs(friendCol - enemyCol);
  var dstBetweenKingsRow = Math.abs(friendRow - enemyRow);
  var dstBetweenKings = dstBetweenKingsCol + dstBetweenKingsRow;

  evaluation += 14 - dstBetweenKings * 3;
  return evaluation * 8 * endGameWeight;
}
function evaluateBoard(board, isWhite) {
  var matirialValue = 0;
  var currentMat = 0;
  var positionalValue = 0;

  var amountOfQuins = 0;
  for (var e = 0; e < 8; e++) {
    for (var k = 0; k < 8; k++) {
      if (Math.abs(board[e][k]) == 8) {
        amountOfQuins++;
      }
    }
  }
  if (amountOfQuins == 2) {
    var stage = 2;
  } else {
    var stage = 3;
  }

  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      var placeForBlack = (7 - r) * 8 + c;

      if (board[r][c] == 1) {
        if (r != 0) {
          matirialValue += 1;
          currentMat += 1;
          positionalValue += pawnTable[r * 8 + c];
        } else {
          matirialValue += 9;
          currentMat += 9;
          positionalValue += quinTable[r * 8 + c];
        }
      } else if (board[r][c] == -1) {
        if (r != 7) {
        matirialValue -= 1;
        currentMat += 1;
        positionalValue -= pawnTable[placeForBlack];
        }else{
          matirialValue -= 9;
          currentMat += 9;
          positionalValue -= quinTable[placeForBlack];
        }
      } else if (board[r][c] == 2) {
        matirialValue += 3;
        currentMat += 3;
        positionalValue += knightTable[r * 8 + c];
      } else if (board[r][c] == -2) {
        matirialValue -= 3;
        currentMat += 3;
        positionalValue -= knightTable[placeForBlack];
      } else if (board[r][c] == 3) {
        currentMat += 3;
        matirialValue += 3;
        positionalValue += bishopTable[r * 8 + c];
      } else if (board[r][c] == -3) {
        currentMat += 3;
        matirialValue -= 3;
        positionalValue -= bishopTable[placeForBlack];
      } else if (board[r][c] == 4) {
        currentMat += 5;
        matirialValue += 5;
        positionalValue += rookTable[r * 8 + c];
      } else if (board[r][c] == -4) {
        currentMat += 5;
        matirialValue -= 5;
        positionalValue -= rookTable[placeForBlack];
      } else if (board[r][c] == 7) {
        currentMat += 9;
        matirialValue += 9;
        positionalValue += quinTable[r * 8 + c];
      } else if (board[r][c] == -7) {
        currentMat += 9;
        positionalValue -= quinTable[placeForBlack];
        matirialValue -= 9;
      } else if (board[r][c] == 8) {
        var whiteKingsPlace = r * 8 + c;
        if ((stage = 2)) {
          positionalValue -= kingMidTable[r * 8 + c];
        } else {
          positionalValue -= kingEndTable[r * 8 + c];
        }
        matirialValue += 20000;
      } else if (board[r][c] == -8) {
        var blackKingsPlace = r * 8 + c;
        if (stage == 2) {
          positionalValue -= kingMidTable[placeForBlack];
        } else {
          positionalValue -= kingEndTable[placeForBlack];
        }
        matirialValue -= 20000;
      }
    }
  }
  var endGameWeight = (78 - currentMat) / 78;
  if (isWhite == 1) {
    var endGameBust = endGameHelpEvaluateBoard(
      whiteKingsPlace,
      blackKingsPlace,
      endGameWeight
    );
  } else {
    var endGameBust = -endGameHelpEvaluateBoard(
      blackKingsPlace,
      whiteKingsPlace,
      endGameWeight
    );
  }

  let result = mateToMinMax(board, isWhite);
  if (result != -1) {
    return result;
  }/////////////////prob
  return matirialValue * 70 + positionalValue + endGameBust;
}
function getPieceValue(piceType) {
  var ret;
  if (piceType == 1) {
    ret = 1;
  } else if (piceType == -1) {
    ret = 1;
  } else if (piceType == 2) {
    ret = 3;
  } else if (piceType == -2) {
    ret = 3;
  } else if (piceType == 3) {
    ret = 3;
  } else if (piceType == -3) {
    ret = 3;
  } else if (piceType == 4) {
    ret = 5;
  } else if (piceType == -4) {
    ret = 5;
  } else if (piceType == 7) {
    ret = 9;
  } else if (piceType == -7) {
    matirialValue = 9;
  } else if (piceType == 8) {
    matirialValue = 20000;
  } else if (piceType == -8) {
    matirialValue = 20000;
  }
  return ret;
}

function orderMoves(movesToOrder, board) {
  var arrayVals = new Array(movesToOrder.length);
  for (var i = 0; i < movesToOrder.length; i++) {
    var colPressed = movesToOrder[i][0] % cols;
    var rowPressed = Math.floor(movesToOrder[i][0] / cols);
    var colToMove = movesToOrder[i][1] % cols;
    var rowToMove = Math.floor(movesToOrder[i][1] / cols);
    var piceType = board[rowPressed][colPressed];
    var isWhite = 1;
    if (piceType < 0) {
      isWhite = -1;
    }
    var isCapture = 1;
    if (board[rowToMove][colToMove] == 0) {
      isCapture == 0;
    }

    var currentGuessValue = 0;
    if (
      (isWhite == 1 && board[rowToMove][colToMove] == -1) ||
      (isWhite == -1 && board[rowToMove][colToMove] == 1)
    ) {
      // were eating
      currentGuessValue +=
        getPieceValue(board[rowToMove][colToMove]) -
        getPieceValue(board[rowPressed][colPressed]);
    }
    if (
      (isWhite == 1 && rowPressed == 1 && piceType == 1) ||
      (isWhite == -1 && rowPressed == 6 && piceType == -1)
    ) {
      //were premoting
      currentGuessValue += 15;
    }

    if (isWhite == 1) {
      // start of check if were moving to other pqwn
      if (colToMove + 1 < 8 && rowToMove - 1 > -1) {
        if (board[rowToMove - 1][colToMove + 1] == -1) {
          currentGuessValue -= getPieceValue(piceType);
        }
      }
      if (colToMove - 1 > -1 && rowToMove - 1 > -1) {
        if (board[rowToMove - 1][colToMove - 1] == -1) {
          currentGuessValue -= getPieceValue(piceType);
        }
      }
    } else {
      if (colToMove + 1 < 8 && rowToMove + 1 < 8) {
        if (board[rowToMove + 1][colToMove + 1] == 1) {
          currentGuessValue -= getPieceValue(piceType);
        }
      }
      if (colToMove - 1 > -1 && rowToMove + 1 < 8) {
        if (board[rowToMove + 1][colToMove - 1] == 1) {
          currentGuessValue -= getPieceValue(piceType);
        }
      }
    }
    arrayVals[i] = currentGuessValue;
  }
  for (var x = 0; x < arrayVals.length; x++) {
    for (var z = 0; z < arrayVals.length; z++) {
      if (arrayVals[z] < arrayVals[z + 1]) {
        var bein = arrayVals[z];
        arrayVals[z] = arrayVals[z + 1];
        arrayVals[z + 1] = bein;

        var beinX = movesToOrder[z];
        movesToOrder[z] = movesToOrder[z + 1];
        movesToOrder[z + 1] = beinX;
      }
    }
  }
  return movesToOrder;
}
function mateToMinMax(board, colorToCheck) {
  var minMated = isThereMate(colorToCheck, board);
  var maxMated = isThereMate(-colorToCheck, board);

  if (minMated == 10000000 || maxMated == 10000000) {
    return 10000000;
  } else if (minMated == -10000000 || maxMated == -10000000) {
    return -10000000;
  } else if (minMated == 0 || maxMated == 0) {
    return 0;
  } else {
    return -1;
  }
}
function getPossibleMoves(boardToCheck, isWhite, isCuptures) {
  var totAvalibleSquares = [];
  var totAvCuptures = [];
  if (isWhite == 1) {
    for (var r = 0; r < 8; r++) {
      for (var c = 0; c < 8; c++) {
        if (boardToCheck[r][c] > 0) {
          var avalibleSquaresForPice = getAvalibleSquaresRR(
            r * 8 + c,
            boardToCheck
          );

          for (var i = 0; i < avalibleSquaresForPice.length; i++) {
            totAvalibleSquares.push([
              r * 8 + c,
              avalibleSquaresForPice[i][0] * 8 + avalibleSquaresForPice[i][1],
            ]);
          }
        }
      }
    }
  } else {
    for (var r = 0; r < 8; r++) {
      for (var c = 0; c < 8; c++) {
        if (boardToCheck[r][c] < 0) {
          var avalibleSquaresForPice = getAvalibleSquaresRR(
            r * 8 + c,
            boardToCheck
          );

          for (var i = 0; i < avalibleSquaresForPice.length; i++) {
            totAvalibleSquares.push([
              r * 8 + c,
              avalibleSquaresForPice[i][0] * 8 + avalibleSquaresForPice[i][1],
            ]);
          }
        }
      }
    }
  }
  if (isCuptures == 1) {
    for (var r = 0; r < totAvalibleSquares.length; r++) {
      var colToMove = totAvalibleSquares[r][1] % cols;
      var rowToMove = Math.floor(totAvalibleSquares[r][1] / cols);

      if (boardToCheck[rowToMove][colToMove] != 0) {
        totAvCuptures.push(totAvalibleSquares[r]);
      }
    }
    return orderMoves(totAvCuptures, boardToCheck);
  }

  return orderMoves(totAvalibleSquares, boardToCheck);
}
function visuMoveMinMax(board, pieceToMove, placeToMove) {
  var retBoardArray = new Array(rows);
  for (var i = 0; i < rows; i++) {
    retBoardArray[i] = new Array(cols);
  }
  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      retBoardArray[r][c] = board[r][c];
    }
  }
  var colPressed = pieceToMove % cols;
  var rowPressed = Math.floor(pieceToMove / cols);
  var pieceThatMove = board[rowPressed][colPressed];

  var colPressedToMove = placeToMove % cols;
  var rowPressedToMove = Math.floor(placeToMove / cols);

  retBoardArray[rowPressed][colPressed] = 0;
  retBoardArray[rowPressedToMove][colPressedToMove] = pieceThatMove;

  return retBoardArray;
}
function isThereCheckComp(pieceToMove, placeToMove, mateColor, board) {
  if (mateColor == -1) {
    afterMoveArray = visuMoveMinMax(board, pieceToMove, placeToMove);
    var colPressed = pieceToMove % cols;
    var rowPressed = Math.floor(pieceToMove / cols);

    var colorPressed = 1;
    if (board[rowPressed][colPressed] < 0) {
      colorPressed = -1;
    }
  } else {
    var afterMoveArray = new Array(rows);
    for (var i = 0; i < rows; i++) {
      afterMoveArray[i] = new Array(cols);
    }
    for (var r = 0; r < 8; r++) {
      for (var c = 0; c < 8; c++) {
        afterMoveArray[r][c] = board[r][c];
      }
    }
    if (mateColor == 1) {
      var colorPressed = 1;
    } else {
      var colorPressed = -1;
    }
  }

  for (var r = 0; r < 8; r++) {
    for (var c = 0; c < 8; c++) {
      if (afterMoveArray[r][c] == colorPressed * 8) {
        var kingsRow = r;
        var kingsCol = c;
      }
    }
  }
  var isChecked = -1;
  //#region pawnChecking
  if (colorPressed == 1) {
    if (kingsCol + 1 < 8 && kingsRow - 1 > -1) {
      if (afterMoveArray[kingsRow - 1][kingsCol + 1] == -1) {
        isChecked = 1;
      }
    }
    if (kingsCol - 1 > -1 && kingsRow - 1 > -1) {
      if (afterMoveArray[kingsRow - 1][kingsCol - 1] == -1) {
        isChecked = 1;
      }
    }
  } else {
    if (kingsCol + 1 < 8 && kingsRow + 1 < 8) {
      if (afterMoveArray[kingsRow + 1][kingsCol + 1] == 1) {
        isChecked = 1;
      }
    }
    if (kingsCol - 1 > -1 && kingsRow + 1 < 8) {
      if (afterMoveArray[kingsRow + 1][kingsCol - 1] == 1) {
        isChecked = 1;
      }
    }
  }
  //#endregion

  //#region knightChecking

  if (kingsRow + 2 <= 7 && kingsCol + 1 <= 7) {
    if (afterMoveArray[kingsRow + 2][kingsCol + 1] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  if (kingsRow + 2 <= 7 && kingsCol - 1 >= 0) {
    if (afterMoveArray[kingsRow + 2][kingsCol - 1] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  if (kingsRow - 2 >= 0 && kingsCol + 1 <= 7) {
    if (afterMoveArray[kingsRow - 2][kingsCol + 1] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  if (kingsRow - 2 >= 0 && kingsCol - 1 >= 0) {
    if (afterMoveArray[kingsRow - 2][kingsCol - 1] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  if (kingsRow + 1 <= 7 && kingsCol + 2 <= 7) {
    if (afterMoveArray[kingsRow + 1][kingsCol + 2] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  if (kingsRow - 1 >= 0 && kingsCol + 2 <= 7) {
    if (afterMoveArray[kingsRow - 1][kingsCol + 2] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  if (kingsRow + 1 <= 7 && kingsCol - 2 >= 0) {
    if (afterMoveArray[kingsRow + 1][kingsCol - 2] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  if (kingsRow - 1 >= 0 && kingsCol - 2 >= 0) {
    if (afterMoveArray[kingsRow - 1][kingsCol - 2] == -2 * colorPressed) {
      isChecked = 1;
    }
  }
  //#endregion

  //#region kingChecking
  if (
    kingsRow + 1 < 8 &&
    afterMoveArray[kingsRow + 1][kingsCol] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  if (
    kingsRow + 1 < 8 &&
    kingsCol + 1 < 8 &&
    afterMoveArray[kingsRow + 1][kingsCol + 1] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  if (
    kingsCol + 1 < 8 &&
    afterMoveArray[kingsRow][kingsCol + 1] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  if (
    kingsRow - 1 > -1 &&
    kingsCol + 1 < 8 &&
    afterMoveArray[kingsRow - 1][kingsCol + 1] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  if (
    kingsRow - 1 > -1 &&
    afterMoveArray[kingsRow - 1][kingsCol] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  if (
    kingsRow - 1 > -1 &&
    kingsCol - 1 > -1 &&
    afterMoveArray[kingsRow - 1][kingsCol - 1] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  if (
    kingsCol - 1 > -1 &&
    afterMoveArray[kingsRow][kingsCol - 1] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  if (
    kingsRow + 1 < 8 &&
    kingsCol - 1 > -1 &&
    afterMoveArray[kingsRow + 1][kingsCol - 1] == -8 * colorPressed
  ) {
    isChecked = 1;
  }
  //#endregion

  //#region rooksChecking
  var end = 0;
  var RP = 0; // row plus ...
  var RM = 0;
  var CP = 0;
  var CM = 0;
  var i = 1;
  while (end == 0) {
    if (kingsRow + i < 8 && RP == 0) {
      if (
        (afterMoveArray[kingsRow + i][kingsCol] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow + i][kingsCol] < 0 && colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol]) == 2 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol]) == 1 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol]) == 3 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol]) == 8
      ) {
        RP = 1;
      } else if (
        (afterMoveArray[kingsRow + i][kingsCol] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow + i][kingsCol] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        RP = 1;
      }
    } else {
      RP = 1;
    }
    if (kingsRow - i > -1 && RM == 0) {
      if (
        (afterMoveArray[kingsRow - i][kingsCol] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow - i][kingsCol] < 0 && colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol]) == 2 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol]) == 1 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol]) == 3 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol]) == 8
      ) {
        RM = 1;
      } else if (
        (afterMoveArray[kingsRow - i][kingsCol] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow - i][kingsCol] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        RM = 1;
      }
    } else {
      RM = 1;
    }
    if (kingsCol - i > -1 && CM == 0) {
      if (
        (afterMoveArray[kingsRow][kingsCol - i] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow][kingsCol - i] < 0 && colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow][kingsCol - i]) == 2 ||
        Math.abs(afterMoveArray[kingsRow][kingsCol - i]) == 1 ||
        Math.abs(afterMoveArray[kingsRow][kingsCol - i]) == 3 ||
        Math.abs(afterMoveArray[kingsRow][kingsCol - i]) == 8
      ) {
        CM = 1;
      } else if (
        (afterMoveArray[kingsRow][kingsCol - i] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow][kingsCol - i] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        CM = 1;
      }
    } else {
      CM = 1;
    }
    if (kingsCol + i < 8 && CP == 0) {
      if (
        (afterMoveArray[kingsRow][kingsCol + i] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow][kingsCol + i] < 0 && colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow][kingsCol + i]) == 2 ||
        Math.abs(afterMoveArray[kingsRow][kingsCol + i]) == 1 ||
        Math.abs(afterMoveArray[kingsRow][kingsCol + i]) == 3 ||
        Math.abs(afterMoveArray[kingsRow][kingsCol + i]) == 8
      ) {
        CP = 1;
      } else if (
        (afterMoveArray[kingsRow][kingsCol + i] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow][kingsCol + i] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        CP = 1;
      }
    } else {
      CP = 1;
    }

    if (CM == 1 && CP == 1 && RM == 1 && RP == 1) {
      end = 1;
    }
    i++;
  }

  //#endregion

  //#region bishopChecking
  var end = 0;
  var PP = 0; // al plus plus ...
  var PM = 0;
  var MP = 0;
  var MM = 0;
  var i = 1;
  // var colorPressed = 1;
  // if (afterMoveArray[kingsRow][kingsCol] < 0) {
  //   colorPressed = -1;
  // }
  while (end == 0) {
    if (kingsRow + i < 8 && kingsCol + i < 8 && PP == 0) {
      if (
        (afterMoveArray[kingsRow + i][kingsCol + i] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow + i][kingsCol + i] < 0 &&
          colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol + i]) == 2 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol + i]) == 1 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol + i]) == 4 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol + i]) == 8
      ) {
        PP = 1;
      } else if (
        (afterMoveArray[kingsRow + i][kingsCol + i] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow + i][kingsCol + i] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        PP = 1;
      }
    } else {
      PP = 1;
    }
    if (kingsRow - i > -1 && kingsCol + i < 8 && MP == 0) {
      if (
        (afterMoveArray[kingsRow - i][kingsCol + i] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow - i][kingsCol + i] < 0 &&
          colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol + i]) == 2 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol + i]) == 1 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol + i]) == 4 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol + i]) == 8
      ) {
        MP = 1;
      } else if (
        (afterMoveArray[kingsRow - i][kingsCol + i] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow - i][kingsCol + i] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        MP = 1;
      }
    } else {
      MP = 1;
    }
    if (kingsRow + i < 8 && kingsCol - i > -1 && PM == 0) {
      if (
        (afterMoveArray[kingsRow + i][kingsCol - i] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow + i][kingsCol - i] < 0 &&
          colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol - i]) == 2 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol - i]) == 1 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol - i]) == 4 ||
        Math.abs(afterMoveArray[kingsRow + i][kingsCol - i]) == 8
      ) {
        PM = 1;
      } else if (
        (afterMoveArray[kingsRow + i][kingsCol - i] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow + i][kingsCol - i] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        PM = 1;
      }
    } else {
      PM = 1;
    }
    if (kingsRow - i > -1 && kingsCol - i > -1 && MM == 0) {
      if (
        (afterMoveArray[kingsRow - i][kingsCol - i] > 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow - i][kingsCol - i] < 0 &&
          colorPressed == -1) ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol - i]) == 2 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol - i]) == 1 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol - i]) == 4 ||
        Math.abs(afterMoveArray[kingsRow - i][kingsCol - i]) == 8
      ) {
        MM = 1;
      } else if (
        (afterMoveArray[kingsRow - i][kingsCol - i] < 0 && colorPressed == 1) ||
        (afterMoveArray[kingsRow - i][kingsCol - i] > 0 && colorPressed == -1)
      ) {
        isChecked = 1;
        MM = 1;
      }
    } else {
      MM = 1;
    }
    if (MM == 1 && PM == 1 && PP == 1 && MP == 1) {
      end = 1;
    }
    i++;
  }
  //#endregion
  var isLegal = 1;
  if (isChecked == 1) {
    isLegal = -1;
  }
  return isLegal;
}
function minMax(board, depth, isWhite) {
  //justMinMax

  let result = mateToMinMax(board, isWhite);
  if (result != 0) {
    return result;
  } else if (depth == 0) {
    return evaluateBoard(board,isWhite);
  }

  if (isWhite == 1) {
    let bestScore = -Infinity;
    var possibleMoves = getPossibleMoves(board, 1, -1);
    for (var i = 0; i < possibleMoves.length; i++) {
      var boardToPass = visuMoveMinMax(
        board,
        possibleMoves[i][0],
        possibleMoves[i][1]
      );

      let score = minMax(boardToPass, depth - 1, -1);

      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else if (isWhite == -1) {
    let bestScore = Infinity;
    var possibleMoves = getPossibleMoves(board, -1, -1);
    for (var i = 0; i < possibleMoves.length; i++) {
      var boardToPass = visuMoveMinMax(
        board,
        possibleMoves[i][0],
        possibleMoves[i][1]
      );

      let score = minMax(boardToPass, depth - 1, 1);

      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}
function minMaxAB(board, depth, alpha, beta, isWhite) {
  //whith alpha beta

  let result = mateToMinMax(board, -isWhite);
  if (result != -1) {
    if (result == 10000000 || result == -10000000) {
      result *= depth + 1;
    }
    return result;
  } else if (depth == 0) {
    return SearchAllCaptures(board, 3, alpha, beta, isWhite); ////
  }

  if (isWhite == 1) {
    let bestScore = -Infinity;
    var possibleMoves = getPossibleMoves(board, 1, -1);
    for (var i = 0; i < possibleMoves.length; i++) {
      var boardToPass = visuMoveMinMax(
        board,
        possibleMoves[i][0],
        possibleMoves[i][1]
      );

      let score = minMaxAB(boardToPass, depth - 1, alpha, beta, -1);

      bestScore = Math.max(score, bestScore);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) {
        break;
      }
    }
    return bestScore;
  } else if (isWhite == -1) {
    let bestScore = Infinity;
    var possibleMoves = getPossibleMoves(board, -1, -1);
    for (var i = 0; i < possibleMoves.length; i++) {
      var boardToPass = visuMoveMinMax(
        board,
        possibleMoves[i][0],
        possibleMoves[i][1]
      );

      let score = minMaxAB(boardToPass, depth - 1, alpha, beta, 1);

      bestScore = Math.min(score, bestScore);

      beta = Math.min(beta, score);
      if (beta <= alpha) {
        break;
      }
    }
    return bestScore;
  }
}
function SearchAllCaptures(board, depth, alpha, beta, isWhite) {
  var evaluation = evaluateBoard(board, isWhite);
  let result = mateToMinMax(board, isWhite);

  if (result != -1) {
    if (result == 10000000 || result == -10000000) {
      result *= depth + 1;
    }
    return result;
  } else if (depth == 0) {
    return evaluation;
  }
  if (evaluation >= beta) {
    return beta;
  }
  alpha = Math.max(alpha, evaluation);

  var cuptureMoves = getPossibleMoves(board, isWhite, 1);

  for (var i = 0; i < cuptureMoves.length; i++) {
    var cuptureMove = cuptureMoves[i];

    var visuMoveBoard = visuMoveMinMax(board, cuptureMove[0], cuptureMove[1]);

    evaluation = -SearchAllCaptures(
      visuMoveBoard,
      depth - 1,
      -beta,
      -alpha,
      -isWhite
    );

    if (evaluation >= beta) {
      return beta;
    }
    alpha = Math.max(alpha, evaluation);
  }

  return alpha;
}
function enemyPlay() {
  //for black
  var possibleMoves = getPossibleMoves(board_array, -1, -1);
  var bestScore = Infinity;
  var bestIritation = 0;
  for (var i = 0; i < possibleMoves.length; i++) {
    var boardToPass = visuMoveMinMax(
      board_array,
      possibleMoves[i][0],
      possibleMoves[i][1]
    );

    currentScore = minMaxAB(boardToPass, 2, 1); //,-Infinity,+Infinity

    if (currentScore < bestScore) {
      bestScore = currentScore;
      bestIritation = i;
    }
  }
  playMove(possibleMoves[bestIritation][0], possibleMoves[bestIritation][1],1);
}
