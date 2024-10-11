const sortContent = document.getElementById('sorter-wrapper')

const form = document.querySelector('form')

const numbersQuantity = document.getElementById('quantity')
const firstNumber = document.getElementById('first-number')
const lastNumber = document.getElementById('last-number')

const repeatNumberToggle = document.getElementById('repeat-toggle')

const sortedNumbers = []

function clearValues() {
  numbersQuantity.value = ''
  firstNumber.value = ''
  lastNumber.value = ''
}

function validateInput(e) {
  const regex = /^[0-9]*$/
  const inputValue = e.target.value

  if (!regex.test(inputValue)) e.target.value = inputValue.slice(0, -1)
}

function numberSorter(quantity, minNumber, maxNumber) {
  try {
    minNumber = Number(minNumber)
    maxNumber = Number(maxNumber)
    quantity = Number(quantity)

    const numberCalc = maxNumber - minNumber + 1
    let sortCalc

    if (minNumber >= maxNumber) {
      clearValues()
      alert('O número inicial deve ser menor que o número final.')
      throw new Error('O número inicial deve ser menor que o número final.')
    }

    if (quantity > 10) {
      clearValues()
      alert('Você só pode escolher até dez números por vez.')
      throw new Error('Você só pode escolher até dez números por vez.')
    }

    sortedNumbers.length = 0

    if (quantity > 1) {
      if (!repeatNumberToggle.checked) {
        for (let i = 0; i <= quantity - 1; i++) {
          sortCalc = Math.floor(Math.random() * numberCalc + minNumber)

          sortedNumbers.push(sortCalc)
        }
      } else {
        for (let i = 0; i <= quantity - 1; i++) {
          do {
            sortCalc = Math.floor(Math.random() * numberCalc + minNumber)
          } while (sortedNumbers.includes(sortCalc))
          sortedNumbers.push(sortCalc)
        }
      }
    } else {
      sortCalc = Math.floor(Math.random() * numberCalc + minNumber)
      sortedNumbers.push(sortCalc)
    }

    clearValues()
    return sortCalc
  } catch (error) {
    console.error('Erro ao realizar o sorteio: ' + error.message)
    return
  }
}

numbersQuantity.addEventListener('input', validateInput)
firstNumber.addEventListener('input', validateInput)
lastNumber.addEventListener('input', validateInput)

form.onsubmit = (e) => {
  e.preventDefault()

  const minNumber = Number(firstNumber.value)
  const maxNumber = Number(lastNumber.value)
  const quantity = Number(numbersQuantity.value)

  const result = numberSorter(quantity, minNumber, maxNumber)

  if (result === undefined) {
    clearValues()
    return
  }

  document.getElementById('sorter-wrapper').classList.add('hidden')
  document.getElementById('sorted-content').classList.remove('hidden')

  const resultDiv = document.getElementById('numbers-container')
  resultDiv.innerHTML = ''

  sortedNumbers.forEach((number) => {
    const square = document.createElement('div')
    square.classList.add('animated-square')

    const numberSpan = document.createElement('span')
    numberSpan.textContent = number

    square.appendChild(numberSpan)
    resultDiv.appendChild(square)
  })

  setTimeout(() => {
    document.getElementById('retry').classList.remove('hidden')
    document.getElementById('retry').classList.add('visible')
  }, 2500)
}

document.getElementById('retry').addEventListener('click', () => {
  document.getElementById('sorted-content').classList.add('hidden')
  document.getElementById('sorter-wrapper').classList.remove('hidden')
})
