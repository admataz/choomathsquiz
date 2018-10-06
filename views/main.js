const html = require('choo/html')

const TITLE = 'timestables - main'

const question = require('./question')
const startForm = require('./startForm')
const results = require('./results')

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
  <body>
    ${(state.started && !state.finished && state.currentQuestion)
    ? state.showProgress
      ? state.questions.map((q, i) => question(state, emit, q, i))
      : question(state, emit, state.currentQuestion, state.questions.length + 1)
    : state.finished
      ? results(state, emit)
      : ''
}

    ${!state.started
    ? startForm(state, emit)
    : ''}
    

  </body>
  `
}
