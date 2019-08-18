var firebaseConfig = {
    apiKey: "AIzaSyAcwoa62bt4ku5yVE3oD3vWpFZ4phT_nOM",
    authDomain: "basic-social-media.firebaseapp.com",
    databaseURL: "https://basic-social-media.firebaseio.com",
    projectId: "basic-social-media",
    storageBucket: "basic-social-media.appspot.com",
    messagingSenderId: "385898578980",
    appId: "1:385898578980:web:c7d5aeac696194c7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var signInFirebase = async (email,pass,fname,image) => {
    try {
        // var image=localStorage.getItem("imgURL");
       
        var response = await firebase.auth().createUserWithEmailAndPassword(email, pass);
        var data=await firebase.firestore().collection('users').doc(response.user.uid).set({
            firstname:fname,
            email:email,
            imageURL:image

        })
        return data;
    } catch (e) {
        throw e;
    }
}

var logInFirebase = async (email, pass) => {
    try {

        var response = await firebase.auth().signInWithEmailAndPassword(email, pass);
        var getData=await firebase.firestore().collection('users').doc(response.user.uid).get();
        localStorage.setItem("uid",response.user.uid);
        return getData.data();
    } catch (e) {
        throw e;
    }
}

var signOutFirebase=async()=>{
    try{
        var response=await firebase.auth().signOut();
        return response;
    }
    catch(e){
        throw e;
    }
}