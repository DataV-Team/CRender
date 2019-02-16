import extendPrototype from './function/prototype'

export { extendNewElement } from './config/elements'

export { injectNewCurve } from '@jiaminghi/transition'

export default class CRender {

  constructor (canvas) {
    if (!canvas) {
      console.error('Missing parameters!')

      return
    }

    const ctx = canvas.getContext('2d')

    const { clientWidth, clientHeight } = canvas

    const area = [clientWidth, clientHeight]

    this.ctx = ctx

    this.area = area

    this.elements = []

    this.lastMousePosition = [0, 0]

    this.hoverElement = ''

    canvas.addEventListener('mousedown', this.mouseDown.bind(this))
    canvas.addEventListener('mousemove', this.mouseMove.bind(this))
    canvas.addEventListener('mouseup', this.mouseUp.bind(this))

    this.animationStatus = false
  }

}

extendPrototype(CRender)
