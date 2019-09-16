#!/usr/bin/env node

try {
  require('./constants')
} catch (err) {
  console.log('scripts/constants.js not present. Using environment variables')
}

const child_process = require('child_process')
const path = require('path')
const util = require('util')
const fs = require('fs')
const { S3 } = require('aws-sdk')

const readFile = util.promisify(fs.readFile)

const uploadAPK = async filePath => {
  let data = await readFile(filePath)
  let key = path.basename(filePath)
  console.log(`UPLOADING ${key}`)

  let s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.S3_REGION
  })

  await s3.putObject({
    Key: key,
    Body: data,
    Bucket: process.env.S3_BUCKET,
    ACL: 'public-read',
    ContentType: 'application/vnd.android.package-archive',
  }).promise()

  console.log(`UPLOADED SUCCESSFULLY!`)

  return key
}

uploadAPK(process.argv[2])
  .catch(err => {
    console.log('ERROR UPLOADING APK:', err)
  })
