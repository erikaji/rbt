//rose filter
function view_rose() {
	var roses = document.getElementsByName("rose_tr");
	for (var i = 0; i < roses.length; i++) {  
    	roses[i].setAttribute("class", "visible");
	}
	var buds = document.getElementsByName("bud_tr");
	for (var i = 0; i < buds.length; i++) {  
    	buds[i].setAttribute("class", "hidden");
	}
	var thorns = document.getElementsByName("thorn_tr");
	for (var i = 0; i < thorns.length; i++) {  
    	thorns[i].setAttribute("class", "hidden");
	}
}

var rose_button = document.getElementById("rose_filter");
rose_button.addEventListener("click", view_rose, false);


//bud filter
function view_bud() {
	var roses = document.getElementsByName("rose_tr");
	for (var i = 0; i < roses.length; i++) {  
    	roses[i].setAttribute("class", "hidden");
	}
	var buds = document.getElementsByName("bud_tr");
	for (var i = 0; i < buds.length; i++) {  
    	buds[i].setAttribute("class", "visible");
	}
	var thorns = document.getElementsByName("thorn_tr");
	for (var i = 0; i < thorns.length; i++) {  
    	thorns[i].setAttribute("class", "hidden");
	}
}

var bud_button = document.getElementById("bud_filter");
bud_button.addEventListener("click", view_bud, false);


//thorn filter
function view_thorn() {
	var roses = document.getElementsByName("rose_tr");
	for (var i = 0; i < roses.length; i++) {  
    	roses[i].setAttribute("class", "hidden");
	}
	var buds = document.getElementsByName("bud_tr");
	for (var i = 0; i < buds.length; i++) {  
    	buds[i].setAttribute("class", "hidden");
	}
	var thorns = document.getElementsByName("thorn_tr");
	for (var i = 0; i < thorns.length; i++) {  
    	thorns[i].setAttribute("class", "visible");
	}
}

var thorn_button = document.getElementById("thorn_filter");
thorn_button.addEventListener("click", view_thorn, false);


//no filter
function view_all() {
	var roses = document.getElementsByName("rose_tr");
	for (var i = 0; i < roses.length; i++) {  
    	roses[i].setAttribute("class", "visible");
	}
	var buds = document.getElementsByName("bud_tr");
	for (var i = 0; i < buds.length; i++) {  
    	buds[i].setAttribute("class", "visible");
	}
	var thorns = document.getElementsByName("thorn_tr");
	for (var i = 0; i < thorns.length; i++) {  
    	thorns[i].setAttribute("class", "visible");
	}
}

var all_button = document.getElementById("no_filter");
all_button.addEventListener("click", view_all, false);
