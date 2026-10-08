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
- Embedded Google Map and directions for 8 Hartbees, Elandsfontein Rail
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

Run one copy of the app at a time. Set the `PORT` environment variable to use a different local port.

## Deploy to Google Cloud Run

The included `Dockerfile` runs Flask with Gunicorn and listens on the port supplied by Cloud Run.

1. Push the project to GitHub.
2. In the [Google Cloud Console](https://console.cloud.google.com/run), select or create a Google Cloud project and enable billing.
3. Choose **Create service** and deploy from the GitHub repository, or deploy the source using the Google Cloud CLI:

   ```bash
   gcloud run deploy machete-it-solution --source . --region REGION --allow-unauthenticated
   ```

   Replace `REGION` with a nearby Cloud Run region, such as `africa-south1` if available for your project.
4. In the Cloud Run service settings, configure `SECRET_KEY` as a secret environment variable using Google Secret Manager. Do not commit the key to GitHub.
5. Open the Cloud Run service URL and test the pages, videos, and contact form before connecting a custom domain.

### Before accepting live enquiries

The contact form currently saves submissions to a local CSV file. Cloud Run's local filesystem is not durable, so submissions can be lost when an instance restarts or scales down. Connect a durable database or storage service before relying on the form for live customer enquiries.

### Connect a custom domain

After the Cloud Run service is deployed and tested, buy a domain from a registrar. In the Cloud Run service's **Networking / Custom domains** settings, map the domain and follow the displayed DNS instructions at your registrar. DNS and certificate provisioning can take time.

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
