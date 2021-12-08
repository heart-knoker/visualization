const express = require('express');
const mysql = require('mysql');

const app = express();

//使用するcssファイル使用と受け取り動作を可能にするexpressへの命令
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

//mysqlとnodeを接続する//
const connection = mysql.createConnection({
	host:'localhost',
	user: 'root',
	password: 'Endasugoi7',
	database: 'foot_print'
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

//トップページの表示(top.ejsまだ)//
app.get('/', (req, res) => {
  res.render('top.ejs');
})

//料理名一覧の表示//
app.get('/dishes', (req, res) => {
  connection.query(
    'SELECT DISTINCT dishes FROM items',
    (error, results) => {
      res.render('dishes.ejs', {items:results});
    }
  );
})
