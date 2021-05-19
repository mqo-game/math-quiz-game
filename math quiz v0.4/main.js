//on page load
const date = new Date()

var u = {
 "name": "demo",
 "pts": 0,
 "plays": 0,
 "ver": "036"
};

//set const variables
const stats = "%1 games played with %2 points in total!"
const page = document.getElementsByClassName('page')

//user data checks
u.date = date.toDateString();
if (!localStorage["mqo-user"]) {
 localStorage["mqo-user"] = JSON.stringify(u);
} else {
 u = JSON.parse(localStorage["mqo-user"]);
 u.date = date.toDateString();
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
 navigator.serviceWorker.register('/app.js', {
  scope: location.pathname
 });
}

//start of functions
function end_game(pts,pass) {
 u.plays++
 u.pts = Number(u.pts) + pts
 u.pts2 = pts
 localStorage["mqo-user"] = JSON.stringify(u);
 pages('game-over')

 //fills in end screen
 $text = document.getElementById('text')
 $dlist = ["Extra-Easy",
  "Easy",
  "Normal",
  "Hard",
  "Extra-Hard"]
 $temp = "Hey <u>%0</u>,<br/> It looks like you %6 question <u>%1</u> and got <u>%2</u> points!<br/><br/>And you have played <u>%3</u> time(s)!<br/><br/>Your target score is <u>%4</u> on <u>%5</u> difficulty!"

 $text.innerHTML = $temp.replace('%0', u.name).replace('%1', $q).replace('%2', u.pts2).replace('%3', u.plays).replace('%4', sessionStorage.target).replace('%5', $dlist[$diff-1])

 if (pass) {
  $text.innerHTML = $text.innerHTML.replace('%6', "you completed your challenge at")
  document.getElementById('end').innerHTML ="You Win!"
 } else {
  $text.innerHTML = $text.innerHTML.replace('%6', "losed but you did last until")
 }

//update home screen!
 document.getElementById('stats').innerHTML = stats.replace("%1", u.plays).replace("%2", u.pts)
    if (u.name) {
     document.getElementById("name").value = u.name
    }
 
}

//game functions
function start() {
 var name = document.getElementById("name").value,
 sel = document.getElementsByTagName('select')

 if (name != "" && /[A-Za-z][1-9][ ]/) {
  if (name.length < 30 && name.length > 1) {
   sessionStorage.diff = sel[0].value
   sessionStorage.target = sel[1].value
   u.name = name

   game();
   pages('game')
  } else {
   alert("Keep name under 30 characters!"); name = ""
  }
 } else {
  alert("Please enter your name.\n\nName conditions:\n> Most include characters\n> Can include spaces")
 }
}

function game() {
 $q = 1; $pts = 0;
 document.getElementById("q").innerHTML = $q
 $diff = Number(sessionStorage["diff"])
 $base = $diff * 9
 $a = document.getElementById('a')
 new_sum()
}

function type_num(num) {
 if (num == 10) {
  $a.value = ""
 } else {
  $a.value += "" + num
 }
}

function new_sum() {
 $type = 0
 /* random base gen */
 $num = [Math.floor(Math.random() * $base + 1),
  Math.floor(Math.random() * $base + 1)]

 /* check difficulty level */
 if ($diff == 1) {
  $type = 1
 } else if ($diff == 2 || $diff == 3) {
  $type = Math.floor(Math.random()*1 + 1)
 } else if ($diff == 4 || $diff == 5) {
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
  $answer = $sum[0] * $num[1]
  $sum = "x"
 }

 document.getElementById("sum").innerHTML = $num[0] + " " + $sum + " " + $num[1] + " = ?";
}

function check() {
 /* check answer */

 if ($a.value != "") {
  if ($a.value == $answer) {
   $q = $q + 1
   $pts += $diff
   
   $target = Number(sessionStorage.target)
 if ($target != isNaN) {
  if ($pts > $target) {
   end_game($pts,true)
  }
 }
   
   document.getElementById("q").innerHTML = $q
   $a.value = ""
   new_sum()
  } else if ($a.value != "") {
   end_game($pts,false)
  }
 }
}

//page switcher
function pages(pg) {
 if (page[pg].style.display != 'block') {
  for (var x = 0; x < page.length; x++) {
   page[x].style.display = 'none'

  }
  page[pg].style.display = 'block'
 }
}