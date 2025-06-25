let heiEl = document.getElementById("height");
let weiEl = document.getElementById("weight");
let calBtnEl = document.getElementById("calculate");
let resBmiEl = document.getElementById("resultBmi");
let resDesEl = document.getElementById("resultDes");
let resultCont = document.getElementById("result");
let resetBtnEl = document.getElementById("resetBtn");
let resultDesDietEl = document.getElementById("resultDesDiet");



function calculatedResult() {

    resultCont.style.display = "block";

    if (heiEl.value === "" || weiEl.value === "") {
        resBmiEl.textContent = "Error";
        resDesEl.textContent = "Error";
        desEl.textContent = "";
    }


    

    if (parseFloat(heiEl.value) > 0 && parseFloat(weiEl.value) > 0) {
        let calculatedBmi;
        calculatedBmi = (parseFloat(weiEl.value) / (parseFloat(heiEl.value) * parseFloat(heiEl.value)));
        calculatedBmi = calculatedBmi.toFixed(1);
        resBmiEl.textContent = parseFloat(calculatedBmi);

        if (parseFloat(calculatedBmi) < 18.5){

            resDesEl.textContent = "Underweight";
            resDesEl.style.color = "#f1d925";
            resultDesDietEl.textContent = "Eat proper Diet!";
            resultDesDietEl.color = "#f1d925";

        } else if (parseFloat(calculatedBmi) >= 18.5 && parseFloat(calculatedBmi) <= 24.9){

            resDesEl.textContent = "Normal Weight";
            resDesEl.style.color = "green";
            resultDesDietEl.textContent = "Maintain the Diet!";
            resultDesDietEl.color = "green";

        } else if (parseFloat(calculatedBmi) >= 25 && parseFloat(calculatedBmi) <= 29.9){

            resDesEl.textContent = "Over Weight";
            resDesEl.style.color = "orange";
            resultDesDietEl.textContent = "Eat proper Diet and drink more water!";
            resultDesDietEl.color = "orange";

        } else if (parseFloat(calculatedBmi) >= 30){

            resDesEl.textContent = "Obesity";
            resDesEl.style.color = "red";
            resultDesDietEl.textContent = "Eat proper Diet and also Excercise!";
            resultDesDietEl.color = "red";

        } else if (parseFloat(heiEl.value) < 0 || parseFloat(weiEl.value) < 0) {
            resBmiEl.textContent = "Error";
            resDesEl.textContent = "Error";
            resultDesDietEl.textContent = "";
        }

    }

}

   

function calculateEvent() {
    
        calculatedResult();
    
}

calBtnEl.addEventListener("click", calculateEvent);

function resetEvent(){

    resultCont.style.display = "none";
    heiEl.value = "";
    weiEl.value = "";

}

resetBtnEl.addEventListener("click", resetEvent);