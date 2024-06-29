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
let display = document.querySelector(".display");

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

document.querySelectorAll(".button").forEach((button)=>{
    button.addEventListener("click",(e)=>{
    if (e.target.classList.contains("number")){
        if (flag==0) {
            if (display.textContent=="0" && e.target.textContent=="0") return; //Handling Zeroes for first number
            number1 += e.target.textContent;
            display.textContent = number1;
            total = number1;
        }
        else if (flag==1){
            if (e.target.textContent=="0") {display.textContent="0"; number2=""; return;} //Handling Zeroes for second number
            number2 += e.target.textContent;
            display.textContent = number2;
            total = operate(number1,number2,operator);

        }
    
    }
    else if (e.target.classList.contains("operator")){
        flag=1;
        if (e.target.classList.contains("addCont")){
            operator = "+";
            display.textContent = total;
            number1=Number(total);
            number2="";
        }
        else if (e.target.classList.contains("subtractCont")){
            operator = "-";
            display.textContent = total;
            number1=Number(total);
            number2="";
        }
        else if (e.target.classList.contains("multiplyCont")){
            operator = "*";
            display.textContent = total;
            number1=Number(total);
            number2="";
        }
        else if (e.target.classList.contains("divideCont")){
            operator = "/";
            display.textContent = total;
            number1=Number(total);
            number2="";
        }
        else if (e.target.classList.contains("plusMinusCont")){
            operator = "+/-";
            total = Number(-total);
            display.textContent = total;
            number1 = Number(total);
            number2 = "";
        }
        else if (e.target.classList.contains("percentageCont")){
            operator = "%";
            total = total/100;
            display.textContent = total;
            number1=Number(total);
            number2="";
        }
        else if (e.target.classList.contains("equal")){
            operator = "=";
            display.textContent=total;
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
            operator = "";
            flag=0;
        }
    }

    })
})