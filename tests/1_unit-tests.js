const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
    
  suite("American to British - Tests", () => {
    
    const locale = "american-to-british";

    test("American to British spelling - Favorite", () => {
      const text       = "Mangoes are my favorite fruit.";
      const [ answer ] = translator.spelling(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "favourite", "favorite(a) = favourite(b)");
    });
  
    test("American to British spelling - Yogurt", () => {
      const text       = "I ate yogurt for breakfast.";
      const [ answer ] = translator.spelling(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "yoghurt", "yogurt(a) = yoghurt(b)");
    });
  
    test("American only words - Condo", () => {
      const text       = "We had a party at my friend's condo.";
      const [ answer ] = translator.words(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "flat", "condo(a) = flat(b)");
    });
  
    test("American only words - Trashcan", () => {
      const text       = "Can you toss this in the trashcan for me?";
      const [ answer ] = translator.words(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "bin", "trashcan(a) = bin(b)");
    });
  
    test("American only words - Parking lot", () => {
      const text       = "The parking lot was full.";
      const [ answer ] = translator.words(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "car park", "parking lot(a) = car park(b)");
    });
  
    test("American only words - Rube Goldberg machine", () => {
      const text       = "Like a high tech Rube Goldberg machine.";
      const [ answer ] = translator.words(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "Heath Robinson device", "Rube Goldberg machine(a) = Heath Robinson device(b)");
    });
  
    test("American only words - Play hooky", () => {
      const text       = "To play hooky means to skip class or work.";
      const [ answer ] = translator.words(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "bunk off", "play hooky(a) = bunk off(b)");
    });
  
    test("American to British titles - Mr.", () => {
      const text       = "No Mr. Bond, I expect you to die.";
      const [ answer ] = translator.titles(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "Mr", "Mr.(a) = Mr(b)");
    });
  
    test("American to British titles - Dr.", () => {
      const text       = "Dr. Grosh will see you now.";
      const [ answer ] = translator.titles(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "Dr", "Dr.(a) = Dr(b)");
    });
  
    test("American to British time - 12:15", () => {
      const text       = "Lunch is at 12:15 today.";
      const [ answer ] = translator.time(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "12.15", "12:15(a) = 12.15(b)");
    });
  
    test("American to British - Highlight translation #1", () => {
      const text   = "Mangoes are my favorite fruit.";
      const answer = translator.translate(text, locale);

      assert.include(answer.translation, `<span class="highlight">favourite</span>`, "translation must have a highlight class");
      
    });
  
    test("American to British - Highlight translation #2", () => {
      const text   = "I ate yogurt for breakfast.";
      const answer = translator.translate(text, locale);

      assert.include(answer.translation, `<span class="highlight">yoghurt</span>`, "translation must have a highlight class");
      
    });
  });

  suite("British to American - Tests", () => {

    const locale = "british-to-american";

    test("British only words - Footie", () => {
      const text   = "We watched the footie match for a while.";
      const [ answer ] = translator.words(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "soccer", "footie(b) = soccer(a)");      
    });

    
    test("British only words - Paracetamol", () => {
      const text   = "Paracetamol takes up to an hour to work.";
      const [ answer ] = translator.words(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "Tylenol", "Paracetamol(b) = Tylenol(a)");   
    });

    
    test("British to American spelling - Caramelise", () => {
      const text = "First, caramelise the onions.";
      const [ answer ] = translator.spelling(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "caramelize", "caramelise(b) = caramelize(a)");   
    });

    
    test("British only words - Bank holiday | Funfair", () => {
      
      // This test has 2 British words

      const text   = "I spent the bank holiday at the funfair.";
      const answer = translator.words(text, locale);

      assert.isObject(answer[0], "Answer must be an object");
      assert.isObject(answer[1], "Answer must be an object");

      assert.property(answer[0], "translation", "translation must be a property");
      assert.property(answer[1], "translation", "translation must be a property");

      assert.equal(answer[0].translation, "public holiday", "bank holiday(b) = public holiday(a)");   
      assert.equal(answer[1].translation, "carnival", "funfair(b) = carnival(a)");   
    });

    
    test("British only words - Bicky | Chippy", () => {

      // This test has 2 British words

      const text   = "I had a bicky then went to the chippy.";
      const answer = translator.words(text, locale);

      assert.isObject(answer[0], "Answer must be an object");
      assert.isObject(answer[1], "Answer must be an object");

      assert.property(answer[0], "translation", "translation must be a property");
      assert.property(answer[1], "translation", "translation must be a property");

      assert.equal(answer[0].translation, "cookie", "bicky(b) = cookie(a)");   
      assert.equal(answer[1].translation, "fish-and-chip shop", "chippy(b) = fish-and-chip shop(a)");   
    });

    
    test("British only words - Bits and bobs | Bum bag", () => {

      // This test has 2 British words

      const text   = "I've just got bits and bobs in my bum bag.";
      const answer = translator.words(text, locale);

      assert.isObject(answer[0], "Answer must be an object");
      assert.isObject(answer[1], "Answer must be an object");

      assert.property(answer[0], "translation", "translation must be a property");
      assert.property(answer[1], "translation", "translation must be a property");

      assert.equal(answer[0].translation, "odds and ends", "bits and bobs(b) = odds and ends(a)");   
      assert.equal(answer[1].translation, "fanny pack", "bum bag(b) = fanny pack(a)");   
    });

    
    test("British only words - Car boot", () => {
      const text   = "The car boot sale at Boxted Airfield was called off.";
      const [ answer ] = translator.words(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "swap meet", "car boot(b) = swap meet(a)");  
    });

    
    test("British to American titles - Mrs", () => {
      const text = "Have you met Mrs Kalyani?";
      const [ answer ] = translator.titles(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "Mrs.", "Mrs(b) = Mrs.(a)");
    });

    
    test("British to American titles - Prof", () => {
      const text = "Prof Joyner of King's College, London.";
      const [ answer ] = translator.titles(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "Prof.", "Prof(b) = Prof.(a)");
    });

    
    test("British to American time - 4.30", () => {
      const text = "Tea time is usually around 4 or 4.30.";
      const [ answer ] = translator.time(text, locale);

      assert.isObject(answer, "Answer must be an object");
      assert.property(answer, "translation", "translation must be a property");
      assert.equal(answer.translation, "4:30", "4.30(b) = 4:30(a)");
    });

    
    test("British to American - Highlight translation #1", () => {
      const text = "We watched the footie match for a while.";
      const { translation } = translator.translate(text, locale);

      assert.include(translation, `<span class="highlight">soccer</span>`, "translation must have a highlight class");
    });

    
    test("British to American - Highlight translation #2", () => {
      const text = "Paracetamol takes up to an hour to work.";
      const { translation } = translator.translate(text, locale);

      assert.include(translation, `<span class="highlight">Tylenol</span>`, "translation must have a highlight class");
    });
  });
    
    
});