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
            cursor.execute(
                '''CREATE TABLE IF NOT EXISTS "status" ( "id" serial, "name" varchar(30))''')
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
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(
                '''CREATE TABLE IF NOT EXISTS "role" ( "id" serial, "name" varchar(30))''')
            self.conn.commit()
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
            return self.serialize(one=user)

    def users(self) -> list:
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(
                f'''SELECT id, first_name, second_name, middle_name, role_id FROM "user"''')
            users = cursor.fetchall()
            return self.low_serialize(many=users)

    @staticmethod
    def low_serialize(one=None, many=None):
        if one is not None:
            return {
                "id": one[0],
                "first_name": one[1],
                "second_name": one[2],
                "middle_name": one[3],
                "role_id": one[4]
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
                "first_name": one[3],
                "second_name": one[4],
                "middle_name": one[5],
                "role_id": one[6]
            }
        elif many is not None:
            result = []
            for user in many:
                result.append(User.serialize(one=user))
            return result
        return None


class Check(BaseModel):
    def create_table(self):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute('''CREATE TABLE IF NOT EXISTS "check" (
                            "user_id" integer,
                            "work_id" integer,
                            "value" real,
                            "comment" text
                            );''')
            self.conn.commit()
        return True

    def create(self, workId, workerId):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(
                f'''INSERT INTO "check" ("user_id", "value", "work_id", "comment") VALUES ({workerId}, -1, {workId}, '')''')
            self.conn.commit()

    def set(self, workId, userId, value, comment=''):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(
                f'''UPDATE "check" SET "value"={value}, "comment"='{comment}' WHERE ("user_id"={userId} AND "work_id" = {workId})''')
            self.conn.commit()

            cursor.execute(
                f'''SELECT * from "check" WHERE ("work_id"={workId} AND "value" = -1)'''
            )

            works = cursor.fetchall()

            # set work READY
            if (len(works) == 0):
                cursor.execute(
                    f''' SELECT value from "check" WHERE "work_id" = {workId}'''
                )
                values = cursor.fetchall()
                result = 0
                for value in values:
                    result += value[0]
                result = result / len(values)
                cursor.execute(
                    f''' UPDATE "work" SET "status_id"=4, "total_score"={result} WHERE "id" = {workId}'''
                )
            # set work IN PROGRESS
            else:
                cursor.execute(
                    f''' UPDATE "work" SET "status_id"=2 WHERE "id"={workId}'''
                )
            self.conn.commit()

            return True

    def get(self, workId):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(
                f'''SELECT user_id, comment, value, work_id FROM "check" WHERE ("work_id" = {workId})''')
            checks = cursor.fetchall()
            return self.serialize(many=checks)


    @staticmethod
    def serialize(one=None, many=None):
        if one is not None:
            return {
                "user_id": one[0],
                "comment": one[1],
                "value": one[2],
                "work_id": one[3]
            }
        elif many is not None:
            result = []
            for check in many:
                result.append(Check.serialize(one=check))
            return result
        return None


class Work(BaseModel):
    def create_table(self):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute('''CREATE TABLE IF NOT EXISTS "work" (
                            "id" serial,
                            "creator_id" integer,
                            "status_id" integer,
                            "name" text,
                            "document_link" text,
                            "work_link" text,
                            "created" bigint,
                            "deadline" bigint,
                            "director_score" real,
                            "reviewer_score" real,
                            "total_score" real,
                            "comment" text
                        );''')
            self.conn.commit()
        return True

    def get_created(self, userId):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(
                f'''SELECT * FROM "work" WHERE ("creator_id" = {userId})''')
            works = cursor.fetchall()
            return self.serialize(many=works)

    def get_checks(self, userId):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(
                f'''SELECT work_id, user_id, comment, value FROM "check" WHERE ("user_id" = {userId})''')
            checks = cursor.fetchall()
            works = []
            for check in checks:
                cursor.execute(
                    f'''SELECT * FROM "work" WHERE ("id" = {check[0]})''')
                work = cursor.fetchone()
                if work:
                    work = Work.serialize(one=work)
                    work["check_comment"] = check[2]
                    work["check_value"] = check[3]
                    works.append(work)
            return works

    def create(self, creatorId, name, workLink, documentLink, created, directorScore=0, reviewerScore=0, comment='', deadline=-1):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute(
                f'''INSERT INTO "work"
                 ("id", "creator_id", "name", "document_link", "work_link", "created", "deadline", "director_score", "reviewer_score", "total_score", "comment", "status_id")
                 VALUES (DEFAULT, {creatorId}, '{name}', '{documentLink}', '{workLink}', {created}, {deadline}, {directorScore}, {reviewerScore}, -1, '{comment}', 0) 
                 RETURNING id''')
            id = cursor.fetchone()[0]
            self.conn.commit()
            return id

    @staticmethod
    def serialize(one=None, many=None):
        if one is not None:
            return {
                "id": one[0],
                "creator_id": one[1],
                "status_id": one[2],
                "name": one[3],
                "document_link": one[4],
                "work_link": one[5],
                "created": one[6],
                "deadline": one[7],
                "director_score": one[8],
                "reviewer_score": one[9],
                "total_score": one[10],
                "comment": one[11],
            }
        elif many is not None:
            result = []
            for work in many:
                result.append(Work.serialize(one=work))
            return result
        return None
