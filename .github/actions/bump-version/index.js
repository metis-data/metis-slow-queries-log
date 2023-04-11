const core = require('@actions/core')

async function main() {
  const lastTag = core.getInput('tag')
  core.info('hellooo!!!')
  core.info(lastTag)
  let version = lastTag.replace('v', '')
  core.info(version)
  version = version.split('.').map(i => Number.parseInt(i))
  version[2]++

  core.setOutput('tag', `v${version.join('.')}`)
}

main()
