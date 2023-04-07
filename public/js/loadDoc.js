function loadDoc() {
  const location = window.location;
  console.log(location);
  var params = {
    cookie_allowed: 1,
  };
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      document.getElementById("demo").innerHTML = "Hey it worked!!";
      var jsonResponse = JSON.parse(this.responseText);
      console.log(jsonResponse["data"]);
      if (params.cookie_allowed)
        document.cookie = "_cnc.uid_=" + jsonResponse["data"];
    }
  };
  xhttp.open(
    "POST",
    "https://9e2b-2405-201-1-a0b5-a84d-1022-1dd0-e99d.in.ngrok.io/getUserInfo",
    true
  );
  // xhttp.withCredentials = true;
  console.log(document.cookie.split("=")[1]);
  params.cookie = document.cookie.split("=")[1];
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(params));
}

loadDoc();
