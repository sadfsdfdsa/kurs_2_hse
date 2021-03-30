from database.models import *

import psycopg2


class Database:
    def __init__(self):
        self.__conn: Connection = psycopg2.connect(dbname='dd8naialb9ltvl',
                                                   user='dphseviiyjgoar',
                                                   password='5b3f9202d866110e9e9c44f92d14ec69c2a07471c936ad3894faf067abc7278b',
                                                   host='ec2-52-19-96-181.eu-west-1.compute.amazonaws.com')

        self.User = User(self.__conn)
        self.Check = Check(self.__conn)
        self.Work = Work(self.__conn)
        self.Status = Status(self.__conn)
        self.Role = Role(self.__conn)

        self.create_tables()

    def create_tables(self):
        self.User.create_table()
        self.Check.create_table()
        self.Work.create_table()
        self.Status.create_table()
        self.Role.create_table()
