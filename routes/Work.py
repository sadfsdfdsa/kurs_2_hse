from app import app, db
from flask import request

from utils.http_errors import Errors
from utils.helper import validate_params, rest



@app.route('/api/v1/works', methods=["GET"])
def get_works():
    userId = request.args.get('user')

    result = db.Work.get_created(userId)
    
    if (result['success']):
        return rest('success', result["works"])

    return rest('error', Errors.auth_error)


@app.route('/api/v1/work', methods=["POST"])
def create_work():
    data = request.json

    if not validate_params(data, 'creator', 'name', 'workLink', 'documentLink'):
        return rest('error', Errors.request_params_error)

    id = db.Work.create(data['creator'], data['name'], data['workLink'], data['documentLink'], data['created'], data['deadline'])
    
    for worker in data['workers']:
        db.Check.create(id, worker)

    if id:
        return rest('success', id)
    return rest('error', Errors.auth_error)


@app.route('/api/v1/checks', methods=["GET"])
def get_checks():
    userId = request.args.get('user')

    result = db.Work.get_checks(userId)
    
    if (result['success']):
        return rest('success', result["works"])

    return rest('error', Errors.auth_error)



@app.route('/api/v1/check', methods=["POST"])
def set_check():
    data = request.json

    if not validate_params(data, 'id', 'workId', 'score', 'comment'):
        return rest('error', Errors.request_params_error)

    res = db.Check.set(data['workId'], data['id'], data['score'], data['comment'])
    if res:
        return rest('success', {})

    return rest('error', Errors.auth_error)