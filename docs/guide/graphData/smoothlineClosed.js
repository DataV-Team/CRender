import { getCircleRadianPoint } from '../../../es/utils/graphs'

function getPoints(radius, centerPoint, pointNum) {
  const PIDived = (Math.PI * 2) / pointNum

  const points = new Array(pointNum)
    .fill('')
    .map((foo, i) => getCircleRadianPoint(...centerPoint, radius, PIDived * i))

  return points
}

export default function (render) {
  const {
    area: [w, h],
  } = render

  const radius = h / 3
  const centerPoint = [w / 2, h / 2]

  return {
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      points: getPoints(radius, centerPoint, 3),
      close: true,
    },
    style: {
      fill: '#9ce5f4',
      shadowBlur: 0,
      lineWidth: 10,
      shadowColor: '#66eece',
      hoverCursor: 'pointer',
    },
    mouseEnter(e) {
      this.animation('style', { lineWidth: 20, shadowBlur: 20, rotate: 120 })
    },
    mouseOuter(e) {
      this.animation('style', { lineWidth: 10, shadowBlur: 0, rotate: 0 })
    },
    setGraphCenter(e, { style }) {
      if (e) {
        const { movementX, movementY } = e
        const [cx, cy] = style.graphCenter

        style.graphCenter = [cx + movementX, cy + movementY]
      } else {
        style.graphCenter = [...centerPoint]
      }
    },
  }
}
