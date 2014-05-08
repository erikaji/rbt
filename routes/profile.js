exports.view = function(req, res){
  var connection = req.app.get('connection');
  connection.query('SELECT * FROM (rbt, user) WHERE (rbt.id_user = user.id_user AND rbt.id_user = 2)', function(err, rows_rbt){
    res.render('profile', {
      rbt: rows_rbt
    });
  });
};

exports.post = function(req, res){
	console.log('Hello! You typed: '+req.body.rose);
	var connection = req.app.get('connection');
	connection.query('UPDATE rbt SET rose="'+req.body.rose+'" WHERE id_rbt=3', function(err, rows) {
		connection.query('UPDATE rbt SET bud="'+req.body.bud+'" WHERE id_rbt=3', function(err, rows) {
			connection.query('UPDATE rbt SET thorn="'+req.body.thorn+'" WHERE id_rbt=3', function(err, rows) {
	 			connection.query('SELECT * FROM (rbt, user) WHERE (rbt.id_user = user.id_user AND rbt.id_user = 2)', function(err, rows_rbt){
				    res.render('profile', {
				      rbt: rows_rbt
				    });
				});
			});
		});
	  });
  	}