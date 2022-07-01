var dropdown=document.getElementById("dropdown");
var text=document.getElementById("codearea");
var consoleData=document.getElementById("outarea")
var button=document.getElementById("compilebtn");
var langCode;
var option=document.getElementsByClassName("option");
dropdown.onchange=function(){
    langCode=dropdown.value;
}

button.addEventListener("click",function(event){
    obj={
     code:text.value,
     langId:langCode
     }
    var compileReq=new XMLHttpRequest();
   compileReq.open("POST"," https://codequotient.com/api/executeCode");
   compileReq.setRequestHeader("Content-Type", "application/json");
   compileReq.send(JSON.stringify(obj));
   compileReq.addEventListener("load",function(e){
       var codeId=JSON.parse(e.target.responseText).codeId;
       console.log(codeId);
      if(codeId===undefined){
        consoleData.innerHTML= JSON.parse(e.target.responseText).error;
      }else{
          setTimeout(function(){
          var request = new XMLHttpRequest();
          request.open("GET" , `https://codequotient.com/api/codeResult/${codeId}`)
          request.send();
          request.addEventListener("load" , function(event){
          var result = JSON.parse(event.target.responseText).data;
          var errors=JSON.parse(result).errors;
          var output=JSON.parse(result).output;
          console.log(result,errors);
          if(errors===''){
              consoleData.innerHTML=output;
          }else{
              consoleData.innerHTML=errors; 
          }
          })
      },3000)
      consoleData.innerHTML="Compiling the program ...";
      }

   })
 })
