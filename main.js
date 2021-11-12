/**
 * @name Unnamed_window_load_event
 * @desc Wait for all files to be loaded before running scripts
 * @listens load
 */
window.addEventListener("load", () => {
    /*g_canvas = document.querySelector("#canvas");
    g_context = canvas.getContext('2d');


    //from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
    g_context.mozImageSmoothingEnabled = false;
    g_context.webkitImageSmoothingEnabled = false;
    g_context.msImageSmoothingEnabled = false;
    g_context.imageSmoothingEnabled = false;*/

    startButtonRegister();
    
    //window.requestAnimationFrame(gameplayLoop);
})

/**
 * @desc This function adds an event listener for the start button
 * @listens click
 */
function startButtonRegister() {
    document.getElementById("startButton").addEventListener('click', e => {
        /*if (g_mode == "unstarted") {
            g_maxShips = document.getElementById("number_of_ships").value;
            g_mode = "start";
        }*/

        //unguarded (fix later)
        let ruleset = prompt("What ruleset would you like to play with?\n1: US Ruleset\n2: UK Ruleset\n3: Multiple cases");
		gameplay(ruleset);
    });
}



