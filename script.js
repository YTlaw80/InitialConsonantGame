const quizData = [
    {
        quiz: "ㅅ ㄹ ㅁ",
        answer: "신라면",
        hint: "매울 신! (辛)"
    },
    {
        quiz: "ㅈ ㄹ ㅁ",
        answer: "진라면",
        hint: "진하면서도 서로 다른 두 개의 종류!"
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
        hint: "육개장 국물 베이스에 사발면을 넣어 만든 국내 판매 5위 라면!"
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
    }
];

let $quizSentence = document.querySelector(".quiz-sentence");
let quizNumber = 0; // 문제 번호
const $userInput = document.querySelector(".inputFromKey");
const $ok_btn = document.querySelector("#ok-btn");
$ok_btn.addEventListener('click', check_answer);
let score = 0; // 점수
let currentquizData; // 현재 문제 정보
let $scoreValue = document.querySelector("#scoreValue");
let $quizNumber = document.querySelector("#quiz-number");
let $hint = document.querySelector(".hint");
let hint_hide = true;
loadquiz();

if($userInput.keyCode == 13) {
    check_answer();
}

function loadquiz() {
    $userInput.value = ""; // input창 비우기
    $userInput.focus();
    currentquizData = quizData[quizNumber];
    //console.log(currentquizData, currentquizData.quiz);
    $quizSentence.innerText = currentquizData.quiz;
    $quizNumber.innerText = quizNumber + 1;
    if(hint_hide == false) {
        $hint.innerText == "힌트 : " + currentquizData.hint;
    }
}

async function check_answer() {
    //console.log($userInput.value);
    let isCorrect = "";
    if($userInput.value === currentquizData.answer) { // 정답이라면
        score++; // 1점 증가
        isCorrect = "맞았습니다";
        alert("⭕ 맞았습니다! ⭕");
    } else { // 틀리면
        isCorrect = "틀렸습니다";
        alert("❌ 틀렸습니다! ❌");
        hint_hide = false;
        loadquiz();
        return;
    }
    $quizSentence.innerText = isCorrect; 
    await delay(1); // 1초 기다리기
    $scoreValue.innerText = score; // 점수 출력
    if(quizNumber < quizData.length) { // 다음 퀴즈가 남았으면
        quizNumber++;
        loadquiz(); // 다음 문제 불러오기
    } else { // 모든 퀴즈가 끝났으면
        $quizSentence.innerText = `결과:${score}점/총${quizData.length}문제`;
        let reStartBtn = document.createElement("button");
        reStartBtn.innerText = "다시풀기";
        reStartBtn.className = "reStartBtn";
        reStartBtn.onclick = function() {
            window.location.reload(); // 브라우저 새로고침
        }
        let $quiz = document.querySelector('.quiz');
        $quiz.appendChild(reStartBtn);
    }
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}