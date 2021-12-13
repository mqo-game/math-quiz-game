$(function(){
uhs();
pages(1);
$("ver").html(ver);
$(document).keypress(function(e){
let _=$("#a"),k=e.key;
if(_.is(':visible')){
if(!isNaN(k)&&k!=" "){tn(k)}if(k=="Delete"){_.val("")}if(k=="Space"){$("#check").click()}return;
}});
});
//useful global functions
function ran(n,o){return Math.floor(Math.random()*o)+n}function n(n){return Number(n)}function fv(n){return $("#menu_form").children(`#${n}`).val()}function ss(n,o=null){return null!=o && (sessionStorage[n]=o),sessionStorage[n]}function ls(n,o=null){return null!=o && (localStorage[n]=o),localStorage[n]}function msg(n,o){$("#modalTitle").html(n),$("#modalBody").html(o),$("#01").show() }
//set variables
let urlParams=new URLSearchParams(location.search),u={dataver:1,name:`Player_${ran(100,899)}`,pts:[0,0,0],plays:0,lives:0,ver:"0.5 [BETA 5]",tasks:{count:0,first_game:[0,1,0,1],plays:[0,10,10],earn_total:[0,200,100],earn_game:[0,25,50],save_lives:[0,30,0]}},ver="0.5 [BETA 5]",form=$("form");
//user data checks
u.date=new Date().toDateString();
if(!ls("mqo-user")){
ls("mqo-user",JSON.stringify(u));
} else {
u=JSON.parse(ls("mqo-user"));
u.date=new Date().toDateString();
if(u.ver!=ver){
u.ver=ver;u.tasks={count:0,first_game:[0,1,0,1],plays:[0,10,10],earn_total:[0,200,100],earn_game:[0,25,50],save_lives:[0,30,0] };u.pts=[u.pts || 0,u.pts2 || 0,0];u.lives=0;u.dataver=1;
}
}
if(!u.popup){
let share=`<p>Do you want to help us grow bigger by getting involved in the community on <a href="https://facebook.com/MathQuizOnline" target=_blank>Facebook Page</a> or <a href=https://facebook.com/groups/mqogame target=_blank>Group</a> or <a href="https://m.me/MathQuizOnline" target=_blank>Message Us</a> if you have questions</p><div><center><a href="https://facebook.com/MathQuizOnline/"><img src="icons/like.png" style="width: 128px" alt="Like us on Facebook"></a></center></div>`;
setTimeout(function(){msg("Dear User","This is a beta test version of the game for you to try out!,<br><br>There may be bugs and uncompleted features");},2000);
setTimeout(function(){msg("Dear Players",share);},5000);
u.popup=true;
ls("mqo-user",JSON.stringify(u));
}
if(u.pts[0] > 49 && u.plays > 9){
form.children("#target")[0].html("🎯 Endless");
form.children("#target")[5].disabled=false;
}
if(new Date().getHours() >= 19 && !urlParams.has("day")){
$("body").css("background-image","url('images/night.jpg')");
$("#logo").addClass("tag");
}
/*if('serviceWorker' in navigator){
navigator.serviceWorker.register('/app.js',{scope: location.pathname});
}*/
//start of functions
function eg(pts,end){
u.plays++;
u.pts[0]+=n(p);
u.pts[1]=n(p);
u.lives+=lives;
ls("mqo-user",JSON.stringify(u));
pages(4);
$("#a").val("");
//fills in end screen
let endText=$("#endText"),
endTitle=$("#endTitle");
function etf(){if(end==0){endTitle.text("You Win!");return "completed your challenge at";}if(end==1){endTitle.text("You Quit!");return "quit but you did last until";}if(end==2){endTitle.text("You Lose!");return "losed but you did last until";}}
function lp(){if(end==0){return lives*5;}else{return 0;}}
function nh(){if(u.pts[2] < pts){u.pts[2]=lp()+n(p);return `New highscore of <span class='grey-bg'>${u.pts[2]}</span> points!`;}return `Highscore is <span class='grey-bg'>${u.pts[2]}</span> points!`;}let dlist=["Extra Easy","Easy","Normal","Hard","Extra Hard"];endText.html(`Hey <span class="grey-bg">${u.name}</span>,<br/>It looks like you ${etf()} question <span class='grey-bg'>${q}</span> and got <span class='grey-bg'>${pts}</span> points and got <span class='grey-bg'>${lp()}</span> bonus points for lives!<br/><br/>And you have played <span class='grey-bg'>${u.plays}</span> time(s)!<br/>${nh()}<br/><br/>Your target score is <span class='grey-bg'>${fv("target")}</span> on <span class='grey-bg'>${dlist[n(fv("diff"))-1]}</span> difficulty!`);u.pts[0]+=lp();uhs();}
$("#stats").click(function(){
if(this.id=="stats"){
msg("Game Stats",`${$(this).text()}<br><br><b>- That's all for now!</b>`);
}
});
function uhs(){
$("#task_count").text(`${u.tasks.count} Points`);
form.children("#name").val(u.name);
$("#stats").html(`<span class='grey-bg'>${u.plays}</span> games played with <span class='grey-bg'>${u.pts[0] || 0}</span> points in total,your highscore is <span class='grey-bg'>${u.pts[2] || 0}</span> points!`);
}
uhs();
//game functions
$("#start").click(function(){$("#a").val("");let name=fv("name");if(name!=""){let nl=name.length;if(nl < 30 && nl > 1){if(fv("target")!=isNaN){u.name=name;u.plays++;$("#a").val("");game();}
}else {
msg("You can't use that!",`Keep name under <b>30</b> characters,you have ${nl}`);
form.children("#name").val("");
}
 }else {
msg("You can't use that!","Please enter your name. <br>Name conditions:<br>Can't be a blank input<br>Most be under <b>30</b> characters<br>Can include spaces");
}
});
//missions stuff
//show missions progress
let passed=[];function ti(){
let vals=[u.plays,u.plays,u.pts[0] || 0,u.pts[1] || 0,u.lives];
 $(".task").each(function(i){
try{$(this).html($(this).html().replace("%0",u.tasks[this.id][1]).replace("%1",vals[i]));
$(this).click(function(){
msg(`Task #${i+1}`,$(this).text());
});
passed[i]=false;
if(vals[i] >= u.tasks[this.id][1]){
$(this).css("background-color","green");
$(this).css("border-color","darkgreen");
passed[i]=true;
}}catch(e){}
 });
}
ti();
//claim button
$("#task_claim").click(function(){
$(".task").each(function (i){
if(passed[i]){
t=u.tasks[this.id];
if(t[0]!=t[3]){
passed[i]=false;
u.tasks.count++;
t[0]++;t[1]=(t[2]*t[0])+1;
}
}
});
ti();
ls("mqo-user",JSON.stringify(u));
$("#task_count").text(`${u.tasks.count} Points`);
})
//game stuff
let lives,p,q;
function game(){
$("#quit").attr("pts",1);$("#quit").click(function(){eg($(this).attr("pts"),1)});lives=3;q=1;p=0;pages(3);$("#q").html(q);ns();
}
function tn(num){
let a=$("#a");a.css("background-color","white");
if(num==10){a.val("");}else {a.val(`${a.val()}${num}`);}}
function uid(){
return "xxxxxxxxxx".replace(/[x]/g,function (c){
var rnd=(Math.random()*16) | 0,
v=c === "x" ? rnd : (rnd & 0x3) | 0x8;
return v.toString(16);
});
}
let st=uid();
//generates sums
function gs(){
let _0=n(fv("diff"))*9;
let _1={vals:[ran(1,_0),ran(1,_0)]},_2=n(fv("diff"));

if(_2==1){_1.type=1;}else if(_2 <= 3){_1.type=ran(1,2);}else if(_2 <= 5){_1.type=ran(1,3);}
switch (_1.type){
case 1:
_1.ans=_1.vals[0]+_1.vals[1];
_1.vals[2]="+";
break;
case 2:
while (_1.vals[1] > _1.vals[0]){
_1.vals=[ran(1,_0),ran(1,_0)];
}
_1.ans=_1.vals[0]-_1.vals[1];
_1.vals[2]="-";
break;
case 3:
_1.ans=_1.vals[0]*_1.vals[1];
_1.vals[2]="x";
break;
}
ss(st,btoa(JSON.stringify(_1)));
return `${_1.vals[0]} ${_1.vals[2]} ${_1.vals[1]} = ?`;
}
function ns(){
$("#a").val("");
$("#sum").html(gs());
$("#pts").html(`#️⃣ ${p}/${fv("target")} ❤️ ${lives}`);
}
$("#check").click(function(){
let a=$("#a");
/* check answer */
if(a.val()!=""){
let cfg=JSON.parse(atob(ss(st)));
if(n(a.val())==cfg.ans){
a.val("");
q+=1;
p+=n(fv("diff"));
let target=n(fv("target"));
if(target!=isNaN){
if(p > target-1){
 
 eg(p,0);
}
}else {
target="any";
}
if(q >= 10){
$(".question").css("font-size","45px");
}
$("#q").text(q);
a.val("");
$("#quit").attr("pts",p);
ns();
}else {
if(lives==1){
eg(p,2);
}
lives -= 1;
a.css("background-color","red");
a.val("Wrong Answer!");
ns();
}
ns();
}
});
//page switcher
function pages(pg){
let page=$(".page");
if(pg==1){ti()}
if($(page[pg]).css("display")!="block"){
page.each(function(){
$(this).hide();
});
$(page[pg]).show();
}
}
//guide book
let gb=$(".about");
function ap(pg){
if(pg==8){
$("#feedback").src="feedback.html?load=1";
}else {
$("#feedback").src="";
}
if($(gb[pg]).css("display")!="block"){
$(gb).each(function(){
 $(this).hide();
});
$(gb[pg]).show();
}
};
gb.each(function(i){
if(!this.hasAttribute("ignore")){
$("#index").append(`<li><span><a onclick='ap(${i})'>${this.title}</a></span></li>`);
}
});