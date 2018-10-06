const html = require('choo/html')

module.exports = function (state, emit) {
  function startApp (evt) {
    evt.preventDefault()
    const f = evt.currentTarget
    emit('questions:start', f.range.value, f.duration.value, f.showProgress.value)
  }

  return html`<form onsubmit=${startApp} >
    <label>Times table <input type="number" name="range" value="20" /></label>
    <label>Quiz duration (minutes)<input type="text" name="duration" value="5" /></label>
    <label>Show answers in progress <input type="checkbox" name="showProgress" value="1" /></label>
    <input type="submit" value="Start" />
    </form>`
}
