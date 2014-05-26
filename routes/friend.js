exports.view = function(req, res){ //***NO CHANGES MADE HERE USING FB ID***

	var pool = req.app.get('pool');
	var id_user = req.params.id;

	pool.getConnection(function(err, connection) {
	    connection.query('SELECT * FROM (rbt, user) WHERE (rbt.id_user = user.id_user AND rbt.id_user = ' + id_user +')', function(err, rows_rbt) {
	    	res.render('friend', {
				rbt: rows_rbt
			});
	        connection.release();
	    });
	});
};
