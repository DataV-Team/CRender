export default function (render) {
<<<<<<< HEAD
  const { area: [w, h] } = render

  return {
    name: 'ellipse',
=======
  const {
    area: [w, h],
  } = render

  return {
    name: 'Ellipse',
>>>>>>> dev
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      rx: w / 2,
      ry: h / 2,
      hr: 80,
<<<<<<< HEAD
      vr: 30
=======
      vr: 30,
>>>>>>> dev
    },
    style: {
      fill: '#9ce5f4',
      shadowBlur: 0,
      shadowColor: '#66eece',
      scale: [1, 1],
<<<<<<< HEAD
      hoverCursor: 'pointer'
    },
    mouseEnter (e) {
      this.animation('style', { scale: [1.5, 1.5], shadowBlur: 20 })
    },
    mouseOuter (e) {
      this.animation('style', { scale: [1, 1], shadowBlur: 0 })
    }
  }
}
=======
      hoverCursor: 'pointer',
    },
    onMouseEnter(e) {
      this.animation('style', { scale: [1.5, 1.5], shadowBlur: 20 })
    },
    onMouseOuter(e) {
      this.animation('style', { scale: [1, 1], shadowBlur: 0 })
    },
  }
}
>>>>>>> dev
