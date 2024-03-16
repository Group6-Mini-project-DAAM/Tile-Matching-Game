

function tog_class(id, cl) {
  var elem = document.getElementById(id);
  if (elem.classList.contains(cl) === true) {
    elem.classList.remove(cl);
  } else {
    elem.classList.add(cl);
  }
}

function add_class(id, cl) {
  var elem = document.getElementById(id);
  if (elem.classList.contains(cl) !== true) {
    elem.classList.add(cl);
  }
}

function rem_class(id, cl) {
  var elem = document.getElementById(id);
  if (elem.classList.contains(cl) === true) {
    elem.classList.remove(cl);
  }
}



function tog_elem(i, elem) {
  document.getElementById("tile_" + i).onclick = function() {
    tog_class("tile_" + i, "tile_open");
    setTimeout(function() {
      tog_class("tile_icon_" + i, "fa-" + elem);
    }, 0);
  };
}



function add_elem(i, elem) {
  document.getElementById("tile_" + i).onclick = function() {
    window.opentile = i;
    add_class("tile_" + i, "tile_open");
    add_class("tile_icon_" + i, "fa-" + elem);

    if (window.tilecount == 1) {
      if (i != window.lasttile && window.A[i] == window.A[window.lasttile]) {
        
        var first = document.getElementById("tile_" + i); 
        var second = document.getElementById("tile_" + window.lasttile); 

        first.classList.add("tile_closed"); 
        second.classList.add("tile_closed"); 

        first.onclick = ""; 
        second.onclick = ""; 

        window.paircount++; 
        if (window.paircount == 8) {
         
          add_class("overlay_win", "overlay_win_open");
        }
      } else {
        rem_delay(window.opentile, window.lasttile);
      }

      window.tilecount = 0; 
    } else {
      window.lasttile = i; 
      window.tilecount++;
    }
  };
}



function rem_select(i) {
  rem_class("tile_" + i, "tile_open");
  rem_class("tile_icon_" + i, "fa-eye");
  rem_class("tile_icon_" + i, "fa-star");
  rem_class("tile_icon_" + i, "fa-heart");
  rem_class("tile_icon_" + i, "fa-diamond");
}



function rem_delay(first, second) {
  setTimeout(function() {
    rem_select(first); 
    rem_select(second); 
  }, 1000);
}



function shuffle() {
  var j;
  var t;

  var A = [
    "eye",
    "eye",
    "eye",
    "eye",
    "star",
    "star",
    "star",
    "star",
    "heart",
    "heart",
    "heart",
    "heart",
    "diamond",
    "diamond",
    "diamond",
    "diamond"
  ];

  for (i = 0; i < 16; i++) {
    j = Math.floor(Math.random() * (i + 1));
    t = A[i];
    A[i] = A[j];
    A[j] = t;
  }
  console.log(A);
  return A;
}



function reset_tiles() {
  for (i = 0; i < 16; i++) {
    rem_select(i); 
    add_elem(i, A[i]); 
    rem_class("tile_" + i, "tile_closed"); .
  }
}

//this function resets the game

function reset() {
  window.A = shuffle(); 
  window.paircount = 0;
  window.tilecount = 0;
  window.lasttile = null;
  window.opentile = null;

  reset_tiles(); 

  rem_class("overlay_win", "overlay_win_open"); 
}

//variables

var A = shuffle(); 
var paircount = 0; 
var tilecount = 0; 
var lasttile = null; 
var opentile = null;

//do stuff here

for (i = 0; i < 16; i++) {
  add_elem(i, A[i]);
}

document.getElementById("overlay_win").onclick = function() {
  reset();
};
