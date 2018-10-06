var html = require('choo/html')
var Component = require('choo/component')

const generateValue = (range) => Math.ceil(Math.random() * range)

module.exports = class Question extends Component {
  init (range) {
    this.multiplicand = generateValue(this.range)
    this.multiplier = generateValue(this.range)
    this.range = range
  }

  createElement (range) {
    this.init(range)
    return html`
    <div class="question">
      <div class="equation">
        <span class="multiplier">${this.multiplicand}</span> x <span class="multiplier">${this.multiplier}</span> =  ?
      </div>
  
      <form onsubmit=${this.onsubmit}>
        <input type="number" name="answer"/>
        <input type="submit" value="submit answer">
      </form>
      <div class="timer">${this.timer()}</div>
    </div>
    `
  }

  onsubmit (e) {
    e.preventDefault()
    const form = e.currentTarget
    console.log(form.answer.value)

    // emit('answer:submit', )
  }
}
