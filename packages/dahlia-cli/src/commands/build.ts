import { Command } from '@oclif/command'

import { reactScriptsModulePath } from '../utils/paths'
import { prepare } from '../utils/prepare'

import { disableCheckRequiredFilesPath } from '../utils/disableCheckRequiredFilesPath'
import { disableCheckTS } from '../utils/disableCheckTS'
import { customizePaths } from '../utils/customizePaths'
import { customizeWebpack } from '../utils/customizeWebpack'

export default class Build extends Command {
  static description = 'Build project for production'
  static aliases = ['b']
  static examples = [`$ dh build`]

  async run() {
    process.env.NODE_ENV = 'production'

    prepare()

    customizePaths()
    customizeWebpack()
    disableCheckRequiredFilesPath()
    disableCheckTS()

    // TODO: hack
    customizePaths()

    // run original script
    require(`${reactScriptsModulePath}/scripts/build`)
  }
}
