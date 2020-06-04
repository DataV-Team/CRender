export default function (render) {
  const {
    area: [w, h],
  } = render

  const top = h / 3
  const bottom = (h / 3) * 2
  const gap = w / 10

  const beginX = w / 2 - gap * 2

  const points = new Array(5).fill('').map((t, i) => [beginX + gap * i, i % 2 === 0 ? top : bottom])

  return {
    name: 'smoothline',
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      points,
    },
    style: {
      stroke: '#9ce5f4',
      shadowBlur: 0,
      lineWidth: 10,
      shadowColor: '#66eece',
      hoverCursor: 'pointer',
    },
    mouseEnter(e) {
      this.animation('style', { lineWidth: 20, shadowBlur: 20 })
    },
    mouseOuter(e) {
      this.animation('style', { lineWidth: 10, shadowBlur: 0 })
    },
  }
}
