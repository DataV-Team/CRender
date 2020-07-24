export default function (render) {
  const { area: [w, h] } = render

  return {
    name: 'sector',
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      rx: w / 2,
      ry: h / 2,
      r: 60,
      startAngle: 0,
      endAngle: Math.PI / 3
    },
    style: {
      fill: '#9ce5f4',
      shadowBlur: 0,
      rotate: 0,
      shadowColor: '#66eece',
      hoverCursor: 'pointer'
    },
    mouseEnter (e) {
      this.animation('shape', { endAngle: Math.PI, r: 70 }, true)
      this.animation('style', { shadowBlur: 20, rotate: -30, lineWidth: 30 })
    },
    mouseOuter (e) {
      this.animation('shape', { endAngle: Math.PI / 3, r: 60 }, true)
      this.animation('style', { shadowBlur: 0, rotate: 0, lineWidth: 20 })
    }
  }
}
