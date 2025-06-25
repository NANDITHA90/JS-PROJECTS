let expNameEl = document.getElementById("expName");
let enameErrorMsgEl = document.getElementById("enameErrorMsg");
let amountEl = document.getElementById("amount");
let eamountErrorMsgEl = document.getElementById("eamountErrorMsg");
let categoryEl = document.getElementById("category");
let ecatErrorMsgEl = document.getElementById("ecatErrorMsg");
let dateEl = document.getElementById("date");
let edateErrorMsgEl = document.getElementById("edateErrorMsg");
let submitBtnEl = document.getElementById("submitBtn");
let errorMsgEl = document.getElementById("errorMsg");
let myFormEl = document.getElementById("myForm");
let nameListEl = document.getElementById("nameoutputDatabaseList");
let amountListEl = document.getElementById("amountoutputDatabaseList");
let categoryListEl = document.getElementById("categoryoutputDatabaseList");
let dateListEl = document.getElementById("dateoutputDatabaseList");
let actionListEl = document.getElementById("actionoutputDatabaseList");
let totalSpanEl = document.getElementById("totalSpan");
let filterCategorySelect = document.getElementById("categoryFilter");

let entries = []; // to store all the Entries
let editIndex = null;

function resetForm() {
    expNameEl.value = "";
    amountEl.value = "";
    categoryEl.selectedIndex = 0;
    dateEl.value = "";
}

function calculateTotal(filteredEntries) {
    let total = 0;
    for (let i = 0; i < filteredEntries.length; i++) {
        total = total + parseFloat(filteredEntries[i].amount);
    }
    totalSpanEl.textContent = total.toFixed(2);
}

function renderData() {
    nameListEl.textContent = "";
    amountListEl.textContent = "";
    categoryListEl.textContent = "";
    dateListEl.textContent = "";
    actionListEl.textContent = "";

    let selectedFilter = filterCategorySelect.value;
    let filteredEntries = [];

    if (selectedFilter === "select") {
        filteredEntries = entries;         // displays all the entries 
    } else {
        for (let j = 0; j < entries.length; j++) {
            if (entries[j].category.toLowerCase() === selectedFilter.toLowerCase()) {      // checks each entry with the category of selected category, if it matches, it'll be added into the entry array
                filteredEntries.push(entries[j]);       // When the filtered category matches the category, it pushes the entry inside the array - entries
            }
        }
    }

    for (let k = 0; k < filteredEntries.length; k++) {
        let entry = filteredEntries[k];

        addListItem(nameListEl, entry.expName);   // giving name and its value to be added 
        addListItem(amountListEl, entry.amount);
        addListItem(categoryListEl, entry.category);
        addListItem(dateListEl, entry.date);

        let btnDiv = document.createElement("div");  // creating div for holding the buttons for operation

        btnDiv.style.backgroundColor = "#faebe8";
        btnDiv.style.width = "210px";
        btnDiv.style.padding = "16px";
        btnDiv.style.borderWidth = "1px";
        btnDiv.style.borderColor = "black";
        btnDiv.style.textAlign = "center";


        let editBtn = document.createElement("button");  // edit button
        editBtn.textContent = "Edit";
        editBtn.style.backgroundColor = "#f5f7fa";
        editBtn.style.color = "black";
        editBtn.style.paddingLeft = "17px";
        editBtn.style.paddingRight = "17px";
        editBtn.style.borderWidth = "1px";
        editBtn.onclick = createEditFunction(entry, k);  // operation to perform when clicked

        let deleteBtn = document.createElement("button");  // delete button
        deleteBtn.textContent = "Delete";
        deleteBtn.style.backgroundColor = "#f5f7fa";
        deleteBtn.style.color = "black";
        deleteBtn.style.paddingLeft = "20px";
        deleteBtn.style.paddingRight = "20px";
        deleteBtn.style.borderWidth = "1px";
        deleteBtn.onclick = createDeleteFunction(k);  // operation to perform when clicked

        /*
        <div class="actionoutputDatabaseListEl">

            <div class="btnDiv">

                <div class="editBtn">

                </div>

                <div class="deleteBtn">

                </div>

            </div>
        
        </div>
        */

        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(deleteBtn);

        actionListEl.appendChild(btnDiv);
    }

    calculateTotal(filteredEntries);
}

function createEditFunction(entry, index) {
    return function() {
        expNameEl.value = entry.expName;
        amountEl.value = entry.amount;
        categoryEl.value = entry.category;
        dateEl.value = entry.date;
        editIndex = index;
    };
}

function createDeleteFunction(index) {
    return function() {
        entries.splice(index, 1);
        renderData();
    };
}

function addListItem(container, text) {
    let div = document.createElement("div");
    let li = document.createElement("li");
    li.style.width = "210px";
    li.style.fontWeight = "bold";
    li.style.textAlign = "center";
    li.style.padding = "17px";
    li.style.backgroundColor = "#faebe8";
    li.style.borderWidth = "1px";
    li.style.borderColor = "black";
    li.style.display = "block";
    li.textContent = text;
    div.appendChild(li);
    container.appendChild(div);

}

function validateInputs() {
    let valid = true;

    if (expNameEl.value === "") {
        enameErrorMsgEl.style.display = "block";
        valid = false;
    } else {
        enameErrorMsgEl.style.display = "none";
    }

    if (amountEl.value === "") {
        eamountErrorMsgEl.style.display = "block";
        valid = false;
    } else {
        eamountErrorMsgEl.style.display = "none";
    }

    if (categoryEl.value === "" || categoryEl.value === "select") {
        ecatErrorMsgEl.style.display = "block";
        valid = false;
    } else {
        ecatErrorMsgEl.style.display = "none";
    }

    if (dateEl.value === "") {
        edateErrorMsgEl.style.display = "block";
        valid = false;
    } else {
        edateErrorMsgEl.style.display = "none";
    }

    if (valid === false) {
        errorMsgEl.style.display = "block";
        errorMsgEl.textContent = "Enter Proper Values!!";
    } else {
        errorMsgEl.style.display = "none";
    }

    return valid;
}

function submitEvent(event) {
    event.preventDefault();

    if (validateInputs() === false) {
        return;
    }

    let newEntry = {
        expName: expNameEl.value,
        amount: amountEl.value,
        category: categoryEl.value,
        date: dateEl.value
    };

    if (editIndex !== null) {
        entries[editIndex] = newEntry;
        editIndex = null;
    } else {
        entries.push(newEntry);
    }

    resetForm();
    renderData();
}

myFormEl.addEventListener("submit", submitEvent);

filterCategorySelect.addEventListener("change", renderData);

// ------------------------ BLUR EVENT FOR INPUT FIELDS -----------------------------------------------------------------------------

expNameEl.addEventListener("blur", function() {
    if (expNameEl.value === "") {
        enameErrorMsgEl.style.display = "block";
    } else {
        enameErrorMsgEl.style.display = "none";
    }
});

amountEl.addEventListener("blur", function() {
    if (amountEl.value === "") {
        eamountErrorMsgEl.style.display = "block";
    } else {
        eamountErrorMsgEl.style.display = "none";
    }
});

categoryEl.addEventListener("blur", function() {
    if (categoryEl.value === "select") {
        ecatErrorMsgEl.style.display = "block";
    } else {
        ecatErrorMsgEl.style.display = "none";
    }
});

dateEl.addEventListener("blur", function() {
    if (dateEl.value === "") {
        edateErrorMsgEl.style.display = "block";
    } else {
        edateErrorMsgEl.style.display = "none";
    }
});