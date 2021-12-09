const config = require('./config');
const express = require('express');
const mysql = require('mysql');

const app = express();

//使用するcssファイル使用と受け取り動作を可能にするexpressへの命令
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

//mysqlとnodeを接続する//
const connection = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.database
	//ここでdatabaseを選んでいるためこの中にitemsを創らないと作動しない//
});

//接続がerrだったときの表示//
connection.connect((err) => {
	if (err) {
		console.log('error connecting: ' + err.stack);
		return;
	}
	console.log('success');
});


//一時利用
app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM items',
    (error, results) => {
      // res.renderの第２引数にオブジェクトを追加してください
      res.render('index.ejs', {items:results});
    }
  );
});
//一時利用ここまで

//
//トップページの表示(top.ejsまだ)
//app.get('/', (req, res) => {
//  res.render('top.ejs');
//});

//料理名一覧の表示//
app.get('/dishes', (req, res) => {
  connection.query(
    'SELECT DISTINCT dishes FROM items',
    (error, results) => {
      res.render('dishes.ejs', {items:results});
    }
  );
});

app.listen(8080);
//
