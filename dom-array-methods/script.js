const addUserButton = document.getElementById('add-user');
const doubleWealthButton = document.getElementById('double');
const showMillsButton = document.getElementById('show-millionaries');
const calcWealthButton = document.getElementById('calculate-wealth');

const main = document.getElementById('main');

let users = [];

async function getRandomUser() {
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();
  const { first, last } = data.results[0].name;

  const userName = `${first} ${last}`;
  const userWealth = Math.floor(Math.random() * 1000000);

  const u = { userName, userWealth };
  addUser(u);
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

function updateDOM() {
  main.innerHTML = '<h2><strong>이름</strong> 재산</h2>';

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
