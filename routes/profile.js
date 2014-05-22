exports.view = function(req, res){
	var pool = req.app.get('pool');
	pool.getConnection(function(err, connection) {
		connection.query('SELECT id_rbt, rbt.id_user, DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, rose, bud, thorn, user.id_user, firstname, lastname, photo_user, facebook_id FROM (rbt, user) WHERE (rbt.id_user = user.id_user AND rbt.id_user = 2)', function(err, rows_rbt) {
	    	res.render('profile', {
				rbt: rows_rbt
			});
	        connection.release();
	    });
	});
};

exports.post = function(req, res){
	var pool = req.app.get('pool');
	pool.getConnection(function(err, connection) {
		connection.query('UPDATE rbt SET rose="'+req.body.rose+'" WHERE id_rbt=3', function(err, rows) {
			connection.query('UPDATE rbt SET bud="'+req.body.bud+'" WHERE id_rbt=3', function(err, rows) {
				connection.query('UPDATE rbt SET thorn="'+req.body.thorn+'" WHERE id_rbt=3', function(err, rows) {
					connection.query('UPDATE rbt SET photo_rbt="'+req.body.photo+'" WHERE id_rbt=3', function(err, rows) {
						connection.query('SELECT id_rbt, rbt.id_user, DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, rose, bud, thorn, user.id_user, firstname, lastname, photo_user, facebook_id FROM (rbt, user) WHERE (rbt.id_user = user.id_user AND rbt.id_user = 2)', function(err, rows_rbt){
						    res.render('profile', {
						    	rbt: rows_rbt
				    		});
						});
	 				});
				});
			});
		});
	});
}