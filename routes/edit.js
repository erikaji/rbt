exports.view = function(req, res){

	if(!req.isAuthenticated()){
		res.redirect('/login');
		return;
	}

	//FB ID from request
	var userFacebookId = req.user.id;

	var pool = req.app.get('pool');
	pool.getConnection(function(err, connection) {
		connection.query('SELECT id_user, firstname, lastname, photo_user, facebook_id FROM user '+
			'WHERE (user.facebook_id = ' + userFacebookId + ')', function(err, rows_rbt) {
	    	res.render('edit', {
				rbt: rows_rbt
			});
	        connection.release();
	    });
	});
};