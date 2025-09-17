
const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const amount = document.querySelector(".container input");

const btn = document.querySelector(".btn");
const rstbtn = document.querySelector(".reset");

const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");

const finalVal = document.querySelector("#final-val");
const updateMsg = document.querySelector("#date-msg");


// Populate dropdowns
for (let select of dropdowns) {
    for (let currCode in countryList) {
        //create options for storing code.js currency codes
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;

        //options selected as USD and INR ;
        if (select.name === "from" && currCode === "USD") {
            newOpt.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOpt.selected = "selected";
        }
        //add newOptions to both select of dropdowns ;
        select.append(newOpt);
    }
}


//access the change option
for (let select of dropdowns) {
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);                             // pass argument evt.target to updateFlag parameter
    });
}


// Update flags on dropdown change
const updateFlag = (element) => {
    const currCode = element.value;                  //value of changed option 
    const countrycode = countryList[currCode];

    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    const img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


// Run on button click
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    convertCurrency();
});


// Run on Enter key press
document.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") {
        evt.preventDefault();
        convertCurrency();
    }
});


async function convertCurrency() {
  let amtVal = amount.value;

    //to make enter amount neither  to zero nor less than 1  
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1"
    }
    //acces the "from" and "to" currency value
    let fromVal = fromCurr.value.toLowerCase();
    let toVal = toCurr.value.toLowerCase();

    const URL = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await axios.get(URL);
    let data = response.data;
    const upDate = data.date;                 // updation date
    let rate = data[fromVal][toVal];          //rate of exchange   

    let calCul = amtVal * rate;           //calculation variable
    finalVal.value = calCul;

    //print the updation date to a para beside finalVal ;
    updateMsg.innerText = `updated on ${upDate}`;
  
}


// reset button 
rstbtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    amount.value = "";
    finalVal.value = "";
    updateMsg.innerText = "";
    console.log("testing reset btn");
});


// sidebar program
const sidebar = document.querySelector(".sidebar-content");

for (let code in currencyNames) {
    let countryName = currencyNames[code];
    let p = document.createElement("p");
    p.innerText = `${code} = ${countryName}`;
    sidebar.appendChild(p);
}


let menuBtn = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

