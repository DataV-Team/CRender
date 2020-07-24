export default function (render) {
  const {
    area: [w, h],
  } = render

  const offsetX = w / 2
  const offsetY = h / 2

  const points = [
    // 起始点
    [-100 + offsetX, -50 + offsetY],
    // N组贝塞尔曲线数据
    [
      // 贝塞尔曲线控制点1，控制点2，结束点
      [0 + offsetX, -50 + offsetY],
      [0 + offsetX, 50 + offsetY],
      [100 + offsetX, 50 + offsetY],
    ],
  ]

  return {
    name: 'bezierCurve',
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      points,
    },
    style: {
      lineWidth: 10,
      stroke: '#9ce5f4',
      shadowBlur: 0,
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
