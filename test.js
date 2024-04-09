
const {logTestResult}= require ('./utils')
const {nextBoardState}=require('./gameOfLife')

function test()
{
    // test 1
    // check any cell with 1 or less alive neighbour is dead

    const testArray= [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    const expectedState=[
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    const actualState1=nextBoardState(testArray)
    
    logTestResult(1,expectedState,actualState1)
   // test 2
    // check dead cell with exactly 3  alive neighbour will be alive

    const testArray2= [
        [0,0,0,1],
        [1,0,0,0],
        [1,0,1,0],
        [0,0,0,0],
    ]
    const expectedState2=[
        [0,0,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,0,0,0],
    ]
    
    const actualState2=nextBoardState(testArray)
    
    logTestResult(2,expectedState,actualState2)
}


module.exports={test}