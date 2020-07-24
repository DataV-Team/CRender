<<<<<<< HEAD
import { getCircleRadianPoint } from '../../CRender/plugin/util'

function getPoints (radius, centerPoint, pointNum) {
  const PIDived = Math.PI * 2 / pointNum

  const points = new Array(pointNum).fill('')
    .map((foo, i) =>
      getCircleRadianPoint(...centerPoint, radius, PIDived * i)
    )
=======
import { getCircleRadianPoint } from '../../../es/utils/graphs'

function getPoints(radius, centerPoint, pointNum) {
  const PIDived = (Math.PI * 2) / pointNum

  const points = new Array(pointNum)
    .fill('')
    .map((foo, i) => getCircleRadianPoint(...centerPoint, radius, PIDived * i))
>>>>>>> dev

  return points
}

export default function (render) {
<<<<<<< HEAD
  const { area: [w, h] } = render
=======
  const {
    area: [w, h],
  } = render
>>>>>>> dev

  const radius = h / 3
  const centerPoint = [w / 2, h / 2]

  return {
<<<<<<< HEAD
    name: 'smoothline',
=======
    name: 'Smoothline',
>>>>>>> dev
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      points: getPoints(radius, centerPoint, 3),
<<<<<<< HEAD
      close: true
=======
      close: true,
>>>>>>> dev
    },
    style: {
      fill: '#9ce5f4',
      shadowBlur: 0,
      lineWidth: 10,
      shadowColor: '#66eece',
<<<<<<< HEAD
      hoverCursor: 'pointer'
    },
    mouseEnter (e) {
      this.animation('style', { lineWidth: 20, shadowBlur: 20, rotate: 120 })
    },
    mouseOuter (e) {
      this.animation('style', { lineWidth: 10, shadowBlur: 0, rotate: 0 })
    },
    setGraphCenter (e, { style }) {
=======
      hoverCursor: 'pointer',
    },
    onMouseEnter(e) {
      this.animation('style', { lineWidth: 20, shadowBlur: 20, rotate: 120 })
    },
    onMouseOuter(e) {
      this.animation('style', { lineWidth: 10, shadowBlur: 0, rotate: 0 })
    },
    setGraphCenter(e) {
      const { style } = this

>>>>>>> dev
      if (e) {
        const { movementX, movementY } = e
        const [cx, cy] = style.graphCenter

        style.graphCenter = [cx + movementX, cy + movementY]
      } else {
        style.graphCenter = [...centerPoint]
      }
<<<<<<< HEAD
    }
  }
}
=======
    },
  }
}
>>>>>>> dev
