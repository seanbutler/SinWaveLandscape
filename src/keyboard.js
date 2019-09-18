
// --------------------------------------------------------------------------------

let _keys=[];

document.addEventListener("keydown", function(event){
    _keys[event.keyCode]=true
}, false);

document.addEventListener("keyup", function(event){
    _keys[event.keyCode]=false
}, false);

function IsKeyDown(keyCode){
    return _keys[keyCode]
}

// --------------------------------------------------------------------------------  

export { IsKeyDown }

// --------------------------------------------------------------------------------

