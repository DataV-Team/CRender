export default function (render) {
<<<<<<< HEAD
  const { area: [w, h] } = render

  return {
    name: 'circle',
=======
  const {
    area: [w, h],
  } = render

  return {
    name: 'Circle',
>>>>>>> dev
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      rx: w / 2,
      ry: h / 2,
<<<<<<< HEAD
      r: 50
=======
      r: 50,
>>>>>>> dev
    },
    style: {
      fill: '#9ce5f4',
      shadowBlur: 0,
      shadowColor: '#66eece',
<<<<<<< HEAD
      hoverCursor: 'pointer'
    },
    mouseEnter (e) {
      this.animation('shape', { r: 70 }, true)
      this.animation('style', { shadowBlur: 20 })
    },
    mouseOuter (e) {
      this.animation('shape', { r: 50 }, true)
      this.animation('style', { shadowBlur: 0 })
    }
  }
}
=======
      hoverCursor: 'pointer',
    },
    onMouseEnter(e) {
      this.animation('shape', { r: 70 }, true)
      this.animation('style', { shadowBlur: 20 })
    },
    onMouseOuter(e) {
      this.animation('shape', { r: 50 }, true)
      this.animation('style', { shadowBlur: 0 })
    },
  }
}
>>>>>>> dev
