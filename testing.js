//Test File for running Test Suite

function runTests()
{
    //Clears console to print tests
    console.clear()

    //Test 1: Does expectedPayout return a non-zero, positive number
    console.log("Test 1: Does expectedPayout() return a non-zero, positive number: ");
    let expecVal_test = expectedPayout(1);
    if(expecVal_test > 0)
    {
        console.log("Passed.\n");
    }
    else console.log("Failed\n");


    //Test 2: Does bankOffer return a non zero positive number
    console.log("Test 2: Does bankOffer() return a non-zero, positive number: ");
    let bankOffer_test = bankOffer(1);
    if(bankOffer_test > 0)
    {
        console.log("Passed.\n");
    }
    else console.log("Failed.\n")


    //Test 3
    console.log("Test 3: Does formatMoneyUS() return a monetary value, while keeping the number the same: ");
    let testNum = formatMoneyUS(56430);
    if(testNum == "$56,430"){
        console.log("Passed.\n");
    }
    else console.log("Failed.\n");



}