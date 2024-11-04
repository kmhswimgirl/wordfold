'use client'                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react'
import { Model } from '../model'

export default function Home() {
  // initial instantiation of the Model comes from the first configuration of the board (config #1)
  // constants 
  const [model, setModel] = React.useState(new Model(0))
  const [redraw, forceRedraw] = React.useState(0) //force refeshing the display
  const [isClicked, setIsClicked] = React.useState<boolean[][]>( //resulting structure is a 5x5 2D array of booleans linked to isClicked that are initially set to false
   Array(5).fill(null).map(() => Array(5).fill(false)) // initializes the array to have all bool:false values
  );

  // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  function handleClick(row:number, column:number) {
    //model.board.letters[row][column] += "!"  // HACK! Just to show something (later want to combine strings from selected button)
    //console.log(content.length); //print content length of selected square
    const content = model.contents(row, column);
    const newState = Array(5).fill(null).map(() => Array(5).fill(false)); //updates map of true/false values when isClicked is called

    if(content.length > 0){
      newState[row][column] = true; //replaces the current state of the selected square with true
      setIsClicked(newState);
      andRefreshDisplay();
    }
  }

  // change the style for the given square based on model. Space separated string.
  function css(row:number, column:number) {
    const content = model.contents(row, column);
    if (isClicked[row][column]) { // this is what changes the class of a button
      return "square selected" //when square is selected
    }else if(content.length === 0){
      return "square empty" //when square is empty
    }
    return "square"; //normal unselected square
  }

 //HTML that renders the board, controls, and move/score counters
  return (
    <div>
      <h1>WordFold:</h1>
      <div className="board"> 
        <div className="button-container">
          <button data-testid="0,0" className={css(0,0)} onClick={() => handleClick(0, 0)}>{model.contents(0,0)}</button>
          <button data-testid="0,1" className={css(0,1)} onClick={() => handleClick(0, 1)}>{model.contents(0,1)}</button>
          <button data-testid="0,2" className={css(0,2)} onClick={() => handleClick(0, 2)}>{model.contents(0,2)}</button>
          <button data-testid="0,3" className={css(0,3)} onClick={() => handleClick(0, 3)}>{model.contents(0,3)}</button>
          <button data-testid="0,4" className={css(0,4)} onClick={() => handleClick(0, 4)}>{model.contents(0,4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="1,0" className={css(1,0)} onClick={() => handleClick(1, 0)}>{model.contents(1,0)}</button>
          <button data-testid="1,1" className={css(1,1)} onClick={() => handleClick(1, 1)}>{model.contents(1,1)}</button>
          <button data-testid="1,2" className={css(1,2)} onClick={() => handleClick(1, 2)}>{model.contents(1,2)}</button>
          <button data-testid="1,3" className={css(1,3)} onClick={() => handleClick(1, 3)}>{model.contents(1,3)}</button>
          <button data-testid="1,4" className={css(1,4)} onClick={() => handleClick(1, 4)}>{model.contents(1,4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="2,0" className={css(2,0)} onClick={() => handleClick(2, 0)}>{model.contents(2,0)}</button>
          <button data-testid="2,1" className={css(2,1)} onClick={() => handleClick(2, 1)}>{model.contents(2,1)}</button>
          <button data-testid="2,2" className={css(2,2)} onClick={() => handleClick(2, 2)}>{model.contents(2,2)}</button>
          <button data-testid="2,3" className={css(2,3)} onClick={() => handleClick(2, 3)}>{model.contents(2,3)}</button>
          <button data-testid="2,4" className={css(2,4)} onClick={() => handleClick(2, 4)}>{model.contents(2,4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="3,0" className={css(3,0)} onClick={() => handleClick(3, 0)}>{model.contents(3,0)}</button>
          <button data-testid="3,1" className={css(3,1)} onClick={() => handleClick(3, 1)}>{model.contents(3,1)}</button>
          <button data-testid="3,2" className={css(3,2)} onClick={() => handleClick(3, 2)}>{model.contents(3,2)}</button>
          <button data-testid="3,3" className={css(3,3)} onClick={() => handleClick(3, 3)}>{model.contents(3,3)}</button>
          <button data-testid="3,4" className={css(3,4)} onClick={() => handleClick(3, 4)}>{model.contents(3,4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="4,0" className={css(4,0)} onClick={() => handleClick(4, 0)}>{model.contents(4,0)}</button>
          <button data-testid="4,1" className={css(4,1)} onClick={() => handleClick(4, 1)}>{model.contents(4,1)}</button>
          <button data-testid="4,2" className={css(4,2)} onClick={() => handleClick(4, 2)}>{model.contents(4,2)}</button>
          <button data-testid="4,3" className={css(4,3)} onClick={() => handleClick(4, 3)}>{model.contents(4,3)}</button>
          <button data-testid="4,4" className={css(4,4)} onClick={() => handleClick(4, 4)}>{model.contents(4,4)}</button>
        </div>
      </div>

      <div className = "controls">
        <button id = "up" className = "arrow-key"> up </button>
        <button id = "right" className = "arrow-key"> right </button>
        <button id = "left" className = "arrow-key"> left </button>
        <button id = "down" className = "arrow-key"> down </button>
      </div>

      <div className = "scoreboard">
        <label className="score">{"Score: " + "GOES HERE"}</label>
        <label className="numMoves">{"Number of Moves: " + "GOES HERE"}</label>
      </div>
    </div>
  )
}