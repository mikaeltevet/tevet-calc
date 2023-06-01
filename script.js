const display = document.querySelector('.display')
const buttons = Array.from(document.querySelectorAll('.buttons button'))
const specialChars = new Set(['%', '*', '÷', '−', '+', '='])
let output = '0'

function calculate(btnValue) {
  switch (btnValue) {
    case '÷':
      output += '/'
      break
    case '×':
      output += '*'
      break
    case '−':
      output += '-'
      break
    case '=':
      if (output) {
        output = eval(output.replace('%', '/100')).toString()
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
      if (output === '0' && !specialChars.has(btnValue)) {
        output = btnValue
      } else if (!output && specialChars.has(btnValue)) {
        return
      } else {
        output += btnValue
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
