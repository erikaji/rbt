exports.view = function(req, res){

	console.log(req);
	
	if(!req.isAuthenticated()){
		res.redirect('/login');
		return;
	}

	//FB ID from request
	var userFacebookId = req.user.id;
	
	var pool = req.app.get('pool');
	//query by FB ID
	pool.getConnection(function(err, connection) {
	    connection.query('SELECT id_giver, photo_tag, id_rbt, rbt.id_user, '+
	    	'DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, rose, bud, thorn, '+
			'IF(photo_tag="rose", 1, 0) as rosetag, IF(photo_tag="bud", 1, 0) as budtag,'+
			'IF(photo_tag="thorn", 1, 0) as thorntag, IFNULL(id_giver, 0), IF(id_giver=2, 1, 0) as sun, '+
	    	'firstname, lastname, photo_user, facebook_id FROM rbt INNER JOIN user '+
	    	'ON rbt.id_user = user.id_user '+
	    	'LEFT JOIN sunshine ON id_rbt = id_rbt_sun '+
	    	'WHERE rbt.id_user != '+ userFacebookId +
	    	' ORDER BY created_at DESC;', function(err, rows_rbt) {
	    	res.render('feed', {
				rbt: rows_rbt
			});
	        connection.release();
	    });
	});
};

exports.post = function(req, res){
	var pool = req.app.get('pool');
	pool.getConnection(function(err, connection) {
		connection.query('INSERT INTO sunshine(id_rbt_sun, id_giver) '+
			'VALUES ('+req.body.id_rbt_sun+', 2);', function(err, rows) {
			    connection.query('SELECT id_giver, photo_tag, id_rbt, rbt.id_user, '+
	    	'DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, rose, bud, thorn, '+
			'IF(photo_tag="rose", 1, 0) as rosetag, IF(photo_tag="bud", 1, 0) as budtag,'+
			'IF(photo_tag="thorn", 1, 0) as thorntag, IFNULL(id_giver, 0), IF(id_giver=2, 1, 0) as sun, '+
	    	'firstname, lastname, photo_user, facebook_id FROM rbt INNER JOIN user '+
	    	'ON rbt.id_user = user.id_user '+
	    	'LEFT JOIN sunshine ON id_rbt = id_rbt_sun '+
	    	'WHERE rbt.id_user != 2 '+
	    	' ORDER BY created_at DESC;', function(err, rows_rbt) {
			    res.render('feed', {
			    	rbt: rows_rbt
	    		});
			});
		});
	});
}
