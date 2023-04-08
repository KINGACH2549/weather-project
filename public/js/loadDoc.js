function loadDoc() {
  const location = window.location.href;
  // console.log(location);
  console.log(document.referrer);
  var params = {
    cookie_allowed: 1,
    page_name: location,
    refferal: document.referrer,
  };
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      var jsonResponse = JSON.parse(this.responseText);
      console.log(jsonResponse["data"]);
      if (params.cookie_allowed)
        document.cookie = "_cnc.uid_=" + jsonResponse["data"];
    }
  };
  xhttp.open(
    "POST",
    "https://e2f4-2405-201-1-a00f-b779-a7a1-201a-3439.ngrok-free.app/getUserInfo",
    true
  );
  // xhttp.withCredentials = true;
  console.log(document.cookie.split("=")[1]);
  params.cookie = document.cookie.split("=")[1];
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify(params));
}

loadDoc();
