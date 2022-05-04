const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  highlightWord(word) {
    return `<span class="highlight">${word}</span>`;
  }

  matchRule(word) {
    return new RegExp(`${word}(?=\\W)`, "ig");
  }

  differentSpelling(text, list) {
    let translation = text.toLowerCase();
    
    const words = [];

    const pairs = new Map(Object.entries(list));

    for (let [american, british] of pairs) {
      const americanRule = this.matchRule(american);
      const britishRule  = this.matchRule(british);

      if (translation.match(americanRule) || translation.match(britishRule)) {
        words.push({american, british});
      }
    }

    return words;
  }


  translate(text, locale) {
    let translation = text;

    return {
      translation: translation.charAt(0).toUpperCase() + translation.slice(1)
    };

  }

}

module.exports = Translator;