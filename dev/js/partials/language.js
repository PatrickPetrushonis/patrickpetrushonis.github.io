// TODO: Make this call more reliable; should occur before j$(document).ready() callback
var mandarinData = jQuery.getJSON("../app/data/mandarin.json");
var selectedPhrase = {};

// 
function GetRandomPhrase() {
    var possiblePhrases = [];

    for (var x = 0; x < mandarinData.responseJSON["Expressions"].length; x++) {
        possiblePhrases.push(mandarinData.responseJSON["Expressions"][x]);
    }

    if (possiblePhrases.length > 0) {
        var phraseIndex = Math.floor(Math.random() * possiblePhrases.length);
        selectedPhrase = possiblePhrases[phraseIndex];
    
        var languageToggle = document.getElementById("language-toggle");
        var isEnglish = (languageToggle.getAttribute("data-english") == "true") ? true : false;
        ConvertLanguage(isEnglish);

        var phraseId = "language-phrase";
        var helperId = "language-helper";
    
        var languagePhrase = document.getElementById(phraseId);
        var languageHelper = document.getElementById(helperId);

        languagePhrase.text = isEnglish ? selectedPhrase.Label : selectedPhrase.Mandarin;
        languageHelper.text = isEnglish ? "" : selectedPhrase.Pinyin;
    
        $("#" + phraseId).text(languagePhrase.text);
        $("#" + helperId).text(languageHelper.text);
    }
}

// Convert current phrase to opposing language
function ConvertLanguage(isEnglish) {
    var phraseId = "language-phrase";
    var helperId = "language-helper";

    var languagePhrase = document.getElementById(phraseId);
    var languageHelper = document.getElementById(helperId);

    languagePhrase.text = isEnglish ? selectedPhrase.Label : selectedPhrase.Mandarin;
    languageHelper.text = isEnglish ? "" : selectedPhrase.Pinyin;

    $("#" + phraseId).text(languagePhrase.text);
    $("#" + helperId).text(languageHelper.text);
}

$('#language-toggle').click(function() {
    var isEnglish = (this.getAttribute("data-english") == "true") ? true : false;
    isEnglish = !isEnglish;

    this.setAttribute("data-english", isEnglish);
    this.text = isEnglish ? "English (to Mandarin)" : "Mandarin (to English)";

    ConvertLanguage(isEnglish)
});

$('#language-next').click(function() {   
    GetRandomPhrase();
});

$(document).ready(function() { 
    // TODO: Make this call more reliable; should occur after jQuery.getJSON() call
    GetRandomPhrase();
});