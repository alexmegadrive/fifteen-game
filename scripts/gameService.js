class gameService {
    matrix = [];
    moves = 0;
    colors = ['cyan', 'aqua', 'greenyellow', 'gold', 'magenta', 'tomato', 'hotpink','fuchsia','cyan', 'aqua', 'greenyellow', 'gold', 'magenta', 'tomato', 'hotpink','fuchsia', 'coral' ]

    // seconds = 0;




    //  constructor(products = []) {
    //     this.cart = {}
    // }

    createGame(boardSize) {

        // let matrix = JSON.parse(localStorage.getItem('matrix')) || boardSize
        // console.log('matrix :', matrix);
        //очистка страницы от предыдущей доски
        document.body.innerHTML = ''

        //рендер панели кнопок
        this.renderControls()

        //сгенерировать матрицу случайных чисел
        if (!JSON.parse(localStorage.getItem('matrix'))) this.generateMatrix(matrix)
        else this.matrix = JSON.parse(localStorage.getItem('matrix'))

        //рендер доски
        this.renderBoard()

        // рендер блоков
        this.renderBlocks()
    }
    generateRandomArray(boardSize) {
        let max = boardSize * boardSize;
        let result = [];
        for (let i = 0; i < max; i++) {
            // let newEl
            let newEl = Math.round(Math.random() * (max - 1))
            while (!result || result.includes(newEl) == true) {
                newEl = Math.round(Math.random() * (max - 1))
            }
            result.push(newEl)
        }
        return result
    }

    generateMatrix(boardSize) {
        this.matrix = []
        this.moves = 0
        this.startTimer()
        if (document.querySelector('.winMessage')) {
        document.querySelector('.board').style.opacity = '1'
        document.querySelector('.winMessage').innerText = ''
        }

        let array = this.generateRandomArray(boardSize)

        for (let i = 0; i < boardSize; i++) {
            this.matrix[i] = []
            for (let j = 0; j < boardSize; j++) {
                this.matrix[i][j] = array.shift()
            }
        }
        return this.matrix
    }

    renderBoard() {
        let length = this.matrix.length

        function countGridStyle() {
            let res = []
            for (let i = 0; i < length; i++) {
                res.push('1fr')
            }
            let str = res.join(' ')
            return str
        }
        let gridStyle = countGridStyle()
        let board = document.createElement('div')
        board.classList.add('board')
        board.style.gridTemplateColumns = gridStyle
        board.style.gridTemplateRows = gridStyle

        let sizeSelector = document.createElement('div')
        sizeSelector.classList.add('interface') 
        sizeSelector.classList.add('interface-size-select') 

        let size2Btn = document.createElement('button')
        size2Btn.innerText = '2x2'
        size2Btn.dataset.action = 'create2'
        let size3Btn = document.createElement('button')
        size3Btn.innerText = '3x3'
        size3Btn.dataset.action = 'create3'
        let size4Btn = document.createElement('button')
        size4Btn.innerText = '4x4'
        // console.log('size4Btn :', size4Btn);
        size4Btn.dataset.action = 'create4'
        sizeSelector.append(size2Btn,size3Btn,size4Btn)

        document.body.appendChild(board);
        document.body.appendChild(sizeSelector);


        return board;
    }

    renderBlocks() {
        let board = document.querySelector('.board')
        board.innerHTML = ''
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                let tile = document.createElement('div')
                tile.classList.add('tile')
                if (this.matrix[i][j] !== 0) {
                    tile.innerText = this.matrix[i][j]
                    tile.dataset.value = this.matrix[i][j]
                    setColor(tile, tile.dataset.value,this.colors)
                } else tile.dataset.value = 'empty'
                board.appendChild(tile)
            }
        }

        function setColor(element, value, colorsArr) {
            // const color = getRandomColor(colorsArr)
            // element.style.backgroundColor = color;
            const color = colorsArr[value]
            element.style.backgroundColor = color;
            element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
        }
    
        
        function getRandomColor(colorsArr) {
            // console.log('this.colors :', this.colors);

            // округляем и умножаем на длину массива
            const index = Math.floor(Math.random() * colorsArr.length)
            return colorsArr[index]
        }
    }

    shuffleBlocks(arg) {
        console.log(' this.moves :', this.moves);
        this.generateMatrix(arg || this.matrix.length)
        this.renderBlocks()
        this.renderScore()
    }

    renderScore() {
        let movesBlock = document.querySelector('#movesBlock')
        movesBlock.innerText = `Moves: ${this.moves}`
    }

    renderControls() {
        let controlsDiv = document.createElement('div')
        controlsDiv.classList.add('interface') 
        let shuffleBtn = document.createElement('button')
        shuffleBtn.innerText = 'Shuffle and start'
        shuffleBtn.dataset.action = 'shuffle'
        shuffleBtn.id = 'shuffleBtn'

        let saveBtn = document.createElement('button')
        saveBtn.dataset.action = 'save'
        saveBtn.innerText = 'Save'
        saveBtn.style.width = '100% '
        saveBtn.style.marginTop = '10px '



        let score = document.createElement('div')
        score.id = 'score'
        let movesBlock = document.createElement('div')
        movesBlock.id = 'movesBlock'
        movesBlock.innerText = 'Moves: 0'
        let timeBlock = document.createElement('div')
        timeBlock.id = 'timeBlock'
        timeBlock.innerText = '00:00'

        score.append(movesBlock, timeBlock)
        // score.appendChild(timeBlock)



        controlsDiv.append(shuffleBtn, saveBtn, score)
        // controlsDiv.appendChild(shuffleBtn)
        // controlsDiv.appendChild(score)
        // controlsDiv.appendChild(score)

        document.body.appendChild(controlsDiv)
    }
    handleClick(clickedValue) {
        console.log('clickedValue :', clickedValue);

        let i = 0,
            j = 0;
        let clickedPosition = [],
            emptyPosition = [];

        // находим координаты кликнутого элмента
        for (i = 0; i < this.matrix.length; i++) {
            for (j = 0; j < this.matrix.length; j++) {
                if (this.matrix[i][j] == clickedValue) break
            }
            if (this.matrix[i][j] == clickedValue) break
        }

        clickedPosition = [i, j]
        emptyPosition = []

        //вычисляем, есть ли рядом пустой элемент
        if (clickedValue !== 'empty') {
            if (j - 1 >= 0 && this.matrix[i][j - 1] == 0) {
                document.querySelector(`[data-value="${this.matrix[i][j]}"]`).classList.add('left')
                // console.log('слева')
                emptyPosition = [i, j - 1]
            } else if ((j + 1) < this.matrix.length && this.matrix[i][j + 1] == 0) {
                // console.log('справа')
                document.querySelector(`[data-value="${this.matrix[i][j]}"]`).classList.add('right')
                emptyPosition = [i, j + 1]
            } else if ((i + 1) < this.matrix.length && this.matrix[i + 1][j] == 0) {
                // console.log('снизу')
                emptyPosition = [i + 1, j]
                document.querySelector(`[data-value="${this.matrix[i][j]}"]`).classList.add('down')
                // console.log('add down')
            } else if (i - 1 >= 0 && this.matrix[i - 1][j] == 0) {
                // console.log('сверху')
                document.querySelector(`[data-value="${this.matrix[i][j]}"]`).classList.add('up')

                emptyPosition = [i - 1, j]
            }
        }
        if (emptyPosition.length > 0){
            this.playWhooshSound()
            setTimeout(
               (function() {this.moveTile(clickedPosition, emptyPosition)}).bind(this)
            , 700);
        
        }
    }

    moveTile(clickedPosition, emptyPosition) {
        let clickedValue = this.matrix[clickedPosition[0]][clickedPosition[1]]
        this.matrix[emptyPosition[0]][emptyPosition[1]] = clickedValue
        this.matrix[clickedPosition[0]][clickedPosition[1]] = 0
        this.renderBlocks()
        this.moves++
        this.renderScore()
        // console.log('this.moves :', this.moves);
        this.checkWin()
    }

    checkWin() {
        //собираем матрицу в массив
        let checkArr = []
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix.length; j++) {
                checkArr.push(this.matrix[i][j])
            }
        }
        //     for (let k = 0; k < checkArr.length; k++) { 
        //         if (checkArr[k+1] == checkArr[k]+1){

        //         }
        // }
        let winArray = checkArr.slice().sort((a, b) => a - b).filter(el => el !== 0)
        winArray.push(0)
        winArray = winArray.join('')

        // console.log('checkArr :', checkArr);
        // console.log('winArray :', winArray);


        if (checkArr.join('') == winArray) {
            console.log('YOU WIN')
            this.renderWinMessage()
            
        }
    }

    renderWinMessage() {
        let board = document.querySelector('.board')
        board.style.opacity = '0.5'
        let winMessageDiv = document.createElement('div')
        winMessageDiv.classList.add('winMessage')
        winMessageDiv.innerText = `Hooray! You solved the puzzle in ${this.countTime()} and ${this.moves} moves!"`
        // winMessageDiv.innerText = `123123 123 `
        // board.appendChild(winMessageDiv)
        document.body.appendChild(winMessageDiv)
    }

    startTimer() {
        console.log('start timer')
    //    if(timer) this.startTimer.clearInterval(timer)
    this.seconds = 0;
    if (!this.isRunning) {
        this.isRunning = true; 
        const TIMER = setInterval(() => {

            document.querySelector('#timeBlock').innerHTML = this.countTime()
            this.seconds++
            }, 1000)
        }
    }

    countTime() {
        let minutes = Math.floor(this.seconds/60)
        let remainedSeconds = this.seconds - (minutes*60)
        return String(minutes).padStart(2, '0') + ':' + String(remainedSeconds).padStart(2, '0')
        
    }

    playWhooshSound() {
        let snd = new Audio('./../assets/whoosh.wav'); // buffers automatically when created
        snd.play();
    }

    saveToLocalStorage() {
        localStorage.setItem('matrix', JSON.stringify(this.matrix));
        const res = localStorage.getItem('matrix');
        console.log('parse :', JSON.parse(res));
        console.log('this.matrix :', this.matrix);
    }
}