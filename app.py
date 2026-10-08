from datetime import datetime
from pathlib import Path
import csv
import re

from flask import Flask, render_template, request, redirect, url_for, flash

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)
CSV_FILE = DATA_DIR / "contact_submissions.csv"

app = Flask(__name__)
app.config["SECRET_KEY"] = "machete-it-solution-local-key"

EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def save_submission(data):
    file_exists = CSV_FILE.exists()
    with CSV_FILE.open("a", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(
            file,
            fieldnames=["date", "name", "email", "phone", "service", "message"],
        )
        if not file_exists:
            writer.writeheader()
        writer.writerow(data)


@app.get("/")
def home():
    return render_template("index.html")


@app.post("/submit-contact")
def submit_contact():
    name = request.form.get("name", "").strip()
    email = request.form.get("email", "").strip()
    phone = request.form.get("phone", "").strip()
    service = request.form.get("service", "").strip()
    message = request.form.get("message", "").strip()

    errors = []
    if len(name) < 2:
        errors.append("Please enter your full name.")
    if not EMAIL_RE.match(email):
        errors.append("Please enter a valid email address.")
    if len(message) < 5:
        errors.append("Please tell us a little more about what you need help with.")

    if errors:
        for error in errors:
            flash(error, "error")
        return redirect(url_for("home") + "#contact")

    save_submission(
        {
            "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "name": name,
            "email": email,
            "phone": phone,
            "service": service,
            "message": message,
        }
    )

    flash(
        "Thank you for contacting Machete IT Solution. Your enquiry has been received.",
        "success",
    )
    return redirect(url_for("home") + "#contact")


if __name__ == "__main__":
    app.run(debug=False, host="127.0.0.1", port=5003)
