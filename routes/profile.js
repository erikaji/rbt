exports.view = function(req, res){

	if(!req.isAuthenticated()){
		res.redirect('/login');
		return;
	}

	//FB ID from request
	var userFacebookId = req.user.id;

	var pool = req.app.get('pool');
	pool.getConnection(function(err, connection) {
		connection.query('SELECT photo_tag, id_rbt, rbt.id_user, '+
			'DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, rose, bud, thorn, '+
			'IF(photo_tag="rose", 1, 0) as rosetag, IF(photo_tag="bud", 1, 0) as budtag,'+
			'IF(photo_tag="thorn", 1, 0) as thorntag, '+
			'user.id_user, firstname, lastname, photo_user, facebook_id FROM (rbt, user) '+
			'WHERE (rbt.id_user = user.id_user AND user.facebook_id = ' + userFacebookId + ') '+
			'ORDER BY created_at DESC;', function(err, rows_rbt) {
	    	res.render('profile', {
				rbt: rows_rbt
			});
	        connection.release();
	    });
	});
};

exports.post = function(req, res){

	//FB ID from request
	var userFacebookId = req.user.id;

	//NOTE: POST IS NOT WORKING, NEEDS TO STORE BY FACEBOOK_ID
	var pool = req.app.get('pool');
	pool.getConnection(function(err, connection) {
		connection.query('INSERT INTO rbt(id_user, created_at, photo_rbt, photo_tag, rose, bud, thorn) '+
			'VALUES (NULL, NOW(), "'+req.body.photo+'", "'+req.body.photo_tag+'", "'+req.body.rose+'", "'+
				req.body.bud+'", "'+req.body.thorn+'");', function(err, rows) {
			connection.query('SELECT id_rbt, rbt.id_user, '+
				'DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, rose, bud, thorn, '+
				'IF(photo_tag="rose", 1, 0) as rosetag, IF(photo_tag="bud", 1, 0) as budtag,'+
				'IF(photo_tag="thorn", 1, 0) as thorntag, '+
				'user.id_user, firstname, lastname, photo_user, facebook_id FROM (rbt, user) '+
				'WHERE (rbt.id_user = user.id_user AND user.facebook_id = ' + userFacebookId + ') ' +
				'ORDER BY created_at DESC;', function(err, rows_rbt){
			    res.render('profile', {
			    	rbt: rows_rbt
	    		});
			});
		});
	});
}

