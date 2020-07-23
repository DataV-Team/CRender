export default function (render) {
  const {
    area: [w, h],
  } = render

  const rectWidth = 200
  const rectHeight = 50

  return {
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      x: w / 2 - rectWidth / 2,
      y: h / 2 - rectHeight / 2,
      w: rectWidth,
      h: rectHeight,
    },
    style: {
      fill: '#9ce5f4',
      shadowBlur: 0,
      shadowColor: '#66eece',
      hoverCursor: 'pointer',
      translate: [0, 0],
    },
    mouseEnter(e) {
      this.animation('shape', { w: 400 }, true)
      this.animation('style', { shadowBlur: 20, translate: [-100, 0] })
    },
    mouseOuter(e) {
      this.animation('shape', { w: 200 }, true)
      this.animation('style', { shadowBlur: 0, translate: [0, 0] })
    },
  }
}
