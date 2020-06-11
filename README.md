
> When processing requests to establish and change memorized secrets, verifiers SHALL compare the prospective secrets against a list that contains values known to be commonly-used, expected, or compromised.

  [NIST](https://pages.nist.gov/800-63-3/sp800-63b.html)



Implementation of [haveibeenpwnd](https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/) API, developed by [Troy Hunt](https://www.troyhunt.com/), and makes use of [K-anonymity](https://en.wikipedia.org/wiki/K-anonymity) to secure the process of checking password strength.

Each file is an implementation of the above process in a certain programming language. The code contains a function `weakness` that accepts a `password` and returns `pwned_count` - how many times the password was found on pwnd databases, if fetching from the API is successfull and returns -1 on connection/fetching error.

![SocialLogo.png](https://user-images.githubusercontent.com/53615807/84068405-90c04480-a9d1-11ea-9919-36f0ab34158c.png)
