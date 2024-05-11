document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('checkers-board');
    if (!board) {
        console.error('Board container not found!');
        return;
    }

    let selectedCell = null;

    function clearSelection() {
        if (selectedCell) {
            selectedCell.classList.remove('selected');
            selectedCell = null;
        }
    }

    function handleCellClick(event) {
        const clickedCell = event.currentTarget;

        if (selectedCell === clickedCell) {
            clearSelection();
            return;
        }

        if (!selectedCell) {
            // Если не выбрана шашка, выбираем ее
            if (!isRedChecker(clickedCell)) {
                // Если выбранная шашка не красная, выходим
                return;
            }
            selectedCell = clickedCell;
            selectedCell.classList.add('selected');
        } else {
            // Если выбрана шашка, пытаемся выполнить ход
            const rowDiff = parseInt(clickedCell.dataset.row) - parseInt(selectedCell.dataset.row);
            const colDiff = Math.abs(parseInt(clickedCell.dataset.col) - parseInt(selectedCell.dataset.col));

            if (rowDiff === -1 && colDiff === 1 && !clickedCell.querySelector('.checker')) {
                // Если клетка находится на одну строку выше и на один столбец влево или вправо и пустая
                clickedCell.appendChild(selectedCell.querySelector('.checker'));
                clearSelection();
            } else {
                // В противном случае снимаем выделение с текущей выбранной клетки
                clearSelection();
            }
        }
    }

    function handleEmptyCellClick(event) {
        const targetCell = event.currentTarget;

        if (selectedCell && !targetCell.querySelector('.checker')) {
            const rowDiff = parseInt(targetCell.dataset.row) - parseInt(selectedCell.dataset.row);
            const colDiff = Math.abs(parseInt(targetCell.dataset.col) - parseInt(selectedCell.dataset.col));

            if (rowDiff === -1 && colDiff === 1) {
                // Если клетка находится на одну строку выше и на один столбец влево или вправо
                targetCell.appendChild(selectedCell.querySelector('.checker'));
                clearSelection();
            } else {
                // В противном случае снимаем выделение с текущей выбранной клетки
                clearSelection();
            }
        }
    }

    function isRedChecker(cell) {
        return cell.querySelector('.checker') && cell.querySelector('.checker').style.backgroundColor === 'red';
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            if ((i + j) % 2 === 0) {
                cell.classList.add('white-cell');
            } else {
                cell.classList.add('black-cell');
                if (i < 3 || i > 4) {
                    const checker = document.createElement('span');
                    checker.className = 'checker';
                    checker.style.backgroundColor = i < 3 ? 'black' : 'red';
                    cell.appendChild(checker);
                    if (isRedChecker(cell)) {
                        cell.addEventListener('click', handleCellClick);
                    }
                } else {
                    cell.addEventListener('click', handleEmptyCellClick);
                }
            }
            board.appendChild(cell);
        }
    }
});
