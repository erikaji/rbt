exports.view = function(req, res){
	var pool = req.app.get('pool');
	pool.getConnection(function(err, connection) {
		connection.query('SELECT id_rbt, rbt.id_user, DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, rose, bud, thorn, user.id_user, firstname, lastname, photo_user, facebook_id FROM (rbt, user) WHERE (rbt.id_user = user.id_user AND rbt.id_user = 2) ORDER BY created_at DESC;', function(err, rows_rbt) {
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
		connection.query('INSERT INTO rbt(id_user, created_at, photo_rbt, photo_tag, rose, bud, thorn) VALUES (2, NOW(), "'+req.body.photo+'", "'+req.body.photo_tag+'", "'+req.body.rose+'", "'+req.body.bud+'", "'+req.body.thorn+'");', function(err, rows) {
			connection.query('SELECT id_rbt, rbt.id_user, DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, rose, bud, thorn, user.id_user, firstname, lastname, photo_user, facebook_id FROM (rbt, user) WHERE (rbt.id_user = user.id_user AND rbt.id_user = 2) ORDER BY created_at DESC;', function(err, rows_rbt){
			    res.render('profile', {
			    	rbt: rows_rbt
	    		});
			});
		});
	});
}