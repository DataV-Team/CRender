export default function (render) {
  const {
    area: [w, h],
  } = render

  return {
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      rx: w / 2,
      ry: h / 2,
      r: 60,
      side: 6,
    },
    style: {
      fill: '#9ce5f4',
      hoverCursor: 'pointer',
      shadowBlur: 0,
      rotate: 0,
      shadowColor: '#66eece',
    },
    mouseEnter(e) {
      this.animation('shape', { endAngle: Math.PI, r: 100 }, true)
      this.animation('style', { shadowBlur: 20, rotate: 180 })
    },
    mouseOuter(e) {
      this.animation('shape', { endAngle: Math.PI / 3, r: 60 }, true)
      this.animation('style', { shadowBlur: 0, rotate: 0 })
    },
  }
}
