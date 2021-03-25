from database.models import *

import psycopg2


class Database:
    def __init__(self):
        self.__conn: Connection = psycopg2.connect(dbname='dfc7o140smeekc',
                                                   user='gdpehvortnpwri',
                                                   password='142003089fd79f3b273399a8daf13e8bb3293ca792840b415de38609c49a0ad2',
                                                   host='ec2-34-254-69-72.eu-west-1.compute.amazonaws.com')

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
