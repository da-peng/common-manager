import './index'
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.LOG_ENABLED = 'false';
process.env.LOG_LEVEL = 'info';
process.env.encryptKey = '3.14159';

process.env.HITCHHIKER_DB_HOST = 'localhost';
process.env.HITCHHIKER_DB_USERNAME = 'root';
process.env.MYSQL_ROOT_PASSWORD ='root';
process.env.HITCHHIKER_DB_PORT='3306'
process.env.MYSQL_DATABASE='vlog-data'