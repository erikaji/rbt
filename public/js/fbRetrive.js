(function() {
  var spinner = new Spinner({color: '#ddd'});
  var firebaseRef = 'https://sweltering-fire-7784.firebaseio.com/';
  $('#spin').append(spinner);

  hash = document.getElementById("hash").innerHTML;
  console.log(hash);


  if (hash === '') {
    // No hash found, so render the file upload button.
  } else {
    // A hash was passed in, so let's retrieve and render it.
    spinner.spin(document.getElementById('spin'));
    var f = new Firebase(firebaseRef + '/pano/' + hash + '/filePayload');
    f.once('value', function(snap) {
      var payload = snap.val();

      if (payload != null) {
        //document.getElementById("photo").value = "#"+payload;
        document.getElementById("pano").src = payload;
      } else {
        $('#body').append("Not found");
      }
      spinner.stop();
    });
  }

})();


