from sqlite3.dbapi2 import Connection

import psycopg2.extras


class BaseModel:
    # Конструктор класса принимает в себя объект соединения для возможности
    # делать запросы к базе данных
    def __init__(self, conn: Connection) -> None:
        self.conn = conn

    # Каждая модель должна уметь создавать таблицу для себя
    # В базовой модели сам функционал создания не реализовывается - это описание
    # Метод будет переопределяться в наследниках
    def create_table(self):
        return True

    # Статичный метод для возможности преобразовывать объект самого себя
    # и массив объектов такого же типа в JSON формат
    # Метод будет переопределяться в наследниках
    @staticmethod
    def serialize(one=None, many=None):
        if one is not None:
            return {
                "type": "BaseModel"  # Пример объекта для возврата
            }
        elif many is not None:
            result = []
            for obj in many:
                result.append(BaseModel.serialize(one=obj))
            return result
        return None


class Status(BaseModel):
    def create_table(self):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute('''CREATE TABLE IF NOT EXISTS "status" ( "id" serial, "name" varchar(30))''')
            self.conn.commit()
        return True

    def get_by_id(self, id: int):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(f'''SELECT name FROM "status" WHERE(id={id});''')
            status = cursor.fetchone()
            return {"success": True, "status": self.serialize(one=status)}

    @staticmethod
    def serialize(one=None, many=None):
        if one is not None:
            return {
                "id": one[0],
                "name": one[1],
            }
        elif many is not None:
            result = []
            for obj in many:
                result.append(Status.serialize(one=obj))
            return result
        return None


class Role(BaseModel):
    def create_table(self):
        return True

    @staticmethod
    def serialize(one=None, many=None):
        if one is not None:
            return {
                "id": one[0],
                "login": one[1],
                "username": one[2],
                "status": one[3]
            }
        elif many is not None:
            result = []
            for user in many:
                result.append(User.serialize(one=user))
            return result
        return None


class User(BaseModel):
    def create_table(self):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute('''CREATE TABLE IF NOT EXISTS "user" (
                                "id" serial,
                                "login" varchar(30),
                                "password" text,
                                "first_name" varchar(30),
                                "second_name" varchar(30),
                                "middle_name" varchar(30),
                                "role_id" int
                            );''')
            self.conn.commit()
        return True

    def login(self, login: str, password: str) -> dict:
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(
                f'''SELECT * FROM "user" WHERE ("login"='{login}' AND "password"='{password}')''')
            user = cursor.fetchone()
            return {"success": True, "user": self.serialize(one=user)}

    def users(self) -> list:
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(
                f'''SELECT id, first_name, second_name, middle_name FROM "user"''')
            users = cursor.fetchall()
            return {"success": True, "users": self.low_serialize(many=users)}

    @staticmethod
    def low_serialize(one=None, many=None):
        if one is not None:
            return {
                "id": one[0],
                "first_name": one[1],
                "second_name": one[2],
                "middle_name": one[3],
            }
        elif many is not None:
            result = []
            for user in many:
                result.append(User.low_serialize(one=user))
            return result
        return None

    @staticmethod
    def serialize(one=None, many=None):
        if one is not None:
            return {
                "id": one[0],
                "login": one[1],
                "first_name": one[2],
                "second_name": one[3],
                "middle_name": one[4],
                "role_id": one[5]
            }
        elif many is not None:
            result = []
            for user in many:
                result.append(User.serialize(one=user))
            return result
        return None


class Check(BaseModel):
    def create_table(self):
        return True

    def create(self, workId, workerId):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(
                f'''INSERT INTO "check" ("worker", "value", "work", "comment") VALUES ({workerId}, -1, {workId}, '')''')
            self.conn.commit()

    def set(self, workId, workerId, score, comment=''):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(
                f'''UPDATE "check" SET "value"={score}, "comment"='{comment}' WHERE ("worker"={workerId} AND "work" = {workId})''')
            self.conn.commit()

            cursor.execute(
                f'''SELECT * from "check" WHERE ("work"={workId} AND "value" = -1)'''
            )

            works = cursor.fetchall()

            if (len(works) == 0):
                cursor.execute(
                    f''' SELECT value from "check" WHERE "work" = {workId}'''
                )
                values = cursor.fetchall()
                result = 0
                for value in values:
                    result += value[0]
                result = result / len(values)
                cursor.execute(
                    f''' UPDATE "work" SET "status"='Проверена', "result"={result} WHERE "id" = {workId}'''
                )
            else:
                cursor.execute(
                    f''' UPDATE "work" SET "status"='В работе' WHERE "id"={workId}'''
                )
            self.conn.commit()

            return True

    @staticmethod
    def serialize(one=None, many=None):
        if one is not None:
            return one  # todo
        elif many is not None:
            result = []
            for check in many:
                result.append(Check.serialize(one=check))
            return result
        return None


class Work(BaseModel):
    def create_table(self):
        return True

    def get_created(self, userId):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(
                f'''SELECT * FROM "work" WHERE ("creator" = {userId})''')
            works = cursor.fetchall()
            works = self.serialize(many=works)

            # for work in works:
            return {"success": True, "works": works}

    def get_checks(self, userId):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(
                f'''SELECT work, worker FROM "check" WHERE ("worker" = {userId} AND "value" = -1)''')
            checks = cursor.fetchall()
            works = []
            for check in checks:
                cursor.execute(
                    f'''SELECT * FROM "work" WHERE ("id" = {check[0]})''')
                works.append(self.serialize(cursor.fetchone()))

            return {"success": True, "works": works}

    def create(self, creatorId, name, workLink, documentLink, created, deadline=-1):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(
                f'''INSERT INTO "work" ("id", "creator", "name", "status", "result", "workLink", "documentLink", "created", "deadline") VALUES (DEFAULT, {creatorId}, '{name}', 'Создана', -1, '{workLink}', '{documentLink}', {created}, {deadline}) RETURNING id''')
            id = cursor.fetchone()[0]
            self.conn.commit()
            return id

    @staticmethod
    def serialize(one=None, many=None):
        if one is not None:
            return {
                "id": one[0],
                "creator": one[1],
                "name": one[2],
                "status": one[3],
                "result": one[4],
                "workLink": one[5],
                "documentLink": one[6],
                "created": one[7],
                "deadline": one[8]
            }
        elif many is not None:
            result = []
            for work in many:
                result.append(Work.serialize(one=work))
            return result
        return None
