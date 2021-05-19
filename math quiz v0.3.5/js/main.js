//on page load
const date = new Date()

var u = {"name":"demo","pts":0,"plays":0,"hs":0};
u.date = date.toDateString();
if(!localStorage["mqo-user"]){
    localStorage["mqo-user"] = JSON.stringify(u);
} else {
  u = JSON.parse(localStorage["mqo-user"]);
  u.date = date.toDateString();
}

//start of functions
function end_game() {
  u.plays++
  localStorage["mqo-user"] = JSON.stringify(u);
  window.location.replace('menu.html')
}

function start() {
    var name = document.getElementById("name").value, diff = document.getElementById("diff").value;

    if (name.length != 0) {
      if (name.length < 30){
        sessionStorage["base"] = diff * 9
        sessionStorage["diff"] = diff
        u.name = name
        sessionStorage["start"] = true
        
        window.location.assign('game.html')
      } else {alert("Keep name under 30 characters!")}
  } else {
      alert("Please enter your name.\n\nName conditions:\n> Most include characters\n> Can include spaces")
  }
 }
  
function game() {
    $q = 1; $pts = 0;
    document.getElementById("q").innerHTML = $q
    $a = document.getElementById("a"); 
    $base = Number(sessionStorage["base"])
    if (!sessionStorage["play"]) {
       new_sum();
    } else {document.location.replace('menu.html')}
}

function type_num(num) {
    if (num == 10) {
        $a.value = ""} else {
    $a.value += "" + num
    }
}

function new_sum() {
  /* random base gen */
    $num = [Math.floor(Math.random() * $base + 1), Math.floor(Math.random() * $base + 1)]
    
    /* check differently */
    $diff = Number(sessionStorage["diff"])
    if ($diff == 1) {
      $type = 1
    } else if ($diff == 2 ||$diff == 3) {
      $type = Math.floor(Math.random()*1 + 1)
    } 
    else if ($diff == 4 ||$diff == 5) {
      $type = Math.floor(Math.random()*2 + 1)
    }
    
    /* generate sums */
    if ($type == 1) {
    $answer = $num[0] + $num[1]
    $sum = "+"
    } else if ($type == 2) {
      if ($num[1] > $num[0]) {
        new_sum()
      }
     $answer = $num[0] - $num[1]
     $sum = "-"
    } else if ($type == 3) {
      $answer = $sum_1 * $num[1]
      $sum = "x"
    }
    
    $str = $num[0] + " " + $sum + " " + $num[1] + " = ?"
    console.log($str)
    document.getElementById("sum").innerHTML = $str
}    
function check() {
/* check answer */
    if ($a.value == $answer) {
        $q = $q + 1;
        document.getElementById("q").innerHTML = $q;
        $a.value = ""
        $pts += $diff
        new_sum();
    } else {
      if($a.value > 0){
        alert("Sorry "+u.name+",\nThe correct answer was "+$answer+", but you got "+$pts+" anyway!")
        u.pts = Number(u.pts) + $pts
        end_game()
      }
        }   
    }