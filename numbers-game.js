class NumbersGame {
  constructor() {
    // Estado del juego
    this.currentNumber = 1
    this.maxNumber = 100
    this.gameActive = false
    this.isInputMode = false

    // Elementos del DOM
    this.startScreen = document.getElementById("start-screen")
    this.gameScreen = document.getElementById("game-screen")
    this.finishScreen = document.getElementById("finish-screen")
    this.currentNumberElement = document.getElementById("current-number")
    this.numberInput = document.getElementById("number-input")
    this.gameContainer = document.getElementById("game-container")

    // Botones
    this.playBtn = document.getElementById("play-btn")
    this.correctBtn = document.getElementById("correct-btn")
    this.incorrectBtn = document.getElementById("incorrect-btn")
    this.playAgainBtn = document.getElementById("play-again-btn")

    this.initializeEventListeners()
  }

  initializeEventListeners() {
    this.playBtn.addEventListener("click", () => this.startGame())
    this.playAgainBtn.addEventListener("click", () => this.startGame())
    this.correctBtn.addEventListener("click", () => this.handleAnswer(true))
    this.incorrectBtn.addEventListener("click", () => this.handleAnswer(false))

    // Permitir presionar Enter en el input
    this.numberInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleAnswer(true)
      }
    })
  }

  startGame() {
    this.currentNumber = 1
    this.gameActive = true

    // Cambiar a pantalla de juego
    this.showScreen("game")
    this.displayCurrentNumber()
  }

  displayCurrentNumber() {
    if (this.currentNumber > this.maxNumber) {
      this.endGame()
      return
    }

    // Decidir aleatoriamente si mostrar el número o pedir input
    // 50% de probabilidad para cada uno
    this.isInputMode = Math.random() < 0.5

    if (this.isInputMode) {
      // Modo input: ocultar número, mostrar campo de entrada
      this.currentNumberElement.style.display = "none"
      this.numberInput.style.display = "block"
      this.numberInput.value = ""
      this.numberInput.focus()
    } else {
      // Modo mostrar: mostrar número, ocultar campo de entrada
      this.currentNumberElement.textContent = this.currentNumber
      this.currentNumberElement.style.display = "block"
      this.numberInput.style.display = "none"
    }
  }

  handleAnswer(userSaysCorrect) {
    if (!this.gameActive) return

    let isCorrect = false

    // Si estamos en modo input, validar la respuesta ingresada
    if (this.isInputMode) {
      const userAnswer = parseInt(this.numberInput.value)
      isCorrect = userAnswer === this.currentNumber && userSaysCorrect

      if (!isCorrect) {
        this.showFeedback(false)
        // No avanzar si la respuesta es incorrecta
        return
      }
    } else {
      // Si estamos en modo mostrar, el botón verde es correcto
      isCorrect = userSaysCorrect

      if (!isCorrect) {
        this.showFeedback(false)
        // No avanzar si presiona el botón incorrecto
        return
      }
    }

    // Mostrar feedback positivo
    this.showFeedback(true)

    // Avanzar al siguiente número después del feedback
    setTimeout(() => {
      this.currentNumber++
      this.displayCurrentNumber()
    }, 500)
  }

  showFeedback(isCorrect) {
    document.body.classList.add("feedback-active")

    if (isCorrect) {
      document.body.classList.add("correct-feedback")
    } else {
      document.body.classList.add("incorrect-feedback")
    }

    // Remover el feedback después de un breve momento
    setTimeout(() => {
      document.body.classList.remove(
        "feedback-active",
        "correct-feedback",
        "incorrect-feedback"
      )
    }, 400)
  }

  endGame() {
    this.gameActive = false
    this.showScreen("finish")
  }

  showScreen(screenName) {
    // Ocultar todas las pantallas
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active")
    })

    // Mostrar la pantalla solicitada
    const targetScreen = document.getElementById(`${screenName}-screen`)
    if (targetScreen) {
      targetScreen.classList.add("active")
    }
  }
}

// Inicializar el juego cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  new NumbersGame()
})
