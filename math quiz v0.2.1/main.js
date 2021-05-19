function submit() {
    var name = document.getElementById("name").value;
    var diff = document.getElementById("diff").value;
    var email = document.getElementById("email").value;

    if (name !== "" || email !== "") {
    base = diff * 10;
    localStorage.setItem("name", name)
    localStorage.setItem("base", base)

    window.location.assign('main.html')
  } else {
      alert("Please enter your name.")
  }
 }
function index() {document. getElementById("ver").innerHTML = "0.2.1-beta"}
function main() {
    $q = 1; 
    document.getElementById("q").innerHTML = $q
    $name = localStorage.getItem("name")
    $base = localStorage.getItem("base")
    if ($base !== 0) {
       new_sum();
    } else {document.location.assign('index.html')}
    
}

function type_num(num) {
    $a_edit =  document.getElementById("a"); 
    if (num == 10) {
        $a_edit.value = ""} else {
    $a_edit.value += "" + num
    }
}

function new_sum() {
    $num_1 = Math.floor(Math.random() * $base)
    $num_2 = Math.floor(Math.random() * $base)
    $answer = $num_1 + $num_2
    $str = $num_1 + " + " + $num_2 + " = ?"
    document.getElementById("sum").innerHTML = $str
}    
function check() {
/* check answer */
    $a = document.getElementById("a").value;
    if ($a == $answer) {
        $q = $q + 1;
        document.getElementById("q").innerHTML = $q;
        $a_edit.value = ""
        new_sum();
    } else {
        alert("Incorrect answer.")
        window.location.assign('index.html')
        }   
    }