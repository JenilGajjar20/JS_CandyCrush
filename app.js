document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const width = 8;
  const squares = [];
  let score = 0;

  const candyColors = [
    "url(images/redCandy.png)",
    "url(images/blueCandy.png)",
    "url(images/greenCandy.png)",
    "url(images/yellowCandy.png)",
    "url(images/purpleCandy.png)",
    "url(images/orangeCandy.png)",
  ];
  // console.log(candyColors.length);

  // Create the board
  function createBoard() {
    for (i = 0; i < width * width; i++) {
      // console.log(i);
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      const randomColor = Math.floor(Math.random() * candyColors.length);
      // console.log(randomColor);
      square.style.backgroundImage = candyColors[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  }

  createBoard();

  // Drag the Candies
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("dragleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id);
    console.log(colorBeingDragged + " " + squareIdBeingDragged);
    console.log(this.id, "Start");
  }

  function dragOver(e) {
    e.preventDefault();
    console.log(this.id, "Over");
  }

  function dragEnter(e) {
    e.preventDefault();
    console.log(this.id, "Enter");
  }

  function dragLeave() {
    this.style.backgroundImage = "";
    console.log(this.id, "Leave");
  }

  function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
    console.log(this.id, "Drop");
  }

  function dragEnd() {
    console.log(this.id, "End");

    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];

    // console.log(validMoves);

    let validMove = validMoves.includes(squareIdBeingReplaced);
    // console.log(validMove);

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    } else {
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    }
  }

  //   Drop the candies once cleared
  function moveCandiesDown() {
    for (i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === "") {
        squares[i + width].style.backgroundImage =
          squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = "";

        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);

        if (isFirstRow && squares[i].style.backgroundImage === "") {
          let randomColor = Math.floor(Math.random() * candyColors.length);
          squares[i].style.backgroundImage = candyColors[randomColor];
        }
      }
    }
  }

  moveCandiesDown();

  //   Check for matches

  // Check for row of three
  function checkForThreeRow() {
    for (i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      // console.log(rowOfThree);
      let decidedColor = squares[i].style.backgroundImage;
      // console.log(decidedColor);
      const isBlank = squares[i].style.backgroundImage === "";
      // console.log(isBlank);

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) {
        continue;
      }

      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }

  checkForThreeRow();

  //   Check for column of three
  function checkForThreeColumn() {
    for (i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      // console.log(columnOfThree);
      let decidedColor = squares[i].style.backgroundImage;
      // console.log(decidedColor);
      const isBlank = squares[i].style.backgroundImage === "";
      // console.log(isBlank);

      if (
        columnOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }

  checkForThreeColumn();

  //   Check for row of four
  function checkForFourRow() {
    for (i = 0; i < 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      // console.log(rowOfFour);
      let decidedColor = squares[i].style.backgroundImage;
      // console.log(decidedColor);
      const isBlank = squares[i].style.backgroundImage === "";
      // console.log(isBlank);

      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55,
      ];
      if (notValid.includes(i)) {
        continue;
      }

      if (
        rowOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkForFourRow();

  //   Check for column of four
  function checkForFourColumn() {
    for (i = 0; i < 39; i++) {
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      // console.log(columnOfFour);
      let decidedColor = squares[i].style.backgroundImage;
      // console.log(decidedColor);
      const isBlank = squares[i].style.backgroundImage === "";
      // console.log(isBlank);

      if (
        columnOfFour.every(
          (index) =>
            squares[index].style.backgroundImage === decidedColor && !isBlank
        )
      ) {
        score += 4;
        scoreDisplay.innerHTML = score;
        columnOfFour.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }

  checkForFourColumn();

  window.setInterval(() => {
    moveCandiesDown();
    checkForFourRow();
    checkForFourColumn();
    checkForThreeRow();
    checkForThreeColumn();
  }, 100);
});
