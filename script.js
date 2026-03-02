class WordGame {
  constructor() {
    // Palabras del juego
    this.blackWords = [
      "Pink",
      "Your",
      "Green",
      "Take",
      "Their",
      "Then",
      "Does",
      "Goes",
      "Black",
      "Them",
      "This",
      "Ouch",
      "About",
      "Use",
      "Who",
      "What",
      "Why",
      "When",
      "Where",
    ]
    this.redWords = [
      // "go",
      // "I",
      // "like",
      // "of",
      // "will",
      // "get",
      // "no",
      // "want",
      // "with",
      // "for",
    ]

    // Estado del juego
    this.currentWords = []
    this.currentWordIndex = 0
    this.gameActive = false

    // Elementos del DOM
    this.startScreen = document.getElementById("start-screen")
    this.gameScreen = document.getElementById("game-screen")
    this.finishScreen = document.getElementById("finish-screen")
    this.currentWordElement = document.getElementById("current-word")
    this.gameContainer = document.getElementById("game-container")

    // Botones
    this.playBtn = document.getElementById("play-btn")
    this.correctBtn = document.getElementById("correct-btn")
    this.incorrectBtn = document.getElementById("incorrect-btn")
    this.playAgainBtn = document.getElementById("play-again-btn")
    this.listenBtn = document.getElementById("listen-btn")

    this.initializeEventListeners()
  }

  initializeEventListeners() {
    this.playBtn.addEventListener("click", () => this.startGame())
    this.playAgainBtn.addEventListener("click", () => this.startGame())
    this.correctBtn.addEventListener("click", () => this.handleAnswer(true))
    this.incorrectBtn.addEventListener("click", () => this.handleAnswer(false))
    this.listenBtn.addEventListener("click", () => this.speakCurrentWord())
  }

  speakCurrentWord() {
    if (!this.gameActive) return
    const word = this.currentWords[this.currentWordIndex]?.text
    if (!word) return
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = "en-US"
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  }

  shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  startGame() {
    // Crear array de palabras con sus colores
    const allWords = [
      ...this.blackWords.map((word) => ({ text: word, color: "black" })),
      ...this.redWords?.map((word) => ({ text: word, color: "red" })),
    ]

    // Mezclar las palabras aleatoriamente
    this.currentWords = this.shuffleArray(allWords)
    this.currentWordIndex = 0
    this.gameActive = true

    // Cambiar a pantalla de juego
    this.showScreen("game")
    this.displayCurrentWord()
  }

  displayCurrentWord() {
    if (this.currentWordIndex >= this.currentWords.length) {
      this.endGame()
      return
    }

    const currentWord = this.currentWords[this.currentWordIndex]
    this.currentWordElement.textContent = currentWord.text
    this.currentWordElement.className = `${currentWord.color}-word`
  }

  handleAnswer(userAnswer) {
    if (!this.gameActive) return

    const currentWord = this.currentWords[this.currentWordIndex]

    const correctAnswer = true
    const isCorrect = userAnswer === correctAnswer
    this.showFeedback(isCorrect)

    // Avanzar a la siguiente palabra después del feedback
    setTimeout(() => {
      this.currentWordIndex++
      this.displayCurrentWord()
    }, 800)
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
        "incorrect-feedback",
      )
    }, 500)
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
  new WordGame()
})
