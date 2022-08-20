const quizData = [
    {
        quiz: "ㅅ ㄹ ㅁ",
        answer: "신라면",
        hint: "매울 신! (辛)"
    },
    {
        quiz: "ㅈ ㄹ ㅁ",
        answer: "진라면",
        hint: "두 가지 맛을 맘대로 골라먹는 맛있는 라면!"
    },
    {
        quiz: "ㅉ ㅍ ㄱ ㅌ",
        answer: "짜파게티",
        hint: "우리나라의 대중적인 짜장라면!"
    },
    {
        quiz: "ㄴ ㄱ ㄹ",
        answer: "너구리",
        hint: "동물 이름!"
    },
    {
        quiz: "ㅇ ㄱ ㅈ ㅅ ㅂ ㅁ",
        answer: "육개장사발면",
        hint: "라면 중 제일 대표적인 육개장 라면!"
    },
    {
        quiz: "ㅇ ㅅ ㅌ ㅁ",
        answer: "안성탕면",
        hint: "왠지 안성의 맛이 나는 것 같은 라면!"
    },
    {
        quiz: "ㅍ ㄷ ㅂ ㅂ ㅁ",
        answer: "팔도비빔면",
        hint: "팔도에서 만든 비벼 먹는 라면!"
    },
    {
        quiz: "ㅅ ㅇ ㄹ ㅁ",
        answer: "삼양라면",
        hint: "세 마리의 양이라는 뜻을 가진 삼양회사 대표 라면!"
    },
    {
        quiz: "ㅂ ㄷ ㅂ ㅇ ㅁ",
        answer: "불닭볶음면",
        hint: "불처럼 매운 볶아 먹는(?) 라면!"
    },
    {
        quiz: "ㅈ ㅉ ㅃ",
        answer: "진짬뽕",
        hint: "진한 맛이 느껴지는 짬뽕!"
    },
    {
        quiz: "ㅅ ㄴ ㅁ",
        answer: "스낵면",
        hint: "간식으로 가볍게 먹는 라면!"
    }
];
quizData.sort( () => Math.random() - 0.5);
let $hint_btn_ramen = document.querySelector("#hint_btn_ramen");
// $hint_btn_ramen = document.addEventListener("click", hint_show_ramen());
let try_num = 5;
let $quizSentence = document.querySelector(".quiz-sentence");
let quizNumber = 0; // 문제 번호
const $userInput = document.querySelector(".inputFromKey");
const $ok_btn = document.querySelector("#ok-btn");
$ok_btn?.addEventListener('click', check_answer);
let score = 0; // 점수
let currentquizData; // 현재 문제 정보
let $scoreValue = document.querySelector("#scoreValue");
let $quizNumber = document.querySelector("#quiz-number");
let $hint = document.querySelector(".hint");
let hint_number = 5;
let hint_hide = 1;
let $result_out = document.querySelector(".result");
loadquiz();

if($userInput?.keyCode == 13) {
    check_answer();
}

// read parameters 
var Request = function() {  
    this.getParameter = function(name) {  
        var rtnval = '';  
        var nowAddress = unescape(location.href);  
        var parameters = (nowAddress.slice(nowAddress.indexOf('?') + 1,  
                nowAddress.length)).split('&');  
        for (var i = 0; i < parameters.length; i++) {  
            var varName = parameters[i].split('=')[0];  
            if (varName.toUpperCase() == name.toUpperCase()) {  
                rtnval = parameters[i].split('=')[1];  
                break;  
            }  
        }  
        return rtnval;  
    }  
}  
var request = new Request();  
// for end_icecream.html
var scoreParam = request.getParameter("score");
if( scoreParam != ''){
    score = parseInt(scoreParam); 
    $result_out.innerText = "당신의 점수 : "+score+"점";
}
function loadquiz() {
    if($userInput == null)
        return;
    $userInput.value = ""; // input창 비우기
    $userInput.focus();
    currentquizData = quizData[quizNumber];
    //console.log(currentquizData, currentquizData.quiz, quizNumber);
    $quizSentence.innerText = currentquizData.quiz;
    $quizNumber.innerText = quizNumber + 1;
    $hint_btn_ramen.innerText = "힌트 보기(현재 "+ hint_number +"회 남음)";
    hint_hide = 1;
}
$hint_btn_ramen?.addEventListener("click", function(){
    if(hint_hide == 1) {
        if(hint_number > 0) { 
            $hint_btn_ramen.innerText = quizData[quizNumber].hint;
            hint_number--;
            hint_hide = 0;
        } else {
            alert("힌트를 모두 사용하셨습니다.");
        }
    } else alert("이미 힌트를 사용하셨습니다.");
});

async function check_answer() {
    //console.log($userInput.value);
    let isCorrect = "";
    if($userInput.value.trim() == '') {
        alert("답을 입력해주세요.");
        return;
    }
    if($userInput.value == "GO") {
        quizNumber = 8;
        loadquiz();
    }
    if($userInput.value === currentquizData.answer) { // 정답이라면
        score++; // 1점 증가
        isCorrect = "맞았습니다";
        alert("⭕ 맞았습니다! ⭕");
    } else { // 틀리면
        isCorrect = "틀렸습니다";
        alert("❌ 틀렸습니다! ❌");
        try_num--;
    }
    $quizSentence.innerText = isCorrect; 
    await delay(1); // 1초 기다리기
    $scoreValue.innerText = score; // 점수 출력
    if(quizNumber < 9) { // 다음 퀴즈가 남았으면
        quizNumber++;
        loadquiz(); // 다음 문제 불러오기
    } else { // 모든 퀴즈가 끝났으면
        location.replace('end_ramen.html?score='+score);
        $result_out.innerText = "당신의 점수 : "+ score +"점";
    }
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}