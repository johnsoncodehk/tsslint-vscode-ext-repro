import { defineConfig } from '@tsslint/config'

import { typescriptEslint } from './configs/typescript-eslint.js'
import { createIgnorePlugin } from './plugins/ignore.js'

export async function linter() {
  return defineConfig({
    rules: {
      ...(await typescriptEslint()).rules,
    },
    plugins: [
      createIgnorePlugin(/\/\/ @tsslint-ignore/g),
    ],
  })
}
