<template>
  <div class="demo">
    <canvas :ref="ref" />
  </div>
</template>

<script>
import CRender, { GRAPHS } from '../../../es'

export default {
  name: 'Demo',
  props: ['graph'],
  data() {
    return {
      ref: `${Math.random().toString().slice(1, 11)}canvas`,
    }
  },
  methods: {
    async init() {
      const { graph, $refs, ref } = this
      if (!graph) return

      const canvas = $refs[ref]
      const render = new CRender(this.$refs[ref])
      const config = graph(render)

      render.add(new GRAPHS[config.name](config))
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
