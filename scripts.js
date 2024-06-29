let buttonBgColor = ["blue","orange","turquoise"];

buttonBgColor.forEach((color)=>{
    document.querySelectorAll(`.${color}`).forEach((item)=>{
        item.addEventListener("click",(e)=>{
            e.target.classList.add(`active-${color}`);
        
            setTimeout(()=>{
                e.target.classList.remove(`active-${color}`);
            },50);
        })
    });
});

let number1="";
let number2="";
let operator= "";
let total = 0;
let flag = 0;
let pointFlag = 0;
let display = document.querySelector(".display");
let displayTotal = 0;

function operate(number1,number2,operator){
    switch(operator){
        case "+":
            return Number(number1)+Number(number2);
        case "-":
            return Number(number1)-Number(number2);
        case "*":
            return Number(number1)*Number(number2);
        case "/":
            return Number(number1)/Number(number2);
    }
}

function handleOverflow(total){
    let count=0;
    if (Math.abs(total) >= 1) {
        let answer=0;
        while (Math.abs(total) >= 10) {
            total /= 10;
            count++;
            answer = total.toFixed(2)+"e+"+count;
        }
        if (answer.length<=9) return answer;
        else return "overflow";
    }
    else if (Math.abs(total) > 0 && Math.abs(total) < 1) {
        if (Math.abs(total)*100000>10000) return total.toFixed(2);
        let answer=0;
        while (Math.abs(total) < 1) {
            total *= 10;
            count++;
        }
        answer = total.toFixed(2) + "e-" + count;
        if (answer.length <= 9) return answer;
        else return "overflow";
    }
}

document.querySelectorAll(".button").forEach((button)=>{
    button.addEventListener("click",(e)=>{
    if (e.target.classList.contains("number")){
        if (flag==0) {
            if (display.textContent=="0" && e.target.textContent=="0") return;
            if (display.textContent.length!=8){
                if (pointFlag==1 && e.target.classList.contains("point")) return;
                if (e.target.classList.contains("point")) pointFlag=1;
                if (e.target.classList.contains("clearEntered")){
                    if (number1.at(-1)=="."){
                        pointFlag=0;
                    }
                    number1 = number1.slice(0,-1);
                    display.textContent = number1;
                    total = number1;
                    displayTotal = number1;
                    if (number1.length==0) display.textContent = "0";
                }
                else{
                    number1 += e.target.textContent;
                    display.textContent = number1;
                    total = number1;
                    displayTotal = number1;
                }
            }
        }
        else if (flag==1){
            if (number2=="0") {display.textContent="0"; number2=""; return;}
            if (display.textContent.length!=8 || number2==""){
                if (pointFlag==1 && e.target.classList.contains("point")) return;
                if (e.target.classList.contains("point")) pointFlag=1;
                if (e.target.classList.contains("clearEntered")){
                    if (number2.at(-1)=="."){
                        pointFlag=0;
                    }
                    number2 = number2.slice(0,-1);
                    display.textContent = number2;
                    total = operate(number1,number2,operator);
                    if (number2.length==0) display.textContent = "0";
                }
                else{
                    number2 += e.target.textContent;
                    display.textContent = number2;
                    total = operate(number1,number2,operator);
                }
            }
            if (total.toString().length>9){
                displayTotal = handleOverflow(total);
            }
            else{
                displayTotal = total;
            }

        }
    
    }
    else if (e.target.classList.contains("operator")){
        flag=1;
        pointFlag=0;
        if (e.target.classList.contains("addCont")){
            operator = "+";
            display.textContent = displayTotal;
            number1=Number(total);
            number2="";
        }
        else if (e.target.classList.contains("subtractCont")){
            operator = "-";
            display.textContent = displayTotal;
            number1=Number(total);
            number2="";
        }
        else if (e.target.classList.contains("multiplyCont")){
            operator = "*";
            display.textContent = displayTotal;
            number1=Number(total);
            number2="";
        }
        else if (e.target.classList.contains("divideCont")){
            operator = "/";
            display.textContent = displayTotal;
            number1=Number(total);
            number2="";
        }
        else if (e.target.classList.contains("percentageCont")){
            operator = "%";
            total = total/100;
            if (total.toString().length>9){
                displayTotal = handleOverflow(total);
            }
            else{
                displayTotal = total;
            }
            display.textContent = displayTotal;
            number1=Number(total);
            number2="";
        }
        else if (e.target.classList.contains("equal")){
            operator = "=";
            display.textContent=displayTotal;
            number1 = "";
            number2 = "";
            operator = "";
            flag=0;
        }
        else if (e.target.classList.contains("clear")){
            display.textContent="0";
            number1 = "";
            number2 = "";
            total = "";
            displayTotal = "";
            operator = "";
            flag=0;
        }
    }

    })
})