export default function (render) {
<<<<<<< HEAD
  const { area: [w, h] } = render

  const top = h / 3
  const bottom = h / 3 * 2
=======
  const {
    area: [w, h],
  } = render

  const top = h / 3
  const bottom = (h / 3) * 2
>>>>>>> dev
  const gap = w / 10

  const beginX = w / 2 - gap * 2

<<<<<<< HEAD
  const points = new Array(5).fill('').map((t, i) =>
    [beginX + gap * i, i % 2 === 0 ? top : bottom])

  return {
    name: 'smoothline',
=======
  const points = new Array(5).fill('').map((t, i) => [beginX + gap * i, i % 2 === 0 ? top : bottom])

  return {
    name: 'Smoothline',
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
      stroke: '#9ce5f4',
      shadowBlur: 0,
      lineWidth: 10,
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
