/**
 * Created by Malith on 11/23/2015.
 */

function addition(a,b){
    alert('addition button pressed');
}

function subsription(a,b){
    return a-b;
}
function division(a,b){
    return a/b;
}
function multiplication(a,b){
    return a*b;
}
function squire(a){
    return a*a;
}

document.getElementById("addition").addEventListener("click", addition);