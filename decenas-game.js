class DecenasGame {
  constructor() {
    this.decenas = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    this.queue = []
    this.currentIndex = 0
    this.isInputMode = false
    this.gameActive = false
    this.waiting = false

    this.startScreen = document.getElementById("start-screen")
    this.gameScreen = document.getElementById("game-screen")
    this.finishScreen = document.getElementById("finish-screen")
    this.currentNumberElement = document.getElementById("current-number")
    this.numberInput = document.getElementById("number-input")

    this.playBtn = document.getElementById("play-btn")
    this.correctBtn = document.getElementById("correct-btn")
    this.incorrectBtn = document.getElementById("incorrect-btn")
    this.playAgainBtn = document.getElementById("play-again-btn")

    this.playBtn.addEventListener("click", () => this.startGame())
    this.playAgainBtn.addEventListener("click", () => this.startGame())
    this.correctBtn.addEventListener("click", () => this.handleAnswer(true))
    this.incorrectBtn.addEventListener("click", () => this.handleAnswer(false))
    this.numberInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleAnswer(true)
    })
  }

  buildQueue() {
    return [...this.decenas]
  }

  startGame() {
    this.queue = this.buildQueue()
    this.currentIndex = 0
    this.gameActive = true
    this.showScreen("game")
    this.displayCurrent()
  }

  displayCurrent() {
    if (this.currentIndex >= this.queue.length) {
      this.endGame()
      return
    }

    const number = this.queue[this.currentIndex]
    this.isInputMode = Math.random() < 0.7

    if (this.isInputMode) {
      this.currentNumberElement.style.display = "none"
      this.numberInput.style.display = "block"
      this.numberInput.value = ""
      this.numberInput.focus()
    } else {
      this.currentNumberElement.textContent = number
      this.currentNumberElement.style.display = "block"
      this.numberInput.style.display = "none"
    }
  }

  handleAnswer(userSaysCorrect) {
    if (!this.gameActive || this.waiting) return
    const number = this.queue[this.currentIndex]

    if (this.isInputMode) {
      const answer = parseInt(this.numberInput.value)
      if (answer !== number) {
        this.showFeedback(false)
        this.numberInput.value = ""
        this.numberInput.focus()
        return
      }
    } else {
      if (!userSaysCorrect) {
        this.showFeedback(false)
        return
      }
    }

    this.waiting = true
    this.showFeedback(true)
    setTimeout(() => {
      this.waiting = false
      this.currentIndex++
      this.displayCurrent()
    }, 500)
  }

  showFeedback(isCorrect) {
    document.body.classList.add("feedback-active")
    document.body.classList.add(isCorrect ? "correct-feedback" : "incorrect-feedback")
    setTimeout(() => {
      document.body.classList.remove("feedback-active", "correct-feedback", "incorrect-feedback")
    }, 400)
  }

  endGame() {
    this.gameActive = false
    this.showScreen("finish")
  }

  showScreen(name) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"))
    document.getElementById(`${name}-screen`).classList.add("active")
  }
}

document.addEventListener("DOMContentLoaded", () => new DecenasGame())
