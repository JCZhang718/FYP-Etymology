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

    while (etymologyText.length > 0)
    {
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
            while (etymologyText != "" && !startsWithLanguageName(etymologyText)) {
                //If the next Symbol is an opening bracket
                if (etymologyText.startsWith('(')) {
                    //Process differently if the parenthesized portion starts with a language name.
                    if (startsWithLanguageName(etymologyText.slice(1, etymologyText.length))) {
                        var indexOfMatchingClosingBracket = findMatchingClosingBracket(etymologyText)
                        //Add parenthesis attribute
                        newItem.parenthesis = etymologyText.slice(1, indexOfMatchingClosingBracket);
                        //Remove parenthesized portion
                        etymologyText = etymologyText.slice(indexOfMatchingClosingBracket+1, etymologyText.length)
                    }
                }
                //Add wordsAndRemarks attribute
                newItem.wordsAndRemarks += etymologyText[0];

                //Remove the symbol from the string being processed
                etymologyText = etymologyText.slice(1, etymologyText.length);
            }
            cognateList.push(newItem);
        }
        else {
            etymologyText = etymologyText.slice(1, etymologyText.length);
        }
    }

    //Process parenthesis
    for (var i = 0; i < cognateList.length; i++) {
        if (cognateList[i].parenthesis != null) {
            //Initialize the children list
            cognateList[i].children = new Array();

            console.log(cognateList[i]);
            processParenthesis(cognateList[i].parenthesis, cognateList[i].children);
            
        }
    }
    /*
    for (var i = 0; i < cognateList.length; i++) {
        var text = cognateList[i].parenthesis;
        while (text != null && text.length > 0) {
            if (startsWithLanguageName(text)) {
                //create new object
                var newItem = new Object();
                //Add name attribute
                var currentLangName = findStartingLanguageName(text);
                newItem.languageName = currentLangName;
                text = text.slice(currentLangName.length, text.length);

                //Create wordsAndRemakrs attribute for current item
                newItem.wordsAndRemarks = "";
                //Repeatedly look through the string until a new language name is encountered.
                while (text != "" && !startsWithLanguageName(text)) {
                    //Add wordsAndRemarks attribute
                    newItem.wordsAndRemarks += text[0];

                    //Remove the symbol from the string being processed
                    text = text.slice(1, text.length);
                }
                cognateList[i].children.push(newItem);
            }
            else {
                text = text.slice(1, text.length);
            }
        }
    }
    */


    var output = document.getElementById("output");

    //Clear table and add header
    output.innerHTML = "<tr><th>Language Name</th><th>Language Name(child)</th><th>Words&Remarks</th></tr>"
    //Add rows
    for (var i = 0; i < cognateList.length; i++) {
        var row = output.insertRow();

        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);

        cell0.innerHTML = cognateList[i].languageName;
        cell1.innerHTML = " ";
        cell2.innerHTML = cognateList[i].wordsAndRemarks;

        //print out children
        for (var j = 0; cognateList[i].children!=null && j < cognateList[i].children.length;j++) {
            var row = output.insertRow();

            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);

            cell0.innerHTML = " ";
            cell1.innerHTML = cognateList[i].children[j].languageName;
            cell2.innerHTML = cognateList[i].children[j].wordsAndRemarks;
        }
    }
}

function processParenthesis(text, resultArray) {
    while (text != null && text.length > 0) {
        if (startsWithLanguageName(text)) {
            //create new object
            var newItem = new Object();
            //Add name attribute
            var currentLangName = findStartingLanguageName(text);
            newItem.languageName = currentLangName;
            text = text.slice(currentLangName.length, text.length);

            //If the next Symbol is an opening bracket
            if (text.startsWith('(')) {
                //Initialize the children list
                newItem.children = new Array();
                //Process differently if the parenthesized portion starts with a language name.
                if (startsWithLanguageName(text.slice(1, text.length))) {
                    var indexOfMatchingClosingBracket = findMatchingClosingBracket(etymologyText)
                    //Add parenthesis attribute
                    newItem.parenthesis = text.slice(1, indexOfMatchingClosingBracket);
                    //Remove parenthesized portion
                    text = text.slice(indexOfMatchingClosingBracket + 1, etymologyText.length)
                    //Process the parenthesis
                    processParenthesis(newItem.parenthesis, newItem.children);
                }
            }

            //Create wordsAndRemakrs attribute for current item
            newItem.wordsAndRemarks = "";
            //Repeatedly look through the string until a new language name is encountered.
            while (text != "" && !startsWithLanguageName(text)) {
                //Add wordsAndRemarks attribute
                newItem.wordsAndRemarks += text[0];

                //Remove the symbol from the string being processed
                text = text.slice(1, text.length);
            }
            resultArray.push(newItem);
        }
        else {
            text = text.slice(1, text.length);
        }
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