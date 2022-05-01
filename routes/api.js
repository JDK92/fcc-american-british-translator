'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res, next) => {
      const localeOptions = ["american-to-british", "british-to-american"];

      if (!localeOptions.includes(req.body.locale)) {
        return { error: "Invalid value for locale field" };
      }

      next();

    }, (req, res, next) => {
      const { text } = req.body;

      if (text.length == 0) {
        return res.json({ error: "No text to translate" });
      }

      next();
    }, (req, res) => {
      const answer = translator.translate(req.body.text, req.body.locale);

      console.log(answer);
    });
};
