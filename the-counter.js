///////////////////////////////////////////////////////
//             screen                                //
///////////////////////////////////////////////////////
const collect = document.getElementById("collect");
const restart = document.getElementById("restart");
const led     = document.getElementById("background");
let screen  = document.getElementById('screen');
let i = 0;
let id = 0;
const plus = document.querySelector(".plus");
const menu  = document.querySelector(".menu");
const aside = document.querySelector(".aside");
const zekrAdd = document.querySelector(".zekr");
const valueAdd = document.querySelector(".value");
valueAdd.value = 0;
///////////////////////////////////////////////////////
//            collect & restart & led                //
///////////////////////////////////////////////////////
/////// back ground ///////////
led.onclick = function() {
    let element = document.body;
    let parent = document.getElementById("parent");
    let aside  = document.querySelector(".aside");
    let form   = document.querySelector("form");
    let using = document.querySelector(".using");

    element.classList.toggle("dark-mode");
    aside.classList.toggle("dark-mode");
    form.classList.toggle("dark-mode");
    parent.classList.toggle("in-dark-mode");

    aside.classList.toggle("light-border");
    form.classList.toggle("light-border");

    plus.classList.toggle("light-color");
    menu.classList.toggle("light-color");
    using.classList.toggle("light-color");
}
/////////////collect///////////////////
collect.onclick = ()=>{
    screen.innerHTML = i++;
}
///////// restart ////////////
restart.onclick = function(){
    i = 0;
    screen.innerHTML =i;
    valueAdd.value =screen.innerHTML;
 }
///////////////////////////////////////////////////////
//                 menu & aside                      //
///////////////////////////////////////////////////////
menu.innerHTML = menu.classList.contains("open") ? "&#xf00d;" :"&#xf0c9;";

menu.addEventListener("click" , ()=>{
    menu.classList.toggle("open");
    menu.innerHTML = menu.classList.contains("open") ? "&#xf00d;" :"&#xf0c9;";
    side();  
});

function side(){
    if(menu.classList.contains("open")){
        aside.style.opacity = "1";
        aside.style.transform = "scale3d(1,1,1)";
    }else{
        aside.style.transform = "scale3d(0,1,1)";
    }
}
///////////////////////////////////////////////////////
//                 creat elements                    //
///////////////////////////////////////////////////////
const ul = document.querySelector("ul");

let lis = JSON.parse(localStorage.getItem("zekr"))||[] ;
//////////////////////
//    push array   //
/////////////////////
const pushArray = (text ,code,staticNumber,crrunt)=>{
    const pushZekr = {
        name    : text,
        code    : `00-${new Date().getTime()}-${id}`,
        val   : staticNumber,
        active  : crrunt,
    }
    lis.push(pushZekr);

    createElement(pushZekr);

    localStorage.setItem("zekr" , JSON.stringify(lis));   
}
//////////////////////
//  create elements //
/////////////////////
const createElement = (pushZekr)=>{
    
    let  li = document.createElement("li");

        screen  = document.getElementById('screen');  
       
    let  close = document.createElement("span");
          close.innerHTML="x";
          close.classList.add("close");

    let alZekr = document.createElement("p");
        alZekr.innerHTML= pushZekr.name;
        alZekr.classList.add("alZekr");

    let  count = document.createElement("span");  
        count.classList.add("count");
        count.setAttribute("target" , pushZekr.active);
        count.innerHTML = pushZekr.val;

        li.setAttribute("code" , pushZekr.code);

        li.append(close , alZekr , count);
        ul.append(li);
} 

lis.forEach(createElement);
//////////////////////
//  modify pushing //
/////////////////////
plus.addEventListener("click",()=>{

    if(valueAdd.value == ""){
        valueAdd.value = 0;
    }

    valueAdd.value = parseInt(valueAdd.value)+parseInt(screen.innerHTML);

    let counts = document.querySelectorAll(".count");
    let azkar  = document.querySelectorAll(".alZekr");

    for(let z = 0 ; z < azkar.length;z++){

        if(zekrAdd.value == azkar[z].innerHTML){

            azkar[z].parentElement.remove();

            DeletedItem = azkar[z].parentElement.getAttribute("code");

            lis = lis.filter((l => l.code !== DeletedItem));

            localStorage.setItem("zekr" , JSON.stringify(lis));
    
        }
    }

    id++;
    pushArray(
        zekrAdd.value,
        `00-${new Date().getTime()}-${id}`,
        valueAdd.value,
    ) ;
    
       zekrAdd.value = "";
       valueAdd.value = "";
});
//////////////////////////
//  editing to element //
/////////////////////////
ul.addEventListener("click" , function(e){

    if(e.target.classList.contains("close")){

        e.target.parentElement.remove();

        DeletedItem = e.target.parentElement.getAttribute("code");

        lis = lis.filter((l => l.code !== DeletedItem));

        localStorage.setItem("zekr" , JSON.stringify(lis));
    }
    if(e.target.classList.contains("alZekr")){

        zekrAdd.value = e.target.innerHTML;
        valueAdd.value = e.target.nextSibling.innerHTML;
        screen.innerHTML = 0;
        i = 0;
    }
    if(e.target.classList.contains("count")){

        valueAdd.value = e.target.innerHTML;
        zekrAdd.value = e.target.previousSibling.innerHTML;
        screen.innerHTML = 0;
        i = 0;
    }
});
///////////////////////////