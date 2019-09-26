import { firebaseApp } from '../Firebase/firebase'

function signout(props){
    firebaseApp.auth().signOut().then(function() {
       alert('Sign Out Successful')
       localStorage.removeItem('Current_User')
       props.push('/')
      }).catch(function(error) {
        // An error happened.
       alert('Sign Out un successfull')
      })
}

export {
    signout
}