exports.view = function(req, res){
	if(!req.isAuthenticated()){
		res.redirect('/login');
		return;
	}
	var id_user = req.params.id;
	var userFacebookId = req.user.id;
	var pool = req.app.get('pool');

	pool.getConnection(function(err, connection) {
		connection.query('SELECT id_rbt, rbt.id_user, firstname, lastname, photo_user, facebook_id,'+
			'DATE_FORMAT(created_at, "%Y-%m-%dT%TZ") as created_at, photo_rbt, photo_tag, rose, bud, thorn, IF(photo_tag="rose", 1, 0) as rosetag, IF(photo_tag="bud", 1, 0) as budtag, IF(photo_tag="thorn", 1, 0) as thorntag, sun'
			+' FROM rbt left join (select id_rbt_sun, count(id_rbt_sun) as sun from sunshine group by id_rbt_sun) as sun_count on id_rbt_sun = id_rbt inner join user on rbt.id_user = user.id_user where rbt.id_user = '+ id_user +' ORDER BY created_at DESC;', function(err, rows_rbt) {
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
	    	connection.release();
		});
	});
}