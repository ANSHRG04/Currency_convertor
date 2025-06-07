
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const icon= document.querySelector(".icon");

for (select of dropdowns){
    for (let code in countryList){
        let newOption=document.createElement("option");
        newOption.innerHTML=code;
        newOption.value=code;

        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        } 
        else if (select.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

const apiKey = '8e71fc112fa7daa97c146688';
async function updateExchangeRate(){
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;
    let response= await fetch(url);
    let data=await response.json();
    let rate = data.conversion_rate;
    let finalAmount = amtVal * rate;

    msg.innerHTML=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

icon.addEventListener("click",()=>{
    let val=fromCurr.value;
    fromCurr.value=toCurr.value;
    toCurr.value=val;
    updateFlag(fromCurr);
    updateFlag(toCurr);
})