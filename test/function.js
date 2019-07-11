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

  const browserify = await exec('browserify test/entry.js > dist/crender.js --debug')

  if (!browserify) {
    print.error('Exception in browserify')

    return
  }

  print.success('DONE!')
}

start()