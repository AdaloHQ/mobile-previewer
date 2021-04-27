#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const util = require('util')
const cp = require('child_process')
const axios = require('axios')

const exec = util.promisify(cp.exec)
const mkdir = util.promisify(fs.mkdir)

const fileNames = [
  'AntDesign.ttf',
  'Entypo.ttf',
  'EvilIcons.ttf',
  'Feather.ttf',
  'FontAwesome.ttf',
  'FontAwesome5_Brands.ttf',
  'FontAwesome5_Regular.ttf',
  'FontAwesome5_Solid.ttf',
  'Foundation.ttf',
  'Ionicons.ttf',
  'MaterialIcons.ttf',
  'MaterialCommunityIcons.ttf',
  'SimpleLineIcons.ttf',
  'Octicons.ttf',
  'Zocial.ttf',
  'Fontisto.ttf',
]
const baseURL = 'https://backend.adalo.com'

const getFontURLs = async (app, platform) => {
  let urls = []

  if (app && app.branding && app.branding.fonts) {
    const { fonts } = app.branding

    // Add Roboto if the platform is android
    // Used to get font weights working on the platform
    // default font on android.
    if (platform === 'android') {
      fonts.android = { family: 'Roboto' }
    }

    const keys = Object.keys(fonts)

    for (const key of keys) {
      if (!key) continue

      const { family } = fonts[key]

      const queryURL = `${baseURL}/fonts?family=${family}`
      const { data } = await axios.get(queryURL)

      if (data) {
        const { files } = data

        const fileKeys = Object.keys(files).filter((k) => !k.includes('italic'))
        for (const fKey of fileKeys) {
          if (!fKey) continue

          urls.push({ url: files[fKey], family, weight: fKey })
        }
      }
    }
  }

  return urls
}

const downloadFonts = async (projectPath, platform, projectName, appId) => {
  axios.defaults.headers['x-server-auth']
  const resp = await axios.get(`${baseURL}/apps/${appId}`)
  const app = resp.data
  const fonts = await getFontURLs(app, platform)

  if (fonts.length > 0) {
    // create assets/fonts (if it doesn't already exist)

    const assetsDir = path.join(projectPath, 'assets')
    const fontsDir = path.join(assetsDir, 'fonts')

    await mkdir(fontsDir, { recursive: true })

    for (const font of fonts) {
      if (font.weight === 'regular' || font.weight === 'normal') {
        font.weight = ''
      }
      if (font.family.includes(' ')) {
        font.family = font.family.replace(/\s/g, '')
      }
      await exec(
        `./download_font.sh ${fontsDir} ${font.url} "${font.family}" ${font.weight}`
      )
    }

    await exec(`cp assets/customFonts.js ${projectPath}/react-native.config.js`)
    await exec(`npx react-native link`, { cwd: projectPath })

    // iOS Specific
    if (platform === 'ios' && projectName) {
      for (const fileName of fileNames) {
        await exec(
          `sed -i.bak '/${fileName}/d' ios/${projectName}.xcodeproj/project.pbxproj`,
          { cwd: projectPath }
        )
      }
    }
  }
}

const [, , ...args] = process.argv
if (args.length !== 3) {
  console.error(
    'Usage:\n\n node getFonts.js [PROJECT_PATH] [PLATFORM] [APP ID]\n'
  )
  process.exit(1)
}
let [projectPath, platform, appId] = args

downloadFonts(projectPath, platform, 'AdaloApp', appId)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
