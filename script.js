const display = document.querySelector('.display')
const buttons = Array.from(document.querySelectorAll('.buttons button'))
const operators = new Set(['÷', '×', '−', '+'])
let output = '0'

function calculate(btnValue) {
  const lastChar = output[output.length - 1]

  if (operators.has(btnValue)) {
    if (operators.has(lastChar)) return
    else output += btnValue
  } else {
    switch (btnValue) {
      case '=':
        if (output && !operators.has(lastChar)) {
          output = eval(
            output
              .replace('%', '/100')
              .replace('÷', '/')
              .replace('×', '*')
              .replace('−', '-')
          ).toString()
        }
        break
      case 'AC':
        output = '0'
        break
      case 'DEL':
        output = output.slice(0, -1)
        if (output === '') output = '0'
        break
      default:
        if (output === '0' && !operators.has(btnValue)) {
          output = btnValue
        } else if (!output && operators.has(btnValue)) {
          return
        } else {
          output += btnValue
        }
    }
  }
  display.value = formatForDisplay(output)
}

function formatForDisplay(str) {
  return str.replace(/\//g, '÷').replace(/\*/g, '×').replace(/-/g, '−')
}

buttons.forEach((button) =>
  button.addEventListener('click', (event) =>
    calculate(event.currentTarget.dataset.value)
  )
)
