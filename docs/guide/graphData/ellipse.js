import { Ellipse } from '../../../lib'

export default function (render) {
  const {
    area: [w, h],
  } = render

  return new Ellipse({
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      rx: w / 2,
      ry: h / 2,
      hr: 80,
      vr: 30,
    },
    style: {
      fill: '#9ce5f4',
      shadowBlur: 0,
      shadowColor: '#66eece',
      scale: [1, 1],
      hoverCursor: 'pointer',
    },
    mouseEnter(e) {
      this.animation('style', { scale: [1.5, 1.5], shadowBlur: 20 })
    },
    mouseOuter(e) {
      this.animation('style', { scale: [1, 1], shadowBlur: 0 })
    },
  })
}
