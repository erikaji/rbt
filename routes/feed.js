exports.view = function(req, res){
  var connection = req.app.get('connection');
  connection.query('SELECT * FROM (rbt, user) WHERE (rbt.id_user = user.id_user)', function(err, rows_rbt){
    res.render('feed', {
      rbt: rows_rbt
    });
  });
};
