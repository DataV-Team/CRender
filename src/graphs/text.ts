import { GraphModel } from '../types/graphs/index'
import { TextShape } from '../types/graphs/shape'
import { Point } from '../types/core/graph'

const text: GraphModel<TextShape> = {
  shape: {
    content: '',
    position: [0, 0],
    maxWidth: undefined,
    rowGap: 0,
  },

  validator({ shape }) {
    const { content, position, rowGap } = shape

    if (typeof content !== 'string') {
      console.error('CRender Graph Text: Text content should be a string!')

      return false
    }

    if (!Array.isArray(position)) {
      console.error('CRender Graph Text: Text position should be an array!')

      return false
    }

    if (typeof rowGap !== 'number') {
      console.error('CRender Graph Text: Text rowGap should be a number!')

      return false
    }

    return true
  },

  draw({ ctx }, { shape }) {
    const { content, position, maxWidth, rowGap } = shape
    const { textBaseline, font } = ctx

    const contentArr = content.split('\n')
    const rowNum = contentArr.length

    const fontSize = parseInt(font.replace(/\D/g, ''))
    const lineHeight = fontSize + rowGap
    const allHeight = rowNum * lineHeight - rowGap

    let offset = 0
    const x = position[0]
    let y = position[1]

    if (textBaseline === 'middle') {
      offset = allHeight / 2
      y += fontSize / 2
    }

    if (textBaseline === 'bottom') {
      offset = allHeight
      y += fontSize
    }

    const positions: Point[] = new Array(rowNum)
      .fill(0)
      .map((_, i) => [x, y + i * lineHeight - offset])

    ctx.beginPath()

    contentArr.forEach((text, i) => {
      ctx.fillText(text, positions[i][0], positions[i][1], maxWidth)
      ctx.strokeText(text, positions[i][0], positions[i][1], maxWidth)
    })

    ctx.closePath()
  },

  hoverCheck() {
    return false
  },

  setGraphCenter({ shape, style }) {
    const { position } = shape

    style.graphCenter = [...position] as [number, number]
  },

  move({ movementX, movementY }, text) {
    const {
      position: [x, y],
    } = text.shape

    text.attr('shape', {
      position: [x + movementX, y + movementY],
    })
  },
}

export default text
