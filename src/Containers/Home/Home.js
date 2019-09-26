import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import TabPanel from '../../Components/Tabs/Tabs'
import { connect } from 'react-redux'
import { firebaseApp } from '../../Config/Firebase/firebase'




class Home extends React.Component {
    constructor(){
        super()
        this.state= {
            Restaurants: []
        }
    }

componentDidMount(){
    let { Restaurants } = this.state
    firebaseApp.firestore().collection('Users').where('account', "==", "Restaurant").get().then((userData)=>{
      userData.forEach((d)=>{
       let Restaurant = d.data()
       Restaurant.id = d.id
        Restaurants.push(Restaurant)
        this.setState({
            Restaurants: Restaurants
        })
      })
    })
}

    render() {
        console.log(this.props.state.isEmailVerified)
        let { Restaurants } = this.state
        console.log(Restaurants)
        return (
            <div>
                <NavBar nav='Profile' path={this.props.history}/>
        
                        <TabPanel Data={Restaurants} path={this.props.history}/>
       
            </div>
        )
    }

}



const maptateToProps = state => {
    return {
        state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // login : (value) => dispatch(login(value))
    }
}
export default connect(maptateToProps, mapDispatchToProps)(Home)
