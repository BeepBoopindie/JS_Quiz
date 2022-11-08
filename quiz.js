//Created by Ross Steventon 2022 (imachi.co.uk)
var question_num = -1;
var Question_JSON;
var score = 0;
var QuestionCount = 0;
window.onload = function() {
    splash();
}
function splash(){
    console.log("Recieved load");
    LoadQuestions();
}

async function LoadQuestions(){
    const res = await fetch('./Quizzes/SpaceQuiz.json')
    Question_JSON = await res.json();

    QuestionCount = Question_JSON.Questions.length;
    NextQuestion();
}

function NextQuestion(){
    question_num++;
    var Questiondata = Question_JSON.Questions[question_num];
    if(!Questiondata){
        //Load end screen
        console.log("End of Quiz, You scored : " + score + "/" + QuestionCount);
        return;
    }
    document.getElementById("q_title").innerHTML  = (question_num +1) +". " + Questiondata.title;

    //set button text
    document.getElementById("ans_1").innerHTML  =  Questiondata.Answers[0];
    document.getElementById("ans_2").innerHTML  =  Questiondata.Answers[1];
    document.getElementById("ans_3").innerHTML  =  Questiondata.Answers[2];
    document.getElementById("ans_4").innerHTML  = Questiondata.Answers[3];
}

function EndScreen(){

}

function SubmitAnswer(id){
    var CorrectAnswer = Question_JSON.Questions[question_num].Answer;
    if(id ==CorrectAnswer){
        console.log("Correct!!!");
        score++;
    }else{
        console.log("Incorrect!");
    }

    NextQuestion();

}