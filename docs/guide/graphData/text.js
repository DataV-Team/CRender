export default function (render) {
  const {
    area: [w, h],
  } = render

  const centerPoint = [w / 2, h / 2]

  return {
    name: 'Text',
    animationCurve: 'easeOutBounce',
    hover: true,
    drag: true,
    shape: {
      content: 'CRender',
      position: centerPoint,
      maxWidth: 200,
    },
    style: {
      fill: '#9ce5f4',
      fontSize: 50,
      shadowBlur: 0,
      rotate: 0,
      shadowColor: '#66eece',
      hoverCursor: 'pointer',
      scale: [1, 1],
      rotate: 0,
    },
    onMouseEnter() {
      this.animation('style', { shadowBlur: 20, scale: [1.5, 1.5] })
    },
    onMouseOuter() {
      this.animation('style', { shadowBlur: 0, scale: [1, 1] })
    },
  }
}
