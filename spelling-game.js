class SpellingGame {
  constructor() {
    this.words = [
      "some",
      "good",
      "three",
      "where",
      "does",
      "zero",
      "done",
      "four",
      "there",
      "her",
      "here",
      "eight",
    ]
    this.currentWords = []
    this.currentWordIndex = 0
    this.gameActive = false

    this.playBtn = document.getElementById("play-btn")
    this.playAgainBtn = document.getElementById("play-again-btn")
    this.listenBtn = document.getElementById("listen-btn")
    this.correctBtn = document.getElementById("correct-btn")
    this.incorrectBtn = document.getElementById("incorrect-btn")
    this.answerElement = document.getElementById("spelling-answer")
    this.controlsElement = document.getElementById("spelling-controls")
    this.instructionElement = document.getElementById("instruction")
    this.progressElement = document.getElementById("progress")

    this.playBtn.addEventListener("click", () => this.startGame())
    this.playAgainBtn.addEventListener("click", () => this.startGame())
    this.listenBtn.addEventListener("click", () => this.speakCurrentWord())
    this.correctBtn.addEventListener("click", () => this.handleAnswer(true))
    this.incorrectBtn.addEventListener("click", () => this.handleAnswer(false))
  }

  shuffleWords() {
    const shuffled = [...this.words]
    for (let index = shuffled.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1))
      ;[shuffled[index], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[index],
      ]
    }
    return shuffled
  }

  startGame() {
    speechSynthesis.cancel()
    this.currentWords = this.shuffleWords()
    this.currentWordIndex = 0
    this.gameActive = true
    this.showScreen("game")
    this.startWord()
  }

  startWord() {
    if (this.currentWordIndex >= this.currentWords.length) {
      this.endGame()
      return
    }

    this.answerElement.textContent = ""
    this.controlsElement.hidden = false
    this.instructionElement.textContent = "Escucha y deletrea la palabra"
    this.progressElement.textContent = `Palabra ${this.currentWordIndex + 1} de ${this.currentWords.length}`
    this.speakCurrentWord()
  }

  speakCurrentWord() {
    if (!this.gameActive) return
    const word = this.currentWords[this.currentWordIndex]
    if (!word) return

    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = "en-US"
    utterance.rate = 0.85
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  }

  handleAnswer(isCorrect) {
    if (!this.gameActive || this.controlsElement.hidden) return

    this.answerElement.textContent = this.currentWords[this.currentWordIndex]
    this.instructionElement.textContent = isCorrect ? "¡Correcto!" : "Vamos a practicarla otra vez"
    document.body.classList.add(
      "feedback-active",
      isCorrect ? "correct-feedback" : "incorrect-feedback",
    )

    if (!isCorrect) {
      this.currentWords.push(this.currentWords[this.currentWordIndex])
    }

    this.controlsElement.hidden = true
    setTimeout(() => {
      document.body.classList.remove(
        "feedback-active",
        "correct-feedback",
        "incorrect-feedback",
      )
      this.currentWordIndex++
      this.startWord()
    }, 700)
  }

  endGame() {
    speechSynthesis.cancel()
    this.gameActive = false
    this.showScreen("finish")
  }

  showScreen(name) {
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active")
    })
    document.getElementById(`${name}-screen`).classList.add("active")
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new SpellingGame()
})
