/**
 * Created by Malith on 11/23/2015.
 */
var buffer = 0;
var statement = '';

function addition(){


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
function squire(){
    statement = statement +"&sup2;";
    display();
}

function display(){
    document.getElementById("calDisplay").value = statement+ "\n" + buffer
}

function displaytemp(){
    statement+=this.innerHTML;
    display()
}

function doBackspace(){
    statement = statement.substring(0,statement.length-1);
    display();
}

document.getElementById("add").addEventListener("click", addition);

var arr = document.getElementsByTagName('button');
var len = arr.length;
var i;
for(i=0;i<len;i++) {
    document.getElementsByTagName('button')[i].addEventListener("click", displaytemp);
}

document.getElementById("backspace").removeEventListener("click", displaytemp);
document.getElementById("clear").removeEventListener("click", displaytemp);
document.getElementById("sol").removeEventListener("click", displaytemp);
document.getElementById("sqr").removeEventListener("click", displaytemp);

document.getElementById("backspace").addEventListener("click", doBackspace);
document.getElementById("sqr").addEventListener("click", squire);
