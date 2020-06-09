import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './dev.less'
import CRender from './src/index'
import Graph from './src/core/graph.class'

function randomNum(start: number, end: number, fixed = 0): number {
  const differ = end - start
  const random = Math.random()

  return +(start + differ * random).toFixed(fixed)
}

const Dev: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const render = new CRender(canvas.current!)
    const [w, h] = render.area

    const circles: Graph[] = []

    console.time('test')

    for (let i = 0; i < 1000; i++) {
      circles.push(
        render.add(
          {
            name: 'circle',
            shape: {
              rx: randomNum(0, w),
              ry: randomNum(0, h),
              r: randomNum(10, 50),
            },
            style: {
              stroke: 'red',
              fill: 'transparent',
            },
          },
          true
        )!
      )
    }

    render.drawAllGraph()

    console.timeEnd('test')

    console.warn(circles)
  })

  return <canvas ref={canvas} />
}

ReactDOM.render(<Dev />, document.getElementById('root'))

export default null
