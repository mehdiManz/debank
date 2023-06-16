import { debank_backend } from "../../declarations/debank_backend";

window.addEventListener("load", async function () {
  console.log("Finished loading");
  update();
});

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent the default form submission behavior
  console.log("Submitted");

  const button = e.target.querySelector("#submit-btn");

  // Add your logic to handle form submission here
  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);


  if (document.getElementById("input-amount").value.length != 0) {
    await debank_backend.topUp(inputAmount);
  }
  if (document.getElementById("withdrawal-amount").value.length != 0) {
    await debank_backend.withdraw(outputAmount);
  }

  await debank_backend.compound();

  update();

  const currentAmount = await debank_backend.checkBalance();
  document.getElementById("value").innerText = currentAmount.toFixed(2);




  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled");
});


async function update() {
  const currentAmount = await debank_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
}