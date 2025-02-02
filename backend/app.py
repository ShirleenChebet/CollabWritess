from flask import Flask, request, jsonify
from flask_cors import CORS  # <-- Import CORS
from models import db, Book, Chapter, Vote
from schemas import BookSchema, ChapterSchema, VoteSchema
from flask_marshmallow import Marshmallow

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Configure database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize DB and Marshmallow
db.init_app(app)
ma = Marshmallow(app)

# Initialize Schemas
book_schema = BookSchema()
books_schema = BookSchema(many=True)
chapter_schema = ChapterSchema()
chapters_schema = ChapterSchema(many=True)
vote_schema = VoteSchema()
votes_schema = VoteSchema(many=True)

# Add a new Book
@app.route('/books', methods=['POST'])
def add_book():
    title = request.json['title']
    description = request.json['description']
    genre = request.json.get('genre')
    status = request.json.get('status')

    new_book = Book(title=title, description=description, genre=genre, status=status)
    db.session.add(new_book)
    db.session.commit()

    return book_schema.jsonify(new_book), 201

# Get all Books
@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return books_schema.jsonify(books)

# Get a specific Book
@app.route('/books/<int:id>', methods=['GET'])
def get_book(id):
    book = Book.query.get_or_404(id)
    return book_schema.jsonify(book)

# Add a new Chapter
@app.route('/books/<int:book_id>/chapters', methods=['POST'])
def add_chapter(book_id):
    content = request.json['content']
    new_chapter = Chapter(content=content, book_id=book_id)
    db.session.add(new_chapter)
    db.session.commit()
    return chapter_schema.jsonify(new_chapter), 201

# Get all Chapters for a Book
@app.route('/books/<int:book_id>/chapters', methods=['GET'])
def get_chapters(book_id):
    chapters = Chapter.query.filter_by(book_id=book_id).all()
    return chapters_schema.jsonify(chapters)

# Add a Vote to a Chapter
@app.route('/chapters/<int:chapter_id>/vote', methods=['POST'])
def add_vote(chapter_id):
    vote_type = request.json['vote_type']
    new_vote = Vote(vote_type=vote_type, chapter_id=chapter_id)
    db.session.add(new_vote)
    db.session.commit()

    # Update chapter votes count
    chapter = Chapter.query.get_or_404(chapter_id)
    if vote_type == 'up':
        chapter.votes += 1
    elif vote_type == 'down':
        chapter.votes -= 1

    db.session.commit()

    return vote_schema.jsonify(new_vote)

# Get all Votes for a Chapter
@app.route('/chapters/<int:chapter_id>/votes', methods=['GET'])
def get_votes(chapter_id):
    votes = Vote.query.filter_by(chapter_id=chapter_id).all()
    return votes_schema.jsonify(votes)

# Delete a Book
@app.route('/books/<int:id>', methods=['DELETE'])
def delete_book(id):
    book = Book.query.get_or_404(id)
    db.session.delete(book)
    db.session.commit()
    return jsonify({'message': 'Book deleted'}), 204

# Delete a Chapter
@app.route('/chapters/<int:id>', methods=['DELETE'])
def delete_chapter(id):
    chapter = Chapter.query.get_or_404(id)
    db.session.delete(chapter)
    db.session.commit()
    return jsonify({'message': 'Chapter deleted'}), 204

# Delete a Vote
@app.route('/votes/<int:id>', methods=['DELETE'])
def delete_vote(id):
    vote = Vote.query.get_or_404(id)
    db.session.delete(vote)
    db.session.commit()
    return jsonify({'message': 'Vote deleted'}), 204

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
