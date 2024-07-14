let stringHistory = ["MI"];
let ruleHistory = ["Start"];

const currentStringElem = document.getElementById("current-string");
const historyElem = document.getElementById("history");
const applyList = document.getElementById("apply-list");

function findOverlappingMatches(string, pattern) {
    let regex = new RegExp(pattern, 'g');
    let matches = [];
    let match;
    let lastIndex = 0;
  
    while ((match = regex.exec(string)) !== null) {
      matches.push(match);
      lastIndex = regex.lastIndex;
      regex.lastIndex = match.index + 1;
    }
  
    return matches;
  }

function getPossibleRules(string) {
    rules = {
        "rule_1": [],
        "rule_2": [],
        "rule_3": [],
        "rule_4": [],
    }

    if (string.endsWith("I")) {
        rules["rule_1"] = [string + "U"]
    }

    rules["rule_2"] = ["M" + string.slice(1) + string.slice(1)]

    rules["rule_3"] = [...findOverlappingMatches(string, "III")].map(match => {
        return string.slice(0, match.index) + "U" + string.slice(match.index + 3, string.length)
    })

    rules["rule_4"] = [...findOverlappingMatches(string, "UU")].map(match => {
        return string.slice(0, match.index) + string.slice(match.index + 2, string.length)
    })

    return rules
}

function updateRules(string) {
    rules = getPossibleRules(stringHistory[0]);

    let elems = [];

    if (rules["rule_1"].length == 0) {
        let listElem = document.createElement("li")
        listElem.classList.add("greyed-out")
        listElem.innerHTML = "<strong class='apply-rule'>Apply rule 1:</strong> ..."
        elems.push(listElem);
    } else {
        for(let i = 0; i < rules["rule_1"].length; i++) {
            let listElem = document.createElement("li")
            let strongElem = document.createElement("strong")
            strongElem.classList.add("apply-rule")
            strongElem.onclick = () => {push(rules["rule_1"][i], 'Applied rule 1')}
            strongElem.innerText = "Apply rule 1: "
            brElem = document.createElement("br")
            codeElem = document.createElement("code")
            codeElem.innerText = rules["rule_1"][i]

            listElem.appendChild(strongElem)
            listElem.appendChild(brElem)
            listElem.appendChild(codeElem)
            
            elems.push(listElem)
        }
    }

    if (rules["rule_2"].length == 0) {
        let listElem = document.createElement("li")
        listElem.classList.add("greyed-out")
        listElem.innerHTML = "<strong class='apply-rule'>Apply rule 2:</strong> ..."
        elems.push(listElem);
    } else {
        for(let i = 0; i < rules["rule_2"].length; i++) {
            let listElem = document.createElement("li")
            let strongElem = document.createElement("strong")
            strongElem.classList.add("apply-rule")
            strongElem.onclick = () => {push(rules["rule_2"][i], 'Applied rule 2')}
            strongElem.innerText = "Apply rule 2: "
            brElem = document.createElement("br")
            codeElem = document.createElement("code")
            codeElem.innerText = rules["rule_2"][i]

            listElem.appendChild(strongElem)
            listElem.appendChild(brElem)
            listElem.appendChild(codeElem)
            
            elems.push(listElem)
        }
    }

    if (rules["rule_3"].length == 0) {
        let listElem = document.createElement("li")
        listElem.classList.add("greyed-out")
        listElem.innerHTML = "<strong class='apply-rule'>Apply rule 3:</strong> ..."
        elems.push(listElem);
    } else {
        for(let i = 0; i < rules["rule_3"].length; i++) {
            let listElem = document.createElement("li")
            let strongElem = document.createElement("strong")
            strongElem.classList.add("apply-rule")
            strongElem.onclick = () => {push(rules["rule_3"][i], 'Applied rule 3')}
            strongElem.innerText = "Apply rule 3: "
            brElem = document.createElement("br")
            codeElem = document.createElement("code")
            codeElem.innerText = rules["rule_3"][i]

            listElem.appendChild(strongElem)
            listElem.appendChild(brElem)
            listElem.appendChild(codeElem)
            
            elems.push(listElem)
        }
    }

    if (rules["rule_4"].length == 0) {
        let listElem = document.createElement("li")
        listElem.classList.add("greyed-out")
        listElem.innerHTML = "<strong class='apply-rule'>Apply rule 4:</strong> ..."
        elems.push(listElem);
    } else {
        for(let i = 0; i < rules["rule_4"].length; i++) {
            let listElem = document.createElement("li")
            let strongElem = document.createElement("strong")
            strongElem.classList.add("apply-rule")
            strongElem.onclick = () => {push(rules["rule_4"][i], 'Applied rule 4')}
            strongElem.innerText = "Apply rule 4: "
            brElem = document.createElement("br")
            codeElem = document.createElement("code")
            codeElem.innerText = rules["rule_4"][i]

            listElem.appendChild(strongElem)
            listElem.appendChild(brElem)
            listElem.appendChild(codeElem)
            
            elems.push(listElem)
        }
    }

    applyList.replaceChildren(...elems);
}

function push(string, rule) {
    stringHistory = [string, ...stringHistory];
    ruleHistory = [rule, ...ruleHistory];
    update();
}

function updateHistory() {
    let elems = [];
    for (let i = 0; i < stringHistory.length; i++) {
        let clickElem = document.createElement("a");
        clickElem.href = "javascript:void(0);"
        clickElem.classList.add("link")
        clickElem.classList.add("blue")
        clickElem.onclick = () => {resetTo(i)};

        if(i == stringHistory.length - 1) {
            clickElem.innerText = "Jump to start."
        } else {
            clickElem.innerText = "Back to here."
        }

        let codeElem = document.createElement("code");
        codeElem.innerText = stringHistory[i]
        
        let listElem = document.createElement("li");
        listElem.innerHTML = ruleHistory[i] + ": ";

        listElem.appendChild(codeElem)
        listElem.innerHTML += ". "

        if(i != 0) {
            listElem.appendChild(clickElem)
        }

        elems.push(listElem);
    }

    historyElem.replaceChildren(...elems);
}

function resetTo(i) {
    stringHistory = stringHistory.slice(i);
    ruleHistory = ruleHistory.slice(i);
    update();
}

function update() {
    currentStringElem.innerHTML = stringHistory[0];
    updateHistory();
    updateRules();
}

function reset() {
    stringHistory = ["MI"];
    ruleHistory = ["Start"];

    update();
}