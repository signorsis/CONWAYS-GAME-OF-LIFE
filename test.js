
const {nextBoardState}=require('./main')
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

    logResult(1,expectedState,testArray)
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
    
    logResult(2,expectedState2,testArray2)
}

function are2DArraysEqual(array1, array2) {
    if (array1.length !== array2.length) {
        return false;
    }

    for (let i = 0; i < array1.length; i++) {
        if (array1[i].length !== array2[i].length) {
            return false;
        }
        
        for (let j = 0; j < array1[i].length; j++) {
            if (array1[i][j] !== array2[i][j]) {
                return false;
            }
        }
    }

    return true;
}

function logResult( testNum,expectedState,testArray) {
    const actualnewState=nextBoardState(testArray)
    if (are2DArraysEqual(actualnewState,expectedState))
    {
        console.log(`test ${testNum}: passed`);
    }
    else {
        console.log(`test ${testNum}: Failed \n expected value: ${expectedState} \n actual Value: ${actualnewState}`);
    }
}
module.exports={test}