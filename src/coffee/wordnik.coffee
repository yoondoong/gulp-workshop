$(document).ready ->
  do getWordnik

words = null
count = 39

getRandomWord = ->
  $('.random-word').text words[count].word
  count -= 1

getWordnik = ->
  $('input').css 'visibility', 'hidden'
  $.getJSON 'http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=4&maxCorpusCount=-1&minDictionaryCount=10&maxDictionaryCount=-1&minLength=4&maxLength=10&limit=40&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5', (data) ->
    count = 39
    console.log data
    words = data
    words.sort ->
      0.5 - Math.random()
    $('input').css 'visibility', 'visible'  
    do getRandomWord


$('input').on 'click', ->
  if count > 0
    do getRandomWord
  else
    do getWordnik
