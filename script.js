// Select the display element
const display = document.querySelector('.display')

// Create an array of button elements
const buttons = Array.from(document.querySelectorAll('.buttons button'))

// Define operators for calculations
const operators = new Set(['/', '*', '-', '+', '%'])

// Initialize output variable with '0'
let output = '0'

// Initialize lastInputIsOperator variable with false
let lastInputIsOperator = false

// Calculate function receives button value and performs calculations
function calculate(btnValue) {
  // Check if button value is an operator
  if (isOperator(btnValue)) {
    // If the last input is an operator, replace it with the current operator
    if (lastInputIsOperator) {
      output = output.slice(0, -1) + btnValue
    } else {
      // If the last input is not an operator, append the operator
      output += btnValue
    }
    lastInputIsOperator = true
  } else {
    switch (btnValue) {
      case '=':
        // If button value is '=', evaluate the output expression if it is valid
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
        // If button value is 'AC', reset the output and lastInputIsOperator
        output = '0'
        lastInputIsOperator = false
        break
      case 'DEL':
        // If button value is 'DEL', delete the last character from the output
        output = output.slice(0, -1)
        // If output is empty after deletion, reset it to '0'
        if (output === '') output = '0'
        // Check if the last character in the output is an operator
        lastInputIsOperator = isOperator(output.slice(-1))
        break
      default:
        // For other button values, append it to the output
        if (output === '0') {
          output = btnValue
        } else {
          output += btnValue
        }
        lastInputIsOperator = false
        break
    }
  }
  // Format the output for display
  display.value = formatForDisplay(output)
}

// Format the output string for display
function formatForDisplay(str) {
  // Replace mathematical symbols with their respective display characters
  return str.replace(/\//g, '÷').replace(/\*/g, '×').replace(/-/g, '−')
}

// Check if a given value is an operator
function isOperator(value) {
  return operators.has(value)
}

// Add event listeners to each button
buttons.forEach((button) =>
  button.addEventListener('click', (event) =>
    // On button click, calculate based on the button's text content
    calculate(event.target.textContent)
  )
)
