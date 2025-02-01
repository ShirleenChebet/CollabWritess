from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from resources import BookResource, ChapterResource, VoteResource

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests
api = Api(app)

# Routes
api.add_resource(BookResource, '/books', '/books/<int:book_id>')
api.add_resource(ChapterResource, '/chapters', '/chapters/<int:chapter_id>')
api.add_resource(VoteResource, '/vote')

if __name__ == '__main__':
    app.run(debug=True)
