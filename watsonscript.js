var jsonFileName = "data.json"; //global variable
var filetext = readDataFile(jsonFileName);
var linksJSON = JSON.parse(filetext);
var contextTemp = {"conversation_id":"7d09cf69-f0ec-4e1d-84e9-b338528d01fd","system":{"initialized":true,"dialog_stack":[{"dialog_node":"root"}],"dialog_turn_counter":1,"dialog_request_counter":1,"_node_output_map":{"node_12_1554133461784":{"0":[0]}},"branch_exited":true,"branch_exited_reason":"completed"}};
  
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
        ItemJSON = JSON.parse('{  "input": {    "message_type": "text",    "text": "' + inputtext + '" }, "context": ' + contextTemp + ' }');
        if(ItemJSON) {
                ItemJSON.context["rawdatavar"]=linksJSON; 	
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
    contextTemp = JSON.stringify(obj21);
}
function loadTable()
{
		var dataLoaded = linksJSON;
		var txt = "<table id='jsonTable' border='1'>";
		for (var key in dataLoaded) {
			txt += "<tr><td contenteditable='true'>" + key + "</td><td contenteditable='true'>" + dataLoaded[key] + "</td></tr>";			
		}
		txt += "</table>";
		document.getElementById("tabledata").innerHTML = txt;
}
function updateTable()
{
	   var newtable = tableToJSON(jsonTable);
	   linksJSON = newtable;
	   console.log(linksJSON);
}
function tableToJSON(table)
{
	var data={};
	for (var i=0; i<table.rows.length; i++) {
		var tableRow = table.rows[i];
		data[tableRow.cells[0].innerHTML]=tableRow.cells[1].innerHTML;
		console.log(data);
	}
	return data;
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