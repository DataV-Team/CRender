export default function (render) {
<<<<<<< HEAD
  const { area: [w, h] } = render

  return {
    name: 'ring',
=======
  const {
    area: [w, h],
  } = render

  return {
    name: 'Ring',
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
      stroke: '#9ce5f4',
      lineWidth: 20,
      hoverCursor: 'pointer',
      shadowBlur: 0,
<<<<<<< HEAD
      shadowColor: '#66eece'
    },
    mouseEnter (e) {
      this.animation('style', { shadowBlur: 20, lineWidth: 30 })
    },
    mouseOuter (e) {
      this.animation('style', { shadowBlur: 0, lineWidth: 20 })
    }
  }
}
=======
      shadowColor: '#66eece',
    },
    onMouseEnter(e) {
      this.animation('style', { shadowBlur: 20, lineWidth: 30 })
    },
    onMouseOuter(e) {
      this.animation('style', { shadowBlur: 0, lineWidth: 20 })
    },
  }
}
>>>>>>> dev
