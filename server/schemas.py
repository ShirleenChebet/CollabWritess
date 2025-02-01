# schemas.py

from marshmallow import Schema, fields, validate

class AuthorSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=validate.Length(min=1))
    email = fields.Email(required=True)

class BookSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    description = fields.Str()
    genre = fields.Str()
    status = fields.Str(validate=validate.OneOf(["drafted", "completed"]))
    author_id = fields.Int()

class CollaboratorSchema(Schema):
    id = fields.Int(dump_only=True)
    role = fields.Str(validate=validate.OneOf(["editor", "contributor"]))
    user_id = fields.Int()
    book_id = fields.Int()

class FeedbackSchema(Schema):
    id = fields.Int(dump_only=True)
    content = fields.Str(required=True, validate=validate.Length(min=20))
    rating = fields.Int(validate=validate.Range(min=1, max=5))
    chapter_id = fields.Int()
    user_id = fields.Int()

class ChapterSchema(Schema):
    id = fields.Int(dump_only=True)
    content = fields.Str(required=True, validate=validate.Length(min=50))
    votes = fields.Int(default=0)
    book_id = fields.Int()
    author_id = fields.Int()
