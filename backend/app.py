from flask import Flask, request, jsonify
from flask_cors import CORS  # <-- Import CORS
from models import db, Book, Chapter, Vote, User
from schemas import BookSchema, ChapterSchema, VoteSchema, UserSchema
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import bcrypt
from flask_migrate import Migrate

# Initialize Migrate

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Configure database URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///books.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
# Configure JWT
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change this to a secret key

# Initialize DB, Marshmallow, and JWT
db.init_app(app)
ma = Marshmallow(app)
jwt = JWTManager(app)

# Initialize Schemas
book_schema = BookSchema()
books_schema = BookSchema(many=True)
chapter_schema = ChapterSchema()
chapters_schema = ChapterSchema(many=True)
vote_schema = VoteSchema()
votes_schema = VoteSchema(many=True)
user_schema = UserSchema()

# User Registration
@app.route('/register', methods=['POST'])
def register_user():
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    # Check if user exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'User already exists'}), 400

    # Hash password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return user_schema.jsonify(new_user), 201

# User Login
@app.route('/login', methods=['POST'])
def login_user():
    email = request.json['email']
    password = request.json['password']

    # Check if user exists
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Check if password matches
    if not bcrypt.checkpw(password.encode('utf-8'), user.password):
        return jsonify({'message': 'Invalid password'}), 401

    # Create JWT token
    access_token = create_access_token(identity=user.id)
    return jsonify({'access_token': access_token}), 200

# Get a specific Book
@app.route('/books/<int:id>', methods=['GET'])
def get_book(id):
    book = Book.query.get_or_404(id)
    return book_schema.jsonify(book)
# Protected Route Example: Get all Books (requires authentication)
@app.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()
    return books_schema.jsonify(books)

# Add a new Book (requires authentication)
@app.route('/books', methods=['POST'])
def add_book():
    title = request.json['title']
    description = request.json['description']
    genre = request.json.get('genre')
    status = request.json.get('status')

    # Get current user identity from JWT token
    # current_user_id = get_jwt_identity()

    new_book = Book(title=title, description=description, genre=genre, status=status)
    db.session.add(new_book)
    db.session.commit()

    return book_schema.jsonify(new_book), 201
@app.route('/books/<int:book_id>/chapters', methods=['POST'])
def add_chapter(book_id):
    data = request.get_json()
    
    if 'content' not in data:
        return jsonify({'error': 'Content is required'}), 400
    
    new_chapter = Chapter(content=data['content'], book_id=book_id)
    db.session.add(new_chapter)
    db.session.commit()
    
    return chapter_schema.jsonify(new_chapter), 201

@app.route('/chapters/<int:chapter_id>', methods=['PUT'])
def edit_chapter(chapter_id):
    chapter = Chapter.query.get_or_404(chapter_id)
    data = request.get_json()
    
    if 'content' in data:
        chapter.content = data['content']

    db.session.commit()
    
    return chapter_schema.jsonify(chapter)

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

# Add a Vote to a Chapter (requires authentication)
# Run the app
if __name__ == '__main__':
    app.run(debug=True)
