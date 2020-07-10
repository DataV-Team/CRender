import { fileForEach } from '@jiaminghi/fs'
import print from '@jiaminghi/print'
import { emptyDir, put, mkDir } from '@jiaminghi/ftp'
import { getCmdParams } from '@jiaminghi/utils-node'
import Client from 'ftp'

const DIST_PATH = './docs/.vuepress/dist'

type Config = {
  host: string
  user: string
  pass: string
}

let config: Config | null = null

try {
  config = require('./config')
} catch (e) {
  config = null
}

const ftp = new Client()

ftp.on('ready', async _ => {
  print.tip('FTP connected!')

  const isEmpty = await emptyDir(ftp, '/')

  if (!isEmpty) {
    print.error('Exception in emptyDir!')

    return false
  }

  let status = true

  await fileForEach(DIST_PATH, async src => {
    const destPath = '/' + src.split('dist/')[1]
    const destDir = destPath.split('/').slice(0, -1).join('/')

    await mkDir(ftp, destDir, true)

    print.tip('Upload: ' + destPath)

    if (!(await put(ftp, src, destPath))) {
      status = false

      print.error('Exception in upload ' + destPath)
    }
  })

  if (status) {
    print.yellow('-------------------------------------')
    print.success('    Automatic Deployment Success!    ')
    print.yellow('-------------------------------------')
  }

  ftp.destroy()
})

ftp.on('greeting', _ => {
  print.tip('FTP greeting')
})
ftp.on('close', _ => {
  print.tip('FTP close')
})
ftp.on('end', _ => {
  print.tip('FTP end')
})
ftp.on('error', _ => {
  print.tip('FTP error')
})

function deploy(): void {
  const { host, user, pass } = config || getCmdParams()

  if (!host || !user || !pass) {
    return print.error('Upload Dist to FTP Missing Parameters!')
  }

  print.tip('Start Upload!')

  ftp.connect({
    host,
    user,
    password: pass,
  })
}

deploy()
