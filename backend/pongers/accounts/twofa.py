import qrcode
import pyotp
import base64
import io
from PIL import Image
from qrcode.main import QRCode

def secret_twofa():
	return pyotp.random_base32()

print ("secret key -->" + secret_twofa())

def generate_uri(user, secret):
	return pyotp.TOTP(secret).provisioning_uri(name=user, issuer_name="ft_trensendence")


print ("uri __>" +  generate_uri("hafida", secret_twofa()))

import qrcode
import io
import base64

def generate_qrcode(data):
	qr = qrcode.QRCode(
		version=1,
		error_correction=qrcode.constants.ERROR_CORRECT_L,
		box_size=10,
		border=4
	)
	qr.add_data(data)
	qr.make(fit=True)
	image = qr.make_image(fill_color="yellow", back_color="red")
	img_in = io.BytesIO()
	image.save(img_in, format='PNG')
	img_in.seek(0)
	base64_string = base64.b64encode(img_in.getvalue()).decode('utf-8')
	return f'<img src="data:image/png;base64,{base64_string}" alt="QR Code"/>'

def verify_token(secret, token):
	return pyotp.TOTP(secret).verify(token)

print( generate_qrcode( generate_uri("hafida", secret_twofa())))