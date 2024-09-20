import { definePlugin } from '@tsslint/config'

/**
 * @param {RegExp} pattern
 */
export function createIgnorePlugin(pattern) {
  return definePlugin(({ languageService }) => ({
    resolveDiagnostics(fileName, results) {
      const sourceFile = languageService.getProgram()?.getSourceFile(fileName)
      if (!sourceFile) {
        return results
      }

      const comments = [...sourceFile.text.matchAll(pattern)]
      const lines = new Set(comments.map(comment => sourceFile.getLineAndCharacterOfPosition(comment.index).line))

      return results.filter(error => error.source !== 'tsslint' || !lines.has(sourceFile.getLineAndCharacterOfPosition(error.start).line - 1))
    },
  }))
}
