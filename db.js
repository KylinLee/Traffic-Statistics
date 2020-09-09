const mysql = require("mysql")

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tongji"
});

db.connect();

function getCount() {
    return new Promise((resolve, reject) => {
        db.query("select distinct count(id) as count from visitor", (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results[0].count)
        })
    })
}

function insertVisitor(props) {
    return new Promise((resolve, reject) => {
        db.query("select * from blacklist where id=? and name=?", [props[0], props[1]], (error, results) => {
            if (error) {
                reject(error)
            }
            if (results.length !== 0) {
                reject(false)
            }
            db.query("insert into visitor set id=?, name=?, sex=?, temperature=?, visit_time=?", Array.prototype.concat(props, new Date()), (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results)
            })
        })
    })
}

function addBlackList(props) {
    return new Promise((resolve, reject) => {
        db.query("insert into blacklist set id=?, name=?", props, (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            resolve(results)
        })
    })
}

module.exports = {
    getCount,
    insertVisitor,
    addBlackList
}

