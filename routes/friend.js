exports.view = function(req, res){
	var pool = req.app.get('pool');
	var id_user = req.params.id;
	console.log(pool);
	pool.getConnection(function(err, connection) {
		connection.query('SELECT id_rbt, rbt.id_user, DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, rose, bud, thorn, user.id_user, firstname, lastname, photo_user, facebook_id FROM (rbt, user) WHERE (rbt.id_user = user.id_user AND rbt.id_user = ' + id_user +') ORDER BY created_at DESC;', function(err, rows_rbt) {
	    	res.render('friend', {
				rbt: rows_rbt
			});
	        connection.release();
	    });
	});
};
