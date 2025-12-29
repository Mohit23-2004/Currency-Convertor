const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    if (select.name === "from" && currCode === "USD") option.selected = true;
    if (select.name === "to" && currCode === "INR") option.selected = true;

    select.append(option);
  }

  select.addEventListener("change", (e) => updateFlag(e.target));
}

const updateExchangeRate = async () => {
  const amountInput = document.querySelector(".amount input");
  let amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    amount = 1;
    amountInput.value = 1;
  }

  const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();

  const URL = `${BASE_URL}/${from}.json`;
  console.log("FETCH URL:", URL); // 👈 IMPORTANT

  try {
    const res = await fetch(URL);
    const data = await res.json();

    const rate = data[from][to];
    msg.innerText = `${amount} ${fromCurr.value} = ${(amount * rate).toFixed(
      2
    )} ${toCurr.value}`;
  } catch (err) {
    console.error(err);
    msg.innerText = "Conversion failed";
  }
};

const updateFlag = (element) => {
  const code = element.value;
  const countryCode = countryList[code];
  element.parentElement.querySelector("img").src =
    `https://flagsapi.com/${countryCode}/flat/64.png`;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.onload = updateExchangeRate;
