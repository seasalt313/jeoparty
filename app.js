// Your challenge:
//
// Retrieve a question when the page loads and display it on the screen. Each question should display the category, point value, and the question text. You should also have a text box that people can type their answer into, and a button they can click to submit their answer.
//
// Keep track of the user's score. When the user clicks the 'guess' button, you should check to see if they got the answer right. If they did, increase their score by the value of the question (provided in the AJAX response). If they didn't, no points are awarded or lost.
//
// After users guess, load a new question.

let data = null; //this is the answer, its set to null at the beg.

function go(){
  let button = document.querySelector("#sub");
  button.addEventListener("click", init)

  let showing = document.querySelector("#answer");
  showing.addEventListener("click", show_Answer);
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

      data = response[0].answer;

      show(response[0]);
      // show_Answer(response[0]);

    })


request.send();
console.log("Sent");
}


function show(stuff){
  let category = document.querySelector("h3");
  let question = document.querySelector("h2");
  let points = document.querySelector("h4");

  category.textContent = "The category is: " + stuff.category.title;

  question.textContent = "The question is : " + stuff.question;

  points.textContent = "The value of this answer is: " + stuff.value;

}

function show_Answer(){
  let ans = document.querySelector("h6");
  ans.textContent = "The answer is: " + data;
}

window.addEventListener('load', go);
