/**
 * Created by Malith on 11/23/2015.
 */
var buffer = 0;
var statement = '';

function addition(){


}


function display(){
    document.getElementById("calDisplay").value = statement+ "\n" + buffer
}

function displaytemp(){
    statement+=this.innerHTML;
    display()
}

function clearDisplay(){
    statement = '';
    buffer = 0;
    display();
}

function doBackspace(){
    statement = statement.substring(0,statement.length-1);
    display();
}

function sol(){
    buffer = calc();
    display();


}



function calc(){
    var tokens = statement.split('');

    // stack to store numbers
    var values = [];
    // stack to store operators
    var operators = [];
    var i;
    var lim = tokens.length;
    for(i = 0; i<lim;i++){
        // ignore white spaces
        if(tokens[i]==' '){continue;}

        // If a float is entered
        if(tokens[i]== '.'){

            var temp = values.pop();
            i++;////////////////////////////////////////////////////////////////////////////// .5 and 5. ????
            if(checkForDouble(tokens[i])){
                var  buff = [];
                // If there's more than one character in a number
                var count = 0;
                while (i < tokens.length && checkForDouble(tokens[i]) ){
                    buff.push(tokens[i++]);
                    count++;
                }
                temp += buff.join('')/10*count;
                //pass the full number in to the stack
                values.push(temp);
                //i--;
            }
        }
        if(i==tokens.length){
            return (solve(operators.pop(), values.pop(), values.pop()));

        }
        // check whether the current token is a number.
        if(!isNaN(tokens[i])){
            var buff2 = [];
            // If there's more than one character in a number
            while (i < tokens.length && !isNaN(tokens[i]))
                buff2.push(tokens[i++]);
            //pass the full number in to the stack
            values.push(buff2.join(''));
            i--;
        }

        else if(tokens[i] == '('){
            operators.push('(');
        }

        // if closing brase found, solve the current brace and push the answer to values stack
        else if(tokens[i] == ')'){
            while(operators.length > 0 && operators[operators.length-1] != '('){
                values.push(solve(operators.pop(), values.pop(), values.pop()));
            }
            if(operators.length > 0 && operators[operators.length-1] == '('){operators.pop();} // discarding '('
        }
        // if the token is a operator
        else if(tokens[i] == '+'||tokens[i] =='-' || tokens[i] == '×' ||tokens[i] == '/'){
            if(operators.length > 0){
                if(operators[operators.length-1] == tokens[i] && tokens[i] == '-'){
                    operators.pop();
                    operators.push('+');
                    continue;
                }
            }

            // if there's a operator in the operator stack
            //if the operator in the stack got greater than or equal priority to current token
            //solve values in the values stack until the operator stack is empty (answer will be push back to the values stack)

            while(operators.length > 0 && gotPriority(operators[operators.length-1], tokens[i])){
                values.push(solve(operators.pop(), values.pop(), values.pop()));
            }
            //append the operator stack
            operators.push(tokens[i]);


        }
    }
    //solve values with operators and get the final answer
    while(operators.length > 0){
        values.push(solve(operators.pop(), values.pop(), values.pop()));
    }

    //finally the only remaining value in the value stack is the answer so return it
    return values.pop();
}

/**
 * method to solve two values in order a,b with one operator
 */
function solve(operator,  b,   a){
    a = Number(a);
    b = Number(b);
    switch(operator){
        case '+':
            return a+b;
        case '-':
            return a-b;
        case '×':
            return a*b;
        case '/':
            if (b==0){
                alert("Can't devide by zero!!!");
                return 0;
            }
            return a/b;
        default:
            alert("invalid operator in the expression!!!");
            return 0;
    }
}

// method to check whether the input is a double
function checkForDouble(n)
{

    return ! isNaN(n) &&!(n.indexOf('.') === -1);

}


/**
 * method to check the priority of two operators
 */
function gotPriority(opInStack, token){
    if(opInStack == '(' || opInStack ==')'){return false;}
    return !((opInStack == '+' || opInStack == '-') && (token == '×' || token == '/'));

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


document.getElementById("backspace").addEventListener("click", doBackspace);

document.getElementById("clear").addEventListener("click", clearDisplay);
document.getElementById("sol").addEventListener("click", sol);

document.getElementById("sqr").disabled = true;
document.getElementById("sqrt").disabled = true;