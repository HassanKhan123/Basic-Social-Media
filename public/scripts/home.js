var loader = document.getElementById("loader");
var postsToShow = document.querySelector("#posts");
var active = document.querySelector("#active");
var data = JSON.parse(localStorage.getItem("info"));
// console.log(data);
var userimg = (localStorage.getItem("loginUser")) || "[]";
var name=localStorage.getItem("loginUserName");






loader.innerHTML = `<img src="../images/load.gif" id="loader" width="50" />`;

var addPosts = () => {
    window.location.href = "form.html";
    loader.innerHTML = "";
}

var logOut = async () => {
    console.log("logout");
    try {
        // loader.innerHTML = `<img src="../images/load.gif" id="loader" width="50" />`;
        var response = await signOutFirebase();
        swal("Successfully LogOut", "You are now redirected to login Page", "success");
        // loader.innerHTML ="";
        localStorage.setItem("login", JSON.stringify(2));
        localStorage.setItem("loginUser", "");
        localStorage.setItem("info", "");


        setTimeout(() => {
            window.location.assign("login.html")
        }, 2000);
    } catch (e) {
        swal("Error", e.message, "error");
        // loader.innerHTML ="";
    }
}

active.innerHTML = `
<img src=${userimg} class="responsive-img" width="100">
<span class="valign-wrapper title">${name}</span>

`

var getPosts = async () => {

    try {


        var response = await firebase.firestore().collection('posts').onSnapshot(snapshot => {

            if (snapshot.empty) {
                postsToShow.innerHTML = "";

                postsToShow.innerHTML += `
                    <div class="col s12 m7" >
                        <div class="card">
                            <div class="card-content">
                                <span class="card-title">No Posts to show</span>
                                    
                            </div>
                                
                        </div>
                    </div>
                `;
                loader.innerHTML = "";
            }
            else {
                snapshot.forEach(doc => {
                    console.log(doc.data());
                    postsToShow.innerHTML = "";

                    // console.log(doc.data().likedBy);




                    var getAuthor = async () => {

                        var author_name = await firebase.firestore().collection('users').doc(doc.data().author_key).get();
                        var imagesEl = "";
                        doc.data().post_img.forEach(i => {
                            imagesEl += `<img src="${i}" />`
                        })

                        postsToShow.innerHTML += `
                        
                            <div class="col s12 m7" >
                                <div class="card">
                                    <div class="card-image">
                                    
                                    ${imagesEl}
                                        
                            
                                    </div>
                                    <div class="card-content">
                                        <span class="card-title">${doc.data().title}</span>
                                        <p>${doc.data().description}</p>
                                    </div>
                                    <div class="card-action black">
                                        <img src=${author_name.data().imageURL} class="responsive-img" width="70" />
                                        <a class="left-align white-text" >
                                            ${author_name.data().firstname}</a>
                                        <br/><br/>
                                        <a class="white-text">${new Date(doc.data().postedAt)}</a>
                                        <br/><br/>
                                        <a class="btn red" onclick="like('${doc.id}')" id="likeBtn">
                                            <i class="material-icons left">favorite_border</i>Like
                                        </a>
                                    
                                    
                                     </div>
                                </div>
                             </div>
                         `;

                   
                        
                    }
               
                    loader.innerHTML = "";




                    getAuthor();




                })

            }
        });


        // console.log(response);


    }
    catch (e) {
        console.log(e);
    }
}







var like = async (id) => {




    console.log("id", id);
    var uid = localStorage.getItem("uid");

    await firebase.firestore().collection("posts").doc(id).set({
        likedBy: firebase.firestore.FieldValue.arrayUnion(uid)
    }, {
            merge: true
        });

}

