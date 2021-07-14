$(document).ready(function() { 
    // Initialize language object on page load
    var language = new languageObj();
    language.init();

    $('#language-toggle').on("click", function() {
        language.toggleEnglish();
    });

    $('#language-next').on("click", function() {
        language.getNextPhrase();
    });
});

function languageObj() {
    this.languageData = {},
    this.phrases = [],
    this.phraseIndices = [],
    this.phraseCategories = [],
    this.phraseCategory = "",
    this.phraseIndex = -1,
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
            self.phrases = [];
            self.phraseCategories = [];

            // Store language data keys as categories
            for (var key in self.languageData) {
                self.phraseCategories.push(key);
            }
            
            // Store each phrase in each category
            self.phraseCategories.forEach(function(category) {            
                self.languageData[category].forEach(function(phrase) {
                    self.phrases.push(phrase);
                });
            });

            self.phrases = self.shuffleArray(self.phrases);
            self.getNextPhrase();
        });
    },
    /** 
     * Fisher-Yates (aka Knuth) Shuffle
     */
    this.shuffleArray = function(array) {
        var currentIndex = array.length;
        var randomIndex; 
        var temp;

        while (--currentIndex > 0){
            randomIndex = Math.floor(Math.random()*(currentIndex + 1));
            temp = array[randomIndex];
            array[randomIndex] = array[currentIndex];
            array[currentIndex] = temp;
        }

        return array;
    }
    /** 
     * Retrieve next phrase from randomly sorted phrases
     */
    this.getNextPhrase = function() {
        var self = this;
        var phrasesCount = self.phrases.length;
        if (phrasesCount <= 0) { return; }

        self.phraseIndex = (self.phraseIndex < phrasesCount - 1) ? self.phraseIndex + 1 : 0;
        self.updatePhrase();
    },
    /** 
     * Convert current phrase to current language (english or non-english)
     */
    this.updatePhrase = function() { 
        var self = this;

        if (self.phraseIndex < 0) { return; }
        var phrase = self.phrases[self.phraseIndex];

        self.languagePhrase.text = self.isEnglish ? phrase.English : phrase.Mandarin;
        self.languageHelper.text = self.isEnglish ? phrase.Helper : phrase.Pinyin;
    
        $("#" + self.phraseId).text(self.languagePhrase.text);
        $("#" + self.helperId).text(self.languageHelper.text);
    },
    /** 
     * Changes language from english to non-english (and vice-versa)
     */
    this.toggleEnglish = function() {
        var self = this;
        self.isEnglish = !self.isEnglish;
        //self.languageToggle.text = self.isEnglish ? "English" : "Mandarin";
        self.updatePhrase();
    }
}