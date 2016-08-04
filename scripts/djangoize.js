const fs = require('fs-extra')
const path = require('path')

const djangoStaticPath = 'static/'
const indexHtmlFile = 'index.html'
const staticDir = path.join(__dirname, '/../../lighten/lighten_api/static/')
const templatesDir = path.join(__dirname, '/../../lighten/lighten_api/templates/')
const distDir = path.join(__dirname, '/../dist/')

console.log('Copy all files in the bundle to django\'s static directory...')
fs.readdirSync(distDir).forEach((file) => {
  // except for index.html
  if (file === indexHtmlFile) return
  fs.copySync(distDir + file, staticDir + file)
})

console.log('Prefix paths in index.html to files with django\'s static path...')
const contents = ['src="', 'href="'].reduce((acc, str) => {
  return acc.replace(new RegExp(str, 'g'), str + djangoStaticPath)
}, fs.readFileSync(distDir + indexHtmlFile, 'utf8'))

console.log('Write the modified index.html file to django\'s templates directory...')
fs.writeFileSync(templatesDir + indexHtmlFile, contents, 'utf8')

console.log('Success!')
