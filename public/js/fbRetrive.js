(function() {
  var spinner = new Spinner({color: '#ddd'});
  var firebaseRef = 'https://sweltering-fire-7784.firebaseio.com/';
  $('#spin').append(spinner);
  users = document.getElementsByName("user");

  function callBack(f, i){
  return f.once('value', function(snap) {
      var payload = snap.val();

      if (payload != null) {
        console.log(users[i].innerHTML);

        document.getElementById(users[i].innerHTML+"_pano").src = payload;
      } else {
        $('#body').append("Not found");
      }
      spinner.stop();
    });
}

    var funcs = [];
  for (var i = 0; i < users.length; i++) {  
    console.log(i);
    var user = users[i].innerHTML;
    var hash = document.getElementById(user+"_hash").innerHTML;
    console.log(user);
    console.log(hash);  
    if (hash === '') {
      // No hash found, so render the file upload button.
    } else {
      // A hash was passed in, so let's retrieve and render it.
      spinner.spin(document.getElementById(user+"_spin"));
      var f = new Firebase(firebaseRef + '/pano/' + hash + '/filePayload');
      funcs[i] = callBack(f, i);
    }
  }
  spinner.stop();


})();


