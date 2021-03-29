from flask.json import jsonify
from app import app, db
from flask import request

from utils.http_errors import Errors
from utils.helper import validate_params, rest


@app.route('/api/v1/works', methods=["GET"])
def get_works():
    userId = request.args.get('user')

    result = db.Work.get_created(userId)

    if result:
        for work in result:
            work["checks"] = db.Check.get(work["id"])

        return jsonify(result)

    return jsonify([])


@app.route('/api/v1/work', methods=["POST"])
def create_work():
    data = request.json

    if not validate_params(data,
                           'creatorId', 'name', 'workLink',
                           'documentLink', 'created', 'deadline',
                           'directorScore', 'reviewerScore',
                           'comment', 'workers'
                           ):
        return 'Error', 403

    id = db.Work.create(data['creatorId'], data['name'], data['workLink'], data['documentLink'],
                        data['created'], data['directorScore'], data['reviewerScore'],
                        data['comment'], data['deadline'])

    if id:
        for worker in data['workers']:
            db.Check.create(id, worker)
        return jsonify(id)
    return 'Error', 500


@app.route('/api/v1/checks', methods=["GET"])
def get_checks():
    userId = request.args.get('user')

    result = db.Work.get_checks(userId)

    if result:
        for work in result:
            work["checks"] = db.Check.get(work["id"])
        return jsonify(result)

    return jsonify([])


@app.route('/api/v1/check', methods=["POST"])
def set_check():
    data = request.json

    if not validate_params(data, 'userId', 'workId', 'value', 'comment'):
        return 'Error', 403

    res = db.Check.set(data['workId'], data['userId'],
                       data['value'], data['comment'])
    if res:
        return jsonify(True)

    return 'Error', 500
