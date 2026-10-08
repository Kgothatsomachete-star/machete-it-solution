# Machete IT Solution

A responsive business website built with **HTML, CSS, Vanilla JavaScript, Python and Flask**.

## Features

- Responsive desktop/tablet/mobile design
- Machete IT Solution poster-inspired branding
- Laptop repair, software installation, website design and web app services
- Service detail modals
- Project image lightbox
- Short local MP4 promo clips
- Working Flask contact form
- Contact enquiries saved to `data/contact_submissions.csv`
- WhatsApp contact button
- Scroll animations and mobile navigation
- No React, Bootstrap, Tailwind or Node.js required

## Run on Windows

Open the project in VS Code terminal:

```powershell
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Then open:

`http://127.0.0.1:5003`

Run one copy of the app at a time. If port 5000 is already in use, stop the existing website server before starting this one.

## Replace images

Put your own JPG/PNG images in:

`static/images/`

The existing image names are referenced by the homepage, so keeping the names makes replacement easy.

## Replace videos

Put your own MP4 files in:

`static/videos/`

The hero background video is `hero-background.mp4`; replace it with your own clip to change the homepage background.

Use these names:

- `laptop-repair.mp4`
- `web-development.mp4`
- `it-support.mp4`

## Contact form

The Flask backend validates the form and saves submissions locally to:

`data/contact_submissions.csv`

No email is falsely claimed to be sent. An email service or database can be connected later.
