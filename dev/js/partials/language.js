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
    this.randomSeed = 0,
    /** 
     * Retrieve language data from specified json file
     */
    this.init = function() {
        var self = this;
        
        self.languagePhrase = document.getElementById(self.phraseId);
        self.languageHelper = document.getElementById(self.helperId);
        self.languageToggle = document.getElementById(self.toggleId);

        if (self.languagePhrase == undefined || 
            self.languageHelper == undefined || 
            self.languageToggle == undefined) { 
            return; 
        }
        
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

            // Retrieve most recent shuffle seed from cookie
            var seed = self.getCookie('lang-seed');
            self.randomSeed = (seed) ? seed : Math.random();
            self.setCookie('lang-seed', self.randomSeed);

            // Shuffle phrases with random seed
            self.phrases = self.shuffleArray(self.phrases, new Math.seedrandom(self.randomSeed));
            
            // Retrieve most recent phrase index from cookie
            var phrase = self.getCookie('lang-phrase');

            // Update text with current phrase
            if (phrase) {
                self.phraseIndex = parseInt(phrase);
                self.updatePhrase();
            }
            else {
                self.getNextPhrase();
            }
        });
    },
    this.setCookie = function(key, value) {
        var cookieDuration = 60 * 60 * 24 * 7;
        docCookies.setItem(key, value, cookieDuration, '/');
    },
    this.getCookie = function(key) {
        return docCookies.getItem(key);
    },
    /** 
     * Fisher-Yates (aka Knuth) Shuffle
     */
    this.shuffleArray = function(array, seed) {
        var currentIndex = array.length;
        var randomIndex; 
        var temp;

        while (--currentIndex > 0){
            randomIndex = Math.floor(seed() * (currentIndex + 1));
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
        self.setCookie('lang-phrase', self.phraseIndex);
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