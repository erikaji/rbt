exports.view = function(req, res){
	if(!req.isAuthenticated()){
		res.redirect('/login');
		return;
	}
	var id_user = req.params.id;
	var userFacebookId = req.user.id;
	var pool = req.app.get('pool');

	pool.getConnection(function(err, connection) {
		connection.query('SELECT id_rbt, suntable.id_user, firstname, lastname, photo_user, facebook_id,'+
			'created_at, photo_rbt, photo_tag, rose, bud, thorn, rosetag, budtag, thorntag, max(sunvalue) as sun '+
			' FROM (SELECT id_rbt, rbt.id_user, firstname, lastname, photo_user, facebook_id,'+
	    	'DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, photo_tag, rose, bud, thorn, '+
			'IF(photo_tag="rose", 1, 0) as rosetag, IF(photo_tag="bud", 1, 0) as budtag,'+
			'IF(photo_tag="thorn", 1, 0) as thorntag, IF(id_giver='+ userFacebookId +', 1, 0) as sunvalue '+
	    	'FROM rbt INNER JOIN user ON rbt.id_user = user.id_user '+
	    	'LEFT JOIN sunshine ON id_rbt = id_rbt_sun) AS suntable '+
	    	'WHERE suntable.id_user = '+ id_user + ' GROUP BY id_rbt ORDER BY created_at DESC;', function(err, rows_rbt) {
	    	res.render('friend', {
				rbt: rows_rbt
			});
	        connection.release();
	    });
	});
};



exports.post = function(req, res){
	var userFacebookId = req.user.id;
	var id_user = req.params.id;
	console.log(id_user);
	var pool = req.app.get('pool');
	pool.getConnection(function(err, connection) {
		connection.query('INSERT INTO sunshine(id_rbt_sun, id_giver) '+
			'VALUES ('+req.body.id_rbt_sun+','+ userFacebookId + ');', function(err, rows) {
		    connection.query('SELECT id_rbt, suntable.id_user, firstname, lastname, photo_user, facebook_id,'+
				'created_at, photo_rbt, photo_tag, rose, bud, thorn, rosetag, budtag, thorntag, max(sunvalue) as sun '+
				' FROM (SELECT id_rbt, rbt.id_user, firstname, lastname, photo_user, facebook_id,'+
		    	'DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, photo_tag, rose, bud, thorn, '+
				'IF(photo_tag="rose", 1, 0) as rosetag, IF(photo_tag="bud", 1, 0) as budtag,'+
				'IF(photo_tag="thorn", 1, 0) as thorntag, IF(id_giver='+ userFacebookId +', 1, 0) as sunvalue '+
		    	'FROM rbt INNER JOIN user ON rbt.id_user = user.id_user '+
		    	'LEFT JOIN sunshine ON id_rbt = id_rbt_sun) AS suntable '+
		    	'WHERE suntable.id_user = '+ id_user + ' GROUP BY id_rbt ORDER BY created_at DESC;', function(err, rows_rbt) {
		    	/*res.render('friend', {
					rbt: rows_rbt
				});*/
		        connection.release();
		    });
		});
	});
}