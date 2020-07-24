export default function (render) {
<<<<<<< HEAD
  const { area: [w, h] } = render
=======
  const {
    area: [w, h],
  } = render
>>>>>>> dev

  const offsetX = w / 2
  const offsetY = h / 2

  const points = [
    // 起始点
    [-100 + offsetX, -50 + offsetY],
    // N组贝塞尔曲线数据
    [
      // 贝塞尔曲线控制点1，控制点2，结束点
<<<<<<< HEAD
      [0  + offsetX, -50 + offsetY],
      [0  + offsetX, 50 + offsetY],
      [100  + offsetX, 50 + offsetY]
    ]
  ]

  return {
    name: 'bezierCurve',
=======
      [0 + offsetX, -50 + offsetY],
      [0 + offsetX, 50 + offsetY],
      [100 + offsetX, 50 + offsetY],
    ],
  ]

  return {
    name: 'BezierCurve',
>>>>>>> dev
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
<<<<<<< HEAD
      points
=======
      points,
>>>>>>> dev
    },
    style: {
      lineWidth: 10,
      stroke: '#9ce5f4',
      shadowBlur: 0,
      shadowColor: '#66eece',
<<<<<<< HEAD
      hoverCursor: 'pointer'
    },
    mouseEnter (e) {
      this.animation('style', { lineWidth: 20, shadowBlur: 20 })
    },
    mouseOuter (e) {
      this.animation('style', { lineWidth: 10, shadowBlur: 0 })
    }
  }
}
=======
      hoverCursor: 'pointer',
    },
    onMouseEnter(e) {
      this.animation('style', { lineWidth: 20, shadowBlur: 20 })
    },
    onMouseOuter(e) {
      this.animation('style', { lineWidth: 10, shadowBlur: 0 })
    },
  }
}
>>>>>>> dev
