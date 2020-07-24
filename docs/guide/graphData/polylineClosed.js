<<<<<<< HEAD
import { deepClone } from '../../CRender/plugin/util'

export default function (render) {
  const { area: [w, h] } = render

  const top = h / 3
  const bottom = h / 3 * 2
=======
import { deepClone } from '../../../es/utils/common'

export default function (render) {
  const {
    area: [w, h],
  } = render

  const top = h / 3
  const bottom = (h / 3) * 2
>>>>>>> dev
  const gap = w / 10

  const beginX = w / 2 - gap * 2

<<<<<<< HEAD
  const points = new Array(5).fill('').map((t, i) =>
    [beginX + gap * i, i % 2 === 0 ? top : bottom])
=======
  const points = new Array(5).fill('').map((t, i) => [beginX + gap * i, i % 2 === 0 ? top : bottom])
>>>>>>> dev

  points[2][1] += top * 1.3

  return {
<<<<<<< HEAD
    name: 'polyline',
=======
    name: 'Polyline',
>>>>>>> dev
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      points,
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
=======
      hoverCursor: 'pointer',
    },
    onMouseEnter(e) {
>>>>>>> dev
      this.animation('style', { shadowBlur: 20 }, true)
      const pointsCloned = deepClone(this.shape.points)
      pointsCloned[2][1] += top * 0.3
      this.animation('shape', { points: pointsCloned })
    },
<<<<<<< HEAD
    mouseOuter (e) {
=======
    onMouseOuter(e) {
>>>>>>> dev
      this.animation('style', { shadowBlur: 0 }, true)
      const pointsCloned = deepClone(this.shape.points)
      pointsCloned[2][1] -= top * 0.3
      this.animation('shape', { points: pointsCloned })
<<<<<<< HEAD
    }
  }
}
=======
    },
  }
}
>>>>>>> dev
