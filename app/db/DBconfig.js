//数据库链接配置类
exports.config = {
    host: 'localhost',
    port: '3306',
    user: "root",
    password: "1234",
    database: "lingfeng",
    supportBigNumbers: true,
    bigNumberStrings: true,
    multipleStatements: true, //默认为false
    connectionLimit: 100 //默认为10
}
