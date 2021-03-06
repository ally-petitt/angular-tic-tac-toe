import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[];
  xIsNext: boolean;

  constructor() { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    document.getElementById("winner").style.visibility = "hidden";

    var squareBtns = document.querySelectorAll("app-square");
    squareBtns.forEach(square => square.classList.remove("disabled"))
  }

  get player() {
    return this.xIsNext ? "X" : "O";
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
  }

  get winner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i=0; i<lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] && this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        document.getElementById("winner").style.visibility = "visible";
        this.stopGame();
        return this.squares[a];
      }
    }
    return null;
  }

  get wasTie() {
    if (!this.squares.includes(null) && this.winner === null) {
      return true;
    }
    return false;
  }

  stopGame() {
    var squareBtns = document.querySelectorAll("app-square");
    squareBtns.forEach(square => square.classList.add("disabled"))
  }
}
