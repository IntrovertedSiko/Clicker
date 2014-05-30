  var multiplier;
  var autoClicker;
  var clicks;
  var repeat;
    
  window.onLoad=init();
    
    function init(){     
      document.getElementById('hide').style.visibility = 'hidden';
      document.getElementById('saved').style.display = 'none';
      document.getElementById('show').style.visibility = 'hidden';
      document.getElementById('rainbowMouse').style.width = '25%';
      document.getElementById('rainbowMouse').style.height = 'auto';
      clickerInterval;
      if(localStorage.getItem("clickSave") != undefined){
        clicks = parseInt(localStorage.getItem("clickSave"));
        multiplier = parseInt(localStorage.getItem("multiplierSave"));
        autoClicker = parseInt(localStorage.getItem("autoclickSave"));
        update();
      } else {
        clicks = autoClicker = 0;
        multiplier = 1;
      }
      if(localStorage.getItem("lastExit") != undefined){
        var lastExit = parseInt(localStorage.getItem("lastExit"));
        var currentTime = new Date().getTime();
        var timeOut = Math.round((currentTime - lastExit) / 10000);
        clicks += timeOut * multiplier;
        
        localStorage.removeItem("lastExit");
        document.getElementById("PSoD").innerHTML = "You gained " + (timeOut * multiplier) + " clicks while you were gone!";
      }
      document.getElementById('show').style.visibility = 'visible';
    }
    
      function unload(){
        var lastExit = (new Date().getTime()).toString();
        localStorage.setItem("lastExit", lastExit);
        document.getElementById("hide").style.display = "none";
    }
  
  function getKey(e){
    var code
    if(!e) var e = window.event;
    if(e.keyCode) code = e.keyCode;
    else if(e.which) code = e.which;
    if(code==69){
      clicks += 1 * multiplier;
      update();
    }
  }
  
function clicked(){
  clicks += 1 * multiplier;
  update();
}
  
function unclicked(){
  clicks -= 1 * multiplier;
  update();
}
  
function reset(){
  clicks = autoClicker = 0;
  multiplier = 1;
  update();
}
    
function Upgrade(){
  var multiplierCost = multiplier * multiplier * 10;
  if(clicks >= multiplierCost){
    clicks -= multiplierCost;
    multiplier += 1;
    update();
  }
}
  function autoClick(){
    var autoCost = autoClicker * autoClicker * 50 + 50;
    if(clicks >= autoCost){
     clicks -= autoCost;
      autoClicker += 1;
      update();
    }
  }
  
  function autoClicked(){
   clicks += autoClicker; 
    update();
  }
  
  function save(){
   localStorage.setItem("clickSave", clicks.toString());
    localStorage.setItem("autoclickSave", autoClicker.toString());
    localStorage.setItem("multiplierSave", multiplier.toString());
    document.getElementById("saved").style.display = "block";
    $("#saved").fadeOut(1000);
  }
  
  function update(){
  document.getElementById("demo").innerHTML = "Clicks: " + clicks + " | Multiplier: " + multiplier + " | Autoclickers: " + autoClicker; //Clicks display
    
    document.getElementById("multiplier").innerHTML="Upgrade [" + multiplier * multiplier * 10 + " clicks]"; //Multiplier Price
    
    
      document.getElementById("auto").innerHTML="Auto Clicker [" + (autoClicker * autoClicker * 50 + 50) + " clicks]"; //Autoclick Price
      
  }
  var clickerInterval = setInterval(autoClicked, 1000);
  setInterval(save, 300000);
