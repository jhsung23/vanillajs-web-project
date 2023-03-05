const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  // 선택된 좌석 목록
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // 로컬 스토리지에 좌석 선택 상태 저장하기
  // Copy selected seats into array
  // Map through array
  // return a new array indexes

  // 모든 좌석 DOM 목록(seats)에서 선택된 좌석에 해당하는 인덱스를 가져옴
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', (event) => {
  ticketPrice = +event.target.value;

  setMovieData(event.target.selectedIndex, event.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (event) => {
  // classList로 해당 DOM이 가진 class 목록을 확인할 수 있음
  if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
    // toggle로 classList에 해당 클래스명이 있다면 제거하고 없다면 추가
    event.target.classList.toggle('selected'); // 좌석 색깔이 파란색으로 변경됨

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
