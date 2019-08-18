

var status = localStorage.getItem("login");

console.log(status);

if (status == 1) {
    location.assign("pages/home.html");
}





var loader = document.getElementById("loader");
var formEl = document.querySelector("form");
var fname = document.querySelector("#fname");


var emailEl = document.querySelector("input[type='email']");
var passwordEl = document.querySelector("input[type='password']");
var image = document.querySelector("input[type='file']");

var passwordEl1 = document.querySelector("#pass1");


// if(status){
//     window.location.href="file:///C:/Users/Hassan/Desktop/Development/Expertizo/Firebase/firebase1/pages/home.html";
// }

async function previewFile(blob) {
    //var preview = document.querySelector('img');
    // var file = document.querySelector('input[type=file]').files[0];
    // var reader = new FileReader();

    // reader.addEventListener("load", function () {
    //     //   preview.src = reader.result;

    //     localStorage.setItem("imgURL", JSON.stringify(reader.result));

    // }, false);

    // if (file) {
    //     reader.readAsDataURL(file);
    // }

    const name = Math.random().toString();
    await firebase.storage().ref().child(`${name}.png`).put(blob);
    const url = await firebase.storage().ref().child(`${name}.png`).getDownloadURL();
    return url;
}

formEl.addEventListener('submit', submit);

async function submit(e) {
    e.preventDefault();
    loader.innerHTML = `<img src="images/Spinner.gif" id="loader" width="100" />`;
    fname = fname.value;
    
    emailEl = emailEl.value;
    passwordEl = passwordEl.value;
    passwordEl1 = passwordEl1.value;

    var inputEl;

    if(fname == "" || emailEl == "" || passwordEl == "" || passwordEl1 == "" ){
        swal("Empty Fields", "Please fill all fields", "error");
    }

    else if (passwordEl === passwordEl1) {
        

       
        try {
            var userImg = await previewFile(image.files[0]);
            var response = await signInFirebase(emailEl, passwordEl,fname,userImg);
            swal("Successfully SignIn", "You are now redirected to login Page", "success");
            loader.innerHTML = "";


            setTimeout(() => {
                window.location.assign("pages/login.html")
            }, 2000);
        }
        catch (e) {
            console.log(e);
            swal("Error", e.message, "error");
            loader.innerHTML = "";
        }
    }
    else {
        swal("Invalid Password", "Password does not match", "error");
        loader.innerHTML = "";
    }
}

var loginWithFb=async()=>{
    var provider = new firebase.auth.FacebookAuthProvider();
    try{
        var res=await firebase.auth().signInWithPopup(provider);
        // The signed-in user info.
        var user = res.user;
       

        var data=await firebase.firestore().collection('users').doc(user.uid).set({
            firstname:user.displayName,
            email:user.email,
            imageURL:user.photoURL

        })
        console.log(user);
        console.log(user.displayName);
        console.log(user.photoURL);

        localStorage.setItem("loginUser",user.photoURL);
        localStorage.setItem("loginUserName",user.displayName);
        localStorage.setItem("info",JSON.stringify(user));
         localStorage.setItem("uid",user.uid);
        localStorage.setItem("login",JSON.stringify(1))

        setTimeout(()=>{
            window.location.assign("pages/home.html")
        },2000);
      
      
        
    }catch(e){
        console.log(e.message);
    }
    
}

var loginWithGoogle = async () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    try{
        var res=await firebase.auth().signInWithPopup(provider);
        // The signed-in user info.
        var user = res.user;

        console.log(user);
       

        var data=await firebase.firestore().collection('users').doc(user.uid).set({
            firstname:user.displayName,
            email:user.email,
            imageURL:user.photoURL

        })
        console.log(user);
        console.log(user.displayName);
        console.log(user.photoURL);

        localStorage.setItem("loginUser",user.photoURL);
        localStorage.setItem("loginUserName",user.displayName);
        localStorage.setItem("info",JSON.stringify(user));
         localStorage.setItem("uid",user.uid);
        localStorage.setItem("login",JSON.stringify(1))

        setTimeout(()=>{
            window.location.assign("pages/home.html")
        },2000);

    }catch(e){
        console.log(e.message);
    }
}