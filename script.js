

//all add event listener code is from https://stackoverflow.com/questions/68564754/is-there-a-way-to-make-my-next-button-displaying-questions-every-time-a-user-c


let apiURL="https://opentdb.com/api.php?amount=10"




let apiKey="nQ4UTeejFoVXq1qvyjKcFNQ8euGDeDYxjy0fxZNHgekPT5WyzaF60yTy"




 let num=0
let score=0


window.onload = function(){
  document.getElementById("main").style.display="none"
   document.getElementById("score").style.display="none"
      //  document.getElementById("replay").style.display="none"
}


// load the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }, function(error) {
      console.log('Service Worker registration failed:', error);
    });
  });
} 

// handle install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    installButton.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
}); 

function changeDif(value){
    apiURL = apiURL + "&difficulty=" + value
}




function changeType(value){
    apiURL = apiURL + "&type=" + value
}




function changeCat(value){
    apiURL = apiURL + "&category=" + value
}




async function fetchUrl(){
    try{
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data)
    showFunction(data)
      fetchImage(data)
      document.getElementById("selectors").style.display="none"
       document.getElementById("score").style.display="block"
      document.getElementById("score").innerHTML="Score: " + score
} catch (error) {
    console.error('Error fetching activity:', error);
  }
     }




//How to work Pexels API with javascript
// https://medium.com/star-gazers/how-to-work-pexels-api-with-javascript-9cda16bbece9
     function fetchImage(data){
      document.getElementById("main").style.display="block"
      let search=data.results[0].correct_answer
      fetch("https://api.pexels.com/v1/search?query=" + search,{
    headers: {
      Authorization: apiKey
    }
  })
     .then(resp => {
       return resp.json()
     })
     .then(dataImage => {
       console.log(dataImage)
       document.getElementById("quizImage").src=dataImage.photos[0].src.medium
     })
     }




    function fetchNewImage(data){
     
      let query=data.results[num].correct_answer


      fetch("https://api.pexels.com/v1/search?query=" + query,{
    headers: {
      Authorization: apiKey
    }
  })
     .then(resp => {
       return resp.json()
     })
     .then(dataImage => {
       console.log(dataImage)
       document.getElementById("quizImage").src=dataImage.photos[0].src.medium
     })
    }




function showFunction(data){
  var correctAnswer = data.results[num].correct_answer
   document.getElementById("question").innerHTML+=data.results[num].question + "<br>"
        const answers = [...data.results[num].incorrect_answers, data.results[num].correct_answer];
        answers.sort(() => Math.random() - 0.5)
    //https://medium.com/@codepicker57/building-an-interactive-quiz-with-html-css-and-javascript-efe9bd8129e2
        answers.forEach(answers => {
          const button = document.createElement("button")
          button.innerHTML = answers
          document.getElementById("question").appendChild(button)
          button.addEventListener("click",(e) => getAnswer1(e, data, correctAnswer));
          button.style.marginTop="20px"
        });
    console.log(num)
}




function getAnswer1(e, data, correctAnswer){
  if(num<9){
    console.log(data.results.length)
         document.getElementById("question").innerHTML=""
     num++;
    showFunction(data)
    fetchNewImage(data)
  const selectedBtn = e.target
  const answer = correctAnswer
  console.log(answer)




    if(selectedBtn.innerHTML===answer){
    document.getElementById("main").style.backgroundColor="green"
    score++
    document.getElementById("score").innerHTML="Score: " + score
  }else{
    document.getElementById("main").style.backgroundColor="red"
  }  
  //https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
  setTimeout(() => {
    document.getElementById("main").style.backgroundColor="rgb(66, 66, 66)"
  }, "300");
  }else{
    num++
    const selectedBtn = e.target
    const answer = correctAnswer
    console.log(answer)
      if(selectedBtn.innerHTML===answer){
      document.getElementById("main").style.backgroundColor="green"
      score++
      document.getElementById("score").innerHTML="Score: " + score
    }else{
      document.getElementById("main").style.backgroundColor="red"
    }  
    document.getElementById("quizImage").src=""
    document.getElementById("main").innerHTML="<p>Thanks for playing <br> Score: " + score + "<a href='index.html' id='replay'>Replay</a></p>"
    document.getElementById("main").style.backgroundColor="rgb(66, 66, 66)"
    document.getElementById("main").style.height="120px"
    document.getElementById("score").style.display="none"
      // document.getElementById("replay").style.display="block"


  }

}