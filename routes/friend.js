exports.view = function(req, res){

	if(!req.isAuthenticated()){
		res.redirect('/login');
		return;
	}

	var pool = req.app.get('pool');
	var id_user = req.params.id;
	var userFacebookId = req.user.id;

	console.log(pool);
	pool.getConnection(function(err, connection) {
		connection.query('SELECT id_giver, photo_tag, id_rbt, rbt.id_user, '+
	    	'DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, rose, bud, thorn, '+
			'IF(photo_tag="rose", 1, 0) as rosetag, IF(photo_tag="bud", 1, 0) as budtag,'+
			'IF(photo_tag="thorn", 1, 0) as thorntag, IFNULL(id_giver, 0), IF(id_giver='+ userFacebookId +', 1, 0) as sun, '+
	    	'firstname, lastname, photo_user, facebook_id FROM rbt INNER JOIN user '+
	    	'ON rbt.id_user = user.id_user '+
	    	'LEFT JOIN sunshine ON id_rbt = id_rbt_sun '+
	    	'WHERE rbt.id_user = '+ id_user +
	    	' ORDER BY created_at DESC;', function(err, rows_rbt) {
	    	res.render('', {
				rbt: rows_rbt
			});
	        connection.release();
	    });
	});
};


