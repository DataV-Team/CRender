<template>
  <div class="dev">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import CRender from '../../CRender'

export default {
  name: 'DEV',
  data () {
    return {
      render: null
    }
  },
  methods: {
    async start () {
      const { render, randomNum } = this

      const { area: [w, h] } = render

      const graphs = new Array(20).fill(0).map(foo => render.add({
        name: 'ring',
        animationCurve: 'easeOutBack',
        hover: true,
        drag: true,
        shape: {
          rx: w / 2,
          ry: h / 2,
          r: 50
        },
        style: {
          stroke: '#9ce5f4',
          lineWidth: 20,
          hoverCursor: 'pointer',
          shadowBlur: 0,
          shadowColor: '#66eece'
        }
      }))

      for (let i = 0; i < 999; i++) {
        await new Promise(resolve => setTimeout(resolve, 100))

        graphs.forEach(graph => graph.animationEnd())

        graphs.forEach(graph => graph.animation('shape', {
          rx: randomNum(0, w),
          ry: randomNum(0, h),
          r: randomNum(10, 50)
        }))
      }

      console.warn(graphs)
    },
    randomNum (minNum, maxNum) { 
      switch(arguments.length) { 
        case 1:
          return parseInt(Math.random() * minNum + 1, 10)
        break
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum,10)
        break
        default:
            return 0
        break
      }
    }
  },
  mounted () {
    const canvas = this.$refs['canvas']

    this.render = new CRender(canvas)

    this.start()
  }
}
</script>

<style lang="less">
.dev {
  width: 100%;
  height: 300px;
  box-shadow: 0 0 3px green;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
