import React, { useRef, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
import './dev.less'
import CRender, { GRAPHS } from './src/index'

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

    const graph = new GRAPHS.Text({
      animationCurve: 'easeOutElastic',
      shape: {
        content: 'top\nmiddle\nbottom',
        position: [w / 2, h / 2],
      },
      hover: true,
      drag: true,
      style: {
        stroke: 'black',
        fontSize: 30,
        fontWeight: 'normal',
        textAlign: 'start',
        textBaseline: 'top',
      },
    })

    render.add(graph)

    await graph.animation('shape', {
      position: [100, 100],
    })

    await graph.animation('shape', {
      position: [w / 2, h / 2],
    })

    render.delAllGraph()
  }, [])

  useEffect(() => {
    renderTest()
  }, [renderTest])

  return <canvas ref={canvas} />
}

ReactDOM.render(<Dev />, document.getElementById('root'))

export default null
