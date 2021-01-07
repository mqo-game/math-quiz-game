const id = 'mqo.'

function start() {
    var name = document.getElementById("name").value;
    var diff = document.getElementById("diff").value;

    if (name !== "" || email !== "") {
    base = diff * 9;
    localStorage.setItem(id+"name", name)
    localStorage.setItem(id+"base", base)

    window.location.assign('game.html')
  } else {
      alert("Please enter your name.")
  }
 }
  
function main() {
  var a = document.getElementById('a')
    $q = 1; 
    document.getElementById("q").innerHTML = $q
    $name = localStorage.getItem(id+"name")
    $base = localStorage.getItem(id+"base")
    if ($base !== 0) {
       new_sum();
    } else {document.location.replace('menu.html')}
}

function type_num(num) {
    if (num == 10) {
        a.value = ""} else {
    a.value += "" + num
    }
}

function new_sum() {
  /* random base gen */
    $num_1 = Math.floor(Math.random() * $base + 1)
    $num_2 = Math.floor(Math.random() * $base + 1)
    
    /* check difficulty level */
    $diff = $base/9
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
    $answer = $num_1 + $num_2
    $sum = "+"
    } else if ($type == 2) {
      if ($num_2 > $num_1) {
        new_sum()
      }
     $answer = $num_1 - $num_2
     $sum = "-"
    } else if ($type == 3) {
      $answer = $sum_1 * $num_2
      $sum = "x"
    }
    
    document.getElementById("sum").innerHTML = $num_1 + " " + $sum + " " + $num_2 + " = ?"
}    
function check() {
/* check answer */
    if (a.value == $answer) {
        $q = $q + 1;
        document.getElementById("q").innerHTML = $q;
        a.value = ""
        new_sum();
    } else if (a.value != "") {
        alert("Incorrect answer.")
        window.location.replace('menu.html')
        }   
    }