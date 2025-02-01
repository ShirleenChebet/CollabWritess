from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from resources import BookResource, ChapterResource, VoteResource

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS for cross-origin requests
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///collabwrites.db'  # SQLite database for simplicity
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable track modifications to save resources

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Initialize API
api = Api(app)

# Routes for resources
api.add_resource(BookResource, '/books', '/books/<int:book_id>')
api.add_resource(ChapterResource, '/chapters', '/chapters/<int:chapter_id>')
api.add_resource(VoteResource, '/vote')

# Run the application
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create all tables (useful for SQLite or initial setups)

    app.run(debug=True)
