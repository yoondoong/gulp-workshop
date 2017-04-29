(function() {
  var count, getRandomWord, getWordnik, words;

  $(document).ready(function() {
    return getWordnik();
  });

  words = null;

  count = 39;

  getRandomWord = function() {
    $('.random-word').text(words[count].word);
    return count -= 1;
  };

  getWordnik = function() {
    $('input').css('visibility', 'hidden');
    return $.getJSON('http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=4&maxCorpusCount=-1&minDictionaryCount=10&maxDictionaryCount=-1&minLength=4&maxLength=10&limit=40&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5', function(data) {
      count = 39;
      console.log(data);
      words = data;
      words.sort(function() {
        return 0.5 - Math.random();
      });
      $('input').css('visibility', 'visible');
      return getRandomWord();
    });
  };

  $('input').on('click', function() {
    if (count > 0) {
      return getRandomWord();
    } else {
      return getWordnik();
    }
  });

}).call(this);
