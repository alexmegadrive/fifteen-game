class gameService {
 matrix = [];


//  constructor(products = []) {
//     this.cart = {}
// }

generateRandomArray(boardSize) {
    let max = boardSize*boardSize;
    let result = [];
        for (let i=0; i< max; i++) {
            // let newEl
            let newEl = Math.round(Math.random() * (max-1) )
           while (!result || result.includes(newEl) == true )
           {
            newEl = Math.round(Math.random() * (max-1) )
           }
            result.push(newEl)
        }
        return result
    }


renderBlock() {
console.log(1)
}
}