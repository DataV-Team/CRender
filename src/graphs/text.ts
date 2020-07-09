import { TextShape } from '../types/graphs/shape'
import { Point, GraphConfig } from '../types/core/graph'
import Graph from '../core/graph.class'
import CRender from '../core/crender.class'
import { GraphName } from '../types/graphs'

class Text extends Graph<TextShape> {
  name: GraphName = 'text'

  constructor(config: GraphConfig<TextShape>, render: CRender) {
    super(
      Graph.mergeDefaultShape(
        {
          content: '',
          position: [0, 0],
          maxWidth: undefined,
          rowGap: 0,
        },
        config,
        ({ shape: { content, position, rowGap } }) => {
          if (typeof content !== 'string')
            throw new Error('CRender Graph Text: Text content should be a string!')

          if (!Array.isArray(position))
            throw new Error('CRender Graph Text: Text position should be an array!')

          if (typeof rowGap !== 'number')
            throw new Error('CRender Graph Text: Text rowGap should be a number!')
        }
      ),
      render
    )
  }

  draw(): void {
    const {
      shape,
      render: { ctx },
    } = this
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
  }

  setGraphCenter(): void {
    const {
      shape: { position },
      style,
    } = this

    style.graphCenter = [...position] as [number, number]
  }

  move({ movementX, movementY }: MouseEvent): void {
    const {
      position: [x, y],
    } = this.shape

    this.attr('shape', {
      position: [x + movementX, y + movementY],
    })
  }
}

export default Text
