//$.material.init()

var register;

function addUser() {
    var userName = $("#userName").val();
    var userPassword = $("#pwd").val();
    var collectUsers = JSON.parse(window.localStorage.getItem("userList")) || {};

    var users = {};
    users["name"] = userName;
    users["password"] = userPassword;

    collectUsers[Object.keys(collectUsers).length + 1] = users;
    window.localStorage.setItem("userList", JSON.stringify(collectUsers));
}

function check(form) { /*function to check userid & password*/
                /*the following code checkes whether the entered userid and password are matching*/
                if(form.userid.value == "myuserid" && form.pswrd.value == "mypswrd") {
                    window.open('target.html')/*opens the target page while Id & password matches*/
                }
                else {
                    alert("Error Password or Username")/*displays error message*/
                }
            }

$("#submitUser").on("click", addUser);