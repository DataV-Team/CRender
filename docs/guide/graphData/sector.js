export default function (render) {
<<<<<<< HEAD
  const { area: [w, h] } = render

  return {
    name: 'sector',
=======
  const {
    area: [w, h],
  } = render

  return {
    name: 'Sector',
>>>>>>> dev
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      rx: w / 2,
      ry: h / 2,
      r: 60,
      startAngle: 0,
<<<<<<< HEAD
      endAngle: Math.PI / 3
=======
      endAngle: Math.PI / 3,
>>>>>>> dev
    },
    style: {
      fill: '#9ce5f4',
      shadowBlur: 0,
      rotate: 0,
      shadowColor: '#66eece',
<<<<<<< HEAD
      hoverCursor: 'pointer'
    },
    mouseEnter (e) {
      this.animation('shape', { endAngle: Math.PI, r: 70 }, true)
      this.animation('style', { shadowBlur: 20, rotate: -30, lineWidth: 30 })
    },
    mouseOuter (e) {
      this.animation('shape', { endAngle: Math.PI / 3, r: 60 }, true)
      this.animation('style', { shadowBlur: 0, rotate: 0, lineWidth: 20 })
    }
=======
      hoverCursor: 'pointer',
    },
    onMouseEnter(e) {
      this.animation('shape', { endAngle: Math.PI, r: 70 }, true)
      this.animation('style', { shadowBlur: 20, rotate: -30, lineWidth: 30 })
    },
    onMouseOuter(e) {
      this.animation('shape', { endAngle: Math.PI / 3, r: 60 }, true)
      this.animation('style', { shadowBlur: 0, rotate: 0, lineWidth: 20 })
    },
>>>>>>> dev
  }
}
