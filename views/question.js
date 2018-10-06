const moment = require('moment')
const html = require('choo/html')

module.exports = function (state, emit, q, i) {
  return html`
  <div>
    <span class="expression number multiplicand">${q.multiplicand}</span> 
    <span class="operator multiply">x</span> 
    <span class="expression number multiplier">${q.multiplier}</span>
    <span class="operator equals">=</span> 
    
    <form onsubmit=${submitAnswer}>
      <input type="number" id="userAnswer-${i}" name="userAnswer" disabled="${!!q.userAnswer}" value="${q.userAnswer ? q.userAnswer : ''}" />
      ${!q.userAnswer ? html`<input type="submit" value="go" />` : ''}
    </form>
    
    ${(q.userAnswer !== null) && (+q.userAnswer !== +q.answer)
    ? html`<span class="correct-answer" style="color:red">${q.answer}</span>`
    : '✅'}
    
    ${q.timeTaken
    ? html`<div class="time-taken">${moment.duration(q.timeTaken).seconds()}</div>`
    : ''
}
  </div>
  `
  function submitAnswer (evt) {
    evt.preventDefault()
    const a = evt.currentTarget.userAnswer.value
    if (a) {
      return emit('question:answer', a)
    }
    return false
  }
}
