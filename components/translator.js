const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  highlightWord(word) {
    return `<span class="highlight">${word}</span>`;
  }

  spellingOrTitles(word, list, locale) {
    const words = {};
    const keyValues = new Map(Object.entries(list));
    
    for (let [key, value] of keyValues) {
      if (key == word || value == word) {
        words.american = key;
        words.british  = value;
        break;
      }
    }

    if (locale == "american-to-british") {
      return { match: true, ans: this.highlightWord(words.american) };
    }

    if (locale == "british-to-american") {
      return { match: true, ans: this.highlightWord(words.british) };
    }

    return { match: false, ans: word };

  }

  translate(text, locale) {
    
    if ( locale == "american-to-british" ) {
      Object.keys()
    }

    if ( locale == "british-to-american" ) {

    }
  
  }

}

module.exports = Translator;