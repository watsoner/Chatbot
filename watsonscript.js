var jsonFileName = "data.json"; //global variable
  
function send()
{
    var urlvariable;
    urlvariable = "/v1/workspaces/4bd81345-aaad-4bfb-b198-f2187bd5b7f4/message?version=2019-02-28";
    URL = "https://gateway-lon.watsonplatform.net/assistant/api" + urlvariable;  
    var ItemJSON;
    var inputtext = document.getElementById("input1").value;
        if (inputtext.length == 0) 
        {  ItemJSON = '';  }
        else 
        {
        document.getElementById("div2").innerHTML += "<p class=p_user>" + inputtext + "&nbsp;<img src=./img/user_icon.png class='iconpic'/></p>";
        document.getElementById("input1").value = "";
        ItemJSON = JSON.parse('{  "input": {    "message_type": "text",    "text": "' + inputtext + '" }, "context": ' + document.getElementById("div3").innerHTML + ' }');
//      ItemJSON = '{  "input": {    "message_type": "text",    "text": "' + inputtext + '"}}'; //without context variable
//      var linksJSON = JSON.parse('{"Shift Roster":"Roster.com","SNOW":"SNOW.com"}');
        var filetext = readDataFile(jsonFileName);
        var linksJSON2 = JSON.parse(filetext);
        if(ItemJSON) {
                ItemJSON.context["rawdatavar"]=linksJSON2; 	
                };
        ItemJSON = JSON.stringify(ItemJSON);
        };
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", URL, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader('Authorization', 'Basic YXBpa2V5Okl6NkpzQkhHTXR3eU5oM3pDNDYweUV5MTNWazA4SzhfU005cEo5RV91c3Q4'); //in prod, you should encrypt user name and password and provide encrypted keys here instead 
    xmlhttp.onreadystatechange = callbackFunction(xmlhttp);
    xmlhttp.send(ItemJSON);
    var obj1 = JSON.parse(xmlhttp.responseText);
    var obj2 = obj1.output;
    var obj21= obj1.context;
    var obj3 = obj2.text;
for (var key in obj3) {
  if(obj3[key]) {
    document.getElementById("div2").innerHTML += "<p class=p_bot><img src=./img/watson_icon.png class='iconpic'/>&nbsp;" + obj3[key] + "</p>";
    };
  };
    document.getElementById("div2").scrollTop = document.getElementById("div2").scrollHeight;
    document.getElementById("div3").innerHTML = JSON.stringify(obj21);
}
function loadTable()
{
		var filetext = readDataFile(jsonFileName);
        var dataLoaded = JSON.parse(filetext);	
		var txt = "<table border='1'>";
		for (var key in dataLoaded) {
			txt += "<tr><td contenteditable='true'>" + key + "</td><td contenteditable='true'>" + dataLoaded[key] + "</td></tr>";			
		}
		txt += "</table>";
		document.getElementById("tabledata").innerHTML = txt;
}
function updateTable()
{
	   writeDataFile(jsonFileName);	   
}
function writeDataFile(file)
{
    var rawFile = new XMLHttpRequest();	
	rawFile.open("POST", file, false);
	rawFile.setRequestHeader("Content-Type", "application/json");
    rawFile.onreadystatechange = callbackFunction(xmlhttp);
    rawFile.send(JSON.stringify('{"hi":"hello","bye":"bubye"}'));	
    rawFile.onloadend = function () {
    };
}
function readDataFile(file)
{
    var rawFile = new XMLHttpRequest();
    var filedata;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                filedata = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return filedata;
}
function callbackFunction(xmlhttp) 
{
    //alert(xmlhttp.responseXML);
}
function openForm() {
  document.getElementById("myForm").style.display = "block";
  send();
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("div2").innerHTML = "";
}
$(document).ready(function(){
  // Initialize Tooltip
  $('[data-toggle="tooltip"]').tooltip(); 
  
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#home']").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {

      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
})