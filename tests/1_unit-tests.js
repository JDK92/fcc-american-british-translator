const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

const americanToBritish = "american-to-british";
const britishToAmerican = "british-to-american";

suite('Unit Tests', () => {
  
  suite("American to British - Tests", () => {

    test("American to British spelling - Favorite", () => {
      const text = "Mangoes are my favorite fruit.";
      const { translation } = translator.translate(text, americanToBritish);
      assert.include(translation, "favourite", "favorite => favourite");
    });
  
    test("American to British spelling - Yogurt", () => {
      const text = "I ate yogurt for breakfast.";
      const { translation } = translator.translate(text, americanToBritish);
      assert.include(translation, "yoghurt", "yogurt => favourite");
    });
  
    test("American only words - Condo", () => {
      const text = "We had a party at my friend's condo.";
      const { translation } = translator.translate(text, americanToBritish);
      assert.include(translation, "flat", "condo(a) = flat(b");
    });
  
    test("American only words - Trashcan", () => {
      const text = "Can you toss this in the trashcan for me?";
      const { translation } = translator.translate(text, americanToBritish);
      assert.include(translation, "bin", "trashcan(a) = bin(b)");
    });
  
    test("American only words - Parking lot", () => {
      const text = "The parking lot was full.";
      const { translation } = translator.translate(text, americanToBritish);
      assert.include(translation, "car park", "parking lot(a) = car park(b)");
    });
  
    test("American only words - Rube Goldberg machine", () => {
      const text = "Like a high tech Rube Goldberg machine.";
      const { translation } = translator.translate(text, americanToBritish);
      assert.include(translation, "Heath Robinson device", "Rube Goldberg machine(a) = Heath Robinson device(b)");
    });
  
    test("American only words - Play hooky", () => {
      const text = "To play hooky means to skip class or work.";
      const { translation } = translator.translate(text, americanToBritish);
      assert.include(translation, "bunk off", "play hooky(a) = bunk off(b)");
    });
  
    test("American to British titles - Mr.", () => {
      const text = "No Mr. Bond, I expect you to die.";
      const { translation } = translator.translate(text, americanToBritish);
      assert.include(translation, "Mr", "Mr.(a) = Mr(b)");
    });
  
    test("American to British titles - Dr.", () => {
      const text = "Dr. Grosh will see you now.";
      const { translation } = translator.translate(text, americanToBritish);
      assert.include(translation, "Dr", "Dr.(a) = Dr(b)");
    });
  
    test("American to British time - 12:15", () => {
      const text = "Lunch is at 12:15 today.";
      const { translation } = translator.translate(text, americanToBritish);
      assert.include(translation, "12.15", "12:15(a) = 12.15(b)");
    });
  
    test("American to British - Highlight translation #1", () => {
      const text = "Mangoes are my favorite fruit.";
      const { translation } = translator.translate(text, americanToBritish);
      assert.include(translation, 'class="highlight"', "The translation has the 'highlight' class");
    });
  
    test("American to British - Highlight translation #2", () => {
      const text = "I ate yogurt for breakfast.";
      const { translation } = translator.translate(text, americanToBritish);
      assert.include(translation, 'class="highlight"', "The translation has the 'highlight' class");
    });
  });

  suite("British to American - Tests", () => {
    
    test("British only words - Footie", () => {
      const text = "We watched the footie match for a while.";
      const { translation } = translator.translate(text, britishToAmerican);
      assert.include(translation, "soccer", "footie(b) = soccer(a)");
    });

    
    test("British only words - Paracetamol", () => {
      const text = "Paracetamol takes up to an hour to work.";
      const { translation } = translator.translate(text, britishToAmerican);
      assert.include(translation, "Tylenol", "Paracetamol(b) = Tylenol(a)");
    });

    
    test("British to American spelling - Caramelise", () => {
      const text = "First, caramelise the onions.";
      const { translation } = translator.translate(text, britishToAmerican);
      assert.include(translation, "caramelize", "caramelise(b) = caramelize(a)");
    });

    
    test("British only words - Bank holiday | Funfair", () => {
      const text = "I spent the bank holiday at the funfair.";
      const { translation } = translator.translate(text, britishToAmerican);
      assert.include(translation, "public holiday", "bank holiday(b) = public holiday(a)");
      assert.include(translation, "carnival", "funfair(b) = carnival(a)");
    });

    
    test("British only words - Bicky | Chippy", () => {
      const text = "I had a bicky then went to the chippy.";
      const { translation } = translator.translate(text, britishToAmerican);
      assert.include(translation, "cookie", "bicky(b) = cookie(a)");
      assert.include(translation, "fish-and-chip shop", "chippy(b) = fish-and-chip shop(a)");
    });

    
    test("British only words - Bits and bobs | Bum bag", () => {
      const text = "I've just got bits and bobs in my bum bag.";
      const { translation } = translator.translate(text, britishToAmerican);
      assert.include(translation, "odds and ends", "bits and bobs(b) = odds and ends(a)");
      assert.include(translation, "fanny pack", "bum bag(b) = fanny pack(a)");
    });

    
    test("British only words - Car boot", () => {
      const text = "The car boot sale at Boxted Airfield was called off.";
      const { translation } = translator.translate(text, britishToAmerican);
      assert.include(translation, "swap meet", "car boot(b) = swap meet(a)");
    });

    
    test("British to American titles - Mrs", () => {
      const text = "Have you met Mrs Kalyani?";
      const { translation } = translator.translate(text, britishToAmerican);
      assert.include(translation, "Mrs.", "Mrs(b) = Mrs.(a)");
    });

    
    test("British to American titles - Prof", () => {
      const text = "Prof Joyner of King's College, London.";
      const { translation } = translator.translate(text, britishToAmerican);
      assert.include(translation, "Prof.", "Prof(b) = Prof.(a)");
    });

    
    test("British to American time - 4.30", () => {
      const text = "Tea time is usually around 4 or 4.30.";
      const { translation } = translator.translate(text, britishToAmerican);
      assert.include(translation, "4:30", "4.30(b) = 4:30(a)");
    });

    
    test("British to American - Highlight translation #1", () => {
      const text = "We watched the footie match for a while.";
      const { translation } = translator.translate(text, britishToAmerican);
      assert.include(translation, 'class="highlight"', "The translation has a 'highlight' class");
    });

    
    test("British to American - Highlight translation #2", () => {
      const text = "Paracetamol takes up to an hour to work.";
      const { translation } = translator.translate(text, britishToAmerican);
      assert.include(translation, 'class="highlight"', "The translation has a 'highlight' class");
    });

  });

});