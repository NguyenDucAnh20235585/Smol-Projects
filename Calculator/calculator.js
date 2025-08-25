const display = document.getElementById("display");

function append_to_display(input){
    display.value += input;
}

function clear_display(){
    display.value = "";
}

function calculate(){
    try{
        const result = eval(display.value);
    

    if (result === Infinity  || result === -Infinity){
        display.value = "Stoopid human. Put smth other than 0";
    }

    else if (isNaN(result)){
        display.value = "Put a number, human.";
    }

    else{
        display.value = result;
    }
}

    catch(error){
        display.value = "Not a function, human";
    }
}


function remove(){
    display.value = display.value.slice(0, -1);
}