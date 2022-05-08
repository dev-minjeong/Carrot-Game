/**
 * 1. 게임 스타트 버튼 클릭
 * 2. 랜덤으로 당근과 벌레가 땅위에 배치됨 ⭕
 * 3. 당근 총 개수가 나와있는 박스 있음 ⭕
 * 4. 타이머 진행 ⭕
 * 5. 당근 클릭 시 카운트가 줄어듬 ⭕
 * 6. 당근 클릭 시 클릭한 당근 사라짐 ⭕
 * 게임 정지 버튼 클릭 시
 *  1) 재시작 합업창이 뜸 ⭕
 *  2) 재시작 버튼 클릭시 다시 게임 시작 ⭕
 *  3) 카운트 정지 ⭕
 * 제한시간 내에 당근을 모두 클릭 시
 *  1) 이겼다는 팝업창이 뜸 ⭕
 *  2) 팝업창에 게임을 다시 할 수 있는 버튼 있음 ⭕
 *  3) 재시작 버튼 클릭 시 게임 재시작 ⭕
 * 제한시간 내에 성공 못할 시, 벌레 클릭 시
 *  1) 졌다는 팝업창이 뜸 ⭕
 *  2) 재시작 버튼 클릭 시 게임 재시작 ⭕
 *  여러번 반복 시 게인이 중첨되어 나타남
 */
const test = document.querySelector('.timer');

const startBtn = document.querySelector('#start-btn');
const timer = document.querySelector('#gameTimer');
const counter = document.querySelector('#countCarrot');
const retryBtn = document.querySelector('.retry-btn');
const field = document.querySelector('#field');
const carrots = document.querySelectorAll('.carrot');
const bugs = document.querySelectorAll('.bug');
const popup = document.querySelector('#popup');
const noticePopup = document.querySelector('#popup .notice');
const resultPopup = document.querySelector('#popup .result');

let initTime = 10;
let mytimer;

function gameStart() {
  console.log('game start!');
  // 당근, 벌레 필드에 배치
  const fieldHeight = field.getBoundingClientRect().height - 80;
  const fieldWidth = window.innerWidth - 80;
  for (let i = 0; i < carrots.length; i++) {
    const top = Math.random() * fieldHeight;
    const left = Math.random() * fieldWidth;
    carrots[i].style.top = `${fieldHeight + top}px`;
    carrots[i].style.left = `${left}px`;
  }
  for (let i = 0; i < bugs.length; i++) {
    const top = Math.random() * fieldHeight;
    const left = Math.random() * fieldWidth;
    bugs[i].style.top = `${fieldHeight + top}px`;
    bugs[i].style.left = `${left}px`;
  }
  field.classList.remove('hidden');
  // 타이머
  mytimer = setInterval(onTimer, 1000);
  // 당근 클릭
  let count = 10;
  for (const carrot of carrots) {
    carrot.addEventListener('click', (event) => {
      event.target.classList.add('hidden');
      count--;
      console.log(count);
      if (count > 0) {
        counter.innerHTML = count;
      } else if (count === 0) {
        clearInterval(mytimer);
        const result = `남은 시간 : ${initTime}초`;
        gameStop('성공!', result);
        return;
      }
    });
  }
  // 벌레 클릭
  for (const bug of bugs) {
    bug.addEventListener('click', (event) => {
      clearInterval(mytimer);
      gameFail();
      return;
    });
  }
}

function gameStop(text, result) {
  popup.classList.remove('hidden');
  noticePopup.innerHTML = text;
  resultPopup.innerHTML = result;
}
function gameFail() {
  const text = '실패!';
  const result = '';
  gameStop(text, result);
  clearInterval(mytimer);
}

function onTimer() {
  if (initTime === 0) {
    clearInterval(mytimer);
    gameFail();
  } else if (startBtn.innerHTML === '▶') {
    clearInterval(mytimer);
    gameStop('게임을 다시 시작하시겠습니까?', '');
  } else {
    initTime--;
    timer.innerHTML = initTime;
  }
}
function init() {
  for (const carrot of carrots) {
    carrot.className = 'carrot';
  }
  for (const bug of bugs) {
    bug.classList.remove('hidden');
  }
  initTime = 10;
  timer.innerHTML = 10;
  counter.innerHTML = 10;
  gameStart();
}

startBtn.addEventListener('click', () => {
  if (startBtn.innerHTML === '▶') {
    startBtn.innerHTML = '■';
    init();
  } else {
    popup.classList.remove('hidden');
    startBtn.innerHTML = '▶';
  }
});
retryBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
  startBtn.innerHTML = '■';
  init();
});
