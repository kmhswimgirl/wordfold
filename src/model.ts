
import { config1, config2, config3 } from './puzzle'

export class Coordinate { 
    readonly row : number
    readonly column : number

    constructor(row:number, column:number) {
      this.row = row
      this.column = column
    }
}

export class Board { //realized this exists AFTER basically re-creating and implementing a function in page.tsx (Sorry!)
    letters : string[][]
    selectedSquare : Coordinate | undefined

    constructor() {
        this.letters = []
        for (let r:number = 0; r < 5; r++) {
            this.letters[r] = []
            for (let c:number = 0; c < 5; c++) {
                this.letters[r][c] = ''
            }
        }

        this.selectedSquare = undefined
    }
}

export class Model { 
    words : string[]
    board : Board
    readonly configs = [config1, config2, config3]
    chosen : number
    moveCount : number
    currScore : number

    /** which is zero-based. */
    constructor(which:number) {
        this.moveCount = 0;
        this.currScore = 0;
        this.chosen = which
        let puzzle =  this.configs[this.chosen]
        let board = new Board()
        this.words = []
        for (let r:number = 0; r < 5; r++) {
            this.words[r] = puzzle.words[r]

            for (let c:number = 0; c < 5; c++) {
                board.letters[r][c] = puzzle.initial[r][c]
            }
        }
        this.board = board
    }

    contents(row:number, column:number) {
        return this.board.letters[row][column]
    }

    setContents(row: number, column: number, newContents: string) {
        this.board.letters[row][column] = newContents;
    }

    updateMoves(){
        this.moveCount++;
    }

    addToScore(){
        for (let row = 0; row < 5; row++) {
            for (let column = 0; column < 5; column++) {
                if (this.words[0].includes(this.contents(row, column)) || this.words[1].includes(this.contents(row, column)) || this.words[2].includes(this.contents(row, column)) || this.words[3].includes(this.contents(row, column))) {
                    if(this.contents(row, column).length >= 2){
                        this.currScore += this.contents(row, column).length;
                    }
                }
            }
        }
        return this.currScore;
    }

    resetScore(){
        this.currScore = 0;
    }

    checkSol(){
        switch(this.chosen){
            case 0:
                if(this.contents(0,2) === config1.words[1] && this.contents(1,4) === "CYAN" && this.contents(2,3) === "PURPLE" && this.contents(2,4) === "MAUVE" && this.contents(3,0) === "BLUE"){
                    return true;
                }else{
                    return false;
                }
            break;
            case 1:
                if(this.contents(1,0) === "CHERRY" && this.contents(1,2) === "BANANA" && this.contents(1,3) === "PAPAYA" && this.contents(3,4) === "PEAR" && this.contents(4,1) === "FIG"){
                    return true;
                }else{
                    return false;
                }
            break;
            case 2:
                if(this.contents(0,0) === "SNAKE" && this.contents(1,4) === "TAPIR" && this.contents(2,2) === "WOLF" && this.contents(3,1) === "EAGLE" && this.contents(3,3) === "JAGUAR"){
                    return true;
                }else{
                    return false;
                }
            break;
        }
    }

}