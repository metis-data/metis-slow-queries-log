const core = require('@actions/core')

async function main() {
  const lastTag = core.getInput('tag')

  let version = lastTag.replace('v', '')

  version = version.split('.').map(i => Number.parseInt(i))
  core.info(version[0])
  core.info(version[1])
  version[2]++

  core.setOutput('tag', `v${version.join('.')}`)
}

main()
