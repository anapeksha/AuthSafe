from fabric2 import Connection
from datetime import datetime
from os import environ

class Backup:
    def __init__(self):
        self.__connection = Connection(environ.get('BACKUP_HOST'), user=environ.get('BACKUP_USER'), connect_kwargs={"password": environ.get('BACKUP_PWD')})

    def archive(self, toCompress=None, fileName=None):
        self.__connection.run(f"tar -cJf {fileName}.tar.xz {toCompress}", hide=True)

    def downloadLogs(self, file=None):
        self.__connection.get(f"{file}")
    
    def flushLogs(self, path=None):
        self.__connection.run(f'rm -r {path}', hide=True)
        self.__connection.run('rm -r backup-archive.tar.xz', hide=True)
    
    def close(self):
        self.__connection.close()


def main():
    backup = Backup()
    backup.archive(fileName='backup-archive', toCompress='logs')
    backup.downloadLogs(file="backup-archive.tar.xz")
    backup.flushLogs(path="logs")
    backup.close()

if __name__=="__main__":
    main()