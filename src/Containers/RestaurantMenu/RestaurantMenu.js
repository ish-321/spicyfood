import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import '../../Containers/Profile/Profile.css'
import OutlinedTextFieldsNew from '../../Components/Input/OutlinedTextFields'
import Button from '../../Components/Button/Button'
import Paper from '../../Components/Paper/Paper'
import { connect } from 'react-redux'
import { firebaseApp } from '../../Config/Firebase/firebase'
import Card from '../../Components/Product/Product'

class RestaurantMenu extends React.Component {
    constructor() {
        super()
        this.state = {
            user: '',
            Products: []
        }
    }

    componentDidMount() {
        let { Products } = this.state
        firebaseApp.firestore().collection('Product').where("restaurant", '==', 'Standard Khauasa')
        .get().then((Product) => {
            Product.forEach((d) => {
                let Product = d.data()
                Product.id = d.id
                Products.push(Product)
                this.setState({
                    Products: Products
                })
            })
        })
        this.setState({
            restroData: this.props.location.state
        })
    }


    render() {
        console.log(this.state)
        let { restroData, Products } = this.state
        console.log(restroData)

        return (
     <div>
        {restroData &&
        <div>
        <NavBar home='Home' path={this.props.history} />
            <div style={{ textAlign: 'center' }}>
            <img src={restroData.coverPhoto} width='90%' height="250px" alt='Cover Photo' />
            <h2 style={{ fontWeight: '400', color: '#0a0086' }}>{restroData.userName}</h2>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px' }}>
            {
            Products.map((v, i) =>
            <div style={{ display: 'inline' }}>
            <Card name={v.productName} image={v.productUrl} prize={v.prize} />
             </div>
                )
                 }
                   </div>
                     </div>}
            </div>
        )
    }
}

const maptateToProps = state => {
    return {
        name: state.name,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // addProduct : (value) => dispatch(addProduct(value))
    }
}
export default connect(maptateToProps, mapDispatchToProps)(RestaurantMenu)
