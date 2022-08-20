const quizData = [
    {
        quiz: "ㅎ ㄹ ㅂ",
        answer: "홈런볼",
        hint: "야구에서 홈런치고 먹는 과자!"
    },
    {
        quiz: "ㅇ ㅇ ㅅ",
        answer: "에이스",
        hint: "바삭바삭 소리가 크래커의 에이스답게 크게 나는 과자!"
    },
    {
        quiz: "ㅋ ㅅ ㅌ ㄷ",
        answer: "카스타드",
        hint: "촉촉하면서도 퍽퍽한 빵 안에 부드럽고 달콤한 커스터드 크림이 들어간 간식!"
    },
    {
        quiz: "ㅇ ㄹ ㅇ",
        answer: "오레오",
        hint: "우유와 함께 먹으면 천국을 느낄 수 있는 쿠키 앤 크림 과자!"
    },
    {
        quiz: "ㅊ ㅊ",
        answer: "칙촉",
        hint: "촉촉한 쿠키에 초코칩이 박혀 있는 과자!"
    },
    {
        quiz: "ㅋ ㅊ",
        answer: "칸쵸",
        hint: "바삭바삭 과자 안에 달콤한 초코 크림이 들어간 과자!"
    },
    {
        quiz: "ㄲ ㄲ ㅋ",
        answer: "꼬깔콘",
        hint: "꼬깔 모양의 과자로 손가락에 끼워 먹는게 국룰인 과자!"
    },
    {
        quiz: "ㅅ ㅇ ㄲ",
        answer: "새우깡",
        hint: "농심 깡 시리즈에 대표 주자로 새우 모양, 새우 맛이 나는 과자!"
    },
    {
        quiz: "ㅇ ㅈ ㅇ ㄸ ㅋ",
        answer: "오징어땅콩",
        hint: "오징어랑 땅콩이 과자 속에서 만난 과자!"
    },
    {
        quiz: "ㅎ ㄴ ㅂ ㅌ ㅊ",
        answer: "허니버터칩",
        hint: "꿀과 버터에 달콤한 조합!"
    },
    {
        quiz: "ㅁ ㄷ ㅅ",
        answer: "맛동산",
        hint: "놀이동산에 가면 생각나는 맛있는 과자!"
    },
    {
        quiz: "ㅇ ㅍ ㄹ",
        answer: "양파링",
        hint: "양파가 동글동글 썰려 반지 모양이 되버린 과자!"
    }
];
quizData.sort( () => Math.random() - 0.5);
let $hint_btn_snack = document.querySelector("#hint_btn_snack");
// $hint_btn_snack = document.addEventListener("click", hint_show_snack());
let try_num = 5;
let $quizSentence = document.querySelector(".quiz-sentence");
let quizNumber = 0; // 문제 번호
const $userInput = document.querySelector(".inputFromKey");
const $ok_btn = document.querySelector("#ok-btn");
// end_snack.html at null
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
// end_snack.html at null 
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
// for end_snack.html
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
    //console.log(currentquizData, currentquizData.quiz);
    $quizSentence.innerText = currentquizData.quiz;
    $quizNumber.innerText = quizNumber + 1;
    $hint_btn_snack.innerText = "힌트 보기(현재 "+ hint_number +"회 남음)";
    hint_hide = 1;
}
// end_snack is null
$hint_btn_snack?.addEventListener("click", function(){
    if(hint_hide == 1) {
        if(hint_number > 0) { 
            $hint_btn_snack.innerText = quizData[quizNumber].hint;
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
        // send to score parameter
        location.replace('end_snack.html?score='+score);
        $result_out.innerText = "당신의 점수 : "+score+"점";
    }
}

function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}