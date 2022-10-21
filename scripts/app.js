const game = new gameService()
game.createGame(4) 

let moves = 0

//делегирование событий
document.body.addEventListener('click' , function(event){

    //обработка клика
    if (event.target.dataset.value) {
        game.handleClick(event.target.dataset.value)         
    }
    //перемешивание блоков
    if (event.target.dataset.action && event.target.dataset.action == 'shuffle') {
    game.shuffleBlocks()
    }
    //показать статистику
    if (event.target.dataset.action && event.target.dataset.action == 'showStats') {
    game.showStats()
    }
    //вкл-выкл звук
    if (event.target.dataset.action && event.target.dataset.action == 'toggleSound') {
    game.toggleSound()
    }
    //сохранение стейта 
    if (event.target.dataset.action && event.target.dataset.action == 'save') {
    game.saveToLocalStorage()
    }
    //изменение формата поля
    if (event.target.dataset.action && event.target.dataset.action == 'create2') {
        localStorage.removeItem('matrix');
        game.createGame(2) 
        }
    if (event.target.dataset.action && event.target.dataset.action == 'create3') {
        localStorage.removeItem('matrix');
        game.createGame(3) 
        }
    if (event.target.dataset.action && event.target.dataset.action == 'create4') {
        localStorage.removeItem('matrix');
        game.createGame(4) 
        }
    if (event.target.dataset.action && event.target.dataset.action == 'create6') {
        localStorage.removeItem('matrix');
        game.createGame(6) 
        }
    if (event.target.dataset.action && event.target.dataset.action == 'create8') {
        localStorage.removeItem('matrix');
        game.createGame(8) 
        }

})
//генерация матрицы 4*4
// game.generateMatrix(4) 

// //рендер доски
// game.renderBoard()

// // рендер блоков
// game.renderBlocks()


