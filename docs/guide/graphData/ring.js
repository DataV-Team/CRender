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
      r: 50,
    },
    style: {
      stroke: '#9ce5f4',
      lineWidth: 20,
      hoverCursor: 'pointer',
      shadowBlur: 0,
      shadowColor: '#66eece',
    },
    mouseEnter(e) {
      this.animation('style', { shadowBlur: 20, lineWidth: 30 })
    },
    mouseOuter(e) {
      this.animation('style', { shadowBlur: 0, lineWidth: 20 })
    },
  }
}
