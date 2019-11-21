import hashlib
import requests

password = input("Enter your password: ")
password_hash = hashlib.sha1(password.encode()).hexdigest()

first_five = password_hash[:5].upper()
after_five = password_hash[5:].upper()

response = requests.get(f"https://api.pwnedpasswords.com/range/{first_five}")
content = response.text

weakness = 0

for line in content.splitlines():
    if after_five in line:
        weakness = line.split(':')[1]
        break

if weakness is not 0:
    print(f"The password you used is common. It has been used {weakness} times")
else:
    print("Your password is safe!")