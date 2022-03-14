#!/usr/bin/env node

const fs = require('fs')
const { am2tex } = require('asciimath-js')

const name = process.argv[2]
if (!name) {
  console.log(`usage: npx am2tex <file>
this will read in file.am, and output file.tex`)
  process.exit(0)
}

amArticle = fs.readFileSync(name + '.am', 'utf-8')

// block math
amArticle = amArticle.replace(/```([^]+?)```/g, (_, $1) => `\\[
${am2tex($1)}
\\]`)

// inline math
amArticle = amArticle.replace(/`(.+?)`/g, (_, $1) => '$' + am2tex($1, false) + '$')

fs.writeFileSync(name + '.tex',
`\\documentclass{ctexart}
\\usepackage{amsmath}
\\begin{document}
${amArticle}
\\end{document}
`)
