const chai     = require('chai');
const chaiHttp = require('chai-http');

const server     = require('../server.js');
const Translator = require('../components/translator.js');

const assert     = chai.assert;
const translator = new Translator();



chai.use(chaiHttp);

suite('Functional Tests', () => {
  const text        = "We had a party at my friend's condo.";
  const translation = `We had a party at my friend's <span class="highlight">flat</span>.`;
  const locale      = "american-to-british";
  
  // Translation with text and locale fields: POST request to /api/translate
  test("POST with text and locale fields", (done) => {
    chai.request(server)
        .post("/api/translate")
        .send({ text, locale })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "translation", "translation must be a property");
          assert.property(res.body, "text", "text must be a property");
          assert.notEqual(res.body.text, res.body.translation, "text and translation must be different");
          assert.equal(res.body.translation, translation);
          done();
        });
  });

// Translation with text and invalid locale field: POST request to /api/translate
  test("POST with invalid locale field", (done) => {
    chai.request(server)
        .post("/api/translate")
        .send({ text, locale: "something else"})
        .end((err, res) => {
          assert.property(res.body, "error", "error must be a property");
          assert.equal(res.body.error, "Invalid value for locale field");
          done();
        });
  });

// Translation with missing text field: POST request to /api/translate
  test("POST with missing text field", (done) => {
    chai.request(server)
        .post("/api/translate")
        .send({ locale })
        .end((err, res) => {
          assert.property(res.body, "error", "error must be a property");
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
  });

// Translation with missing locale field: POST request to /api/translate
  test("POST with missing locale field", (done) => {
    chai.request(server)
        .post("/api/translate")
        .send({ text })
        .end((err, res) => {
          assert.property(res.body, "error", "error must be a property");
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
  });

// Translation with empty text: POST request to /api/translate
  test("POST with empty text", (done) => {
    chai.request(server)
        .post("/api/translate")
        .send({ text: "", locale})
        .end((err, res) => {
          assert.property(res.body, "error", "error must be a property");
          assert.equal(res.body.error, "No text to translate");
          done();
        });
  });

// Translation with text that needs no translation: POST request to /api/translate
  test("POST text that needs no translation", (done) => {
    chai.request(server)
        .post("/api/translate")
        .send({ text, locale: "british-to-american"})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.property(res.body, "translation", "translation must be a property");
          assert.property(res.body, "text", "text must be a property");
          assert.equal(res.body.translation, "Everything looks good to me!");
          done();
        });
  });

});
