from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    genre = db.Column(db.String(100))
    status = db.Column(db.String(50))  # 'drafted' or 'completed'
    chapters = db.relationship('Chapter', backref='book', lazy=True)

class Chapter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    votes = db.Column(db.Integer, default=0)
    recommended = db.Column(db.Boolean, default=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.id'), nullable=False)

class Vote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vote_type = db.Column(db.String(10))  # 'up' or 'down'
    chapter_id = db.Column(db.Integer, db.ForeignKey('chapter.id'), nullable=False)
    chapter = db.relationship('Chapter', backref='votes')
