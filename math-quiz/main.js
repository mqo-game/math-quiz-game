function submit() {
    var name = document.getElementById("name").value;
    var diff = document.getElementById("diff").value;
    var email = document.getElementById("email").value;

    if (name !== "" || email !== "") {
    base = diff * 9;
    localStorage.setItem("name", name)
    localStorage.setItem("base", base)

    window.location.assign('main.html')
  } else {
      alert("Please enter your name.")
  }
 }
function index() {
  document.getElementById("ver").innerHTML = "0.3.3-beta"}
function main() {
    $q = 1; 
    document.getElementById("q").innerHTML = $q
    $name = localStorage.getItem("name")
    $base = localStorage.getItem("base")
    if ($base !== 0) {
       new_sum();
    } else {document.location.replace('index.html')}
}

function type_num(num) {
    $a_edit =  document.getElementById("a"); 
    if (num == 10) {
        $a_edit.value = ""} else {
    $a_edit.value += "" + num
    }
}

function new_sum() {
  /* random base gen */
    $num_1 = Math.floor(Math.random() * $base + 1)
    $num_2 = Math.floor(Math.random() * $base + 1)
    
    /* check differently */
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
    
    $str = $num_1 + " " + $sum + " " + $num_2 + " = ?"
    document.getElementById("sum").innerHTML = $str
}    
function check() {
/* check answer */
    $a_edit = document.getElementById("a");
    if ($a_edit.value == $answer) {
        $q = $q + 1;
        document.getElementById("q").innerHTML = $q;
        $a_edit.value = ""
        new_sum();
    } else {
        alert("Incorrect answer.")
        window.location.replace('index.html')
        }   
    }
