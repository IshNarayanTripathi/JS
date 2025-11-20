const add = function () {
  console.log(2 + 3);
};
add();
add();

function changeText() {
  console.log("Changing text now...");
  document.querySelector(".js-start-button").textContent = "Finished!!";
}

let timeoutId;
function addToCart() {
  document.querySelector(".js-output").innerHTML = "Added";
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function () {
    document.querySelector(".js-output").innerHTML = "";
  }, 2000);
}

let messages = 0;
let intervalId;
let showing = false;
function showMessage(button) {
  if (button.className ==="js-add")
    messages += 1;
  else if (button.className ==="js-remove" && messages > 0)
    messages -= 1;
  if (messages === 0){
    clearInterval(intervalId);
    document.title = "App";
    return;
  }
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (showing) {
      document.title = "App";
      showing = false;
    } else {
      document.title = `(${messages}) New Messages`;
      showing = true;
    }
  }, 1000);
}
