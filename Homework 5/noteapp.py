from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///notes.db'
db = SQLAlchemy(app)

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

#with app.app_context():
#    db.create_all()
    
@app.route('/')
def index():
    return render_template('noteappbase.html')

@app.route('/notes', methods=['POST'])
def create_note():
    data = request.get_json()
    new_note = Note(content=data['content'])
    db.session.add(new_note)
    db.session.commit()
    return jsonify({'message': 'Note created successfully'}), 201


@app.route('/notes/<int:note_id>', methods=['PUT'])
def save_note(note_id):
    note = Note.query.get(note_id)
    if not note:
        return jsonify({'message': 'Note not found'}), 404

    data = request.get_json()
    note.content = data['content']
    db.session.commit()
    return jsonify({'message': 'Note saved successfully'})

@app.route('/notes', methods=['GET'])
def get_all_notes():
    notes = Note.query.all()
    result = []
    for note in notes:
        result.append({'id': note.id, 'content': note.content})
    return jsonify({'notes': result})


@app.route('/notes/<int:note_id>', methods=['GET'])
def get_note(note_id):
    note = Note.query.get(note_id)
    if note:
        return jsonify({'id': note.id, 'content': note.content})
    return jsonify({'message': 'Note not found'}), 404


@app.route('/notes/<int:note_id>', methods=['PUT'])
def edit_note(note_id):
    note = Note.query.get(note_id)
    if not note:
        return jsonify({'message': 'Note not found'}), 404

    data = request.get_json()
    note.content = data['content']
    db.session.commit()
    return jsonify({'message': 'Note edited successfully'})


@app.route('/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    note = Note.query.get(note_id)
    if not note:
        return jsonify({'message': 'Note not found'}), 404

    db.session.delete(note)
    db.session.commit()
    return jsonify({'message': 'Note deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)