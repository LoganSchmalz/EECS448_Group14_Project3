//Test File for running Test Suite

function runTests()
{
    //Clears console to primt tests
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







}