function signup(){

  const username =
    document.getElementById("signupUsername").value.trim();

  const email =
    document.getElementById("signupEmail").value.trim();

  const password =
    document.getElementById("signupPassword").value.trim();

  /* EMAIL VALIDATION */

  const emailPattern =
    /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  /* PASSWORD VALIDATION
     Minimum 8 characters
     At least 1 number
  */

  const passwordPattern =
    /^(?=.*[0-9]).{8,}$/;

  /* EMPTY FIELD CHECK */

  if(username === "" || email === "" || password === ""){

    alert("Please fill all fields");

    return;
  }

  /* EMAIL CHECK */

  if(!email.match(emailPattern)){

    alert("Enter a valid email address");

    return;
  }

  /* PASSWORD CHECK */

  if(!password.match(passwordPattern)){

    alert(
      "Password must be at least 8 characters and contain at least 1 number"
    );

    return;
  }

  /* SAVE USER */

  const user = {
    username,
    email,
    password
  };

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

  alert("Signup Successful!");

  window.location.href =
    "login.html";
}

/* LOGIN */

function login(){

  const email =
    document.getElementById("loginEmail").value.trim();

  const password =
    document.getElementById("loginPassword").value.trim();

  const storedUser =
    JSON.parse(localStorage.getItem("user"));

  /* EMPTY CHECK */

  if(email === "" || password === ""){

    alert("Please fill all fields");

    return;
  }

  /* LOGIN CHECK */

  if(
    storedUser &&
    email === storedUser.email &&
    password === storedUser.password
  ){

    localStorage.setItem(
      "loggedIn",
      true
    );

    alert("Login Successful!");

    window.location.href =
      "index.html";

  }else{

    alert("Invalid Credentials");

  }

}

/*LOGOUT */

function logout(){

  localStorage.removeItem(
    "loggedIn"
  );

  window.location.href =
    "login.html";

}

/*PROTECT DASHBOARD*/

if(
  window.location.pathname.includes(
    "index.html"
  )
){

  const loggedIn =
    localStorage.getItem(
      "loggedIn"
    );

  if(!loggedIn){

    window.location.href =
      "login.html";

  }

}
