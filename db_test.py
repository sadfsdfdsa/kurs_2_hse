from app import db

# print(db.User.login('login', '123')["user"]["name"])


print(len(db.Work.get_all(1)["works"]))