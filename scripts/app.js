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
    //изменение формата поля
    if (event.target.dataset.action && event.target.dataset.action == 'create2') {
        game.createGame(2) 
        }
    if (event.target.dataset.action && event.target.dataset.action == 'create3') {
        game.createGame(3) 
        }
    if (event.target.dataset.action && event.target.dataset.action == 'create4') {
        game.createGame(4) 
        }

})
//генерация матрицы 4*4
// game.generateMatrix(4) 

// //рендер доски
// game.renderBoard()

// // рендер блоков
// game.renderBlocks()


