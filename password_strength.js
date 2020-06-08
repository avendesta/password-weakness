"use strict"
const https = require('https')
const crypto = require('crypto')

function weakness(password) {
  const shasum = crypto.createHash('sha1')
  shasum.update(password)

  const password_hash = shasum.digest('hex').toUpperCase()
  const first_five = password_hash.substr(0, 5)
  const after_five = password_hash.substr(5)

  https.get(`https://api.pwnedpasswords.com/range/${first_five}`, (resp) => {
    let data = ''

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk
    })

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      const content = data
      const tobeMatched = after_five + ".*"
      const re = new RegExp(tobeMatched)
      let matchedline = content.match(re)
      if (matchedline) {
        const count = matchedline[0].split(':')[1]
        return parseInt(count)
      }
    })

  }).on("error", (err) => {
    console.log("Error: " + err.message)
  })
}