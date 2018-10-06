const html = require('choo/html')

module.exports = function (state, emit, q, i) {
  return html`
    <div>${state.questions.map((q, i) => i)}</div>
  `
}
