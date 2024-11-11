import { expect, test } from 'vitest'
import { render, fireEvent, cleanup } from '@testing-library/react'

import React from 'react'
import Home from './page'

// to write this kind of test, we need to be able to render canvas, so we need 
// to simply run (once) npm install canvas. Tricky for GUI but these have to 
// be async functions that are cleaned up afterwards. Only for REACT gui
test('Home', async () => {
  const { getByText, getByTestId } = render(<Home />)
  const scoresElement = getByText(/Score: 0/i);     // scrape text that should be there...
  const b00 = getByTestId("0,0");
  const b11 = getByTestId("1,1");
  const b01 = getByTestId("0,1");
  const mergeUp = getByTestId("upKey");
  const mergeDown = getByTestId("downKey");
  const mergeRight = getByTestId("rightKey");
  const mergeLeft = getByTestId("leftKey");
  const score = getByTestId("score");

  expect(b00.textContent).toBe("E") //testing intital configuration upon site launch
  expect(b11.textContent).toBe("L")
  expect(b01.textContent).toBe("L")

  fireEvent.click(b11) //testing merge up (config 1)
  fireEvent.click(mergeUp)
  expect(b01.textContent).toBe("LL")

  fireEvent.click(getByTestId("reset")) //testing reset button
  expect(b01.textContent).toBe("L")

  fireEvent.click(getByTestId("puzzle2")) //test switching to config 2
  expect(b00.textContent).toBe("E")

  fireEvent.click(getByTestId("puzzle3")) //test switching to config 3
  expect(b00.textContent).toBe("H")

  fireEvent.click(b01) //testing merge down 
  fireEvent.click(mergeDown)
  expect(b11.textContent).toBe("CR")

  fireEvent.click(getByTestId("reset")) //reset board

  fireEvent.click(b00) //testing merge right
  fireEvent.click(mergeRight);
  expect(b01.textContent).toBe("HC")

  fireEvent.click(getByTestId("reset")) //reset board

  fireEvent.click(b01) //testing merge left
  fireEvent.click(mergeLeft);
  expect(b00.textContent).toBe("CH")

  fireEvent.click(getByTestId("reset")) //reset board
  
  fireEvent.click(getByTestId("showSol")) //click the show solution button

  cleanup()
})

// npm run test -- --coverage