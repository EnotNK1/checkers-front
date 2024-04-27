document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('checkers-board');
    if (!board) {
        console.error('Board container not found!');
        return;
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if ((i + j) % 2 === 0) {
                cell.classList.add('white-cell');
            } else {
                cell.classList.add('black-cell');
                if (i < 3 || i > 4) {
                    const checker = document.createElement('span');
                    checker.className = 'checker';
                    checker.style.backgroundColor = i < 3 ? 'black' : 'red';
                    cell.appendChild(checker);
                }
            }
            board.appendChild(cell);
        }
    }
});
