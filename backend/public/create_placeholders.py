from PIL import Image, ImageDraw, ImageFont
import os

# Ensure directories exist
dirs = [
    'assets/images',
    'assets/images/merch',
    'assets/images/payment',
    'assets/images/artists',
    'assets/images/team'
]

for dir_path in dirs:
    os.makedirs(dir_path, exist_ok=True)

def create_placeholder(filename, width, height, color, text):
    """Create a placeholder image with text."""
    img = Image.new('RGB', (width, height), color)
    draw = ImageDraw.Draw(img)
    
    # Add a border
    border_width = 5
    draw.rectangle(
        [(border_width, border_width), 
         (width - border_width, height - border_width)],
        outline="#FFFFFF",
        width=border_width
    )
    
    # Add text
    try:
        font = ImageFont.truetype("arial.ttf", 30)
    except IOError:
        font = ImageFont.load_default()
        
    text_width = draw.textlength(text, font=font)
    text_position = ((width - text_width) // 2, height // 2 - 15)
    draw.text(text_position, text, fill="#FFFFFF", font=font)
    
    img.save(filename, "JPEG", quality=90)
    print(f"Created: {filename}")

# Create main placeholders
placeholders = [
    ('assets/images/event-placeholder.jpg', 600, 400, "#6e12e8", "Event Image"),
    ('assets/images/news-placeholder.jpg', 600, 400, "#21ddb8", "News Image"),
    ('assets/images/hero-bg.jpg', 1200, 600, "#3a1c71", "Hero Background"),
    ('assets/images/favicon.png', 64, 64, "#6e12e8", "EMC"),
]

# Merchandise placeholders
merch_items = [
    ('tshirt', "#4e54c8"),
    ('hoodie', "#8a40ff"),
    ('beanie', "#6e12e8"),
    ('stickers', "#21ddb8"),
    ('earplugs', "#fe2d55"),
    ('mug', "#3a1c71"),
    ('poster', "#6e12e8"),
]

for item, color in merch_items:
    placeholders.append((f'assets/images/merch/{item}.jpg', 500, 500, color, item.title()))

# Payment logos
payment_logos = [
    ('visa', "#1a1f71"),
    ('mastercard', "#eb001b"),
    ('amex', "#006fcf"),
]

for logo, color in payment_logos:
    placeholders.append((f'assets/images/payment/{logo}.png', 200, 100, color, logo.upper()))

# Create all placeholders
for filename, width, height, color, text in placeholders:
    create_placeholder(filename, width, height, color, text)

print("All placeholder images created successfully!")
