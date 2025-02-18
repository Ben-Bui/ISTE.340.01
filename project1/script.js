document.addEventListener("DOMContentLoaded", function () {
    startCharacterCreation();

    document.getElementById("reset-btn").addEventListener("click", startCharacterCreation);
});

function startCharacterCreation() {
    document.getElementById("form-container").innerHTML = "";
    document.getElementById("result").textContent = "";
    buildDropdown("init");
}

function buildDropdown(key) {
    let options = characterData[key];
    if (!options) return; // No more selections to make

    let labelText = options[0]; // First item is always the question
    let choices = options.slice(1); // Rest are the options

    let container = document.getElementById("form-container");

    let label = document.createElement("label");
    label.textContent = labelText;

    let select = document.createElement("select");
    select.onchange = function () {
        handleSelection(this);
    };

    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select an option";
    select.appendChild(defaultOption);

    choices.forEach(choice => {
        let option = document.createElement("option");
        option.value = choice;
        option.textContent = choice;
        select.appendChild(option);
    });

    container.appendChild(label);
    container.appendChild(select);
}

function handleSelection(select) {
    let nextKey = select.value;
    if (!nextKey || !characterData[nextKey]) return;

    removeNextElements(select);
    buildDropdown(nextKey);

    if (Object.keys(characterData).includes(nextKey) && !characterData[nextKey][1]) {
        displayCharacter();
    }
}

function removeNextElements(startElement) {
    let container = document.getElementById("form-container");
    let elements = Array.from(container.children);
    let remove = false;

    elements.forEach(el => {
        if (remove) el.remove();
        if (el.tagName === "SELECT" && el === startElement) remove = true;
    });
}

function displayCharacter() {
    let selects = document.querySelectorAll("#form-container select");
    let choices = Array.from(selects).map(select => select.value).join(" → ");
    document.getElementById("result").textContent = `You created a ${choices}!`;

    localStorage.setItem("character", choices);
    setCookie("character", choices, 7);
}
