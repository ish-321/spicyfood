import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import '../../Containers/Profile/Profile.css'
import OutlinedTextFieldsNew from '../../Components/Input/OutlinedTextFields'
import Button from '../../Components/Button/Button'
import Paper from '../../Components/Paper/Paper'
import { connect } from 'react-redux'
import { firebaseApp } from '../../Config/Firebase/firebase'
import { addProduct } from '../../Config/Redux/action'

class RestaurantProfile extends React.Component {
    constructor(){
        super()
        this.state={
            user: ''
        }
    }
    
    componentDidMount(){
        let currentUser = localStorage.getItem('Current_User')
        currentUser = JSON.parse(currentUser)
        console.log(currentUser)
        this.setState({
            user: currentUser
        })
    }

    async productUpload(e) {
        let fileName = e.target.files[0]
        let ref = firebaseApp.storage().ref('/').child(`Product/${fileName}`)
        await ref.put(e.target.files[0])
        ref.getDownloadURL().then( (url)=>{
          console.log(url);
         let productUrl = url
         this.setState({
           productUrl: productUrl
         })
        });
      }  

    render() {
        console.log(this.state)
        let { user, productName, catergory, prize, productUrl } = this.state
        return (
            <div>
                <NavBar home='Home'  path={this.props.history} />

                <div style={{textAlign: 'center'}}> 
                <h2 style={{fontWeight: '400', color: '#b71c1c'}}>{user.userName}</h2>
                    <img src={user.coverPhoto} width='80%' height="250px"  alt='Cover Photo' />
                </div>

                <Paper>
                    <div style={{textAlign: 'center'}}>

                    <h2 className='heading'>Add Product</h2>

                    <OutlinedTextFieldsNew type='text' name="Product Name"  onchange={(e) => { this.setState({ productName: e.target.value })}}/>
                    <OutlinedTextFieldsNew type='text' name="Category" onchange={(e) => { this.setState({ catergory : e.target.value })}} />
                    <OutlinedTextFieldsNew type='number' name="Price" onchange={(e) => { this.setState({ prize : e.target.value })}} />
                    <OutlinedTextFieldsNew type='file' name="Upload Picture" onchange={this.productUpload.bind(this)}/>
                    <Button  name='Add Product' onclick={()=> this.props.addProduct({restaurant : user.userName, productName: productName, catergory: catergory, prize:prize,productUrl:productUrl })}/> 

                    </div>
                </Paper>

                
            </div>
        )
    }
}

const maptateToProps = state => {
    return {
        name: state.name,
        userData: state.payload
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addProduct : (value) => dispatch(addProduct(value))
    }
}
export default connect(maptateToProps, mapDispatchToProps)(RestaurantProfile)
