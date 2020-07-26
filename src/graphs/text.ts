import { TextShape, TextShapeCache } from '../types/graphs/shape'
import { Point, GraphConfig } from '../types/core/graph'
import Graph from '../core/graph.class'
import { checkPointIsInRect } from '../utils/graphs'

class Text extends Graph<TextShape> {
  name = 'text'

  private cache: TextShapeCache = {}

  constructor(config: GraphConfig<Partial<TextShape>>) {
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
      )
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

    if (textBaseline === 'bottom' || textBaseline === 'alphabetic') {
      offset = allHeight
      y += fontSize
    }

    const positions: Point[] = new Array(rowNum)
      .fill(0)
      .map((_, i) => [x, y + i * lineHeight - offset])

    ctx.beginPath()

    let realMaxWidth = 0
    contentArr.forEach((text, i) => {
      // calc text width and height for hover check
      const width = ctx.measureText(text).width
      if (width > realMaxWidth) realMaxWidth = width

      ctx.fillText(text, positions[i][0], positions[i][1], maxWidth)
      ctx.strokeText(text, positions[i][0], positions[i][1], maxWidth)
    })

    ctx.closePath()

    this.setCache(realMaxWidth, allHeight)
  }

  private setCache(width: number, height: number): void {
    const {
      cache,
      shape: {
        position: [x, y],
      },
      render: { ctx },
    } = this
    const { textAlign, textBaseline } = ctx

    cache.w = width
    cache.h = height
    cache.x = x
    cache.y = y
    if (textAlign === 'center') {
      cache.x = x - width / 2
    } else if (textAlign === 'end' || textAlign === 'right') {
      cache.x = x - width
    }

    if (textBaseline === 'middle') {
      cache.y = y - height / 2
    } else if (textBaseline === 'bottom' || textBaseline === 'alphabetic') {
      cache.y = y - height
    }
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

  hoverCheck(point: Point): boolean {
    const {
      cache: { x, y, w, h },
    } = this

    return checkPointIsInRect(point, { x: x!, y: y!, w: w!, h: h! })
  }
}

export default Text
