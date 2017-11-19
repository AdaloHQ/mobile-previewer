export const getPayload = jwt => {
  let pieces = jwt.split('.')
  let payload = JSON.parse(Buffer.from(pieces[1], 'base64'))

  return payload
}

export const fakeJWT = payload => {
  let header = { typ: 'jwt', alg: 'HS256' }

  let encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64')
  let encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
  let signature = 'asdf'

  encodedHeader = encodedHeader.replace(/=/g, '')
  encodedPayload = encodedPayload.replace(/=/g, '')

  return `${encodedHeader}.${encodedPayload}.${signature}`
}
