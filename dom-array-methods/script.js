const addUserButton = document.getElementById('add-user');
const doubleWealthButton = document.getElementById('double');
const showMillsButton = document.getElementById('show-millionaires');
const sortButton = document.getElementById('sort');
const calcWealthButton = document.getElementById('calculate-wealth');

const main = document.getElementById('main');

let users = [];

async function getRandomUser() {
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();
  const { first, last } = data.results[0].name;

  const userName = `${first} ${last}`;
  const userWealth = Math.floor(Math.random() * 1000000);

  addUser({ userName, userWealth });
}

function addUser(user) {
  users.push(user);

  updateDOM();
}

function setMoneyDouble() {
  users = users.map((user) => {
    return { ...user, userWealth: user.userWealth * 2 };
  });

  updateDOM();
}

function showMillionaires() {
  users = users.filter((user) => user.userWealth > 1000000);

  updateDOM();
}

function sortByWealth() {
  users.sort((a, b) => b.userWealth - a.userWealth);

  updateDOM();
}

function calcWealthAndShow() {
  const sum = users.reduce((total, user) => total + user.userWealth, 0);

  const div = document.createElement('div');
  div.innerHTML = `<h3>Total Wealth: <strong>${formatWealth(sum)}</strong></h3>`;
  main.append(div);
}

function updateDOM() {
  main.innerHTML = '<h2><strong>User</strong> Wealth</h2>';

  main.append(
    ...users.map((user) => {
      const div = document.createElement('div');
      div.className = 'person';
      div.innerHTML = `<strong>${user.userName}</strong> ${formatWealth(user.userWealth)}`;

      return div;
    })
  );
}

function formatWealth(wealth) {
  return '$' + wealth.toLocaleString('en-US', { minimumFractionDigits: 2 });
}

addUserButton.addEventListener('click', getRandomUser);
doubleWealthButton.addEventListener('click', setMoneyDouble);
showMillsButton.addEventListener('click', showMillionaires);
sortButton.addEventListener('click', sortByWealth);
calcWealthButton.addEventListener('click', calcWealthAndShow);
