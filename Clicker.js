  var multiplier; // Click Multiplier
  var autoClicker;  // AutoClickers...
  var clicks; // Main variable. Clicks are masterrace
  var clickDelay; // Delay b/w clicks. Mainly to encourage clicking
  var lastClickDelay;
  var maxClickDelay;
  var clickPowerTime;
  
  var printers;
  var printDelay;
  var hasPrinter;
  
  var repeat;
    
  window.onLoad=init();
    
    function init(){
      document.getElementById('main').style.visibility = 'hidden'; // Hides the display before things are done loading. It doesn't work :(
      document.getElementById('saved').style.display = 'none'; // Hides the "saved!" text
      document.getElementById('rainbowMouse').style.width = '10%'; // Adjusts size of gif 
      document.getElementById('rainbowMouse').style.height = 'auto'; 
    //  $(".shop").each(function(){$(this).hide()});
      clickerInterval;                                              // Initializes the autoClicker timer
      
      if(localStorage.getItem("clickSave") != undefined){           // Load save if there is any
        clicks = parseInt(localStorage.getItem("clickSave"));
        multiplier = parseInt(localStorage.getItem("multiplierSave"));
        autoClicker = parseInt(localStorage.getItem("autoclickSave"));
        printers = parseInt(localStorage.getItem("printerSave"));
        printDelay = parseInt(localStorage.getItem("printDelaySave"));
        clickDelay = parseInt(localStorage.getItem("clickDelaySave"));
        update();
      } else {                                                        // Sets variables if no save found
        clicks = autoClicker = printers = Number(0);
        multiplier = Number(1);
      }
      
      maxClickDelay = Number(100);
      
      if(printers==undefined || printers==null || printers==NaN) printers = Number(0); // If no printers, then no printers. Mainly for v0.5
      if(printDelay==undefined || printDelay==null || printDelay==NaN) printDelay = (Math.floor(Math.random() * 600) + 1) + 300; // Pre-sets the delay for printer
      if(lastClickDelay==undefined || lastClickDelay==null || lastClickDelay==NaN) lastClickDelay = 5; // If no click delay, then click delay = 5; mainly for v0.6
      if(clickDelay==undefined || clickDelay==null || clickDelay==NaN) clickDelay = maxClickDelay;
      
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
    
  /*  $(window).konami({                                              // Konami!
      cheat: function(){
        clicks += 1000;
      }
    });
    */ //Not working again
    function unload(){                                              // Called when PSoD is clicked.
      var lastExit = (new Date().getTime()).toString();
      localStorage.setItem("lastExit", lastExit);
      document.getElementById("main").style.display = "none";
    }
  
    function checkHasPrinter(){
      if(printers > 0){
          hasPrinter = "yes" 
        } else {
          hasPrinter = "no"
        }
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
    
    function gotoPage(page){
      document.getElementById("main").style.display = "none";
       document.getElementById("store").style.display = "none";
        document.getElementById(page).style.display = "block";
    }
  
  function clicked(){                                                       // Called when "up" is clicked
    clicks += 1 * multiplier;                                               // Adds clicks
    if(!clickPowerTime){
      --clickDelay;
      lastClickDelay = 5;
    }
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
    localStorage.removeItem("printerSave");
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
  
  function buyPrinter(){
    if(clicks >= 10000000 && printers < 1){
      clicks -= 10000000;
      printers += 1;
      update();
    }
  }
  
  function secondTimer(){                                                 // Called every second
   clicks += autoClicker;                                                 // Adds amount of autoClickers to clicks
   if(!clickPowerTime){
    if(lastClickDelay > 0) --lastClickDelay;
    if(lastClickDelay <= 0 && clickDelay < maxClickDelay) ++clickDelay;
    if(clickDelay <= 0) {
      multiplier += 100;
      clickPowerTime = true;
      }
    } else if(clickDelay < maxClickDelay){
      clickDelay += 10;
    } else if(clickDelay >= maxClickDelay){
      clickPowerTme = false;
      multiplier -= 100;
    }
    
   if(printDelay > 0 || printDelay == undefined){
     if(printers > 0){
       printDelay--;
     }
     
     checkHasPrinter();
     
     if(printDelay == undefined){
       printDelay = (Math.floor(Math.random() * 600) + 1) + 300;
     } 
   }else{
     autoClicker++;
     printDelay = (Math.floor(Math.random() * 600) + 1) + 300;
   }
   
   update();
  }
  
  function save(){                                                        // Called when "save" is clicked
   localStorage.setItem("clickSave", clicks.toString());                  // ... it saves
    localStorage.setItem("autoclickSave", autoClicker.toString());
    localStorage.setItem("multiplierSave", multiplier.toString());
    localStorage.setItem("printerSave", printers.toString());
    localStorage.setItem("printDelaySave", printDelay.toString());
    localStorage.setItem("clickDelaySave", clickDelay.toString());
    document.getElementById("saved").style.display = "block";
    $("#saved").fadeOut(1000);
  }
  
  function update(){                                                      // Display updater. Called every second after autoclicker
  document.getElementById("mainInfo").innerHTML = "Clicks: " + clicks + " | Multiplier: " + multiplier + " | Autoclickers: " + autoClicker + " | Printer: " + hasPrinter; //Clicks display
  document.getElementById("mainn").innerHTML = "Printers: " + printers + " | Delay: " + printDelay + " | ClickDelay: " + clickDelay + " | lastClickDelay: " + lastClickDelay;
  document.getElementById("multiplier").innerHTML="Upgrade [" + multiplier * multiplier * 10 + " clicks]"; //Multiplier Price
  document.getElementById("auto").innerHTML="Auto Clicker [" + (autoClicker * autoClicker * 50 + 50) + " clicks]"; //Autoclick Price
  document.getElementById("print").innerHTML="Clicker Printer [10000000 clicks]"
  }
  
  var clickerInterval = setInterval(secondTimer, 1000);                   // Timer for autoclicker. 1 Second
  setInterval(save, 60000);                                              // Autosaver. 1 minute
