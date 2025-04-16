import requests
import os
from io import BytesIO
from PIL import Image

# Create directories if they don't exist
for directory in ['assets/images/merch', 'assets/images/payment', 'assets/images/artists', 'assets/images/team']:
    os.makedirs(directory, exist_ok=True)

# Function to download images
def download_image(url, save_path, resize=None):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()  # Raise exception for HTTP errors
        
        # Open the image using PIL
        img = Image.open(BytesIO(response.content))
        
        # Resize if specified
        if resize:
            img = img.resize(resize, Image.LANCZOS)
        
        # Save the image
        img.save(save_path)
        print(f"Downloaded: {save_path}")
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

# List of images to download
# Format: (URL, save path, optional resize dimensions)
images = [
    # Main website images
    ("https://cdn.pixabay.com/photo/2016/11/22/19/15/hand-1850120_1280.jpg", "assets/images/hero-bg.jpg", (1200, 600)),
    ("https://cdn.pixabay.com/photo/2018/07/17/11/04/dj-3544241_1280.jpg", "assets/images/event-placeholder.jpg", (600, 400)),
    ("https://cdn.pixabay.com/photo/2019/08/05/11/11/club-4385922_1280.jpg", "assets/images/news-placeholder.jpg", (600, 400)),
    
    # Merchandise
    ("https://cdn.pixabay.com/photo/2017/01/13/04/56/t-shirt-1976334_1280.png", "assets/images/merch/tshirt.jpg", (500, 500)),
    ("https://cdn.pixabay.com/photo/2022/01/17/19/59/hoodie-6945868_1280.jpg", "assets/images/merch/hoodie.jpg", (500, 500)),
    ("https://cdn.pixabay.com/photo/2017/03/27/14/49/knit-hat-2179100_1280.jpg", "assets/images/merch/beanie.jpg", (500, 500)),
    ("https://cdn.pixabay.com/photo/2020/04/07/10/15/logo-5012196_1280.jpg", "assets/images/merch/stickers.jpg", (500, 500)),
    ("https://cdn.pixabay.com/photo/2019/03/31/00/39/earplugs-4092504_1280.jpg", "assets/images/merch/earplugs.jpg", (500, 500)),
    ("https://cdn.pixabay.com/photo/2015/11/23/10/39/restaurant-1058107_1280.jpg", "assets/images/merch/mug.jpg", (500, 500)),
    ("https://cdn.pixabay.com/photo/2016/12/15/19/46/night-1909992_1280.jpg", "assets/images/merch/poster.jpg", (500, 500)),
    
    # Payment logos
    ("https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png", "assets/images/payment/visa.png", (200, 100)),
    ("https://cdn.pixabay.com/photo/2015/09/15/16/57/mastercard-941352_1280.png", "assets/images/payment/mastercard.png", (200, 100)),
    ("https://cdn.pixabay.com/photo/2019/08/19/16/48/amex-4416543_1280.png", "assets/images/payment/amex.png", (200, 100)),
    
    # Favicon
    ("https://cdn.pixabay.com/photo/2014/04/03/00/30/musical-notes-308857_1280.png", "assets/images/favicon.png", (64, 64))
]

# Download all images
successful = 0
failed = 0

print("Downloading images for EMC website...")
for url, path, size in images:
    if download_image(url, path, size):
        successful += 1
    else:
        failed += 1

print(f"\nDownload summary:")
print(f"Successful downloads: {successful}")
print(f"Failed downloads: {failed}")
print("\nAll royalty-free images are from Pixabay.com and are free to use without attribution.")
print("Image sources are included in the code for reference.")
