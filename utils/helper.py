from flask import jsonify


# create token for auth from user
# ONLY WITH SUCCESS AUTH ALREADY
# todo
def create_token(user):
    return '123'


# create our format return result
# result = success/error
def rest(result, payload):
    # success
    if result == 'success':
        return jsonify({"result": result, 'data': payload})
    # error
    return jsonify({"result": result, 'error': payload})


# validate params from *args in data_dict
# arg need to be a string
def validate_params(data_dict, *args):
    for arg in args:
        if arg not in data_dict:
            return False
    return True
