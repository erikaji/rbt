function give_sun(rbt) {
	return function() {
		console.log(rbt);
		document.getElementById(rbt+"_sun_button").setAttribute("class", "hidden");
		document.getElementById("fake-sunshine-"+rbt).setAttribute("class", "visible");
	};

}

sun_buttons = document.getElementsByName("sunshine");
if (sun_buttons) {
rbts = document.getElementsByName("id_rbt");
  for (var i = 0; i < rbts.length; i++) {  
  	var rbt = rbts[i].innerHTML;
  	var button = document.getElementById(rbt+"_sun_button");
  	if (button != null) {
  		document.getElementById(rbt+"_form").value = rbt;
    	button.addEventListener("click", give_sun(rbt), false);
    }
 }
}

// sun_tr = document.getElementsByName("sun_tr");
// if (sun_tr){
//   for (var j = 0; j < sun_tr.length; j++) {
//   	var num = Math.floor((Math.random() * 4) + 0);
//   	if (num) {
//   		var td_left = document.createElement("td"); 
//   		sun_tr[j].appendChild(td_left);
//   		td_left.setAttribute("class", "feed-table-left");
//   		var img = new Image(); 
// 		img.src = "/images/Sunshine.png";
// 		img.setAttribute("class", "feed-rbt-icon");
// 		td_left.appendChild(img);
// 		var caption = document.createElement("p"); 
// 		caption.setAttribute("class", "feed-rbt-caption");
// 		//caption.style.color = "Red";
// 		caption.appendChild(document.createTextNode("Sunshine"));
// 		td_left.appendChild(caption);
//   		var td_right = document.createElement("td"); 
//   		sun_tr[j].appendChild(td_right);
//   		td_right.setAttribute("class", "feed-table-right");


// 	  	td_right.appendChild(document.createTextNode("You received "));
// 	  	td_right.innerHTML += num;
// 	  	td_right.innerHTML += " sunshine";
// 	  	if (num != 1) {
// 	  		td_right.innerHTML += "s";
// 	  	}
// 	  	td_right.innerHTML += "!";
// 	  	td_right.style.color = "Orange";

//   	}
//   }
// }
