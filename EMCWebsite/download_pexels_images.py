import requests
import os
import json
from io import BytesIO
from PIL import Image

# Pexels API key
API_KEY = "WupFx83jsieHN6Io7dYY5m8nYTesBGP7gxBHh8J7YZkSM3qTKfHjOpxP"

# Create directories if they don't exist
for directory in ['assets/images/merch', 'assets/images/payment', 'assets/images']:
    os.makedirs(directory, exist_ok=True)

# Function to download an image from a URL
def download_image(url, save_path, resize=None):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        img = Image.open(BytesIO(response.content))
        
        # Convert RGBA to RGB if needed (for JPEG format)
        if img.mode == 'RGBA' and save_path.lower().endswith('.jpg'):
            img = img.convert('RGB')
        
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

# Function to search Pexels for images
def search_pexels(query, per_page=1):
    url = f"https://api.pexels.com/v1/search?query={query}&per_page={per_page}"
    headers = {"Authorization": API_KEY}
    
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error searching Pexels: {response.status_code}")
        return None

# Dictionary of search terms and file paths
image_requirements = [
    {"query": "nightclub dj booth", "path": "assets/images/event-placeholder.jpg", "size": (600, 400)},
    {"query": "electronic music news", "path": "assets/images/news-placeholder.jpg", "size": (600, 400)},
    # No background image as we want to use CSS connected dots
    {"query": "black t-shirt blank", "path": "assets/images/merch/tshirt.jpg", "size": (500, 500)},
    {"query": "black hoodie clothing", "path": "assets/images/merch/hoodie.jpg", "size": (500, 500)},
    {"query": "winter beanie hat", "path": "assets/images/merch/beanie.jpg", "size": (500, 500)},
    {"query": "vinyl stickers pack", "path": "assets/images/merch/stickers.jpg", "size": (500, 500)},
    {"query": "concert earplugs", "path": "assets/images/merch/earplugs.jpg", "size": (500, 500)},
    {"query": "black coffee mug", "path": "assets/images/merch/mug.jpg", "size": (500, 500)},
    {"query": "concert poster wall", "path": "assets/images/merch/poster.jpg", "size": (500, 500)}
]

# Download images from Pexels
successful = 0
failed = 0

print("Downloading images from Pexels...")
for req in image_requirements:
    print(f"Searching for: {req['query']}")
    results = search_pexels(req['query'])
    
    if results and results.get('photos') and len(results['photos']) > 0:
        # Get the first image URL (original size)
        photo = results['photos'][0]
        image_url = photo['src']['original']
        attribution = f"Photo by {photo['photographer']} on Pexels"
        
        print(f"Found image: {image_url}")
        print(f"Attribution: {attribution}")
        
        # Download the image
        if download_image(image_url, req['path'], req['size']):
            successful += 1
        else:
            failed += 1
    else:
        print(f"No results found for {req['query']}")
        failed += 1

# For payment logos, we'll create simple colored text placeholders
payment_logos = [
    {"name": "VISA", "path": "assets/images/payment/visa.png", "color": (0, 43, 128)},
    {"name": "MASTERCARD", "path": "assets/images/payment/mastercard.png", "color": (235, 0, 27)},
    {"name": "AMEX", "path": "assets/images/payment/amex.png", "color": (0, 114, 206)}
]

for logo in payment_logos:
    # Create a colored rectangle with text
    img = Image.new('RGB', (200, 100), logo['color'])
    from PIL import ImageDraw, ImageFont
    draw = ImageDraw.Draw(img)
    
    # Try to use a default font
    try:
        font = ImageFont.load_default()
        
        # Calculate text position for center alignment
        text_width = draw.textlength(logo['name'], font)
        text_position = ((200 - text_width) // 2, 40)
        
        # Draw white text
        draw.text(text_position, logo['name'], fill=(255, 255, 255), font=font)
        
        # Save the image
        img.save(logo['path'])
        print(f"Created logo: {logo['path']}")
        successful += 1
    except Exception as e:
        print(f"Error creating logo {logo['path']}: {e}")
        failed += 1

# Create simple favicon
try:
    img = Image.new('RGB', (64, 64), (110, 18, 232))  # Purple color
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.load_default()
        draw.text((20, 20), "EMC", fill=(255, 255, 255), font=font)
    except:
        pass  # Skip text if font issues
    img.save("assets/images/favicon.png")
    print("Created favicon")
    successful += 1
except Exception as e:
    print(f"Error creating favicon: {e}")
    failed += 1

print(f"\nDownload summary:")
print(f"Successful downloads/creations: {successful}")
print(f"Failed downloads/creations: {failed}")
print("\nAll images from Pexels are free to use. Remember to give attribution to photographers in a production environment.")
