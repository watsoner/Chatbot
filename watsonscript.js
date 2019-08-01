function send()
{
    var urlvariable;
    urlvariable = "/v1/workspaces/4bd81345-aaad-4bfb-b198-f2187bd5b7f4/message?version=2019-02-28";
    var ItemJSON;
    var inputtext = document.getElementById("input1").value;
if (inputtext.length == 0) 
{
ItemJSON = '';
}
else 
{
    document.getElementById("div2").innerHTML += "<br>";
    document.getElementById("div2").innerHTML += "You: " + inputtext;
    document.getElementById("input1").value = "";
    ItemJSON = '{  "input": {    "message_type": "text",    "text": "' + inputtext + '" }, "context": ' + document.getElementById("div3").innerHTML + ' }';
};
//    ItemJSON = '{  "input": {    "message_type": "text",    "text": "' + inputtext + '"}}';
    URL = "https://gateway-lon.watsonplatform.net/assistant/api" + urlvariable;  //Your URL

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = callbackFunction(xmlhttp);
    xmlhttp.open("POST", URL, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.setRequestHeader('Authorization', 'Basic YXBpa2V5Okl6NkpzQkhHTXR3eU5oM3pDNDYweUV5MTNWazA4SzhfU005cEo5RV91c3Q4'); //in prod, you should encrypt user name and password and provide encrypted keys here instead 
    xmlhttp.onreadystatechange = callbackFunction(xmlhttp);
    xmlhttp.send(ItemJSON);
    var obj1 = JSON.parse(xmlhttp.responseText);
    var obj2 = JSON.parse(JSON.stringify(obj1.output));
    var obj21= JSON.parse(JSON.stringify(obj1.context));
    var obj3 = JSON.parse(JSON.stringify(obj2.text));
    document.getElementById("div2").innerHTML += "<br>";
    document.getElementById("div2").innerHTML += "ChatBot: " + JSON.stringify(obj3);
    document.getElementById("div2").scrollTop = document.getElementById("div2").scrollHeight;
    document.getElementById("div3").innerHTML = JSON.stringify(obj21);
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