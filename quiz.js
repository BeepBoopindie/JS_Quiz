//Created by Ross Steventon 2022 (imachi.co.uk)
//Sleeps are inserted to allow css animation to play.

var question_num = -1;
var Question_JSON;
var score = 0;
var QuestionCount = 0;
var CurrentQuiz;

async function LoadQuestions(Quizname){
    CurrentQuiz =Quizname;
    document.getElementById("splash").classList.remove("reverse");
    document.getElementById("splash").classList.remove("bounce");
    await sleep(10);
    document.getElementById("splash").classList.add("bounce");
    await sleep(900);
    const res = await fetch('./Quizzes/'+Quizname+'.json');
    Question_JSON = await res.json();

    QuestionCount = Question_JSON.Questions.length;
    document.getElementById("splash").style.display = "none";
    document.getElementById("endscreen").style.display = "none";
    console.log()
    NextQuestion(true);
}

function NextQuestion(initial){
    question_num++;
    var Questiondata = Question_JSON.Questions[question_num];
    if(!Questiondata){
        //Load end screen
        EndScreen();
        return;
    }
    document.getElementById("q_title").innerHTML  = (question_num +1) +". " + Questiondata.title;
    //set Question button text
    document.getElementById("ans_1").innerHTML  =  Questiondata.Answers[0];
    document.getElementById("ans_2").innerHTML  =  Questiondata.Answers[1];
    document.getElementById("ans_3").innerHTML  =  Questiondata.Answers[2];
    document.getElementById("ans_4").innerHTML  = Questiondata.Answers[3];
    if(initial){//Play reverse bounce animation to show questions
        document.getElementById("splash").classList.remove("bounce");
        document.getElementById("questionContainer").style.display = "flex";
        document.getElementById("questionContainer").classList.add("reverse");
        document.getElementById("questionContainer").classList.add("bounce");
    }
}

async function Reset(retry){
    //Reset score info.
    question_num = -1;
    score  = 0;
    QuestionCount = 0;
    if(retry){//User wants to try again
        document.getElementById("endscreen").classList.add("bounce");
        LoadQuestions(CurrentQuiz);
    }else{//Exit out of quiz and play animations
        CurrentQuiz = "";
        document.getElementById("endscreen").classList.add("bounce");
        await sleep(900);
        document.getElementById("endscreen").classList.remove("bounce");
        document.getElementById("splash").classList.add("bounce");
        document.getElementById("splash").classList.add("reverse");
        document.getElementById("splash").style.display = "flex";
        document.getElementById("endscreen").style.display = "none";
    }
}

function EndScreen(){
    document.getElementById("endscreen").classList.remove("bounce");
    var scoreMessage;
    var Result = score / QuestionCount ;
    document.getElementById("questionContainer").style.display = "none";
    document.getElementById("endscreen").style.display = "flex";
    document.getElementById("score").innerHTML = "You scored : " + + score + "/" + QuestionCount;

    if(Result <= 1 && Result >= 0.75){
        scoreMessage= "You have great knowledge!"
    }else if(Result < 0.75 && Result >= 0.5){
        scoreMessage= "A great attempt!"
    }else if(Result < 0.5 && Result >= 0.25){
        scoreMessage= "Getting there!"
    }else{
        scoreMessage= "Come back when you know more!"
    }

    document.getElementById("scoremessage").innerHTML  =  scoreMessage;//Set score message
}

async function SubmitAnswer(id){
    var CorrectAnswer = Question_JSON.Questions[question_num].Answer;
    if(id == CorrectAnswer){
        score++;
    }
    NextQuestion(false);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}