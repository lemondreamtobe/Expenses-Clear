var connection = require('../db/connection');
var queryWithArgs = connection.queryWithArgs;
var query = connection.query;

/*
             输入           输出
insert       Book           信息
delete       Book.id        信息
modify       Book           信息
selectAll    无             [Book]     
selectOne    Book.id        Book
 */

//可以考虑将insert,delete,modify,selectOne,selectAll封装成方法
//将t_book等表格独立出来变成参数传入，然后将传入的对象也封装起来
//这样的话增删查改变成公共接口
var insert = function(book, callback) {
    console.log("book:" + book);
    var sql = "insert into t_book set ?";
    var obj = {
        Book_name:      book.bookName   || '',
        Writer:         book.writer     || '',
        Sort_id:        book.typeId     || 0, //连接类别的外键
        Price:          book.price      || 0,
        Pub_company:    book.pubCompany || '',
        Pub_date:       book.pubDate    || new Date(),
        Total_num:      book.sum        || 0,
        Current_num:    book.currentNum || 0,
        Buy_date:       book.buyDate    || new Date(),
        Brief:          book.brief      || '',
        imageName:      book.imageName  || ''
    };
    console.log(obj);
    try {
        //执行插入语句，成功返回success
        queryWithArgs(sql, obj, function(err, rows) {
            console.log("BookDaoInsertSuccess:" + rows);
            if (err) {
                console.error("BookDaoInsertError:" + err);
            }
            callback("success");
        });
    } catch (er) {
        //错误则输出异常并输出错误
        console.error("BookDaoInsertCatchError:" + er);
        callback(er);
    }
};

exports.insert = insert;

var deleteOne = function(id, callback) {
    var sql = "DELETE FROM t_book WHERE Book_num = ?";
    try {
        queryWithArgs(sql, id, function(err, rows) {
            console.log("BookDaoDeleteSuccess:" + rows);
            if (err) {
                console.error("BookDaoDeleteError:" + err);
            }
            callback("success");
        });
    } catch (er) {
        //错误则输出异常并输出错误
        console.error("BookDaoDeleteCatchError:" + er);
        callback(er);
    }
};

exports.deleteOne = deleteOne;


var modify = function(book, callback) {
    var sql = "UPDATE t_book SET ? WHERE Book_num = " + book.id;
    console.log("sql:"+sql);

    var obj = {
        Book_num:       book.id,
        Book_name:      book.bookName   || '',
        Writer:         book.writer     || '',
        Sort_id:        book.typeId     || 0, //连接类别的外键
        Price:          book.price      || 0,
        Pub_company:    book.pubCompany || '',
        Pub_date:       book.pubDate    || new Date(),
        Total_num:      book.sum        || 0,
        Current_num:    book.currentNum || 0,
        Buy_date:       book.buyDate    || new Date(),
        Brief:          book.brief      || '',
        imageName:      book.imageName  || ''
    };

    console.log(obj);
    console.log(sql);

    try {
        //执行插入语句，成功返回success
        queryWithArgs(sql, obj, function(err, rows) {
            console.log("BookDaoModifySuccess:" + rows);
            if (err) {
                console.error("BookDaoModifyError:" + err);
            }
            callback("success");
        });
    } catch (er) {
        //错误则输出异常并输出错误
        console.error("BookDaoModifyCatchError:" + er);
        callback(er);
    }
};

exports.modify = modify;


var selectOne = function(id, callback){
    var sql = "SELECT * FROM t_book WHERE Book_num = ?";
    try {
        queryWithArgs(sql, id, function(err, rows) {
            console.log("BookDaoSelectOneSuccess:" + rows);
            if (err) {
                console.error("BookDaoSelectOneError:" + err);
            }
            callback(rows[0]);
        });
    } catch (er) {
        //错误则输出异常并输出错误
        console.error("BookDaoSelectOneCatchError:" + er);
        callback(er);
    }
};

exports.selectOne = selectOne;

var selectAll = function(callback) {
    var sql = "select * from t_book,t_type where t_book.Sort_id = t_type.Sort_id";
    try {
        //执行插入语句，成功返回success
        query(sql, function(err, rows) {
            console.log("BookDaoSelectAllSuccess:" + rows);
            if (err) {
                console.error("BookDaoSelectAllError:" + err);
            }
            callback(rows);
        });
    } catch (er) {
        //错误则输出异常并输出错误
        console.error("BookDaoSelectAllCatchError:" + er);
        callback(er);
    }
};

exports.selectAll = selectAll;

var selectMsg = function (user, callback) {
    var sql = "SELECT * FROM t_money  where user = '"+user+"' ORDER BY date DESC LIMIT 1";
   // var sql = "select * from t_money WHERE date = (SELECT max(date) FROM t_money) and user = ?";
    try {
        query(sql, function(err, rows) {
            console.log("SelectMsgSuccess:" + rows);
            if (err) {
                console.error("SelectMsgError:" + err);
            }
            callback(rows);
        });
    } catch (er) {
        //错误则输出异常并输出错误
        console.error("SelectMsgCatchError:" + er);
        callback(er);
    }
}

exports.selectMsg = selectMsg;

//收入
var addinput = function (obj, callback) {
    var rows = selectMsg(obj.username, function (rows) {
        var rows = rows[0];
        var total = parseFloat(obj.money) + parseFloat(rows.total);
        if(obj.type == "card"){
            //更心t_money总表
            var totalcard = parseFloat(obj.money) + parseFloat(rows.card);
            var sql = "UPDATE t_money SET card = '"+totalcard+"',total = '"+total+"' where user = '"+obj.username+"'";
            try {
                //执行插入语句，成功返回success
                query(sql, function(err, rows) {
                    console.log("t_moneyModifySuccess:" + rows);
                    if (err) {
                        console.error("t_moneyModifyError:" + err);
                    }
                    //callback("success",err);
                });
            } catch (er) {
                //错误则输出异常并输出错误
                console.error("t_moneyModifyCatchError:" + er);
                // callback(er);
            }
            //插入数据
            var sql = "insert into t_card set ?";
            var insertobj ={
                user : obj.username,
                money :  obj.money,
                purpose : obj.purpose,
                date    : obj.date||new Date(),
                symbol  : obj.symbol
            };
            try {
                //执行插入语句，成功返回success
                queryWithArgs(sql, insertobj, function(err, rows) {
                    console.log("cardInsertSuccess:" + rows);
                    if (err) {
                        console.error("cardInsertError:" + err);
                    }
                    callback("success");
                });
            } catch (er) {
                //错误则输出异常并输出错误
                console.error("cardInsertCatchError:" + er);
                callback(er);
            }

        }else if(obj.type =="cash"){
            //更心t_money总表
            var totalcash = parseFloat(obj.money) + parseFloat(rows.cash);
            var sql = "UPDATE t_money SET cash = '"+totalcash+"',total = '"+total+"' where user = '"+obj.username+"'";
            try {
                //执行插入语句，成功返回success
                query(sql, function(err, rows) {
                    console.log("t_moneyModifySuccess:" + rows);
                    if (err) {
                        console.error("t_moneyModifyError:" + err);
                    }
                    //callback("success",err);
                });
            } catch (er) {
                //错误则输出异常并输出错误
                console.error("t_moneyModifyCatchError:" + er);
                // callback(er);
            }
            //插入数据

            var sql = "insert into t_cash set ?";
            var insertobj ={
                user : obj.username,
                money : obj.money,
                purpose : obj.purpose,
                date    : obj.date||new Date(),
                symbol  : obj.symbol
            };
            try {
                //执行插入语句，成功返回success
                queryWithArgs(sql, insertobj, function(err, rows) {
                    console.log("cashInsertSuccess:" + rows);
                    if (err) {
                        console.error("cashInsertError:" + err);
                    }
                    callback("success");
                });
            } catch (er) {
                //错误则输出异常并输出错误
                console.error("cashInsertCatchError:" + er);
                callback(er);
            }

        }else if(obj.type =="yct"){
            //更心t_money总表
            var totalyct = parseFloat(obj.money) + parseFloat(rows.yct);
            var sql = "UPDATE t_money SET yct = '"+totalyct+"',total = '"+total+"' where user = '"+obj.username+"'";
            try {
                //执行插入语句，成功返回success
                query(sql, function(err, rows) {
                    console.log("t_moneyModifySuccess:" + rows);
                    if (err) {
                        console.error("t_moneyModifyError:" + err);
                    }
                    //callback("success",err);
                });
            } catch (er) {
                //错误则输出异常并输出错误
                console.error("t_moneyModifyCatchError:" + er);
                // callback(er);
            }
            //插入数据

            var sql = "insert into t_yct set ?";
            var insertobj ={
                user : obj.username,
                money : obj.money,
                purpose : obj.purpose,
                date    : obj.date||new Date(),
                symbol  : obj.symbol
            };
            try {
                //执行插入语句，成功返回success
                queryWithArgs(sql, insertobj, function(err, rows) {
                    console.log("cardInsertSuccess:" + rows);
                    if (err) {
                        console.error("cardInsertError:" + err);
                    }
                    callback("success");
                });
            } catch (er) {
                //错误则输出异常并输出错误
                console.error("cardInsertCatchError:" + er);
                callback(er);
            }

        }else {
            callback('error?')
        }
    });
}
exports.addinput = addinput;

var adduse = function (obj, callback) {
   selectMsg(obj.username, function (rows) {
       var rows = rows[0];
       var total = parseFloat(rows.total) - parseFloat(obj.money);
       if(obj.type == "card"){
           //更心t_money总表
           var totalcard = parseFloat(rows.card) - parseFloat(obj.money);
           var sql = "UPDATE t_money SET card = '"+totalcard+"',total = '"+total+"' where user = '"+obj.username+"'";
           try {
               //执行插入语句，成功返回success
               query(sql, function(err, rows) {
                   console.log("t_moneyModifySuccess:" + rows);
                   if (err) {
                       console.error("t_moneyModifyError:" + err);
                   }
                   //callback("success",err);
               });
           } catch (er) {
               //错误则输出异常并输出错误
               console.error("t_moneyModifyCatchError:" + er);
               // callback(er);
           }
           //插入数据
           var sql = "insert into t_card set ?";
           var insertobj ={
               user : obj.username,
               money :  obj.money,
               purpose : obj.purpose,
               date    : obj.date||new Date(),
               symbol  : obj.symbol
           };
           try {
               //执行插入语句，成功返回success
               queryWithArgs(sql, insertobj, function(err, rows) {
                   console.log("cardInsertSuccess:" + rows);
                   if (err) {
                       console.error("cardInsertError:" + err);
                   }
                   callback("success");
               });
           } catch (er) {
               //错误则输出异常并输出错误
               console.error("cardInsertCatchError:" + er);
               callback(er);
           }

       }else if(obj.type == "cash"){
           //更心t_money总表
           var totalcash = parseFloat(rows.cash) - parseFloat(obj.money);
           var sql = "UPDATE t_money SET cash = '"+totalcash+"',total = '"+total+"' where user = '"+obj.username+"'";
           try {
               //执行插入语句，成功返回success
               query(sql, function(err, rows) {
                   console.log("t_moneyModifySuccess:" + rows);
                   if (err) {
                       console.error("t_moneyModifyError:" + err);
                   }
                   //callback("success",err);
               });
           } catch (er) {
               //错误则输出异常并输出错误
               console.error("t_moneyModifyCatchError:" + er);
               // callback(er);
           }
           //插入数据

           var sql = "insert into t_cash set ?";
           var insertobj ={
               user : obj.username,
               money : obj.money,
               purpose : obj.purpose,
               date    : obj.date||new Date(),
               symbol  : obj.symbol
           };
           try {
               //执行插入语句，成功返回success
               queryWithArgs(sql, insertobj, function(err, rows) {
                   console.log("cashInsertSuccess:" + rows);
                   if (err) {
                       console.error("cashInsertError:" + err);
                   }
                   callback("success");
               });
           } catch (er) {
               //错误则输出异常并输出错误
               console.error("cashInsertCatchError:" + er);
               callback(er);
           }

       }else if(obj.type == "yct"){
           //更心t_money总表
           var totalyct = parseFloat(rows.yct) - parseFloat(obj.money);
           var sql = "UPDATE t_money SET yct = '"+totalyct+"',total = '"+total+"' where user = '"+obj.username+"'";
           try {
               //执行插入语句，成功返回success
               query(sql, function(err, rows) {
                   console.log("t_moneyModifySuccess:" + rows);
                   if (err) {
                       console.error("t_moneyModifyError:" + err);
                   }
                   //callback("success",err);
               });
           } catch (er) {
               //错误则输出异常并输出错误
               console.error("t_moneyModifyCatchError:" + er);
               // callback(er);
           }
           //插入数据

           var sql = "insert into t_yct set ?";
           var insertobj ={
               user : obj.username,
               money : obj.money,
               purpose : obj.purpose,
               date    : obj.date||new Date(),
               symbol  : obj.symbol
           };
           try {
               //执行插入语句，成功返回success
               queryWithArgs(sql, insertobj, function(err, rows) {
                   console.log("cardInsertSuccess:" + rows);
                   if (err) {
                       console.error("cardInsertError:" + err);
                   }
                   callback("success");
               });
           } catch (er) {
               //错误则输出异常并输出错误
               console.error("cardInsertCatchError:" + er);
               callback(er);
           }

       }else {
           callback('error?');
       }
    });



}
exports.adduse = adduse;

var addsearch = function (obj, callback) {
    if(obj.type == "card"){
        var sql = "select * from t_card where date between '"+obj.startTime+"' and '"+obj.endTime+"'and user = '"+obj.username+"' and symbol = "+obj.symbol;
        try {
            //执行插入语句，成功返回success
            query(sql, function(err, rows) {
                console.log("t_cardSearchSuccess:" + rows);
                if (err) {
                    console.error("t_cardSearchError:" + err);
                }
                callback('success', rows);
            });
        } catch (er) {
            //错误则输出异常并输出错误
            console.error("t_cardSearchCatchError:" + er);
            callback('error', er);
        }
    }else if(obj.type == "cash"){

        var sql = "select * from t_cash where date between '" + obj.startTime + "' and '" + obj.endTime + "' and user = '"+ obj.username + "' and symbol =" + obj.symbol;
        console.log(sql);
        try {
            //执行插入语句，成功返回success
            query(sql, function(err, rows) {
                console.log("t_cashSearchSuccess:" + rows);
                if (err) {
                    console.error("t_cashSearchError:" + err);
                }
                callback('success', rows);
            });
        } catch (er) {
            //错误则输出异常并输出错误
            console.error("t_cashSearchCatchError:" + er);
            callback('error', er);
        }

    }else if(obj.type == "yct"){

        var sql = "select * from t_yct where date between '"+obj.startTime+"' and '"+obj.endTime+"' and user = '"+obj.username+"' and symbol = "+obj.symbol;
        console.log(sql);
        try {
            //执行插入语句，成功返回success
            query(sql, function(err, rows) {
                console.log("t_yctSearchSuccess:" + rows);
                if (err) {
                    console.error("t_yctSearchError:" + err);
                }
                callback('success', rows);
            });
        } catch (er) {
            //错误则输出异常并输出错误
            console.error("t_yctSearchCatchError:" + er);
            callback('error', er);
        }

    }else{
        callback('error?');
    }
}
exports.addsearch = addsearch;