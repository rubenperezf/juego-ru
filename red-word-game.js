class RedWordGame {
  constructor() {
    ;((this.redWords = [
      "the",
      "was",
      "is",
      "a",
      "on",
      "and",
      "to",
      "for",
      "go",
      "I",
      "like",
      "of",
      "will",
      "get",
      "no",
      "want",
      "with",
      "said",
      "you",
      "in",
      "put",
      "see",
      "stop",
      "from",
      "off",
      "he",
      "has",
      "have",
      "me",
      "his",
      "as",
      "my",
      "into",
      "now",
      "new",
      "give",
      "or",
      "by",
      "went",
      "do",
      "are",
      "they",
      "any",
      "black",
      "blue",
      "brown",
      "gray",
      "green",
      "orange",
      "pink",
      "purple",
      "white",
      "yellow",
      "one",
      "two",
      "come",
      "who",
      "what",
      "where",
      "why",
      "when",
    ]),
      (this.currentWords = []))
    this.currentWordIndex = 0
    this.gameActive = false

    this.startScreen = document.getElementById("start-screen")
    this.gameScreen = document.getElementById("game-screen")
    this.finishScreen = document.getElementById("finish-screen")
    this.currentWordElement = document.getElementById("current-word")
    this.gameContainer = document.getElementById("game-container")

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
    this.currentWords = this.shuffleArray(
      this.redWords.map((word) => ({ text: word, color: "red" })),
    )
    this.currentWordIndex = 0
    this.gameActive = true

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

    const isCorrect = userAnswer === true
    this.showFeedback(isCorrect)

    setTimeout(() => {
      if (!isCorrect) {
        const failedWord = this.currentWords[this.currentWordIndex]
        this.currentWords.push(failedWord)
      }
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
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active")
    })

    const targetScreen = document.getElementById(`${screenName}-screen`)
    if (targetScreen) {
      targetScreen.classList.add("active")
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new RedWordGame()
})
