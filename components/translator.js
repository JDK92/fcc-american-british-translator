const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  highlightWord(word) {
    return `<span class="highlight">${word}</span>`;
  }

  matchRule(word) {
    return new RegExp(`${word}(?=[,.?!\\s])`, "ig");
  }

  spelling(text, list, locale) {
    let translation = text;
    
    const spellingWords = new Map(Object.entries(list));

    for (let [american, british] of spellingWords) {

      switch (locale) {
        case "american-to-british":
          translation = translation.replace(this.matchRule(american), this.highlightWord(british));
          break;
        
        case "british-to-american":
          translation = translation.replace(this.matchRule(british), this.highlightWord(american));
          break;
        default:
          break;
      }
    }

    return translation;
  }

  titles(text, list, locale) {
    let translation = text;
    
    const titles = new Map(Object.entries(list));

    for (let [american, british] of titles) {
      let newTitle = "";

      switch (locale) {
        case "american-to-british":
          newTitle = british.charAt(0).toUpperCase() + british.slice(1);
          translation = translation.replace(this.matchRule(american), this.highlightWord(newTitle));
          break;
        
        case "british-to-american":
          newTitle = american.charAt(0).toUpperCase() + american.slice(1);
          translation = translation.replace(this.matchRule(british), this.highlightWord(newTitle));
          break;
        
        default:
          break;
      }
    }

    return translation;
  }

  uniqueWords(text, locale) {
    let translation = text;
    let words;

    switch (locale) {
      case "american-to-british":
        words = new Map(Object.entries(americanOnly));
        
        for (let [american, british] of words) {
          translation = translation.replace(this.matchRule(american), this.highlightWord(british));
        }

        break;
      
      case "british-to-american":
        words = new Map(Object.entries(britishOnly));

        for (let [british, american] of words) {
          translation = translation.replace(this.matchRule(british), this.highlightWord(american));
        }

        break;
    
      default:
        break;
    }

    return translation;
  }

  translate(text, locale) {
    let translation = text;

    translation = this.spelling(translation, americanToBritishSpelling, locale);
    translation = this.titles(translation, americanToBritishTitles, locale);
    translation = this.uniqueWords(translation, locale);

    return {
      translation: translation.charAt(0).toUpperCase() + translation.slice(1)
    };

  }

  
}

module.exports = Translator;