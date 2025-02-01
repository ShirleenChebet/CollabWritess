# config.py

import os

class Config:
    # Secret key for session management
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key'

    # Database URI
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///collabwrites.db'
    
    # Track modifications in SQLAlchemy (disable for production)
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # CORS configuration (allow all domains)
    CORS_HEADERS = 'Content-Type'
