import React from 'react'
import Paper from '../../Components/Paper/Paper'
import Logo from "../../Logo/roundlogo1.jpg"
import '../../Containers/Login/Login.css'
import Input from '../../Components/Input/Input'
import ButtonPage from '../../Components/Button/Button'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from '../../Config/Redux/action'
import { firebaseApp } from '../../Config/Firebase/firebase'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {

        }
    }


    componentDidMount() {
        let that = this
        firebaseApp.auth().onAuthStateChanged(function (user) {
            if (user) {
                firebaseApp.firestore().collection('Users').doc(user.uid).get().then(res => {
                    console.log(res.data())


                    if (res.data().account === 'User') {
                        console.log(res)
                        that.props.history.push('/home')
                    }
                    else {
                        if(user.emailVerified === false){
                            that.props.history.push('/emailnotverified')
                        }
                        else{

                            that.props.history.push('/dashboard')
                        }

                    }


                })
            }
            else {

            }
        });
    }



    render() {
        return (
            <div>
                <Paper >
                    <div className="loginDiv">
                        <div style={{ textAlign: "center" }}>
                            <img src={Logo} alt='Logo' style={{ width: "3%", minWidth: '160px' }} />
                        </div>

                        <div style={{ padding: '30px' }}>
                            <h2 className="heading">LogIn</h2>
                            <Input type='text' name="Email" icon="fa fa-envelope " onChange={(e) => this.setState({ email: e.target.value })} />
                            <Input type='password' name="Password" icon="fa fa-unlock-alt" onChange={(e) => this.setState({ password: e.target.value })} />
                            <div style={{ margin: '10px auto', textAlign: 'center' }}>
                                <ButtonPage  name="LogIn" onclick={() => this.props.login(this.state, this.props.history)} />
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <span>Don't have account?</span><Link to="/register">Sign Up.</Link>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }

}

const maptateToProps = state => {
    return {
        name: state.name
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: (value, path) => dispatch(login(value, path))
    }
}
export default connect(maptateToProps, mapDispatchToProps)(Login)
