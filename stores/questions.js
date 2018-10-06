module.exports = questions

const generateValue = (range) => Math.ceil(Math.random() * range)

function questions (state, emitter) {
  state.range = 20
  state.questions = []
  state.currentQuestion = null
  state.timerValue = null
  state.questionTimer = new Date()
  state.quizTimer = null
  state.started = false
  state.finished = false
  state.showProgress = false

  emitter.on('DOMContentLoaded', function () {
    emitter.on('questions:start', function (range, duration, showProgress = false) {
      state.range = range
      state.started = true
      state.showProgress = showProgress
      state.quizTimer = setTimeout(() => emitter.emit('questions:finish'), duration * 60 * 1000)
      emitter.emit('question:add')
    })

    emitter.on('questions:finish', function () {
      state.started = false
      emitter.emit(state.events.RENDER)
    })

    emitter.on('question:add', function () {
      if (state.currentQuestion) {
        state.currentQuestion.answer = state.currentQuestion.multiplicand * state.currentQuestion.multiplier
        state.currentQuestion.timeTaken = (new Date() - state.questionTimer)
        state.questionTimer = new Date()
      }

      state.currentQuestion = {
        multiplicand: generateValue(state.range),
        multiplier: generateValue(state.range),
        answer: null,
        timeTaken: null,
        userAnswer: null
      }
      state.questions.push(state.currentQuestion)
      emitter.emit(state.events.RENDER)
      setTimeout(() => emitter.emit('question:focus'), 100)
    })

    emitter.on('question:focus', function () {
      // document.querySelector(`#userAnswer-${state.questions.length - 1}`).focus()
    })

    emitter.on('question:answer', function (value) {
      state.currentQuestion.userAnswer = value
      emitter.emit('question:add')
    })
  })
}
