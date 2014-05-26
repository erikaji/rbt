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
		connection.query('SELECT * FROM (rbt, user) WHERE (rbt.id_user = user.id_user AND user.facebook_id !=' + userFacebookId + ') ORDER BY "created_at" DESC', function(err, rows_rbt) {

			//profile pic URL for each other user - currently they don't have facebook_id so this doesn't work
			for(var i  = 0; i < rows_rbt.length; i++){
				rows_rbt[i].pictureURL = "http://graph.facebook.com/" + rows_rbt[i].facebook_id + "/picture?type=square";
			}

			res.render('feed', {
				rbt: rows_rbt
			});
			connection.release();
		});
	});
};