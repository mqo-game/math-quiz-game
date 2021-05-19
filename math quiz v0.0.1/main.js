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

function load() {
    $q = 1; 
    document.getElementById("q").innerHTML = $q
    $name = localStorage.getItem("name")
    $base = localStorage.getItem("base")
    //alert("How to play the game.\n\n Click OK to continue")
    //alert("You have to answer the question.\n\n Click OK to continue")
    //alert("Best of luck " + $name + ".\n\n Click OK to continue")
    new_sum();

}

function new_sum() {
    document.getElementById("a").innerHTML = ""
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
        new_sum();
    } else {
        alert("Incorrect answer.")
        window.location.assign('index.html')
        }   
    }