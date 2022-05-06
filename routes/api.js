'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res, next) => {
      const { text, locale } = req.body;

      if (typeof text == "undefined" || typeof locale == "undefined") {
        return res.json({ error: "Required field(s) missing" });
      }

      next();

    }, (req, res, next) => {
      const { text } = req.body;

      if (text.length == 0) {
        return res.json({ error: 'No text to translate' });
      }

      next();
      
    }, (req, res, next) => {
      const { locale } = req.body;
      const options = ["american-to-british", "british-to-american"];

      const validate = options.includes(locale);

      if (!validate) {
        return res.json({ error: "Invalid value for locale field" });
      }
      

      next();

    }, (req, res) => {
      const { text, locale } = req.body;
      const { translation }  = translator.translate(text, locale);
      
      if (text == translation) {
        return res.json({
          text,
          translation: "Everything looks good to me!"
        });
      } else {

        return res.json({ text, translation });
      }
    });
};
