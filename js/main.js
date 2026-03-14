const darkButton = document.querySelector(".d-mode");
const fromList = document.querySelector(".from select");
const toList = document.querySelector("#to");
const swapButton = document.querySelector(".swap button");
const convertButton = document.querySelector(".convert-button");
const amountInput = document.querySelector(".price input");
const message = document.querySelector(".massege");
const result = document.querySelector(".res input");


const currencies = [
    { currency: "US Dollar", code: "USD", country: "United States", value: "1.0" },
    { currency: "Euro", code: "EUR", country: "Eurozone", value: "0.8564276666666667" },
    { currency: "British Pound", code: "GBP", country: "United Kingdom", value: "0.7433983993073243" },
    { currency: "Japanese Yen", code: "JPY", country: "Japan", value: "146.81833333333333" },
    { currency: "Canadian Dollar", code: "CAD", country: "Canada", value: "1.3732743333333333" },
    { currency: "Australian Dollar", code: "AUD", country: "Australia", value: "1.5322629717484568" },
    { currency: "Swiss Franc", code: "CHF", country: "Switzerland", value: "0.8056949999793139" },
    { currency: "Chinese Yuan", code: "CNY", country: "China", value: "7.1811" },
    { currency: "Saudi Riyal", code: "SAR", country: "Saudi Arabia", value: "3.752721" },
    { currency: "UAE Dirham", code: "AED", country: "United Arab Emirates", value: "3.6727166556246886" },
    { currency: "Kuwaiti Dinar", code: "KWD", country: "Kuwait", value: "0.3055806666666667" },
    { currency: "Jordanian Dinar", code: "JOD", country: "Jordan", value: "0.709" },
    { currency: "Egyptian Pound", code: "EGP", country: "Egypt", value: "48.5449" },
    { currency: "Turkish Lira", code: "TRY", country: "Turkey", value: "40.719732666666665" },
    { currency: "Russian Ruble", code: "RUB", country: "Russia", value: "79.24875731073843" },
    { currency: "Indian Rupee", code: "INR", country: "India", value: "87.43395032702722" },
    { currency: "Singapore Dollar", code: "SGD", country: "Singapore", value: "1.2825743330077732" },
    { currency: "Mexican Peso", code: "MXN", country: "Mexico", value: "18.61081999809428" },
    { currency: "South African Rand", code: "ZAR", country: "South Africa", value: "17.705566666666666" },
    { currency: "Qatari Riyal", code: "QAR", country: "Qatar", value: "3.642495988574867" }
];



// let currencyValues;

// fetch data from currency api
// fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=7f6789b03b544c2285a43b770022d7d7")
//     .then(response => response.json())
//     .then(data => {
//         currencyValues = data.rates;

//         // load the option in 'from' list field
//         currencies.forEach(ele => {
//             let option = document.createElement("option");
//             option.value = currencyValues[ele.code];
//             option.innerHTML = `${ele.currency} (${ele.code}) - ${ele.country}`;
//             fromList.appendChild(option);
//             console.log(currencyValues[ele.code]);
//         });
//     });




// load currencies in from field

currencies.forEach(ele => {
    let option = document.createElement("option");
    option.value = ele.value;
    option.innerHTML = `${ele.currency} (${ele.code}) - ${ele.country}`;
    fromList.appendChild(option);
});


// add all option except user option in from field
fromList.addEventListener("change", function () {
    toList.innerHTML = "";
    currencies.filter(ele => ele.value != this.value).forEach(e => {
        let option = document.createElement("option");
        option.value = e.value;
        option.innerHTML = `${e.currency} (${e.code}) - ${e.country}`;
        toList.appendChild(option);
    });
});



// toggle dark class onclick on button 
darkButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    darkButton.firstElementChild.classList.toggle("fa-moon");
    darkButton.firstElementChild.classList.toggle("fa-lightbulb");
    if (document.body.classList.contains("dark"))
        localStorage.setItem("dark-mode", "dark");
    else
        localStorage.setItem("dark-mode", "light");
});



// apply theme from localStorage when the page onload 
window.addEventListener("load", function () {
    if (this.localStorage.getItem("dark-mode") === "dark") {
        this.document.body.classList.add("dark");
        darkButton.firstElementChild.classList.add("fa-moon");
    }
    else {
        this.document.body.classList.remove("dark");
        darkButton.firstElementChild.classList.add("fa-lightbulb");
    }
});


//validation and find the result 
convertButton.addEventListener("click", function () {
    let amount = +amountInput.value;
    if (amountInput.value === "") {
        message.innerHTML = "please enter the value";
    } else
        if (isNaN(amount))
            message.innerHTML = "please input only number";
        else {
            message.innerHTML = "";
            if (fromList.value == "" || toList.value == "")
                message.innerHTML = "please select from and to currency";
            else
                result.value = convert(amount, fromList.value, toList.value);
        }
});


// swap currencies feild 
swapButton.addEventListener("click", function () {
    // store the currently selected option values
    let fromValue = fromList.value;
    let toValue = toList.value;
    if (toValue) {
        // // rebuild the "to" list first based on the new from
        toList.innerHTML = "";
        currencies.filter(ele => ele.value != toValue).forEach(e => {
            let option = document.createElement("option");
            option.value = e.value;
            option.innerHTML = `${e.currency} (${e.code}) - ${e.country}`;
            toList.appendChild(option);
        });

        // now set the values swapped
        fromList.value = toValue;
        toList.value = fromValue;
    }
});

// function to convert betweemn currency 
const convert = (value, from, to) => value * (to / from).toFixed(2);