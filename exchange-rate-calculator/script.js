const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');

const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

function calculate() {
  const from = currencyOne.value;
  const to = currencyTwo.value;

  fetch(`https://v6.exchangerate-api.com/v6/69213a363b9663fdb944ece0/latest/${from}`)
    .then((response) => response.json())
    .then((data) => {
      const rateOfTo = data.conversion_rates[to];

      rate.textContent = `1 ${from} = ${rateOfTo} ${to}`;
      amountTwo.value = (+amountOne.value * rateOfTo).toFixed(2);
    });
}

function swapCurrency() {
  [currencyOne.value, currencyTwo.value] = [currencyTwo.value, currencyOne.value];

  calculate();
}

currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);

swap.addEventListener('click', swapCurrency);

calculate();
