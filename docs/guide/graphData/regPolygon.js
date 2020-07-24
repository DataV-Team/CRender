export default function (render) {
<<<<<<< HEAD
  const { area: [w, h] } = render

  return {
    name: 'regPolygon',
=======
  const {
    area: [w, h],
  } = render

  return {
    name: 'RegPolygon',
>>>>>>> dev
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      rx: w / 2,
      ry: h / 2,
      r: 60,
<<<<<<< HEAD
      side: 6
=======
      side: 6,
>>>>>>> dev
    },
    style: {
      fill: '#9ce5f4',
      hoverCursor: 'pointer',
      shadowBlur: 0,
      rotate: 0,
<<<<<<< HEAD
      shadowColor: '#66eece'
    },
    mouseEnter (e) {
      this.animation('shape', { endAngle: Math.PI, r: 100 }, true)
      this.animation('style', { shadowBlur: 20, rotate: 180 })
    },
    mouseOuter (e) {
      this.animation('shape', { endAngle: Math.PI / 3, r: 60 }, true)
      this.animation('style', { shadowBlur: 0, rotate: 0 })
    }
  }
}
=======
      shadowColor: '#66eece',
    },
    onMouseEnter(e) {
      this.animation('shape', { endAngle: Math.PI, r: 100 }, true)
      this.animation('style', { shadowBlur: 20, rotate: 180 })
    },
    onMouseOuter(e) {
      this.animation('shape', { endAngle: Math.PI / 3, r: 60 }, true)
      this.animation('style', { shadowBlur: 0, rotate: 0 })
    },
  }
}
>>>>>>> dev
