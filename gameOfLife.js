 
 const fs=require ('fs')
 
 function randomState (height,width) {
 //create a state where every cell is randomly alive or dead
 const threshold=0.5
 let  boardState= Array.from({length:height}, ()=> Array.from({length: width},
    
                       ()=>{ const randomNum= (Math.random()*10)/10
                              return randomNum>=threshold?1 : 0;
                                
                    })) 

 return boardState;


}


 function render (arr2d) {
 return arr2d.map(row=>{  const edittedRow= row.map(el=>{
                                        if(el) return "o";
                                        else return " ";
                                            })
                           return edittedRow.join(" ")
                        
                        })
                            .join("\n")
                            
}

 function nextBoardState(prev) {
    //    1 Any live cell with 0 or 1 live neighbors becomes dead, because of underpopulation
    //    2 Any live cell with 2 or 3 live neighbors stays alive, because its neighborhood is just right
    //    3 Any live cell with more than 3 live neighbors becomes dead, because of overpopulation
    //    4 Any dead cell with exactly 3 live neighbors becomes alive, by reproduction
    const prevCopy=prev.map(innerArray=>innerArray.slice())
    const height=prev.length
    const width=prev[0].length
    let x=0;

    while(x<height){
        let y=0
        while(y<width) {
            let countOfLiveNeighbourCells=0;
            
            if(x-1>=0 && y-1>=0 && prev[x-1][y-1]===1) countOfLiveNeighbourCells++;
            if(x-1>=0 && prev[x-1][y]===1) countOfLiveNeighbourCells++;
            if(x-1>=0 && y+1<width && prev[x-1][y+1]===1) countOfLiveNeighbourCells++;
            if(y-1>=0 && prev[x][y-1]===1) countOfLiveNeighbourCells++;
            if(y+1<width && prev[x][y+1]===1) countOfLiveNeighbourCells++;
            if(y-1>=0 && x+1<height && prev[x+1][y-1]===1) countOfLiveNeighbourCells++;
            if(x+1<height && prev[x+1][y]===1) countOfLiveNeighbourCells++;
            if(x+1<height && y+1<width && prev[x+1][y+1]===1) countOfLiveNeighbourCells++;

            if(prev[x][y]!==0) { 
                if(countOfLiveNeighbourCells <=1) prevCopy[x][y]=0;
                if(countOfLiveNeighbourCells ===2 || countOfLiveNeighbourCells ===3 ) prevCopy[x][y]=1;
                if(countOfLiveNeighbourCells >3) prevCopy[x][y]=0;

            }

            if(prev[x][y]===0) {
                if(countOfLiveNeighbourCells ===3) prevCopy[x][y]=1;

            }
            y++;

        }
        x++;
    }
    
    return prevCopy;

}
function life(initial)
{   
    console.log(render(initial));
    life(nextBoardState(initial))
}
 
function load_board_state(path) {
   const data=fs.readFileSync(path,'utf8')
   const initialState=data.split(/\r?\n/).map(line=>line.split('').map(Number)); // Splits on both \n and \r\n
   return initialState;
}


module.exports={
    render, load_board_state,nextBoardState
    }
   