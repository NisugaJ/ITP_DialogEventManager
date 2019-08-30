function passUsername(){
	var username=document.getElementById("uname").value;
	localStorage.setItem("textvalue_UN",username);
	return false;
}