import os
from flask import Flask, render_template, url_for, request, redirect, abort, send_from_directory

app = Flask(__name__)
app.config['UPLOAD_EXTENSIONS'] = ['.jpeg', '.png', '.jpg']
app.config['UPLOAD_PATH'] = 'static/uploads'

@app.route('/')
def index() :
    return render_template('index.html')

@app.route('/upload-image/<pathname>')
def uplaod_image(pathname) :
    path = request.path
    return render_template('upload.html',pathname = path.split('/')[2])

@app.route('/upload-image/<pathname>', methods=['POST'])
def upload_files(pathname):
    uploaded_file = request.files['file']
    filename = uploaded_file.filename
    if filename != '':
        file_ext = os.path.splitext(filename)[1]
        if file_ext not in app.config['UPLOAD_EXTENSIONS'] :
            abort(400)
        uploaded_file.save(os.path.join(app.config['UPLOAD_PATH'], filename))
        # return filename
        return redirect(url_for('uploaded_file', pathname=pathname,filename=filename))

@app.route('/uploads/<filename>')
def send_file(filename):
    return send_from_directory(app.config['UPLOAD_PATH'], filename)

@app.route('/upload-image/<pathname>/<filename>')
def uploaded_file(pathname,filename):
    # filename = 'http://127.0.0.1:5000/uploads/' + filename
    return render_template('upload.html',pathname=pathname,filename=filename)

if __name__ == "__main__" :
    app.run(debug=True)