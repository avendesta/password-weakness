'''
language - python3
required - pip3 install requests
'''
import hashlib
import requests

def weakness(password):
    password_hash = hashlib.sha1(password.encode()).hexdigest()

    first_five = password_hash[:5].upper()
    after_five = password_hash[5:].upper()
    try:
        response = requests.get(f"https://api.pwnedpasswords.com/range/{first_five}",timeout=0.1)
    except requests.exceptions.RequestException as e:
        return -1   # on connection error the function returns -1
    else:
        content = response.text
        pwned_count = 0

        for line in content.splitlines():
            if after_five in line:
                _ , pwned_count = line.split(':')
                break
        return int(pwned_count)

'''
Example
for password='iloveyou', weakness -> 1608627 if successfull or -1 on connection error
'''
# weakness('iloveyou')