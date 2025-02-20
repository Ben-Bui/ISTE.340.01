document.addEventListener("DOMContentLoaded", function() {
    const formContainer = document.getElementById("form-container");
    const result = document.getElementById("result");
    const resetBtn = document.getElementById("reset-btn");

    function createQuestionAndDropdown(question, options, parentKey) {
        let questionElement = document.createElement("p");
        questionElement.textContent = question;

        let select = document.createElement("select");
        select.setAttribute("data-key", parentKey);
        select.addEventListener("change", function() {
            handleSelection(this);
        });

        let blankOption = document.createElement("option");
        blankOption.value = "";
        blankOption.textContent = "Select an option...";
        blankOption.disabled = true;
        blankOption.selected = true;
        select.appendChild(blankOption);

        options.forEach(option => {
            let opt = document.createElement("option");
            opt.value = option;
            opt.textContent = option;
            select.appendChild(opt);
        });

        formContainer.appendChild(questionElement);
        formContainer.appendChild(select);
    }

    function handleSelection(select) {
        let selectedValue = select.value;
        let parent = select.parentElement;

        while (parent.nextSibling) {
            parent.parentElement.removeChild(parent.nextSibling);
        }

        if (characterData[selectedValue]) {
            let nextQuestion = characterData[selectedValue][0];
            let nextOptions = characterData[selectedValue].slice(1);
            createQuestionAndDropdown(nextQuestion, nextOptions, selectedValue);
        } else {
            displayResult();
        }
    }

    function displayResult() {
        let selections = {};
        let keys = ["Race", "Class", "Background", "Weapon"];
        let index = 0;

        formContainer.querySelectorAll("select").forEach(select => {
            if (index < keys.length) {
                selections[keys[index]] = select.value;
                index++;
            }
        });

        let resultText = `Race: ${selections["Race"] || "Not selected"}\nClass: ${selections["Class"] || "Not selected"}`;
        result.textContent = resultText.trim();
    }

    resetBtn.addEventListener("click", function() {
        formContainer.innerHTML = "";
        result.textContent = "";
        createQuestionAndDropdown(characterData.init[0], characterData.init.slice(1), "init");
    });

    createQuestionAndDropdown(characterData.init[0], characterData.init.slice(1), "init");
});
