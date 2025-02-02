from flask_marshmallow import Marshmallow
from models import Book, Chapter, Vote

ma = Marshmallow()

# Book Schema
class BookSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Book

# Chapter Schema
class ChapterSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Chapter

# Vote Schema
class VoteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Vote
