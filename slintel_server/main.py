from flask import Flask, request, jsonify
from custom_exceptions import NoDataProvided
from flask_cors import CORS
from thumbnail_controller import convert_to_thumbnail

# setting up path for static resources
app = Flask(__name__, static_url_path='/static')
app.config["DEBUG"] = True
CORS(app)


@app.route('/register_thumbnail', methods=["POST"])
def signup():
    size = request.form.get('size', None)
    if not size:
        raise NoDataProvided

    image_file = request.files.get('image', None)
    path = convert_to_thumbnail(image_file, size)

    return jsonify({"sharable_url": path}), 200


@app.errorhandler(404)
def not_found(message):
    return jsonify({"success": False, "message": str(message)}), 404


@app.errorhandler(NoDataProvided)
def not_found(message):
    return jsonify({"success": False, "message": "Please provide the size"}), 422


@app.errorhandler(Exception)
def not_found(message):
    return jsonify({"success": False, "message": str(message)}), 501


# runs on port 5000
app.run(host='0.0.0.0')
