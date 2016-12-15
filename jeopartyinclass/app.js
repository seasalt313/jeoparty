//-- make variable to share across global scopes:
let current = {
    answer: null,
    points: 0
}; // the current question

let score = 0; //global variable that goes up when question is right


// Your challenge:
//
// Retrieve a question when the page loads and display it on the screen. Each question should display the category, point value, and the question text. You should also have a text box that people can type their answer into, and a button they can click to submit their answer.
//
// Keep track of the user's score. When the user clicks the 'guess' button, you should check to see if they got the answer right. If they did, increase their score by the value of the question (provided in the AJAX response). If they didn't, no points are awarded or lost.
//
// After users guess, load a new question.

function go(){
  let button = document.querySelector("button");
  button.addEventListener("click", init)
}


function init() {

  //SET UP THE XML, AND MAKE REQUEST
  let request = new XMLHttpRequest();
    request.open('GET', 'http://jservice.io/api/random')

    //LOAD RESULTS
      request.addEventListener('load', function(){
        console.log(request.responseText);

      //PARSE JSON
      let response = JSON.parse(request.responseText);
      console.log(response);

      //LOG CATEGORY, POINT VALUE, AND QUESTIONTEXT
      console.log("Category title: " + response[0].category.title);

      console.log("Question: " + response[0].question);
      console.log("Value: " + response[0].value);
      console.log("Answer: " + response[0].answer);

      show(response[0]);

      //save important information about this question
      current.answer = response[0].answer;
      current.points = response[0].value;

    })


request.send();
console.log("Sent");
}


function show(stuff){
  let category = document.querySelector("h3");
  let question = document.querySelector("h2");
  let points = document.querySelector("h4");
  let ans = document.querySelector("h6");

  category.textContent = "The category is: " + stuff.category.title;
  question.textContent = "The question is : " + stuff.question;
  points.textContent = "The value of this answer is: " + stuff.value;
  ans.textContent = "The answer is: " + stuff.answer;
}


function checkAnswer(){
  // -check if the text they typed in (Guess) is the same as the answer to the question.
  let guess = document.querySelector('#guess').value;
  console.log(guess);
  let answer = 'something';

  if (guess === current.answer){
    //give points
    score = score + current.points;
  }
  go();
}







window.addEventListener('load', go);
