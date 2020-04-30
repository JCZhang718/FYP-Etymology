// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

/*
    class CognateListItem
    {
        string languageName;
        string wordsAndRemarks;
        string parenthesis;
        List<CognateListItem> children;
    }
*/


//This function is called when the button is pushed.
function processTest() {
    //Clear the cognateList
    cognateList = new Array();

    var textBox = document.getElementById("textBox");
    var etymologyText = textBox.value;

    var reachedEnd = 0;
    var Germanic = 1;
    var cognateListGermanic = new Array();
    var cognateListNonGermanic = new Array();

    while (!reachedEnd)
    {
        //The < symbol indicates that the etymology is going back further than Germanic
        if (etymologyText.startsWith("<")) {
            Germanic = 0;
            etymologyText.slice(1, etymologyText.length);
        }
        if (startsWithLanguageName(etymologyText)) {
            //create new object
            var newItem = new Object();
            //Add name attribute
            var currentLangName = findStartingLanguageName(etymologyText);
            newItem.languageName = currentLangName;
            etymologyText = etymologyText.slice(currentLangName.length, etymologyText.length);

            //Create wordsAndRemakrs attribute for current item
            newItem.wordsAndRemarks = "";
            //Repeatedly look through the string until a new language name is encountered.
            while (etymologyText != "" && !startsWithLanguageName(etymologyText) && !etymologyText.startsWith("<")) {
                //If the next Symbol is an opening bracket
                if (etymologyText.startsWith('(')) {
                    //Process differently if the parenthesized portion starts with a language name.
                    if (startsWithLanguageName(etymologyText.slice(1, etymologyText.length))) {
                        var indexOfMatchingClosingBracket = findMatchingClosingBracket(etymologyText)
                        //Add parenthesis attribute
                        newItem.parenthesis = etymologyText.slice(1, indexOfMatchingClosingBracket - 1);
                        //Remove parenthesized portion
                        etymologyText = etymologyText.slice(indexOfMatchingClosingBracket+1, etymologyText.length)
                    }
                }
                //Add wordsAndRemarks attribute
                newItem.wordsAndRemarks += etymologyText[0];

                //Remove the symbol from the string being processed
                etymologyText = etymologyText.slice(1, etymologyText.length);
            }
            console.log(newItem);
            if (Germanic) {
                cognateListGermanic.push(newItem);
            }
            else {
                cognateListNonGermanic.push(newItem);
            }
        }
        else {
            etymologyText = etymologyText.slice(1, etymologyText.length);
        }

        if (etymologyText.length <= 0) {
            reachedEnd = 1;
        }
    }

    var outputGermanic = document.getElementById("outputGermanic");
    var outputNonGermanic = document.getElementById("outputNonGermanic");

    //Clear table and add header
    outputGermanic.innerHTML = "<tr><th>Language Name</th><th>Words&Remarks</th></tr>"
    //Add rows
    for (var i = 0; i < cognateListGermanic.length; i++) {
        var row = outputGermanic.insertRow();

        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);

        cell0.innerHTML = cognateListGermanic[i].languageName;
        cell1.innerHTML = cognateListGermanic[i].wordsAndRemarks;
    }
    //Clear table and add header
    outputNonGermanic.innerHTML = "<tr><th>Language Name</th><th>Words&Remarks</th></tr>"
    //Add rows
    for (var i = 0; i < cognateListNonGermanic.length; i++) {
        var row = outputNonGermanic.insertRow();

        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);

        cell0.innerHTML = cognateListNonGermanic[i].languageName;
        cell1.innerHTML = cognateListNonGermanic[i].wordsAndRemarks;
    }
}

function startsWithLanguageName(string) {
    for (var i = 0; i < languageList.length; i++)
    {
        if (string.startsWith(languageList[i])) { return 1; }
    }
    return 0;
}

function findStartingLanguageName(string) {
    for (var i = 0; i < languageList.length; i++)
    {
        if (string.startsWith(languageList[i])) {
            return languageList[i];
        }
    }
    return null;
}

function findMatchingClosingBracket(string) {
    var depth = 0;

    for (var i = 0; i < string.length; i++) {
        switch (string[i])
        {
            case '(':
                depth++;
                break;
            case ')':
                depth--;
                if (depth == 0) { return i; }
                break;
        }
    }
    return -1;
}