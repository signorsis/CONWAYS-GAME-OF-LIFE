const {render,load_board_state,nextBoardState}=require('./gameOfLife')
const blessed = require('blessed');

// Create a blessed screen.
const screen = blessed.screen({
  smartCSR: true,
  title: 'Game of Life, cell automata',
});

// Create a box to hold the pattern.
const box = blessed.box({
  top: 'center',
  left: 'center',
  width: '75%',
  height: '75%',
  content: 'Starting...',
  tags: false,
  border: {
    type: 'line',
  },
  style: {
    fg: 'green',
    bg: 'white',
    border: {
      fg: '#01f203',
    },
  },
});

// Append our box to the screen.
screen.append(box);

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Function to update the box content indefinitely.
function loadInitialState (filepath)
{
    const initial= load_board_state(filepath);
    // let state=(initial)
    return initial;
}

 let state=loadInitialState('./blinker.txt');

 function updateBoxContent() {
 
    box.setContent(`${render(state)}`); // Set new content.
    screen.render(); // Render the screen to display the update.
    
    state=(nextBoardState(state))
  // Schedule the next update.
  setTimeout((state)=>updateBoxContent(state), 300); // Update every 300 milli-second.
  
}

// Start the update loop.
updateBoxContent();
