	//set variables 
var u = {
 "name": "Player123",
 "pts": 0,
 "pts2":0,
 "plays": 0,
 "ver": "041-d5",
 "data":{"pts":{},"plays":{}},
 "tasks":{"count":0,"plays":[0,10,10],"earn_total":[0,50,25],"earn_game":[0,10,20]}
};
const stats = "%1 games played with %2 points in total!";
const page = document.getElementsByClassName('page');
const form = document.querySelector("form");

//user data checks
u.date = new Date().toDateString();
if (!localStorage["mqo-user"]) {
 localStorage["mqo-user"] = JSON.stringify(u);
} else {
 u = JSON.parse(localStorage["mqo-user"]);
 u.date = new Date().toDateString();
 if(u.ver != "041-d6"){u.data = {"pts":{},"plays":{}};u.ver = "041-d6";u.tasks = {"count":0,"plays":[0,10,10],"earn_total":[0,50,25],"earn_game":[0,10,20]};}
}
var endless_req = u.pts > 49 && u.plays > 9;
if(endless_req){form.target[5].innerHTML = 'Target: Endless';form.target[5].disabled = false}

const hours = new Date().getHours();
const isDayTime = hours <= 6 && hours >= 19;

if(isDayTime){document.body.style.backgroundImage = "url('images/night.jpg')";document.querySelector("#logo").classList.add("header");document.querySelector("footer").classList.add("header")}

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/app.js');
};

//start of functions
function end_game(pts,pass,quit) {
 home_stats();
 u.plays++;
 u.pts = Number(u.pts) + pts;
 u.pts2 = pts;
 u.data.plays[$diff]++;
 u.data.pts[$diff] = u.pts;
 localStorage["mqo-user"] = JSON.stringify(u);
 pages('game-over');
 $a.value = "";

 //fills in end screen
 $text = document.getElementById('text');
 $dlist = ["Extra-Easy",
  "Easy",
  "Normal",
  "Hard",
  "Extra-Hard"];
 $temp = "Hey <u>%0</u>,<br/> It looks like you %6 question <u>%1</u> and got <u>%2</u> s!<br/><br/>And you have played <u>%3</u> time(s)!<br/><br/>Your target score is <u>%4</u> on <u>%5</u> difficulty!";

 $text.innerHTML = $temp.replace('%0', u.name).replace('%1', $q).replace('%2', u.pts2).replace('%3', u.plays).replace('%4', sessionStorage.target).replace('%5', $dlist[$diff-1]);

 if (pass) {
  $text.innerHTML = $text.innerHTML.replace('%6', "you completed your challenge at");
  document.getElementById('end').innerHTML ="You Win!";
 } else {
 	if(quit){$text.innerHTML = $text.innerHTML.replace('%6', "you quit but you did last until");} else { $text.innerHTML = $text.innerHTML.replace('%6', "you losed but you did last until");}
 }
}

//game functions
function start() {
var name = form.name.value;

 if (name != "" && /[A-Za-z][1-9][ ]/) {
  if (name.length < 30 && name.length > 1) {
  	if(form.target.value != isNaN){
   sessionStorage.diff = form.diff.value;
   sessionStorage.target = form.target.value;
   u.name = name;

   game();
  	}
  } else {
   alert("Keep name under 30 characters!"); name = "";
  }
 } else {
  alert("Please enter your name.\n\nName conditions:\n> Most include characters\n> Can include spaces");
 }
}

//missions stuff 
//show missions progress
var count = 0, passed = [];
const tl = document.querySelectorAll(".task");
function task_info(){
	var vals = [u.plays,u.pts,function(){if(!u.pts2){return 0;}else{return u.pts2}}];
	tl.forEach((v,i) => {
		if(v.id != "dummy"){
		v.innerHTML = v.innerHTML.replace("%0",u.tasks[v.id][1]).replace("%1",vals[i]);
	v.addEventListener("click",function(){
		//when task clicked
		alert(v.innerHTML);
	});
		
		if(vals[i] <= u.tasks[v.id][1]){v.style.backgroundColor = "grey";passed[i] = false;}else{v.style.backgroundColor = "green";passed[i] = true}
	}});
}
task_info();

//claim button
function task_claim(){
	tl.forEach((v,i) => {
		if(passed[i]){
			count++;
		}
	});
	document.querySelector("#task_count").innerHTML = count+" Points"
}

function game() {
  window.addEventListener("keypress",function(e){
    if(e.code = "Enter"){
      check()
    }
  })

	pages('game');
 $q = 1; $pts = 0;
 document.getElementById("q").innerHTML = $q;
 $diff = Number(sessionStorage.diff);
 $base = $diff * 9;
 $a = document.getElementById('a');
 new_sum();
}

function type_num(num) {
 if (num == 10) {
  $a.value = "";
 } else {
  $a.value += "" + num;
 }
}

function new_sum() {
 $type = 0;
 /* random base gen */
 $num = [Math.floor(Math.random() * $base + 1),
  Math.floor(Math.random() * $base + 1)];

 /* check difficulty level */
 if ($diff == 1) {
  $type = 1;
 } else if ($diff == 2 || $diff == 3) {
  $type = Math.floor(Math.random()*1 + 1);
 } else if ($diff == 4 || $diff == 5) {
  $type = Math.floor(Math.random()*2 + 1);
 }

 /* generate sums */
 if ($type == 1) {
  $answer = $num[0] + $num[1];
  $sum = "+";
 } else if ($type == 2) {
  if ($num[1] > $num[0]) {
   new_sum();
  }
  $answer = $num[0] - $num[1];
  $sum = "-";
 } else if ($type == 3) {
  $answer = $sum[0] * $num[1];
  $sum = "x";
 }

 document.getElementById("sum").innerHTML = $num[0] + " " + $sum + " " + $num[1] + " = ?";
}

function check() {
 /* check answer */

 if ($a.value != "") {
  if ($a.value == $answer) {
   $q = $q + 1;
   $pts += $diff;
   let target;
   
   
   target = Number(sessionStorage.target);
 if (target != isNaN) {
  if ($pts > target-1) {
   end_game($pts,true);
  }
 } else {target = "Any"}
   
   document.getElementById("q").innerHTML = $q;
   document.querySelector("#pts").innerHTML = $pts +"/"+form.target.value+ " Points";
   $a.value = "";
   document.querySelector("#quit").dataset.pts = $pts
   new_sum();
  } else if ($a.value != "") {
   end_game($pts,false);
  }
 }
}

//page switcher
function pages(pg) {
 if (page[pg].style.display != 'block') {
  for (var x = 0; x < page.length; x++) {
   page[x].style.display = 'none';

  }
  page[pg].style.display = 'block';
 }
}