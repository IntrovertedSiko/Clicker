  var multiplier;
  var autoClicker;
  var clicks;
  var repeat;
    
  window.onLoad=init();
    
    function init(){
      document.getElementById('hide').style.visibility = 'hidden'; // Hides the display before things are done loading. It doesn't work :(
      document.getElementById('saved').style.display = 'none'; // Hides the "saved!" text
      document.getElementById('rainbowMouse').style.width = '10%'; // Adjusts size of gif 
      document.getElementById('rainbowMouse').style.height = 'auto'; 
      clickerInterval;                                              // Initializes the autoClicker timer
      if(localStorage.getItem("clickSave") != undefined){           // Load save if there is any
        clicks = parseInt(localStorage.getItem("clickSave"));
        multiplier = parseInt(localStorage.getItem("multiplierSave"));
        autoClicker = parseInt(localStorage.getItem("autoclickSave"));
        update();
      } else {                                                        // Sets variables if no save found
        clicks = autoClicker = 0;
        multiplier = 1;
      }
      if(localStorage.getItem("lastExit") != undefined){              // Calculates PSoD time if found
        var lastExit = parseInt(localStorage.getItem("lastExit"));
        var currentTime = new Date().getTime();
        var timeOut = Math.round((currentTime - lastExit) / 10000);
        clicks += timeOut * multiplier;
        
        localStorage.removeItem("lastExit");
        document.getElementById("PSoD").innerHTML = "You gained " + (timeOut * multiplier) + " clicks while you were gone!";
      }
      document.getElementById('show').style.visibility = 'visible';   // Shows the "show" button. idk
    }
    
      function unload(){                                              // Called when PSoD is clicked.
        var lastExit = (new Date().getTime()).toString();
        localStorage.setItem("lastExit", lastExit);
        document.getElementById("hide").style.display = "none";
    }
  
  function getKey(e){                                                   // Called when "e" is pressed
    var code;                                                            // Adds clicks
    if(!e) var e = window.event;
    if(e.keyCode) code = e.keyCode;
    else if(e.which) code = e.which;
    if(code==69){
      clicks += 1 * multiplier;
      update();
    }
  }
  
function clicked(){                                                       // Called when "up" is clicked
  clicks += 1 * multiplier;                                               // Adds clicks
  update();
}
  
function unclicked(){                                                     // Called when "down" is clicked
  clicks -= 1 * multiplier;                                               // Lowers clicks
  update();
}
  
function reset(){                                                         // Called when "reset" is clicked
  clicks = autoClicker = 0;                                               // ... it resets
  multiplier = 1;
  localStorage.removeItem("clickSave");
  localStorage.removeItem("autoclickSave");
  localStorage.removeItem("multiplierSave");
  update();
}
    
function Upgrade(){                                                       // Called when "upgrade" is clicked
  var multiplierCost = multiplier * multiplier * 10;                      // Buys upgrade (adds multipliers)
  if(clicks >= multiplierCost){
    clicks -= multiplierCost;
    multiplier += 1;
    update();
  }
}
  function autoClick(){                                                   // Called when "Auto Clicker" is clicked
    var autoCost = autoClicker * autoClicker * 50 + 50;                   // Buys autoclickers (adds autoClicker)
    if(clicks >= autoCost){
     clicks -= autoCost;
      autoClicker += 1;
      update();
    }
  }
  
  function autoClicked(){                                                 // Called every second
   clicks += autoClicker;                                                 // Adds amount of autoClickers to clicks
    update();
  }
  
  function save(){                                                        // Called when "save" is clicked
   localStorage.setItem("clickSave", clicks.toString());                  // ... it saves
    localStorage.setItem("autoclickSave", autoClicker.toString());
    localStorage.setItem("multiplierSave", multiplier.toString());
    document.getElementById("saved").style.display = "block";
    $("#saved").fadeOut(1000);
  }
  
  function update(){                                                      // Display updater. Called every second after autoclicker
  document.getElementById("demo").innerHTML = "Clicks: " + clicks + " | Multiplier: " + multiplier + " | Autoclickers: " + autoClicker; //Clicks display
  document.getElementById("multiplier").innerHTML="Upgrade [" + multiplier * multiplier * 10 + " clicks]"; //Multiplier Price
  document.getElementById("auto").innerHTML="Auto Clicker [" + (autoClicker * autoClicker * 50 + 50) + " clicks]"; //Autoclick Price
      
  }
  var clickerInterval = setInterval(autoClicked, 1000);                   // Timer for autoclicker. 1 Second
  setInterval(save, 60000);                                              // Autosaver. 1 minute
