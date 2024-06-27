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

