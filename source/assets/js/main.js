$(function() {
  uhs();
  pages(1);
  let ss = sessionStorage;
  $("ver").html(ver);
  $(document).keypress(function(e) {
    let _ = $("#a"),
    k = e.key;
    if (_.is(':visible')) {
      if (!isNaN(k) && k != " ") {
        tn(k)
      } else if (k == "Delete") {
        _.val("")
      } else if (k == "Space") {
        $("#check").click()
      } return;
    }
  });
  $.get(`https://mcjoe21.com/collect?event=Page%20View&value=${location.href}&referer=${location.referer}`)
  $.get("changes.txt" ,e=> {
      let d = e.replace(/(fixed|added|worked|nerfed)/gi,"<u>$1</u>").replace(/- /g,"").split("\n");
      $.each(d, function() {
        $("#updates").append(`<li>${this}<\/li>`)}
      );
    });
  $.get("get/news.json", e=> {
      ls("news", e.items.length);$.each(e.items, function(i, d) {
        $("#newsIndex").append(`<li id = news${i}>${d.title}</li>`);ap(12);$("#news"+i).click(function() {
            $(gb[13]).html(`<h4>${d.title}</h4><ul><li>${d.content_html.replace("\n","</li><li>")}</li></ul>`);ap(13);
            });
          });
      });
      $.get("get/planned.json", e=> {
        let _ = ""; $.each(e.data, function(i, d) {_ += `<li id = ${i}><a href = https://github.com/mqo-game/math-quiz-game/issues/new?title=[Suggestion]:+${d.text.replace(" ","+")}&label=${d.label}&template=feature_request.yml target=_blank>${d.text}</a></li>`;});$(`#planned`).html(_)});
          $("button").each(function() {
            $(this).click(function(e) {
              e.preventDefault();
              beep.play();
            });
          });
          (function(w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
              'gtm.start':
              new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer'?'&l='+l: ''; j.async = true; j.src =
            'https://www.googletagmanager.com/gtm.js?id='+i+dl; f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', 'GTM-597B7WH');
        });

        function howl(a, b) {return new Howl({src: [`assets/audio/${a}`], volume: b});}
        var beep = howl('beep.ogg', 0.05);
        var cheer = [howl('cheer_0.ogg', 0.07), howl('cheer_1.ogg', 0.07)];
      //useful global functions
        function n(n) {
          return Number(n)
        }
        function fv(n) {return $("#menu_form").children(`#${n}`).val()}
        function s(d) {
          ls("mqo-user", JSON.stringify(d));
        }
        function confettis() {$("#confettis").show(); setTimeout(()=> {$("#confettis").hide()}, ran(800, 1000)); cheer[ran(0, 1)].play();}
      //set variables
        let u = {dataver: 2, name: `Player_${ran(100, 899)}`,uid: uid(20), pts: [0, 0, 0], plays: 0, lives: 0, ver: "0.5", tasks: {count: 0, first_game: [0, 1, 0, 1], plays: [0, 10, 10], earn_total: [0, 200, 100], earn_game: [0, 25, 50], save_lives: [0, 30, 0]}},ver = "0.5",form = $("form");
      //user data checks
        u.date = new Date().toDateString();
        if (!ls("mqo-user")){s(u)} else {
          u = JSON.parse(ls("mqo-user"));
          if (u.ver != ver) {
            u.ver = ver;u.tasks = {count: 0,
              first_game: [0,1,0,1],plays: [0,10,10],earn_total: [0,200,100],earn_game: [0,25,50],save_lives: [0,30,0]};u.pts = [u.pts || 0,u.pts2 || 0,0];u.lives = 0;u.dataver = 2;u.uid = uid(20);}}
        if (!u.welcome) {
          setTimeout(()=> {
          // 1 start
            showPrompt('Do you want to help us grow bigger by getting involved in the community on <a href="https://facebook.com/MathQuizOnline" target=_blank>Facebook</a> or <a href=https://facebook.com/groups/mqogame target=_blank>Group</a> or <a href="https://m.me/MathQuizOnline" target=_blank>Message Us</a> if you have questions</p><div><center><a href="https://facebook.com/MathQuizOnline/" target=_blank><img src="./assets/img/like.png" style="width: 128px" alt="Like us on Facebook"></a></center>', 'center').then(ret=> {
            // 2 start
              showPrompt('We are doing user research that could help us with improving the game in new updates and you have a chance to get involved and help us out!<br/><b>This will include your game session<br/><a href=https://mcjoe21.com/privacy>Privacy</a>', 'center').then(ret=> {
              //store results
                ret ? (function() {u.usage = 1; dataLayer.push({
                    'event': 'User Consent'});}): u.usage = 0; u.welcome = true; s(u);})
            // 2 end
            })
          // 1 end
          });
        }
        if (u.pts[0]>99 && u.plays>14) {
          $($("#target")[0][5]).text("🎯 Endless");
          $("#target")[0][5].disabled = false;
        }
        if (new Date().getHours() >= 19 && !urlParams.has("day")) {
          $("body").css("background-image", "url('./assets/img/night.webp')");
          $("#logo").addClass("tag");
        }
        /*if ('serviceWorker' in navigator) { window.addEventListener('load',()=> { navigator.serviceWorker.register('/worker.js'); }); }*/
      //start of functions
        function eg(pts, end) {
          u.plays++;
          u.pts[0] += n(pts);
          u.pts[1] = n(pts);
          u.lives += lives;
          if(u.usage==1){dataLayer.push({'event':'End Game','value':`${pts}x${end}x${u.plays}`});
          $.get(`https://mcjoe21.com/collect?event=End%20Game&value=${pts}x${end}x${u.plays}&referer=${ls("game")}`)
        }
          pages(4);
          $("#a").val("");
        //fills in end screen
          let endText = $("#endText"),
          endTitle = $("#endTitle");

          function etf(){let fill = [["You Win!","completed your challenge at"],["You Quit!","quit but you did last until"],["You Lose!","losed but you did last until"]];endTitle.text(fill[end][0]);return fill[end][1];}function lp(){return end==0?lives*5:0}

          function nh(){if(u.pts[2]<pts){u.pts[2]=lp()+n(pts);s(u);
            return `New highscore of <span class = 'grey-bg'>${u.pts[2]}</span> points!`; } return `Highscore is <span class='grey-bg'>${u.pts[2]}</span>points!`;}let dlist = ["Extra Easy","Easy","Normal","Hard","Extra Hard"];endText.html(`<p>Hey <span class = "grey-bg" >${u.name}</span>,</p><p>It looks like you ${etf()} question <span class = 'grey-bg'>${q}</span> and got <span class='grey-bg'>${pts}</span> points and got <span class = 'grey-bg'>${lp()}</span> bonus points for lives!</p><p>And you have played <span class = 'grey-bg'>${u.plays}</span> time(s)!<br/>${nh()}</p>Your target score is <span class='grey-bg'>${fv("target")}</span> on <span class = 'grey-bg'>${dlist[n(fv("diff"))-1]}</span> difficulty!</p>`);u.pts[0] += lp();uhs();s(u);}

          //game functions
            $("#start").click(function(e) {
              e.preventDefault();
              $("#a").val("");
              let name = fv("name");
              if (!name.match(/[<>()&%^$!*"' ]/gi)) {
                let nl = name.length;
                if (nl<30 && nl>1) {
                  if (fv("target") != isNaN) {
                    u.name = name;
                    u.plays++;
                    $("#a").val("");
                    if(u.usage==1){ls("game",`${fv("diff")}x${fv("target")}`);dataLayer.push({'event':'Play Game','value':`${ls("game")}`});
                      $.get(`https://mcjoe21.com/collect?event=Play%20Game&value=${ls("game")}&referer=${location.host}`)
                    }
                    game(); 
                } else {
                  showPrompt(`You can't use that!,<br/>Keep name under<b>30</b> characters,you have ${nl}`);
                    $("#name").val("");
                  }
                } else {
                  showPrompt("Please enter your name.<br>Name conditions:<br>Can't be a blank input<br>Most be under<b>30</b> characters<br>Can include spaces");
                }
              }});
              function uhs() {$("#task_count").text(`${u.tasks.count} Points`);$("#name").val(u.name);$("#stats").html(`<span class = grey-bg>${u.plays}</span> games played with <span class='grey-bg'>${u.pts[0] || 0}</span> points in total, highscore is <span class = 'grey-bg'>${u.pts[2] || 0}</span> points!`);}uhs();
              //missions stuff
              //show missions progress
                let passed = [];
                function ti() {
                  let vals = [u.plays,u.plays,u.pts[0] || 0,u.pts[1] || 0,u.lives];
                  $(".task").each(function(i) {
                    try {
                      $(this).html($(this).html().replace("%0", u.tasks[this.id][1]).replace("%1", vals[i]));
                      passed[i] = false;
                      if (vals[i] >= u.tasks[this.id][1]) {
                        $(this).css("background-color", "green");
                        $(this).css("border-color", "darkgreen");
                        passed[i] = true;
                      }
                    } catch (e) {}
                  });
                }
                ti();
              //claim button
                $("#task_claim").click(function() {
                  $(".task").each(function(s) {passed[s] && (t = u.tasks[this.id], t[0] != t[3] && (passed[s] = !1, u.tasks.count++, t[0]++, t[1] = t[2] * t[0] + 1))}),s(u),$("#task_count").text(`${
                    u.tasks.count} Points`),ti()});
              //game stuff
                let lives, p, q;
                function game() {$("#quit_btn").attr("pts",0), $("#quit_btn").click(function() {eg($(this).attr("pts"), 1)}), lives = 3, q = 1, p = 0, pages(3), $("#q").html(q), ns()}

                function tn(a) {
                  let l = $("#a"); l.css("background-color","white"), 10 == a ? l.val(""): l.val(`${l.val()}${a}`)}$(".keyrow td").each(function() {$(this).children("button").each(() => {$(this).click(() => {
                      tn(this.innerText)})})});
                $("#clear_btn").click(() => {$("#a").val("")});
                let st = uid(10);
              //generates sums
              function gs() {let _0 = n(fv("diff")) * 9;let _1 = {
                    vals: [ran(1,_0), ran(1,_0)]},_2 = n(fv("diff"));

                  if (_2 == 1) {
                    _1.type = 1;
                  } else if (_2<= 3) {
                    _1.type = ran(1, 2);
                  } else if (_2<= 5) {
                    _1.type = ran(1, 3);
                  }
                  switch (_1.type) {
                    case 1:
                      _1.ans = _1.vals[0] + _1.vals[1];
                      _1.vals[2] = "+";
                      break;
                    case 2:
                      while (_1.vals[1]>_1.vals[0]) {
                        _1.vals = [ran(1, _0),
                          ran(1, _0)];
                      }
                      _1.ans = _1.vals[0] - _1.vals[1];
                      _1.vals[2] = "-";
                      break;
                    case 3:
                      _1.ans = _1.vals[0] * _1.vals[1];
                      _1.vals[2] = "x";
                      break;
                  }
                  ss(st, btoa(JSON.stringify(_1)));
                  return `${_1.vals[0]} ${_1.vals[2]} ${_1.vals[1]} = ?`;}

                function ns() {
                  $("#a").val("");$("#sum").html(gs());$("#pts").html(`#️⃣ ${p}/${fv("target")} ❤️ ${lives}`);}
              $("#check").click(function() {
                let a = $("#a");
                /* check answer */
                if (a.val() != "") {
                  let cfg = JSON.parse(atob(ss(st)));
                  q++;
                  $("#q").text(q);
                  if (n(a.val()) == cfg.ans) {
                    confettis();
                    a.val("");
                    p += n(fv("diff"));
                    let target = n(fv("target"));
                    if (target != isNaN) {
                      if (p>target - 1) {
                        eg(p, 0);
                      }
                    } else {
                      target = "ANY";
                    }
                    if (q >= 10) {
                      $(".question").css("font-size", "45px");
                    }
                    a.val("");
                    $("#quit_btn").attr("pts", p);
                    ns();
                  } else {
                    if (lives == 1) {
                      eg(p, 2);
                    }
                    lives -= 1;
                    a.css("background-color", "red");
                    a.val("Wrong Answer!");
                    ns();
                  }
                  ns();
                }
              });
            //guide book
              let gb = $(".about");
              function ap(pg) {
              if (pg == 8) {$("#feedback").attr("src", `https://docs.google.com/forms/d/e/1FAIpQLSciES5MxR2i9X2EzwMcG53H3LhrIkanSV2JczZcTt1wWpwmNQ/viewform?usp=pp_url&entry.485428648=${u.name}`) };if ($(gb[pg]).css("display") != "block") {$(gb).each(function() {$(this).hide();});$(gb[pg]).show()}};
              gb.each(function(i) {if (!this.hasAttribute("ignore")) {$("#index").append(`<li><span><a onclick = 'ap(${i})'>${this.title}</a></span></li>`); } });