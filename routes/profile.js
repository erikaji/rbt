exports.view = function(req, res){
  var connection = req.app.get('connection');
  connection.query('SELECT * FROM (rbt, user) WHERE (rbt.id_user = user.id_user AND rbt.id_user = 2)', function(err, rows_rbt){
    res.render('profile', {
      rbt: rows_rbt
    });
  });
};

exports.post = function(req, res){
	var connection = req.app.get('connection');
	//console.log(window.location.hash);
	connection.query('UPDATE rbt SET rose="'+req.body.rose+'" WHERE id_rbt=3', function(err, rows) {
		connection.query('UPDATE rbt SET bud="'+req.body.bud+'" WHERE id_rbt=3', function(err, rows) {
			connection.query('UPDATE rbt SET thorn="'+req.body.thorn+'" WHERE id_rbt=3', function(err, rows) {

			connection.query('UPDATE rbt SET photo_rbt="'+req.body.photo+'" WHERE id_rbt=3', function(err, rows) {
	 			connection.query('SELECT * FROM (rbt, user) WHERE (rbt.id_user = user.id_user AND rbt.id_user = 2)', function(err, rows_rbt){
				    res.render('profile', {
				      rbt: rows_rbt
				    });
				});
	 		});
			});
		});
	  });
  	}


