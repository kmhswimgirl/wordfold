'use client'                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react'
import { Model } from '../model'
import { config1 } from '@/puzzle'

export default function Home() {
  // initial instantiation of the Model comes from the first configuration of the board (config #1)
  // constants 
  const [model, setModel] = React.useState(new Model(0))
  const [redraw, forceRedraw] = React.useState(0) //force refeshing the display
  const [sqIsClicked, sqSetIsClicked] = React.useState<boolean[][]>( //resulting structure is a 5x5 2D array of booleans linked to isClicked that are initially set to false
   Array(5).fill(null).map(() => Array(5).fill(false)) // initializes the array to have all bool:false values
  );
  const [keyIsClicked, keySetIsClicked] = React.useState(0);

  // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  function handleSqClick(row:number, column:number) {
    //model.board.letters[row][column] += "!"  // HACK! Just to show something (later want to combine strings from selected button)
    const content = model.contents(row, column);
    const newState = Array(5).fill(null).map(() => Array(5).fill(false)); //updates map of true/false values when isClicked is called

    if(content.length > 0){//condition to check is square is available to be selected
      newState[row][column] = true; //replaces the current state of the selected square with true
      sqSetIsClicked(newState); //updates the state of the entire array (i.e. gameboard)
      andRefreshDisplay(); //refreshes display
    } 

  }

  // change the style for the given square based on model. Space separated string.
  function css(row:number, column:number) {
    const content = model.contents(row, column); //returns the content of the selected square

    if (sqIsClicked[row][column]) { // this is what changes the class of a the square
      return "square selected" //when square is selected

    }else if(content.length === 0){ //checks for empty squares and changes class even when no button is being clicked
      return "square empty" //when square is empty
    }
    return "square"; //normal unselected square
  }

 //HTML that renders the board, controls, and move/score counters
  return (
    <div>
      <h1>WordFold: {config1.theme}</h1>
      <div className="board"> 
        <div className="button-container">
          <button data-testid="0,0" className={css(0,0)} onClick={() => handleSqClick(0, 0)}>{model.contents(0,0)}</button>
          <button data-testid="0,1" className={css(0,1)} onClick={() => handleSqClick(0, 1)}>{model.contents(0,1)}</button>
          <button data-testid="0,2" className={css(0,2)} onClick={() => handleSqClick(0, 2)}>{model.contents(0,2)}</button>
          <button data-testid="0,3" className={css(0,3)} onClick={() => handleSqClick(0, 3)}>{model.contents(0,3)}</button>
          <button data-testid="0,4" className={css(0,4)} onClick={() => handleSqClick(0, 4)}>{model.contents(0,4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="1,0" className={css(1,0)} onClick={() => handleSqClick(1, 0)}>{model.contents(1,0)}</button>
          <button data-testid="1,1" className={css(1,1)} onClick={() => handleSqClick(1, 1)}>{model.contents(1,1)}</button>
          <button data-testid="1,2" className={css(1,2)} onClick={() => handleSqClick(1, 2)}>{model.contents(1,2)}</button>
          <button data-testid="1,3" className={css(1,3)} onClick={() => handleSqClick(1, 3)}>{model.contents(1,3)}</button>
          <button data-testid="1,4" className={css(1,4)} onClick={() => handleSqClick(1, 4)}>{model.contents(1,4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="2,0" className={css(2,0)} onClick={() => handleSqClick(2, 0)}>{model.contents(2,0)}</button>
          <button data-testid="2,1" className={css(2,1)} onClick={() => handleSqClick(2, 1)}>{model.contents(2,1)}</button>
          <button data-testid="2,2" className={css(2,2)} onClick={() => handleSqClick(2, 2)}>{model.contents(2,2)}</button>
          <button data-testid="2,3" className={css(2,3)} onClick={() => handleSqClick(2, 3)}>{model.contents(2,3)}</button>
          <button data-testid="2,4" className={css(2,4)} onClick={() => handleSqClick(2, 4)}>{model.contents(2,4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="3,0" className={css(3,0)} onClick={() => handleSqClick(3, 0)}>{model.contents(3,0)}</button>
          <button data-testid="3,1" className={css(3,1)} onClick={() => handleSqClick(3, 1)}>{model.contents(3,1)}</button>
          <button data-testid="3,2" className={css(3,2)} onClick={() => handleSqClick(3, 2)}>{model.contents(3,2)}</button>
          <button data-testid="3,3" className={css(3,3)} onClick={() => handleSqClick(3, 3)}>{model.contents(3,3)}</button>
          <button data-testid="3,4" className={css(3,4)} onClick={() => handleSqClick(3, 4)}>{model.contents(3,4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="4,0" className={css(4,0)} onClick={() => handleSqClick(4, 0)}>{model.contents(4,0)}</button>
          <button data-testid="4,1" className={css(4,1)} onClick={() => handleSqClick(4, 1)}>{model.contents(4,1)}</button>
          <button data-testid="4,2" className={css(4,2)} onClick={() => handleSqClick(4, 2)}>{model.contents(4,2)}</button>
          <button data-testid="4,3" className={css(4,3)} onClick={() => handleSqClick(4, 3)}>{model.contents(4,3)}</button>
          <button data-testid="4,4" className={css(4,4)} onClick={() => handleSqClick(4, 4)}>{model.contents(4,4)}</button>
        </div>
      </div>

      <div className = "controls">

        <div className = "scoreRow">
          <div className="score">{"Score: " + "GOES HERE"}</div>
          <div className="numMoves">{"Moves: " + "GOES HERE"}</div>
        </div>

        <div className = "keypadRow">
          <button className = "arrow-key"> ⇧ </button>
        </div>

        <div className = "keypadRow">
          <button className = "arrow-key"> ⇦ </button>
          <button className = "arrow-key"> ⇨ </button>
        </div>

        <div className = "keypadRow">
          <button className = "arrow-key"> ⇩ </button>
        </div>

        <div className ="functionButton">
          <button className = "reset"> Reset </button>
          <button className = "checkSol"> Check Solution </button>
        </div>

      </div>

    </div>
  )
}