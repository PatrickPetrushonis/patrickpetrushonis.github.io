// Globally stored language object
var language;

$(document).ready(function() { 
    // Initialize language object on page load
    language = new languageObj();
    language.init();
});

$('#language-toggle').click(function() {
    if (language != undefined) { language.toggleEnglish(); }
});

$('#language-next').click(function() {   
    if (language != undefined) {  language.getRandomPhrase(); }
});

function languageObj() {
    this.languageData = {},
    this.phrases = [],
    this.phraseCurrent = {},
    this.phraseCategory = "Expressions",
    this.phraseId = "language-phrase",
    this.helperId = "language-helper",
    this.toggleId = "language-toggle",
    this.languagePhrase = {},
    this.languageHelper = {},
    this.languageToggle = {},
    this.isEnglish = true,
    /** 
     * Retrieve language data from specified json file
     */
    this.init = function() {
        var self = this;
        
        self.languagePhrase = document.getElementById(self.phraseId);
        self.languageHelper = document.getElementById(self.helperId);
        self.languageToggle = document.getElementById(self.toggleId);
        
        jQuery.getJSON("../app/data/mandarin.json", function(data) {            
            self.languageData = data;
            self.getRandomPhrase()
        });
    }, 
    /** 
     * Retrieve random phrase from language data
     */
    this.getRandomPhrase = function() {
        var self = this;
        self.phrases = [];
    
        for (var x = 0; x < self.languageData[self.phraseCategory].length; x++) {
            self.phrases.push(self.languageData[self.phraseCategory][x]);
        }
    
        if (self.phrases.length > 0) {
            var phraseIndex = Math.floor(Math.random() * self.phrases.length);
            self.phraseCurrent = self.phrases[phraseIndex];
            self.convertLanguage();
        }
    },
    /** 
     * Convert current phrase to current language (english or non-english)
     */
    this.convertLanguage = function() {  
        var self = this;

        self.languagePhrase.text = self.isEnglish ? self.phraseCurrent.Label : self.phraseCurrent.Mandarin;
        self.languageHelper.text = self.isEnglish ? "" : self.phraseCurrent.Pinyin;
    
        $("#" + self.phraseId).text(self.languagePhrase.text);
        $("#" + self.helperId).text(self.languageHelper.text);
    },
    /** 
     * Changes language from english to non-english (and vice-versa)
     */
    this.toggleEnglish = function() {
        var self = this;
        self.isEnglish = !self.isEnglish;
        self.languageToggle.text = self.isEnglish ? "English" : "Mandarin";
        self.convertLanguage();
    }
}