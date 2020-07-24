export default function (render) {
  const {
    area: [w, h],
  } = render

  return {
    name: 'Circle',
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      rx: w / 2,
      ry: h / 2,
      r: 50,
    },
    style: {
      fill: '#9ce5f4',
      shadowBlur: 0,
      shadowColor: '#66eece',
      hoverCursor: 'pointer',
    },
    onMouseEnter() {
      this.animation('shape', { r: 70 }, true)
      this.animation('style', { shadowBlur: 20 })
    },
    onMouseOuter() {
      this.animation('shape', { r: 50 }, true)
      this.animation('style', { shadowBlur: 0 })
    },
  }
}
