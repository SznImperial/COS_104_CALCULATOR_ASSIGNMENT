const display = document.getElementById("display");
let current = "0";
let hasDecimal = false;

function updateDisplay() {
  display.textContent = current;
}

function clearCalculator() {
  current = "0";
  hasDecimal = false;
  updateDisplay();
}

function appendNumber(value) {
  if (value === ".") {
    if (hasDecimal) return;
    hasDecimal = true;
  }

  if (current === "0" && value !== ".") {
    current = value;
  } else {
    current += value;
  }

  updateDisplay();
}

function applyPercent() {
  try {
    const result = parseFloat(evalExpression(current)) / 100;
    current = String(result);
    hasDecimal = current.includes(".");
    updateDisplay();
  } catch (err) {
    current = "Error";
    updateDisplay();
  }
}

function backspace() {
  if (current.length <= 1) {
    current = "0";
    hasDecimal = false;
  } else {
    if (current.endsWith(".")) {
      hasDecimal = false;
    }
    current = current.slice(0, -1);
  }
  updateDisplay();
}

function evaluateExpression() {
  try {
    const expression = evalExpression(current);
    const result = eval(expression);
    current = String(Number.isFinite(result) ? result : "0");
    hasDecimal = current.includes(".");
    updateDisplay();
  } catch (err) {
    current = "Error";
    updateDisplay();
  }
}

function evalExpression(expr) {
  return expr.replace(/×/g, "*").replace(/÷/g, "/");
}

const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === "backspace") {
      backspace();
      return;
    }

    if (action === "percent") {
      applyPercent();
      return;
    }

    if (button.id === "clear") {
      clearCalculator();
      return;
    }

    if (button.id === "equals") {
      evaluateExpression();
      return;
    }

    if (value) {
      appendNumber(value);
    }
  });
});

clearCalculator();
