import os
from flask import Flask, render_template, url_for, request, redirect, abort, send_from_directory

app = Flask(__name__)
app.config['UPLOAD_EXTENSIONS'] = ['.jpeg', '.png', '.jpg']
app.config['UPLOAD_PATH'] = 'static/uploads'
app.config['OUTPUT_PATH'] = r"/content/static/OUTPUTS"

@app.route('/')
def index() :
    return render_template('index.html')

@app.route('/upload-image/<pathname>')
def uplaod_image(pathname) :
    path = request.path
    module_name = path.split('/')[-1]
    return render_template('upload.html', pathname=module_name)

@app.route('/upload-image/<pathname>', methods=['POST'])
def upload_files(pathname):
    uploaded_file = request.files['file']
    # output_file = request.files['file']
    filename = uploaded_file.filename
    # image = request.form["payload"].split(",")[1]
    # print(image)
    if filename != '':
        file_ext = os.path.splitext(filename)[1]
        if file_ext not in app.config['UPLOAD_EXTENSIONS'] :
            abort(400)
        uploaded_file.save(os.path.join(app.config['UPLOAD_PATH'], filename))
        # output_file.save(os.path.join(app.config['OUTPUT_PATH'], filename))
        # return filename
        return redirect(url_for('uploaded_file', pathname=pathname,filename=filename))

@app.route('/uploads/<filename>')
def send_file(filename):
    return send_from_directory(app.config['UPLOAD_PATH'], filename)

@app.route('/uploads/<filename>')
def send_output_file(name_file):
    print(name_file)
    return send_from_directory(app.config['OUTPUT_PATH'], name_file)

@app.route('/draw-canvas')
def canvas() :
    return render_template('second.html')

@app.route('/upload-image/<pathname>/<filename>')
def uploaded_file(pathname,filename):
    # filename = 'http://127.0.0.1:5000/uploads/' + filename
    return render_template('upload.html',pathname=pathname,filename=filename)

if __name__ == "__main__" :
    app.run(debug=True)