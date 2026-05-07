class SumasGame {
  constructor() {
    this.totalRounds = 20
    this.currentRound = 0
    this.correct = 0
    this.a = 0
    this.b = 0

    this.startScreen = document.getElementById("start-screen")
    this.gameScreen = document.getElementById("game-screen")
    this.finishScreen = document.getElementById("finish-screen")
    this.sumaText = document.getElementById("suma-text")
    this.sumaInput = document.getElementById("suma-input")
    this.finishScore = document.getElementById("finish-score")

    this.playBtn = document.getElementById("play-btn")
    this.checkBtn = document.getElementById("check-btn")
    this.wrongBtn = document.getElementById("wrong-btn")
    this.playAgainBtn = document.getElementById("play-again-btn")

    this.playBtn.addEventListener("click", () => this.startGame())
    this.playAgainBtn.addEventListener("click", () => this.startGame())
    this.checkBtn.addEventListener("click", () => this.checkAnswer())
    this.wrongBtn.addEventListener("click", () => this.wrongAnswer())
    this.sumaInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.checkAnswer()
    })
  }

  startGame() {
    this.currentRound = 0
    this.correct = 0
    this.showScreen("game")
    this.nextRound()
  }

  nextRound() {
    if (this.currentRound >= this.totalRounds) {
      this.endGame()
      return
    }
    this.a = Math.floor(Math.random() * 9) + 1
    this.b = Math.floor(Math.random() * 9) + 1
    this.sumaText.textContent = `${this.a} + ${this.b} =`
    this.sumaInput.value = ""
    this.sumaInput.focus()
    this.currentRound++
  }

  checkAnswer() {
    const answer = parseInt(this.sumaInput.value)
    if (isNaN(answer)) return

    if (answer === this.a + this.b) {
      this.correct++
      this.showFeedback(true)
      setTimeout(() => this.nextRound(), 700)
    } else {
      this.showFeedback(false)
      setTimeout(() => {
        this.sumaInput.value = ""
        this.sumaInput.focus()
      }, 700)
    }
  }

  wrongAnswer() {
    this.showFeedback(false)
    setTimeout(() => {
      this.sumaInput.value = ""
      this.sumaInput.focus()
    }, 700)
  }

  showFeedback(isCorrect) {
    document.body.classList.add("feedback-active", isCorrect ? "correct-feedback" : "incorrect-feedback")
    setTimeout(() => {
      document.body.classList.remove("feedback-active", "correct-feedback", "incorrect-feedback")
    }, 600)
  }

  endGame() {
    this.finishScore.textContent = `${this.correct} / ${this.totalRounds} correctas`
    this.showScreen("finish")
  }

  showScreen(name) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"))
    document.getElementById(`${name}-screen`).classList.add("active")
  }
}

document.addEventListener("DOMContentLoaded", () => new SumasGame())
