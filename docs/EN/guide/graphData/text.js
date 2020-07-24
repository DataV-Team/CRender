export default function (render) {
  const { area: [w, h] } = render

  const centerPoint = [w / 2, h / 2]

  const hoverRect = [w / 2 - 100, h / 2 - 30 ,200, 60]

  return {
    name: 'text',
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    hoverRect,
    shape: {
      content: 'CRender',
      position: centerPoint,
      maxWidth: 200
    },
    style: {
      fill: '#9ce5f4',
      fontSize: 50,
      shadowBlur: 0,
      rotate: 0,
      shadowColor: '#66eece',
      hoverCursor: 'pointer',
      scale: [1, 1],
      rotate: 0
    },
    mouseEnter (e) {
      this.animation('style', { shadowBlur: 20, scale: [1.5, 1.5], rotate: 30 })
    },
    mouseOuter (e) {
      this.animation('style', { shadowBlur: 0, scale: [1, 1], rotate: 0 })
    },
    moved (e, { hoverRect }) {
      const { movementX, movementY } = e

      hoverRect[0] += movementX
      hoverRect[1] += movementY
    }
  }
}
