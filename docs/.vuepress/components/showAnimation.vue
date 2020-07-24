<template>
  <div class="show-animation">
    <canvas class="canvas" ref="canvas" @click="animation" />
  </div>
</template>

<script>
import CRender from '../../CRender'

export default {
  name: 'ShowAnimation',
  data () {
    return {
      render: null,

      playing: false,

      fragment1Ring1: null,
      fragment1Ring2: null,
      fragment1Polyline1: null,
      fragment1Polyline2: null,

      fragment2Ring1: null,
      fragment2Ring2: null,
      fragment2Arc1: null,
      fragment2Arc2: null,
      fragment2Arc3: null,
      fragment2Arc4: null,
      fragment2Ring12: null,
      fragment2Ring22: null,

      fragment3Circle1: null,
      fragment3Circle2: null,

      fragment5Rings: [],
      fragment5Text: null,
      fragment5Polyline1: null,

      color: ['#e86830', '#e83a30', '#e8308c', '#8930e8', '#30c9e8', '#30e8bd', '#e8e230']
    }
  },
  methods: {
    init () {
      const { $refs, animation } = this

      this.render = new CRender($refs['canvas'])

      animation()
    },
    async animation () {
      const { render, playing } = this

      if (playing) return

      this.playing = true

      render.delAllGraph()

      await this.fragment1(render)

      await this.fragment2(render)

      await this.fragment3(render)

      await this.fragment4(render)

      await this.fragment5(render)

      this.playing = false
    },
    fragment1 (render) {
      const [w, h] = render.area

      const fragment1Ring1 = this.fragment1Ring1 = render.add({
        name: 'ring',
        animationCurve: 'easeInOutBack',
        shape: {
          rx: 0,
          ry: h / 2,
          r: 6
        },
        style: {
          stroke: '#eeca54',
          lineWidth: 10
        }
      })

      const fragment1Ring2 = this.fragment1Ring2 = render.add({
        name: 'ring',
        animationCurve: 'easeInOutBack',
        shape: {
          rx: w,
          ry: h / 2,
          r: 6
        },
        style: {
          stroke: '#eeca54',
          lineWidth: 10
        }
      })

      const fragment1Polyline1 = this.fragment1Polyline1 = render.add({
        name: 'polyline',
        animationCurve: 'easeInOutBack',
        shape: {
          points: [
            [-150, h / 2],
            [0, h / 2]
          ]
        },
        style: {
          stroke: '#eeca54',
          lineWidth: 1
        }
      })

      const fragment1Polyline2 = this.fragment1Polyline2 = render.add({
        name: 'polyline',
        animationCurve: 'easeInOutBack',
        shape: {
          points: [
            [w + 150, h / 2],
            [w, h / 2]
          ]
        },
        style: {
          stroke: '#eeca54',
          lineWidth: 1
        }
      })

      fragment1Ring1.animation('shape', { rx: w / 2 - 80 }, true)
      fragment1Ring2.animation('shape', { rx: w / 2 + 80 }, true)

      fragment1Polyline1.animation('shape', {
        points: [
          [w / 2 - 230, h / 2],
          [w / 2 - 80, h / 2]
        ]
      }, true)

      fragment1Polyline2.animation('shape', {
        points: [
          [w / 2 + 230, h / 2],
          [w / 2 + 80, h / 2]
        ]
      }, true)

      return render.launchAnimation()
    },
    fragment2 (render) {
      const [w, h] = render.area

      this.fragment1Polyline1.animation('shape', {
        points: [
          [w / 2 - 80, h / 2],
          [w / 2 - 80, h / 2]
        ]
      }, true)

      this.fragment1Polyline2.animation('shape', {
        points: [
          [w / 2 + 80, h / 2],
          [w / 2 + 80, h / 2]
        ]
      }, true)

      this.fragment1Ring1.animationFrame = 60
      this.fragment1Ring1.animation('shape', { r: 20 }, true)

      this.fragment1Ring1.animation('style', {
        opacity: 0,
        lineWidth: 0.5
      }, true)

      this.fragment1Ring2.animationFrame = 60
      this.fragment1Ring2.animation('shape', { r: 20 }, true)

      this.fragment1Ring2.animation('style', {
        opacity: 0,
        lineWidth: 0.5
      }, true)

      const fragment2Ring1 = this.fragment2Ring1 = render.add({
        name: 'ring',
        animationCurve: 'easeOutCubic',
        animationFrame: 60,
        shape: {
          rx: w / 2 - 80,
          ry: h / 2,
          r: 6
        },
        style: {
          stroke: '#ee66aa',
          lineWidth: 1
        }
      })

      const fragment2Ring2 = this.fragment2Ring2 = render.add({
        name: 'ring',
        animationCurve: 'easeOutCubic',
        animationFrame: 60,
        shape: {
          rx: w / 2 + 80,
          ry: h / 2,
          r: 6
        },
        style: {
          stroke: '#ee66aa',
          lineWidth: 1
        }
      })

      fragment2Ring1.animation('shape', { r: 30, }, true)
      fragment2Ring1.animation('style', { opacity: 0, }, true)

      fragment2Ring2.animation('shape', { r: 30, }, true)
      fragment2Ring2.animation('style', { opacity: 0, }, true)

      const fragment2Arc1 = this.fragment2Arc1 = render.add({
        name: 'arc',
        animationFrame: 90,
        animationCurve: 'easeOutCubic',
        shape: {
          rx: w / 2,
          ry: h / 2,
          r: 60,
          startAngle: -Math.PI,
          endAngle: -Math.PI + 0.01
        },
        style: {
          stroke: '#30c9e8',
          lineWidth: 2,
          rotate: 0
        }
      })

      const fragment2Arc2 = this.fragment2Arc2 = render.add({
        name: 'arc',
        animationFrame: 90,
        animationCurve: 'easeOutCubic',
        shape: {
          rx: w / 2,
          ry: h / 2,
          r: 60,
          startAngle: 0,
          endAngle: 0.01
        },
        style: {
          stroke: '#30c9e8',
          lineWidth: 2,
          rotate: 0
        }
      })

      const fragment2Arc3 = this.fragment2Arc3 = render.add({
        name: 'arc',
        animationFrame: 90,
        animationCurve: 'easeOutCubic',
        shape: {
          rx: w / 2,
          ry: h / 2,
          r: 100,
          startAngle: -Math.PI,
          endAngle: -Math.PI + 0.01
        },
        style: {
          stroke: '#eeca54',
          lineWidth: 2,
          lineCap: 'round',
          rotate: 0
        }
      })

      const fragment2Arc4 = this.fragment2Arc4 = render.add({
        name: 'arc',
        animationFrame: 90,
        animationCurve: 'easeOutCubic',
        shape: {
          rx: w / 2,
          ry: h / 2,
          r: 100,
          startAngle: 0,
          endAngle: 0.01
        },
        style: {
          stroke: '#eeca54',
          lineWidth: 2,
          lineCap: 'round',
          rotate: 0
        }
      })

      fragment2Arc1.animation('shape', {
        startAngle: -Math.PI,
        endAngle: 0
      }, true)

      fragment2Arc2.animation('shape', {
        startAngle: 0,
        endAngle: Math.PI
      }, true)

      fragment2Arc1.animation('style', { rotate: 360 }, true)

      fragment2Arc2.animation('style', { rotate: 360 }, true)

      fragment2Arc3.animation('shape', {
        startAngle: -Math.PI,
        endAngle: 0,
        r: 20
      }, true)

      fragment2Arc4.animation('shape', {
        startAngle: 0,
        endAngle: Math.PI,
        r: 20
      }, true)

      fragment2Arc3.animation('style', { rotate: 360 }, true)

      fragment2Arc4.animation('style', { rotate: 360 }, true)

      return render.launchAnimation()
    },
    fragment3 (render) {
      const [w, h] = render.area

      const fragment2Ring12 = this.fragment2Ring12 = render.add({
        name: 'ring',
        animationCurve: 'easeOutCubic',
        animationFrame: 60,
        shape: {
          rx: w / 2 - 60,
          ry: h / 2,
          r: 10
        },
        style: {
          stroke: '#c71f16',
          lineWidth: 1
        }
      })

      const fragment2Ring22 = this.fragment2Ring22 = render.add({
        name: 'ring',
        animationCurve: 'easeOutCubic',
        animationFrame: 60,
        shape: {
          rx: w / 2 + 60,
          ry: h / 2,
          r: 10
        },
        style: {
          stroke: '#c71f16',
          lineWidth: 1
        }
      })

      fragment2Ring12.animation('shape', { r: 40 }, true)
      fragment2Ring22.animation('shape', { r: 40 }, true)

      fragment2Ring12.animation('style', { opacity: 0 }, true)
      fragment2Ring22.animation('style', { opacity: 0 }, true)

      this.fragment2Arc1.animation('shape', { r: 100 }, true)
      this.fragment2Arc2.animation('shape', { r: 100 }, true)

      this.fragment2Arc3.animation('shape', { r: 10 }, true)
      this.fragment2Arc4.animation('shape', { r: 10 }, true)

      this.fragment2Arc1.animation('style', { opacity: 0 }, true)
      this.fragment2Arc2.animation('style', { opacity: 0 }, true)

      this.fragment2Arc3.animation('style', { opacity: 0 }, true)
      this.fragment2Arc4.animation('style', { opacity: 0 }, true)

      const fragment3Circle1 = this.fragment3Circle1 = render.add({
        name: 'circle',
        animationFrame: 90,
        animationCurve: 'easeInOutBack',
        shape: {
          rx: 0,
          ry: 0,
          r: 10
        },
        style: {
          fill: '#e9c752',
          graphCenter: [w / 2, h / 2],
          rotate: 30
        },
        setGraphCenter () {}
      })

      const fragment3Circle2 = this.fragment3Circle2 = render.add({
        name: 'circle',
        animationFrame: 90,
        animationCurve: 'easeInOutBack',
        shape: {
          rx: w,
          ry: h,
          r: 10
        },
        style: {
          fill: '#e9c752',
          graphCenter: [w / 2, h / 2]
        },
        setGraphCenter () {}
      })

      fragment3Circle1.animation('shape', { rx: w / 2, ry: h / 2 }, true)
      fragment3Circle2.animation('shape', { rx: w / 2, ry: h / 2 }, true)

      fragment3Circle1.animation('style', { rotate: 360 }, true)
      fragment3Circle2.animation('style', { rotate: 360 }, true)

      return render.launchAnimation()
    },
    fragment4 (render) {
      const [w, h] = render.area

      const randomXArea = [w / 2 - 80, w / 2 + 80]
      const randomYArea = [h / 2 - 80, h / 2 + 80]

      this.fragment3Circle1.attr('style', {
        fill: 'rgba(0, 0, 0, 0)',
        stroke: '#e9c752'
      })

      this.fragment3Circle2.attr('style', {
        fill: 'rgba(0, 0, 0, 0)',
        stroke: '#e9c752'
      })

      this.fragment3Circle1.animation('shape', { r: 50 }, true)
      this.fragment3Circle2.animation('shape', { r: 1 }, true)

      this.fragment3Circle1.animation('style', { opacity: 0 }, true)
      this.fragment3Circle2.animation('style', { opacity: 0 }, true)

      return render.launchAnimation()
    },
    fragment5 (render) {
      const { randomNum, color } = this

      const [w, h] = render.area

      const randomXArea = [w / 2 - 80, w / 2 + 80]
      const randomYArea = [h / 2 - 100, h / 2 + 100]

      this.fragment5Rings = new Array(10).fill(0).map(foo => {
        return render.add({
          name: 'ring',
          animationCurve: 'easeOutCubic',
          animationFrame: 150,
          shape: {
            rx: randomNum(...randomXArea),
            ry: randomNum(...randomYArea),
            r: 1
          },
          style: {
            stroke: color[randomNum(0, 6)]
          }
        })
      })

      this.fragment5Rings.forEach(ring => {
        ring.animation('shape', { r: randomNum(40, 50) }, true)
        ring.animation('style', { opacity: 0 }, true)
      })

      const fragment5Text = this.fragment5Text = render.add({
        name: 'text',
        animationCurve: 'easeOutBack',
        shape: {
          content: 'CRender',
          position: [w / 2, h / 2],
          maxWidth: 200
        },
        style: {
          fill: '#66d7ee',
          fontSize: 50,
          shadowBlur: 0,
          shadowColor: '#66eece',
          scale: [.5, .5],
          rotate: -90,
          opacity: 0
        }
      })

      fragment5Text.animation('style', {
        opacity: 1,
        rotate: 0,
        scale: [1.4, 1.4],
        shadowBlur: 20
      }, true)

      const fragment5Polyline1 = this.fragment1Polyline1 = render.add({
        name: 'polyline',
        animationCurve: 'easeOutBack',
        shape: {
          points: [
            [w / 2, h / 2],
            [w / 2, h / 2]
          ]
        },
        style: {
          lineWidth: 7,
          stroke: '#66d7ee',
          shadowColor: '#66eece',
          shadowBlur: 20
        }
      })

      fragment5Polyline1.animation('shape', {
        points: [
          [w / 2 - 200, h / 2 + 40],
          [w / 2 + 200, h / 2 + 40]
        ]
      }, true)

      return render.launchAnimation()
    },
    randomNum (minNum, maxNum) { 
      switch (arguments.length) { 
        case 1:
          return parseInt(Math.random() * minNum + 1, 10)
        break
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
        break
      } 
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less">
.show-animation {
  height: 300px;
  box-shadow: 0 0 3px #46bd87;

  .canvas {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
</style>
