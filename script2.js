const quizData = [
    {
        quiz: "ㅌㄱㄷ",
        answer: "투게더",
        hint: "다 같이 먹어야 더 맛있는 바닐라 아이스크림!"
    },
    {
        quiz: "ㅂ ㅇ ㅆ ㅁ ㅋ",
        answer: "붕어싸만코",
        hint: "붕어빵의 아이스크림 버전!"
    },
    {
        quiz: "ㅎ ㄱ ㄷ ㅈ",
        answer: "하겐다즈",
        hint: "여러 맛이 있는 미국 브랜드의 고오오급 아이스크림!"
    },
    {
        quiz: "ㅇ ㄷ ㅋ",
        answer: "월드콘",
        hint: "월드컵 때 특히 인기 많았던 아이스크림 콘!"
    },
    {
        quiz: "ㅁ ㄹ ㄴ",
        answer: "메로나",
        hint: "메론 맛이 나는 연두색 막대 아이스크림!"
    },
    {
        quiz: "ㅃ ㅃ ㄹ",
        answer: "빵빠레",
        hint: "두 가지 맛(초코, 바닐라)이 있는 아이스크림!"
    },
    {
        quiz: "ㄷ ㅂ ㅂ ㅇ ㅋ",
        answer: "더블비얀코",
        hint: "딸기 맛이 더블로 느껴지는 맛의 아이스크림!"
    },
    {
        quiz: "ㅃ ㄸ ㅇ",
        answer: "빵또아",
        hint: "빵 또 아이스크림이란 뜻으로 빵 속에 아이스크림이 들어있는 샌드위치 같은 아이스크림!"
    },
    {
        quiz: "ㅅ ㄹ ㅇ",
        answer: "설레임",
        hint: "셰이크 형태의 아이스크림!"
    },
    {
        quiz: "ㅃ ㅃ ㅋ",
        answer: "빠삐코",
        hint: "초코 맛이 일품인 튜브 안에 담겨있는 아이스크림!"
    }
];

let try_num = 0;
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
}

async function check_answer() {
    //console.log($userInput.value);
    let isCorrect = "";
    if($userInput.value === currentquizData.answer) { // 정답이라면
        score++; // 1점 증가
        isCorrect = "맞았습니다";
        alert("⭕ 맞았습니다! ⭕");
        try_num = 0;
    } else { // 틀리면
        isCorrect = "틀렸습니다";
        alert("❌ 틀렸습니다! ❌");
        hint_hide = false;
        try_num++;
        if(hint_hide == false) $hint.innerText == "힌트 : " + currentquizData.hint;
        if(try_num == 2) {
            if(quizNumber < quizData.length) { // 다음 퀴즈가 남았으면
                quizNumber++;
                loadquiz(); // 다음 문제 불러오기
            }
        } else {
            loadquiz();
        }
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