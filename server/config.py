# config.py

import os

class Config:
    # Secret key for session management
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key'

    # Database URI
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///db.sqlite3'
    
    # Track modifications in SQLAlchemy (disable for production)
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # CORS configuration (allow all domains)
    CORS_HEADERS = 'Content-Type'
