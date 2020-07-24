export default function (render) {
  const {
    area: [w, h],
  } = render

  return {
    name: 'Arc',
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      rx: w / 2,
      ry: h / 2,
      r: 60,
      startAngle: 0,
      endAngle: Math.PI / 3,
    },
    style: {
      stroke: '#9ce5f4',
      lineWidth: 20,
      shadowBlur: 0,
      rotate: 0,
      shadowColor: '#66eece',
      hoverCursor: 'pointer',
    },
    onMouseEnter() {
      this.animation('shape', { endAngle: Math.PI }, true)
      this.animation('style', { shadowBlur: 20, rotate: -30, lineWidth: 30 })
    },
    onMouseOuter() {
      this.animation('shape', { endAngle: Math.PI / 3 }, true)
      this.animation('style', { shadowBlur: 0, rotate: 0, lineWidth: 20 })
    },
  }
}
