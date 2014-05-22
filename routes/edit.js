exports.view = function(req, res){
	var pool = req.app.get('pool');
	pool.getConnection(function(err, connection) {
		connection.query('SELECT id_user, firstname, lastname, photo_user, facebook_id FROM user '+
			'WHERE (id_user = 2)', function(err, rows_rbt) {
	    	res.render('edit', {
				rbt: rows_rbt
			});
	        connection.release();
	    });
	});
};