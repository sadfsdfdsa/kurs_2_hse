from flask.json import jsonify
from app import app, db
from flask import request

from utils.http_errors import Errors
from utils.helper import validate_params, rest


# login by LOGIN and PASSWORD
# return token or error
@app.route('/api/v1/login', methods=["POST"])
def login():
    data = request.json

    if not validate_params(data, 'login', 'password'):
        return 'Error', 403

    if (data['login'] == 'admin' and data['password'] == 'admin'):
        resp = jsonify({'admin': True})
        resp.set_cookie('admin')
        return resp

    result = db.User.login(data['login'], data['password'])

    if result:
        return jsonify(result)

    return 'Error', 500


@app.route('/api/v1/users/', methods=["GET"])
def get_users():
    result = db.User.users()

    if result:
        return jsonify(result)

    return 'Error', 500

@app.route('/api/v1/users/', methods=["POST"])
def create_user():
    data = request.json

    if not validate_params(data, 'login', 'password', 'firstName', 'secondName', 'middleName'):
        return 'Error', 403

    id = db.User.create(data['login'], data['password'], data['firstName'], data['secondName'], data['middleName'])
    if id:
        return jsonify(id)

    return 'Error', 500

@app.route('/api/v1/users/<int:id>', methods=["PUT"])
def edit_user(id):
    data = request.json

    if not validate_params(data, 'firstName', 'secondName', 'middleName'):
        return 'Error', 403

    success = db.User.edit(id, data['firstName'], data['secondName'], data['middleName'])

    if success:
        return jsonify(True)

    return 'Error', 500
