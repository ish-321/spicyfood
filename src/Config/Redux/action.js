import { firebaseApp } from '../Firebase/firebase'
function login(value,path) {
    console.log(value)


    return (dispatch) => {
        firebaseApp.auth().signInWithEmailAndPassword(value.email, value.password)
            .then((res) => {
                console.log(res.user.emailVerified)
                let emailVerified =res.user.emailVerified
                if(emailVerified === false){
                    path.push('/emailnotverified')
                }
                else{
                    firebaseApp.firestore().collection('Users').doc(res.user.uid).get().then((userData)=>{
                       let data =  userData.data()
                       data.id = res.user.uid
                       localStorage.setItem("Current_User", JSON.stringify(data))
                       path.push('/home')                    
                       dispatch({ type: "LOGIN", payload : data})
                    })
                }
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log('errrrrorrrrrr', errorMessage)
                // ...
            });
    }

}



function restroSignUp(value,path) {
    console.log(value)

    if (value.password === value.confrimPassword) {

        firebaseApp.auth().createUserWithEmailAndPassword(value.email, value.password).then((res) => {

            firebaseApp.firestore().collection('Users').doc(res.user.uid).set(value).then()

            firebaseApp.auth().currentUser.sendEmailVerification().then(function () {
                console.log(`Email Sent`)
                path.push('/')

            })

        })

    }

    return (dispatch) => {
        dispatch({ type: "RESTROSIGNUP" })
    }
}


function userSignUp(value,path) {
    console.log(value)
    if (value.password === value.confrimPassword) {

        firebaseApp.auth().createUserWithEmailAndPassword(value.email, value.password).then((res) => {

            firebaseApp.firestore().collection('Users').doc(res.user.uid).set(value).then()

            firebaseApp.auth().currentUser.sendEmailVerification().then(function () {
                console.log(`Email Sent`)
                path.push('/')

            })

        })

    }
    return (dispatch) => {
        dispatch({ type: "USERSIGNUP" })
    }
}

function addProduct(value){
    console.log(value)
    firebaseApp.firestore().collection('Product').add(value)
    return (dispatch) => {
        dispatch({
            type: 'ADDPRODUCT'
        })
    }
}

export {
    login, restroSignUp, userSignUp, addProduct
}