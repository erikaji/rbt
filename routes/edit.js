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

			res.render('edit', {
				rbt: rows_rbt
			});
			connection.release();
		});
	});
};