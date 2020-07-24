export default function (render) {
<<<<<<< HEAD
  const { area: [w, h] } = render
=======
  const {
    area: [w, h],
  } = render
>>>>>>> dev

  const rectWidth = 200
  const rectHeight = 50

  return {
<<<<<<< HEAD
    name: 'rect',
=======
    name: 'Rect',
>>>>>>> dev
    animationCurve: 'easeOutBack',
    hover: true,
    drag: true,
    shape: {
      x: w / 2 - rectWidth / 2,
      y: h / 2 - rectHeight / 2,
      w: rectWidth,
<<<<<<< HEAD
      h: rectHeight
=======
      h: rectHeight,
>>>>>>> dev
    },
    style: {
      fill: '#9ce5f4',
      shadowBlur: 0,
      shadowColor: '#66eece',
      hoverCursor: 'pointer',
<<<<<<< HEAD
      translate: [0, 0]
    },
    mouseEnter (e) {
      this.animation('shape', { w: 400 }, true)
      this.animation('style', { shadowBlur: 20, translate: [-100, 0] })
    },
    mouseOuter (e) {
      this.animation('shape', { w: 200 }, true)
      this.animation('style', { shadowBlur: 0, translate: [0, 0] })
    }
  }
}
=======
      translate: [0, 0],
    },
    onMouseEnter(e) {
      this.animation('shape', { w: 400 }, true)
      this.animation('style', { shadowBlur: 20, translate: [-100, 0] })
    },
    onMouseOuter(e) {
      this.animation('shape', { w: 200 }, true)
      this.animation('style', { shadowBlur: 0, translate: [0, 0] })
    },
  }
}
>>>>>>> dev
