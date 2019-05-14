class View {
  constructor(game, $el) {
    this.game = game;
    this.board = $el;
    this.setupBoard();
    this.bindEvents();
    
  }
  
  bindEvents() {

    $('li').on('click', (e) => {
      let $square = $(e.target);
      this.makeMove($square);
    });

  }
  
  makeMove($square) {
    let position = $square.data('position');
    this.game.playMove(position);
    $square.addClass('selected');
    let player = this.game.currentPlayer;
    $square.text(player);
    this.displayWinner();
  }

  setupBoard() {
    const posEls = {0: [0,0],
                    1: [0,1],
                    2: [0,2],
                    3: [1,0],
                    4: [1,1],
                    5: [1,2],
                    6: [2,0],
                    7: [2,1],
                    8: [2,2]
                      };
    const $grid = $('<ul>');
    this.board.append($grid);

    for (let i = 0; i < 9; i++) {
      let $cell = $('<li>');
      $grid.append($cell.data('position', posEls[i]));
    }
  }
  displayWinner() {
    if (this.game.isOver()) {
      $('li').off('click');
      $('#winner').text(`${this.game.currentPlayer} is the Winner!`).show();
    }
  }
}

module.exports = View;
