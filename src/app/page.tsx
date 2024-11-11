'use client'                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react'
import { Model } from '../model'
import { config1, config2, config3 } from '../puzzle'


export default function Home() {
  // constants 
  const [model, setModel] = React.useState(new Model(0)); // sets initial Puzzle configuration 
  const [redraw, forceRedraw] = React.useState(0) // force refeshing the display
  const [sqIsClicked, sqSetIsClicked] = React.useState<boolean[][]>(Array(5).fill(null).map(() => Array(5).fill(false))); // initializes the array to have all bool:false values (NOTE: I totally forgot that Model class existed when i wrote this)
  const selectedSquare = getSelectedSquare(); // returns the coordinate of the selected square
  const themes = [config1.theme, config2.theme, config3.theme]
  
  // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  // handles selecting a single square
  function handleSqClick(row:number, column:number) { 
    const content = model.contents(row, column);
    const newState = Array(5).fill(null).map(() => Array(5).fill(false)); //updates map of true/false values when isClicked is called
    if(content.length > 0 && content.length < 6){//condition to check if square is available to be selected (non-empty square, non full square)
      newState[row][column] = true; //replaces the current state of the selected square with true
      sqSetIsClicked(newState); //updates the state of the entire array (i.e. gameboard)
      andRefreshDisplay(); //refreshes display
    }
  }

  // change the style for the given square based on model. Space separated string.
  function css(row:number, column:number) { 
    const content = model.contents(row, column); // returns the content of the selected square
    if (sqIsClicked[row][column]) { // this is what changes the class of a the square
      return "square selected" // when square is selected
    }else if(content.length === 0){ // autochecks for empty squares and reassigns class if ' ' is found
      return "square empty" // when square is empty
    }
    return "square"; // normal unselected square
  }

  // returns selected square row and column
  function getSelectedSquare() {  //not sure why I did not look at Model.ts before making this... but it does work!
    for (let row = 0; row < sqIsClicked.length; row++) {
      for (let column = 0; column < sqIsClicked[row].length; column++) {
        if (sqIsClicked[row][column]) {
          return { row, column }; //return the row and column
        }
      }
    }
    return null; // Return null if no square is selected
  }

  // unselect the square
  function unselectSq(row:number, column:number){
    const newState = sqIsClicked.map(inner => inner.slice()); // Create a copy of the current state
    newState[row][column] = false; // Set the specific square to false
    sqSetIsClicked(newState); // Update the state with the new array
    andRefreshDisplay(); // Refresh the display
  }

  // merge functions for arrowkeys eventually... (name should be handleMerge)
  function mergeUp(){
    if(selectedSquare != null && selectedSquare.row != 0){ //conditions for merging up
      //get both contents from the square to be merged and the one being merged
      const newSqRow = selectedSquare.row - 1;
      const newSqColumn = selectedSquare.column;
      const newContent = model.contents(selectedSquare.row, selectedSquare.column) + model.contents(newSqRow, newSqColumn);
      const newSqClass = css(newSqRow, newSqColumn);

      //merge the contents of the selected an new square and then update the board
      if(newSqClass === "square empty" || model.contents(newSqRow, newSqColumn).length + model.contents(selectedSquare.row, selectedSquare.column).length > 6){
        alert("You cannot merge there!");
        return;
      }

      model.setContents(newSqRow, newSqColumn, newContent);
      model.setContents(selectedSquare.row, selectedSquare.column, '');

      model.updateMoves();
      model.resetCounters();
      model.addToScore();
      model.countEmptySq();

      unselectSq(selectedSquare.row, selectedSquare.column);
      andRefreshDisplay();
    }else{
      alert("You cannot merge there!");
    }
  }

  function mergeDown(){
    if(selectedSquare != null && selectedSquare.row != 4){ //conditions for merging down
      //get both contents from the square to be merged and the one being merged
      const newSqRow = selectedSquare.row + 1;
      const newSqColumn = selectedSquare.column;
      const newContent = model.contents(selectedSquare.row, selectedSquare.column) + model.contents(newSqRow, newSqColumn);
      const newSqClass = css(newSqRow, newSqColumn);

      // check that the new square is not empty
      if(newSqClass === "square empty" || model.contents(newSqRow, newSqColumn).length + model.contents(selectedSquare.row, selectedSquare.column).length > 6){
        alert("You cannot merge there!");
        return;
      }
      //merge the contents of the selected an new square and then update the board
      //model.resetScore();
      model.setContents(newSqRow, newSqColumn, newContent);
      model.setContents(selectedSquare.row, selectedSquare.column, '');

      model.updateMoves();
      model.resetCounters();
      model.addToScore();
      model.countEmptySq();

      unselectSq(selectedSquare.row, selectedSquare.column);
      andRefreshDisplay(); //refreshes display, 
    }else{
      alert("You cannot merge there!");
    }
  }

  function mergeLeft(){ 
    if(selectedSquare != null && selectedSquare.column != 0){ //conditions for merging left
      //get both contents from the square to be merged and the one being merged
      const newSqRow = selectedSquare.row;
      const newSqColumn = selectedSquare.column - 1;
      const newContent = model.contents(selectedSquare.row, selectedSquare.column) + model.contents(newSqRow, newSqColumn);
      const newSqClass = css(newSqRow, newSqColumn);

      // check that the new square is not empty
      if(newSqClass === "square empty" || model.contents(newSqRow, newSqColumn).length + model.contents(selectedSquare.row, selectedSquare.column).length > 6){
        alert("You cannot merge there!");
        return;
      }
      //merge the contents of the selected an new square and then update the board
      
      model.setContents(newSqRow, newSqColumn, newContent);
      model.setContents(selectedSquare.row, selectedSquare.column, '');

      model.updateMoves();
      model.resetCounters();
      model.countEmptySq();
      model.addToScore();

      unselectSq(selectedSquare.row, selectedSquare.column);
      andRefreshDisplay(); //refreshes display,
    }else{
      alert("You cannot merge there!");
    }
  }

  function mergeRight(){
    if(selectedSquare != null && selectedSquare.column != 4){ //conditions for merging right
      //get both contents from the square to be merged and the one being merged
      const newSqRow = selectedSquare.row;
      const newSqColumn = selectedSquare.column + 1;
      const newContent = model.contents(selectedSquare.row, selectedSquare.column) + model.contents(newSqRow, newSqColumn);
      const newSqClass = css(newSqRow, newSqColumn);

      // check that the new square is not empty
      if(newSqClass === "square empty" || model.contents(newSqRow, newSqColumn).length + model.contents(selectedSquare.row, selectedSquare.column).length > 6){
        alert("You cannot merge there!");
        return;
      }
      //merge the contents of the selected an new square and then update the board
      
      model.setContents(newSqRow, newSqColumn, newContent);
      model.setContents(selectedSquare.row, selectedSquare.column, '');

      model.updateMoves();
      model.resetCounters();
      model.addToScore();
      model.countEmptySq();
      
      unselectSq(selectedSquare.row, selectedSquare.column);
      andRefreshDisplay(); //refreshes display,
    }else{
      alert("You cannot merge there!");
    }
  }

  // handles the "Check Answer" button by calling model.checkSol()
  function handleCheckSol(){
    if(model.checkSol()){
      alert("you solved the puzzle!");
    }else if(model.numEmptySq < 20){
      alert("You cannot check solution yet");
    }else{
      alert("sorry, this solution is incorrect");
    }
  }

  // change the configuration of the puzzle
  function changePuzzle(which:number){
    if(selectedSquare != null){
      unselectSq(selectedSquare.row, selectedSquare.column);
      const newPuzzle = new Model (which);
      setModel(newPuzzle);
      andRefreshDisplay();
    }
    const newPuzzle = new Model (which);
    setModel(newPuzzle);
    andRefreshDisplay();
  }

  // resets the board when "reset" button is clicked
  function resetBoard(){
    if(selectedSquare != null){
      unselectSq(selectedSquare.row, selectedSquare.column);
      const currPuzzle = new Model(model.chosen);
      setModel(currPuzzle);
      andRefreshDisplay();
    }
    const currPuzzle = new Model(model.chosen);
    setModel(currPuzzle);
    andRefreshDisplay();
  }

 // HTML that renders the board, controls, and move/score counters etc.
  return (
    <div>
      <h1>WordFold: {themes[model.chosen]}</h1>
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
          <div data-testid="score" className="score">Score: {model.currScore}  </div>
          <div data-testid="moves" className="numMoves">Moves: {model.moveCount}</div>
        </div>

        <div className = "keypadRow">
          <button data-testid="upKey" className = "arrow-key" onClick ={() => mergeUp()}> ⇧ </button>
        </div>

        <div className = "keypadRow">
          <button data-testid="leftKey" className = "arrow-key" onClick ={() => mergeLeft()}> ⇦ </button>
          <button data-testid="rightKey" className = "arrow-key" onClick ={() => mergeRight()}> ⇨ </button>
        </div>

        <div className = "keypadRow">
          <button data-testid="downKey" className = "arrow-key" onClick ={() => mergeDown()}> ⇩ </button>
        </div>

        <div className = "functions">
        <button data-testid="reset" className = "reset"  onClick ={() => resetBoard()}> Reset </button>
        <button data-testid="checkSol" className = "checkSol" onClick ={() => handleCheckSol()}> Check Answer </button>
        <button data-testid="showSol" className = "showSol" onClick ={() => model.displaySol()}> Show Solution </button>
        </div>

        <div className = "change-config">
          <button data-testid="puzzle1" className = "config" onClick ={() => changePuzzle(0)}>Puzzle 1</button>
          <button data-testid="puzzle2" className = "config" onClick ={() => changePuzzle(1)}>Puzzle 2</button>
          <button data-testid="puzzle3" className = "config" onClick ={() => changePuzzle(2)}>Puzzle 3</button>
        </div>

      </div>

    </div>
  )
}