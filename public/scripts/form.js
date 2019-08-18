const formEl = document.querySelector("form");
var loader = document.getElementById("loader");
var file = document.querySelector('input[type=file]');

formEl.addEventListener("submit", post);

async function uploadImg(blob) {
    try {
        const name = Math.random().toString();
        await firebase.storage().ref().child(`${name}.png`).put(blob);
        const url = firebase.storage().ref().child(`${name}.png`).getDownloadURL();
        return url;
    } catch (error) {
        throw error;
    }
}

function previewFile(arr) {

    // const name = 
    const promisesArr = [];

    // const promisesArr = arr.map(item => );

    for(var item of arr){
        promisesArr.push(uploadImg(item));
    }
    return Promise.all(promisesArr);

    


    // const promisesArr = arr.map(blob => {
    // const name = "asd";
    // return firebase.storage().ref().child(`${name}.png`).put(blob);
    // });

    // const url = await firebase.storage().ref().child(`${name}.png`).getDownloadURL();
    // return url;
   



}


async function post(e) {
    e.preventDefault();

    var title = formEl.querySelector("#postTitle").value;
    var description = formEl.querySelector("#postDes").value;
    var uid = localStorage.getItem("uid");
    var post_img = localStorage.getItem("postImg");

    loader.innerHTML = `<img src="../images/load.gif" id="loader" width="50" />`;
    if (title == "" || description == "") {
        swal("Cannot Posted", "Please Provide title or description", "error");
        loader.innerHTML = "";
    }
    else {

        try {

            var postImgs = await previewFile(file.files);
            await firebase.firestore().collection("posts").add({
                author_key: uid,
                title: title,
                description: description,
                post_img: postImgs,
                postedAt: firebase.firestore.Timestamp.now().toMillis()
            });

            swal("Post Added Successfully", "You are now redirected to Home Page", "success");
            loader.innerHTML = "";


            setTimeout(() => {
                window.location.href = "home.html";
            }, 2000);


        } catch (e) {
            swal("Error", e.message, "error");
            loader.innerHTML = "";
        }
    }





}