const game = new gameService()
game.createGame(4) 

let moves = 0

//делегирование событий
document.body.addEventListener('click' , function(event){
    //обработка клика
    if (event.target.dataset.value) {
        game.checkFreeSpace(event.target.dataset.value) 
        
    }
    //перемешивание блоков
    if (event.target.dataset.action && event.target.dataset.action == 'shuffle') {
    game.shuffleBlocks()
    }

})
//генерация матрицы 4*4
// game.generateMatrix(4) 

// //рендер доски
// game.renderBoard()

// // рендер блоков
// game.renderBlocks()


