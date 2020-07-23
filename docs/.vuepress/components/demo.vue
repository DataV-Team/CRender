<template>
  <div class="demo">
    <canvas ref="canvas" />
  </div>
</template>

<script>
import canvasMixin from '../mixins/canvasMixin.js'

import CRender from '../../../es'

export default {
  name: 'Demo',
  props: ['graph'],
  mixins: [canvasMixin],
  data() {
    return {}
  },
  methods: {
    async init() {
      const { initCanvas, graph } = this

      await initCanvas('canvas')

      const render = new CRender(this.$refs['canvas'])

      if (!config) return

      const item = render.add(graph)
    },
  },
  mounted() {
    const { init } = this

    init()
  },
}
</script>

<style lang="less">
.demo {
  height: 200px;
  box-shadow: 0 0 3px #46bd87;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
