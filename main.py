from flask import Flask, render_template, url_for

app = Flask(__name__)


@app.route('/')
def home():
    return "<h1>Hello World</h1>"

@app.route('/lectures/<int:lecture_id>')
def la_lectures(lecture_id):
    selection = f'lecture_note_{lecture_id}.html'
    return render_template(selection)


if __name__ == '__main__':
    app.run(debug=True, port=8080, host='0.0.0.0')