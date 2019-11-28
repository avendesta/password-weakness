import hashlib
import requests

def weakness(password):
    password_hash = hashlib.sha1(password.encode()).hexdigest()

    first_five = password_hash[:5].upper()
    after_five = password_hash[5:].upper()
    try:
        response = requests.get(f"https://api.pwnedpasswords.com/range/{first_five}",timeout=0.1)
    except requests.exceptions.RequestException as e:
        return 0
    else:
        content = response.text
        weakness = 0

        for line in content.splitlines():
            if after_five in line:
                _ , weakness = line.split(':')
                break
        return int(weakness)