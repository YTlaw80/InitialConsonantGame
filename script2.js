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
        hint: "먹으면 설레는 셰이크 형태의 아이스크림!"
    },
    {
        quiz: "ㅃ ㅃ ㅋ",
        answer: "빠삐코",
        hint: "초코 맛이 일품인 튜브 안에 담겨있는 아이스크림!"
    }
];
let $hint_btn_icecream = document.querySelector("#hint_btn_icecream");
// $hint_btn_ramen = document.addEventListener("click", hint_show_ramen());
let try_num = 5;
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
let hint_number = 5;
let hint_hide = 1;
let $result_out = document.querySelector(".result");
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
    $hint_btn_icecream.innerText = "힌트 보기(현재 "+ hint_number +"회 남음)";
    hint_hide = 1;
}
$hint_btn_icecream.addEventListener("click", function(){
    if(hint_hide == 1) {
        if(hint_number > 0) { 
            $hint_btn_icecream.innerText = quizData[quizNumber].hint;
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
    if(quizNumber < quizData.length-1) { // 다음 퀴즈가 남았으면
        quizNumber++;
        loadquiz(); // 다음 문제 불러오기
    } else { // 모든 퀴즈가 끝났으면
        location.replace('end_icecream.html');
        $result_out.innerText = "당신의 점수 : "+score+"점";
    }
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}