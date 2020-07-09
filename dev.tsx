import React, { useRef, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import './dev.less'
import CRender from './src/index'

function randomNum(start: number, end: number, fixed = 0): number {
  const differ = end - start
  const random = Math.random()

  return +(start + differ * random).toFixed(fixed)
}

const Dev: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null)

  const renderTest = useCallback(async () => {
    const render = new CRender(canvas.current!)
    const [w, h] = render.area

    new Array(1000).fill(0).map(
      _ =>
        render.add({
          name: 'circle',
          animationCurve: 'easeOutBack',
          shape: {
            rx: randomNum(0, w),
            ry: randomNum(0, h),
            r: randomNum(10, 50),
          },
          style: {
            stroke: 'red',
            fill: 'transparent',
          },
        })!
    )

    await render.drawAllGraph()
  }, [])

  useEffect(() => {
    renderTest()
  }, [renderTest])

  return <canvas ref={canvas} />
}

ReactDOM.render(<Dev />, document.getElementById('root'))

export default null
