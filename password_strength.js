/*
language - nodejs
required - npm install needle@2
*/
"use strict"
const https = require('https')
const crypto = require('crypto')
const needle = require('needle')

function weakness(password){
	const shasum = crypto.createHash('sha1')
  shasum.update(password)

  const password_hash = shasum.digest('hex').toUpperCase()
  const first_five = password_hash.substr(0, 5)
  const after_five = password_hash.substr(5)

	return new Promise((resolve, reject) => {
		needle('get', `https://api.pwnedpasswords.com/range/${first_five}`)
			.then(function (response) {
				const content = response.body
				const tobeMatched = after_five + ".*"
				const re = new RegExp(tobeMatched)
				let matchedline = content.match(re)
				const pwned_count = matchedline ? parseInt(matchedline[0].split(':')[1]) : 0
				resolve(pwned_count)
			})
			.catch(function (err) {
				resolve(-1)
			})
	})
}

/*
 * @example
 * for password = 'iloveyou', weakness -> 1608627 if successfull or -1 on connection error
 *
*/
// weakness('iloveyou').then((res) => console.log(`weakness level: ${res}`))