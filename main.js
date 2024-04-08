const {render,load_board_state,nextBoardState}=require('./gameOfLife')
const blessed = require('blessed');

// Create a blessed screen.
const screen = blessed.screen({
  smartCSR: true,
  title: 'Infinite String Pattern Demo',
});

// Create a box to hold the pattern.
const box = blessed.box({
  top: 'center',
  left: 'center',
  width: '75%',
  height: '75%',
  content: 'Starting...',
  tags: true,
  border: {
    type: 'line',
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: '#f0f0f0',
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
const initial= load_board_state('./blinker.txt');
let state=(initial)
function updateBoxContent() {
    
    
    box.setContent(`${render(state)}`); // Set new content.
    screen.render(); // Render the screen to display the update.
    state=(nextBoardState(state))

  // Schedule the next update.
  setTimeout(updateBoxContent, 300); // Update every second.
}

// Start the update loop.
updateBoxContent();
