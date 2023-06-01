const display = document.querySelector('.display')
const buttons = Array.from(document.querySelectorAll('.buttons button'))
const specialChars = new Set(['%', '*', '/', '-', '+', '='])
let output = ''

function calculate(btnValue) {
  switch (btnValue) {
    case '=':
      if (output) {
        output = eval(output.replace('%', '/100'))
      }
      break
    case 'AC':
      output = ''
      break
    case 'DEL':
      output = output.slice(0, -1)
      break
    default:
      if (!output && specialChars.has(btnValue)) return
      output += btnValue
  }
  display.value = output
}

buttons.forEach((button) =>
  button.addEventListener('click', (event) =>
    calculate(event.currentTarget.dataset.value)
  )
)
