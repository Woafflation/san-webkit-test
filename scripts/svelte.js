const fs = require('fs')
const path = require('path')
const svelte = require('svelte/compiler')
const sveltePreprocess = require('svelte-preprocess')
const { LIB, forFile } = require('./utils')

const preprocess = sveltePreprocess({
  typescript: {
    tsconfigDirectory: path.resolve(__dirname, '../'),
  },
})

async function prepareSvelte() {
  forFile(['lib/**/*.svelte'], async (entry) => {
    const filePath = entry.replace('lib/', '')
    const libFilePath = path.resolve(LIB, filePath)

    const file = fs.readFileSync(libFilePath)
    const { code } = await svelte.preprocess(file.toString(), [preprocess], {
      filename: libFilePath,
    })

    fs.writeFileSync(libFilePath, code.replace(' lang="ts"', ''))
  })
}

module.exports = { prepareSvelte }
