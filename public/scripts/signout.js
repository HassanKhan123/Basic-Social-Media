async function logOut(){
    console.log("logout");
    try{
        // loader.innerHTML = `<img src="../images/load.gif" id="loader" width="50" />`;
        var response= await signOutFirebase();
        swal("Successfully LogOut", "You are now redirected to login Page", "success");
        // loader.innerHTML ="";
        localStorage.setItem("login",JSON.stringify(2));
        localStorage.setItem("loginUser","");
        localStorage.setItem("info","");
        
        
        setTimeout(()=>{
            window.location.assign("login.html")
        },2000);
    }catch(e){
        swal("Error", e.message , "error");
        // loader.innerHTML ="";
    }
}