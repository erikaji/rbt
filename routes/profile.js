exports.view = function(req, res){

	if(!req.isAuthenticated()){
		res.redirect('/login');
		return;
	}

	//FB ID from request
	var userFacebookId = req.user.id;

	var pool = req.app.get('pool');
	pool.getConnection(function(err, connection) {
		//query by FB ID
		connection.query('SELECT * FROM (rbt, user) WHERE (rbt.id_user = user.id_user AND user.facebook_id =' + userFacebookId + ')', function(err, rows_rbt) {
			
	    	//profile pic URL for user
	    	rows_rbt.pictureURL = "http://graph.facebook.com/" + userFacebookId + "/picture?type=large";

	    	res.render('profile', {
	    		rbt: rows_rbt,
	    	});
	    	connection.release();
	    });
	});
};

exports.post = function(req, res){

	var userFacebookId = req.user.id; //***NEED TO FIX THIS POST TO SAVE UNDER USER'S FB ID***
	
	var pool = req.app.get('pool');

	pool.getConnection(function(err, connection) {
		connection.query('UPDATE rbt SET rose="'+req.body.rose+'" WHERE id_rbt=3', function(err, rows) {
			connection.query('UPDATE rbt SET bud="'+req.body.bud+'" WHERE id_rbt=3', function(err, rows) {
				connection.query('UPDATE rbt SET thorn="'+req.body.thorn+'" WHERE id_rbt=3', function(err, rows) {
					connection.query('UPDATE rbt SET photo_rbt="'+req.body.photo+'" WHERE id_rbt=3', function(err, rows) {
						connection.query('SELECT * FROM (rbt, user) WHERE (rbt.id_user = user.id_user AND rbt.id_user = 2)', function(err, rows_rbt){
							res.redirect('/profile');
						});
					});
				});
			});
		});
	});
}