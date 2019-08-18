var formEl1 = document.querySelector("form");
var emailEl1 = document.querySelector("input[type='email']");
var passwordEl1 = document.querySelector("input[type='password']");
var loader = document.getElementById("loader");




formEl1.addEventListener('submit',submit);

async function submit(e){
    e.preventDefault();
    loader.innerHTML = `<img src="../images/load.gif" id="loader" width="50" />`;

    emailEl1=emailEl1.value;
    passwordEl1=passwordEl1.value;
    try{
        var response= await logInFirebase(emailEl1,passwordEl1);
        console.log(response.firstname, response.lastname,response.email,response.imageURL);
        
        swal("Successfully Login", "You are now redirected to Home Page", "success");
        loader.innerHTML = "";
        
        console.log(response);
        localStorage.setItem("loginUser",response.imageURL);
        localStorage.setItem("loginUserName",response.firstname);

        localStorage.setItem("info",JSON.stringify(response));
        //localStorage.setItem("uid",response.user.uid);
        localStorage.setItem("login",JSON.stringify(1))
        setTimeout(()=>{
            window.location.assign("home.html")
        },2000);
    }
    catch(e){
        swal("Error", e.message , "error");
        loader.innerHTML = "";
    }
}
