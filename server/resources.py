from flask_restful import Resource
from models import db, Book, Chapter, Vote
from flask import request
from sqlalchemy.orm.exc import NoResultFound

class BookResource(Resource):
    def get(self):
        books = Book.query.all()
        return [{'id': book.id, 'title': book.title, 'description': book.description} for book in books]

    def post(self):
        data = request.get_json()
        new_book = Book(
            title=data['title'],
            description=data['description'],
            genre=data['genre'],
            status=data['status']
        )
        db.session.add(new_book)
        db.session.commit()
        return {'message': 'Book created', 'id': new_book.id}, 201

class ChapterResource(Resource):
    def get(self, book_id):
        chapters = Chapter.query.filter_by(book_id=book_id).all()
        return [{'id': chapter.id, 'content': chapter.content, 'votes': chapter.votes} for chapter in chapters]

    def post(self):
        data = request.get_json()
        new_chapter = Chapter(
            content=data['content'],
            book_id=data['book_id']
        )
        db.session.add(new_chapter)
        db.session.commit()
        return {'message': 'Chapter created', 'id': new_chapter.id}, 201

class VoteResource(Resource):
    def post(self):
        data = request.get_json()
        chapter = Chapter.query.get_or_404(data['chapter_id'])
        if data['vote_type'] == 'up':
            chapter.votes += 1
        elif data['vote_type'] == 'down':
            chapter.votes -= 1

        # Check if the chapter has the most upvotes and mark as recommended
        if chapter.votes > 0:
            chapter.recommended = True
        db.session.commit()

        return {'message': 'Vote counted', 'recommended': chapter.recommended}
