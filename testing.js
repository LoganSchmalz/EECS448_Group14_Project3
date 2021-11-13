//Test File for running Test Suite

function runTests()
{
    //Clears console to print tests
    //console.clear()

    //Test 1: Does expectedPayout return a non-zero, positive number
    console.log("Test 1: Does expectedPayout() return a non-zero, positive number: ");
    let expecVal_test = expectedPayout();
    if(expecVal_test > 0)
    {
        console.log("Passed.\n");
    }
    else console.log("Failed\n");


    //Test 2: Does bankOffer return a non zero positive number
    console.log("Test 2: Does bankOffer() return a non-zero, positive number: ");
    let bankOffer_test = bankOffer();
    if(bankOffer_test > 0)
    {
        console.log("Passed.\n");
    }
    else console.log("Failed.\n")


    //Test 3
    console.log("Test 3: Does seperateCases() remove a value while preserving order: ");
    let testArray = [1,2,3,4,5];
    let seperatedArray_test = separateCase(3,testArray);
    if(seperatedArray_test[3] == 4)
    {
        console.log("Passed.\n");
    }
    else console.log("Failed.\n");


    //Test 4
    console.log("")




}