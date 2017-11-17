import React, {Component} from 'react';
import {connect} from 'react-redux';

import Product from '../components/product';

import {fetchProducts} from '../actions/index';

class Wrapper extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: {},
            lines: 3,
            lineTotals: {}
        }
    }
    
    componentWillMount(){
        this.props.dispatch(fetchProducts());    
    }
    
    registerTotal(i, data){
        console.log('registering total', i ,data);
        
        var newState = {
            lineTotals: {}
        }
        newState.lineTotals[i] = data;
        
        var stateCopy = Object.assign({}, this.state);
        stateCopy.lineTotals[i] = data;
        
        var total = 0;
        
        var obj = this.state.lineTotals;
        
        console.log('lineTotals is ', obj);
        Object.keys(obj).forEach(function(key) {

            console.log('we have a key');
            total = total + obj[key];

        });
        
        this.setState({
            total: total + '.00 €'
        });
        
    }
    
    
    render(){
        return (
            <div className="outer-wrapper">
                
                <header>
                    <div className="logo-wrapper"> 
                           <img src="assets/img/logo.gif" class="main-logo-file"></img>
                           <img src="assets/img/tagline.png"></img>
                    </div>
                </header>
                
                <div className="intro-section">
                    <h1>
                        Front-end Developer
                    </h1> 
                    <p className="intro--desc">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                    </p>
                </div>
                
                <div className="cart-outer-wrapper">  
                    <div className="cart-wrapper">
                        { Array(this.state.lines).fill(1).map((el, i) => 
                             <Product key={i} theKey={i} products = {this.props.products} total={
                                this.registerTotal.bind(this)

                            }/>
                        )}
                        <div className="cart-total cart-line">
                            {this.state.total}
                        </div>
                    </div>
                </div>
                
                <div className="presentation-text">
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. 
                    </p>
                </div>
                
               
            </div>
            
        )
        
    }
}

export default connect((store) => {

    return {
        products: store.products
    }

})(Wrapper);

