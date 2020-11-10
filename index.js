class SlideNumber {
	constructor (selector, options = {
  		resetCount: false,
      minValue: false,
      maxValue: false,
    }) {
  	const input = this.getField(selector)

		this.input = input
    this.minValue = options.minValue || input.getAttribute('min') || false
		this.maxValue = options.maxValue || input.getAttribute('max') || false
		this.currentValue = parseInt(this.input.value) || this.minValue || 0
    this.resetCount = options.resetCount || false

    this.mouseIsDown = false
    this.initialPosition = this.currentValue

  	input.addEventListener('mousedown', event => this.mouseDown(event))
  }

  mouseDown (event) {
  	this.mouseIsDown = true
    this.initialPosition = event.clientY
  	window.addEventListener('mouseup', event => this.mouseUp(event.target))
  	window.addEventListener('mousemove', event => this.mouseMove(event))
  }

  mouseUp (event) {
  	this.mouseIsDown = false
    this.currentValue = this.input.value
  }

  mouseMove (event) {
  	if (this.isMouseDown()) {
    	let calculation = !this.resetCount
      	? parseInt(this.currentValue) + this.initialPosition - event.clientY
        : this.initialPosition - event.clientY

      if (this.minValue && calculation < parseInt(this.minValue)) {
      	calculation = this.minValue
      }

      else if (this.maxValue && calculation > parseInt(this.maxValue)) {
      	calculation = this.maxValue
      }

      else {
      	this.input.value = calculation
      }
    }
  }

  // UTILITIES

	getField (selector) {
		return this.isDom(selector)
			? selector
			: this.isDom(document.querySelector(selector))
				?	document.querySelector(selector)
				: new Error('Unable to find input element. You might check SlideNumber class call.')
	}

	isDom (selector) {
		return selector instanceof Element
	}

  isMouseDown () {
  	return this.mouseIsDown
  }
}
