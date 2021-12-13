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

//トップページ
app.get('/', (req, res) => {
  res.render('top.ejs');
});


//dishes料理名一覧の表示 (index.ejsを参考に)//
app.get('/dishes', (req, res) => {
  connection.query(
    'SELECT DISTINCT dishes FROM items',
    (error, results) => {
      res.render('dishes.ejs', {items:results});
    }
  );
});


//編集ボタンによる変遷(id取得)(dishes.ejsとnames.ejsの間)//
app.get('/names', (req, res) => {
	connection.query(
		'SELECT name FROM items WHERE dishes=?',
		[req.query.dishes],
		(error, results) => {
			res.render('names.ejs', {items:results});
		}
	);
});

app.get('/areas', (req, res) => {
	connection.query(
		'SELECT (dishes, name, area) FROM items WHERE (dishes=?, name=?)',
		[req.query.dishes, req.query.name],
		(error, results) => {
			res.render('areas.ejs', {items:results});
		}
	);
});

//次は外部API//

app.listen(8080);
//
