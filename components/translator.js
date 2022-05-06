const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  highlightWord(word) {
    return `<span class="highlight">${word}</span>`;
  }

  time(text, locale) {
    const americanTime = /[0-9]{1,2}[:][0-9]{2}/g;
    const britishTime  = /[0-9]{1,2}[.][0-9]{2}/g;
    
    if (!americanTime.test(text) && !britishTime.test(text)) return [];
    
    const changes = [];
    
    if (locale == "american-to-british") {
      const timeList = text.match(americanTime);

      timeList.forEach(t => {
        const newTime = t.replace(":", ".");
        changes.push({ original: t, translation: newTime });
      });
    }

    if (locale == "british-to-american") {
      const timeList = text.match(britishTime);

      timeList.forEach(t => {
        const newTime = t.replace(".", ":");
        changes.push({ original: t, translation: newTime });
      });
    }

    return changes;
  }

  words(text, locale) {
    const wordRule = (word) => new RegExp(`\\b${word}\\b`, "ig");
    const changes  = [];

    let wordPairs;

    if (locale == "american-to-british") wordPairs = new Map(Object.entries(americanOnly));
    if (locale == "british-to-american") wordPairs = new Map(Object.entries(britishOnly));

    for (let [original, translation] of wordPairs) {
      const test = wordRule(original).test(text);
      
      if (test) {
        const matches = text.match(wordRule(original));
        matches.forEach(match => changes.push({ original: match, translation }));
      }

    }

    return changes;
  }

  spelling(text, locale) {
    const wordRule  = (word) => new RegExp(`\\b${word}\\b`, "ig");
    const wordPairs = new Map(Object.entries(americanToBritishSpelling));
    const changes   = [];

    for (let [american, british] of wordPairs) {

      if (locale == "american-to-british") {
        const test = wordRule(american).test(text);

        if (test) {
          const matches = text.match(wordRule(american));
          matches.forEach(m => changes.push({ original: m, translation: british }));
        }
      }

      if (locale == "british-to-american") {
        const test = wordRule(british).test(text);

        if (test) {
          const matches = text.match(wordRule(british));
          matches.forEach(m => changes.push({ original: m, translation: american }));
        }
      }
    }

    return changes;
  }

  titles(text, locale) {
    const americanRule = (title) => new RegExp(`\\b${title}\\B`, "ig");
    const britishRule  = (title) => new RegExp(`\\b${title}\\b`, "ig");
    
    const titles  = new Map(Object.entries(americanToBritishTitles));
    const changes = [];

    for (let [american, british] of titles) {

      if (locale == "american-to-british") {
        const test = americanRule(american).test(text);
        
        if (test) {
          const matches = text.match(americanRule(american));
          let newTitle = british.charAt(0).toUpperCase() + british.slice(1);
          matches.forEach(m => changes.push({ original: m, translation: newTitle }));
        }
      }


      if (locale == "british-to-american") {
        const test = britishRule(british).test(text);

        if (test) {
          const matches = text.match(britishRule(british));
          let newTitle = american.charAt(0).toUpperCase() + american.slice(1);
          matches.forEach(m => changes.push({ original: m, translation: newTitle }));
        }
      }
    }

    return changes;
  }

  translate(text, locale) {
    let newText = text;

    const changes = [
      ...this.time(text, locale),
      ...this.words(text, locale),
      ...this.spelling(text, locale),
      ...this.titles(text, locale)
    ];

    changes.forEach(change => {
      const { original, translation } = change;
      newText = newText.replace(original, this.highlightWord(translation));
    });

    return { translation: newText }
  }
}

module.exports = Translator;