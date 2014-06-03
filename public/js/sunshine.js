function give_sun(rbt) {
	return function() {
		console.log(rbt);
		document.getElementById(rbt+"_sun_button").setAttribute("class", "hidden");

		var DOM_img = document.createElement("img");
		DOM_img.src = "/images/Sunshine.png";
		document.getElementById(rbt+"_sun").appendChild(DOM_img);
	};

}

sun_buttons = document.getElementsByName("sunshine");
rbts = document.getElementsByName("id_rbt");
  for (var i = 0; i < rbts.length; i++) {  
  	var rbt = rbts[i].innerHTML;
  	var button = document.getElementById(rbt+"_sun_button");
  	if (button != null) {
  		document.getElementById(rbt+"_form").value = rbt;
    	button.addEventListener("click", give_sun(rbt), false);
    }
 }
  


