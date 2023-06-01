const display = document.querySelector('.display')
const buttons = Array.from(document.querySelectorAll('.buttons button'))
const operators = new Set(['/', '*', '-', '+', '%'])
let output = '0'
let lastInputIsOperator = false

function calculate(btnValue) {
  if (isOperator(btnValue)) {
    if (lastInputIsOperator) {
      output = output.slice(0, -1) + btnValue
    } else {
      output += btnValue
    }
    lastInputIsOperator = true
  } else {
    switch (btnValue) {
      case '=':
        if (output && !lastInputIsOperator) {
          output = eval(
            output
              .replace('%', '/100')
              .replace(/÷/g, '/')
              .replace(/×/g, '*')
              .replace(/−/g, '-')
          ).toString()
        }
        lastInputIsOperator = false
        break
      case 'AC':
        output = '0'
        lastInputIsOperator = false
        break
      case 'DEL':
        output = output.slice(0, -1)
        if (output === '') output = '0'
        lastInputIsOperator = isOperator(output.slice(-1))
        break
      default:
        if (output === '0') {
          output = btnValue
        } else {
          output += btnValue
        }
        lastInputIsOperator = false
        break
    }
  }
  display.value = formatForDisplay(output)
}

function formatForDisplay(str) {
  return str.replace(/\//g, '÷').replace(/\*/g, '×').replace(/-/g, '−')
}

function isOperator(value) {
  return operators.has(value)
}

buttons.forEach((button) =>
  button.addEventListener('click', (event) =>
    calculate(event.target.textContent)
  )
)
