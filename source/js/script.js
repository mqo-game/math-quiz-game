$(function () {
 uhs();
 pages(1);
 $("#v").html(ver);
});
//useful global functions
let r = function(n,o){return Math.floor(Math.rdom()*o)+n}, n=function(n){return Number(n)}, fv=function(n){return $("#menu_form").children(`#${ n }`).val()}, ss = function(n,o=null){return null!=o&&(sessionStorage[n]=o),sessionStorage[n]}, ls = function(n,o=null){return null!=o&&(localStorage[n]=o),localStorage[n]}, msgBox = function(n,o){$("#modalTitle").html(n),$("#modalBody").html(o),$("#01").show()}
//set variables
let u = {dataver:1,name:"Player123",pts:[0,0,0],plays:0,lives:0,ver:"0.5 [BETA 1]",tasks:{count:0,first_game:[0,1,0],plays:[0,10,10],earn_total:[0,200,100],earn_game:[0,25,50],save_lives:[0,30,30]}};
let ver = "0.5 [BETA 1]",
 form = $("form");
//user data checks
u.pts[0] = n(u.pts[0]);
u.date = new Date().toDateString();
if (!ls("mqo-user")) {
 ls("mqo-user", JSON.stringify(u));
} else {
 u = JSON.parse(ls("mqo-user"));
 u.date = new Date().toDateString();
 if (u.ver != ver) {
u.ver=ver;u.tasks={count:0,first_game:[0,1,0],plays:[0,10,10],earn_total:[0,200,100],earn_game:[0,25,50],save_lives:[0,30,0]};u.pts=[0,0,0];u.lives=0;u.dataver=1;
 }
}
if(!u.seenPopup){
 msgBox("Dear User","This is a beta test version of the game for you to try out!,<br><br>There may be bugs snd uncompleted features");
 u.seenPopup=true;
 ls("mqo-user", JSON.stringify(u));
}
if (u.pts[0] > 49 && u.plays > 9) {
 form.children("#target")[0].html("🎯 Endless");
 form.children("#target")[5].disabled = false;
}
if (new Date().getHours() >= 19) {
 $("body").css("background-image", "url('images/night.jpg')");
 $("#logo").addClass("header");
}
/*if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/app.js',{scope: location.pathname});
  }*/
//start of functions
function eg(pts, pass) {
 uhs();
 u.plays++;
 u.pts[0] += n(pts);
 u.pts[1] = u.pts[0];
 u.lives += lives;
 ls("mqo-user", JSON.stringify(u));
 pages(4);
 $("#a").val("");
 task_info();
 //fills in end screen
 let endText = $("#endText"),
  endTitle = $("#endTitle");
 function etf() {
  if (pass) {
   endTitle = "You Win!";
   return "completed your challenge at";
  } else {
   if (!pass) {
    endTitle = "You Quit!";
    return "quit but you did last until";
   } else {
    endTitle = "You Lose!";
    return "losed but you did last until";
   }
  }
 }
 function lp() {
  if (pass) {
   return lives * 5;
  } else {
   return 0;
  }
 }
 function nh() {
  if (u.pts[2] < pts) {
   u.pts[2] = lp()+pts;
   return `New highscore of <span class='grey-bg'>${u.pts[2]}</span> points!`;
  }
  return `Highscore is <span class='grey-bg'>${u.pts[2]}</span> points!`;
 }
 let dlist = ["Extra Easy", "Easy", "Normal", "Hard", "Extra Hard"];
 endText.html(`Hey <span class='grey-bg'>${
  u.name
 }</span>,<br/>It looks like you ${etf()} question <span class='grey-bg'>${$q}</span> and got <span class='grey-bg'>${pts}</span> points and got <span class='grey-bg'>${lp()}</span> bonus points for lives!<br/><br/>And you have played <span class='grey-bg'>${
  u.plays
 }</span> time(s)!<br/>${nh()}<br/><br/>Your target score is <span class='grey-bg'>${fv("target")}</span> on <span class='grey-bg'>${dlist[n(fv("diff")) - 1]}</span>
        difficulty!`);
 u.pts[0] += lp();
}
$("#stats").click(function () {
 if (this.id == "stats") {
  msgBox("Home Stats", `${$(this).text()}<br><br><b>- That's all for now!</b>`);
 }
});
function uhs() {
 $("#task_count").text(`${u.tasks.count} Points`);
 form.children("#name").val(u.name);
 $("#stats").html(`<span class='grey-bg'>${u.plays}</span> games played with <span class='grey-bg'>${u.pts[0] || 0}</span> points in total, your highscore is <span class='grey-bg'>${u.pts[2] || 0}</span> points!`);
}
uhs();
//game functions
$("#start").click(function () {
 $("#a").val("");
 let name = fv("name");
 if (name != "") {
  let nl = name.length;
  if (nl < 30 && nl > 1) {
   if (fv("target") != isNaN) {
    ss("_1", fv("_1"));
    u.name = name;
    u.plays += 1;
    $("#a").val("");
    game();
   }
  } else {
   msgBox("You can't use that!", `Keep name under <b>30</b> characters, you have ${nl}`);
   form.children("#name").val("");
  }
 } else {
  msgBox("You can't use that!", "Please enter your name. <br>Name conditions:<br>Can't be a blank input<br>Most be under <b>30</b> characters<br>Can include spaces");
 }
});
//missions stuff
//show missions progress
let passed = [], tl = $(".task");
function task_info() {
 let vals = [u.plays, u.plays, u.pts[0] || 0, u.pts[1] || 0, u.lives];
 tl.each(function (i) {
  try {
   $(this).html($(this).html().replace("%0", u.tasks[this.id][1]).replace("%1", vals[i]));
   $(this).click(function () {
    msgBox(`Task #${i + 1}`, $(this).text());
   });
   try {
    passed[i] = false;
    if (vals[i] >= u.tasks[this.id][1]) {
     $(this).css("background-color", "green");
     passed[i] = true;
    }
   } catch (e) {}
  } catch (e) {}
 });
}
task_info();
//claim button
function task_claim() {
 tl.each(function (i) {
  if (passed[i]) {
   passed[i] = false;
   u.tasks.count++;
   t = u.tasks[this.id];
   t[0]++;t[1] = (t[2] * t[0])+1;
  }
 });
 $("#task_count").text(`${u.tasks.count} Points`);
}
let lives;
function game() {
 lives = 3;
 $q = 1;
 $pts = 0;
 pages(3);
 $("#q").html($q);
 ns();
}
function type_num(num) {
 let a = $("#a");
 a.css("background-color", "white");
 if (num == 10) {
  a.val("");
 } else {
  a.val(`${a.val()}${num}`);
 }
}
function func() {
 return "xxxx-4xxx-xxxx-yxxx".replace(/[xy]/g, function (c) {
  var rnd = (Math.rdom() * 16) | 0,
   v = c === "x" ? rnd : (rnd & 0x3) | 0x8;
  return v.toString(16);
 });
}
var st = func();
function gs() {
 let _0 = n(fv("diff")) * 9;
 let _1 = {
  vals: [r(1, _0), r(1, _0)],
 };
 let _2 = n(fv("diff"));

 if (_2 == 1) {
  _1.type = 1;
 } else if (_2 <= 3) {
  _1.type = r(1, 2);
 } else if (_2 <= 5) {
  _1.type = r(1, 3);
 }
 switch (_1.type) {
  case 1:
   _1.ans = _1.vals[0] + _1.vals[1];
   _1.vals[2] = "+";
   break;
  case 2:
   while (_1.vals[1] > _1.vals[0]) {
    _1.vals = [r(1, _0), r(1, _0)];
   }
   _1.ans = _1.vals[0] - _1.vals[1];
   _1.vals[2] = "-";
   break;
  case 3:
   _1.ans = _1.vals[0] * _1.vals[1];
   _1.vals[2] = "x";
   break;
 }
 ss(btoa(st), btoa(JSON.stringify(_1)));
 return `${_1.vals[0]} ${_1.vals[2]} ${_1.vals[1]} = ?`;
}
function ns() {
 $("#a").val("");
 $("#sum").html(gs());
 $("#pts").html(`#️⃣ ${$pts}/${fv("target")} ❤️ ${lives}`);
}
$("#check").click(function () {
 let a = $("#a");
 /* check answer */
 if (a.val() != "") {
  let cfg = JSON.parse(atob(ss(btoa(st))));
  if (n(a.val()) == cfg.ans) {
   a.val("");
   $q += 1;
   $pts += n(fv("diff"));
   let target = n(fv("target"));
   if (target != isNaN) {
    if ($pts > target - 1) {
     eg($pts, true);
    }
   } else {
    target = "any";
   }
   if ($q >= 10) {
    $(".question").css("font-size", "45px");
   }
   $("#q").text($q);
   a.val("");
   $("#quit").attr("pts", $pts);
   ns();
  } else {
   if (lives == 1) {
    eg($pts, false);
   }
   lives -= 1;
   a.css("background-color", "red");
   ns();
  }
 }
});
//page switcher
function pages(pg) {
 let page = $(".page");
 if ($(page[pg]).css("display") != "block") {
  page.each(function () {
   $(this).hide();
  });
  $(page[pg]).show();
 }
}
//guide book
let about = $(".about"),
 aP = function (pg) {
  if (pg == 8) {
   $("#feedback").attr("src", "feedback.html?load=1");
  } else {
   $("#feedback").attr("src", "");
  }
  if (about[pg].css("display") != "block") {
   $(about).each(function () {
    $(this).hide();
   });
   $(about[pg]).show();
  }
 };
about.each(function (i) {
 $(this).attr("ignore") || $("#index").append(`<li><span><a onclick='aP(${i})'>${$(this).attr("title")}</a></span></li>`);
});
