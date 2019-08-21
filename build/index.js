const { emptyDir } = require('@jiaminghi/fs')
const print = require('./plugin/print')
const exec = require('./plugin/exec')

async function start () {
  const isEmpty = await emptyDir('./dist')

  if (!isEmpty) {
    print.error('Exception in emptyDir!')

    return
  }

  print.tip('After emptyDir!')

  const doBabel = await exec('babel -d lib/ src/')

  if (!doBabel) {
    print.error('Exception in babel')

    return
  }

  print.tip('After babel!')

  const browserifyMap = await exec('browserify build/entry.js > dist/crender.map.js --debug')

  if (!browserifyMap) {
    print.error('Exception in browserifyMap')

    return
  }

  print.tip('After browserify! (crender.map.js)')

  const browserifyMin = await exec('browserify build/entry.js > dist/crender.min.js')

  if (!browserifyMin) {
    print.error('Exception in browserifyMin')

    return
  }

  print.tip('After browserify! (crender.min.js)')

  const uglifyjs = await exec('uglifyjs dist/crender.min.js -o dist/crender.min.js')

  if (!uglifyjs) {
    print.error('Exception in uglifyjs')

    return
  }

  print.success('DONE!')
}

start()