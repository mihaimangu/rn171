import React, {Component} from 'react';
import {connect} from 'react-redux';

export default class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            enabled: true,
            selectedProduct: null,
            quantity: 5,
            minimumQ: 3,
            maximumQ: 10,
            price: 75,
            demoProduct: {
                name: 'Title Lorem ipsum dolor sit',
                description: 'Lorem ipsum dolor sit amet, quis dictum mauris erat aliquam, ac in pede pharetra quis non et.',
                imageUrl: 'assets/img/placeholder.png',
            }
        }
        
    }
    
    isButtonDisabled(a,b){
        if (a == b){
            return 0;
        } else if (a > b){
            return 1;
        }
    }

    
    componentWillMount(){
    
    }
    
        
    increaseQuantity(){
        const actualQ = this.state.quantity;
        
        if(actualQ < this.state.maximumQ){
            var newQ = actualQ + 1;
        
            this.setState({
                quantity: newQ,
            })
        }
        
        this.props.total(this.props.theKey, this.state.price * (this.state.quantity +1));
    }
    
     decreaseQuantity(){
        const actualQ = this.state.quantity;
        
        if(actualQ > this.state.minimumQ){
            
            var newQ = actualQ - 1;
        
            this.setState({
               quantity: newQ,
            })
        }
         
         this.props.total(this.props.theKey, this.state.price * (this.state.quantity -1));
    }
    
    handleSelectChange(e){
        const SPI = e.target.value;
        var minimumQ = 3;
        
        if(SPI != 'SKU'){
            
            const selectedProduct = this.props.products.products[SPI - 1];
            this.setState({
                selectedProduct: {
                    id: SPI,
                    name: selectedProduct.name,
                    imageUrl: selectedProduct.imageUrl,
                    price: selectedProduct.price,
                    defaultQ: 1,
                },
                minimumQ: selectedProduct.minimumQ,
                maximumQ: selectedProduct.maximumQ,
                quantity: selectedProduct.minimumQ,
                price:  selectedProduct.price,
            });
            
            console.log('selected product is', selectedProduct);
              this.props.total(this.props.theKey, selectedProduct.price * selectedProduct.minimumQ);
            
        }
        
    }
    
    disableRow(){
        this.setState({
            enabled: false,
        })
        
        this.props.total(this.props.theKey, 0);
    }
    
    
   componentWillMount(){
       console.log('updating component');
       //this.props.total(this.props.theKey, this.state.price * this.state.quantity);
    }
    
    render(){
        
        let selectedProduct = this.state.selectedProduct;
        let renderProduct = this.state.demoProduct;
        
        
        
        if ( selectedProduct != null ){
            renderProduct = selectedProduct;
        }
       
        
        
        return (
            
            this.state.enabled &&  
            <div className="cart-line">
               
                <div className="product--image-wrapper">
                    <img src={renderProduct.imageUrl} />
                </div>

                <div className="product--text-details">
                    <h3>
                        {renderProduct.name}
                    </h3>
                    <p>
                        Lorem ipsum dolor sit amet, quis dictum mauris erat aliquam, ac in pede pharetra quis non et. 
                    </p>
                      
                <div className="product--sku-picker">
                    <select onChange={this.handleSelectChange.bind(this)}>
                        <option>SKU</option>
                        {this.props.products.products.length > 0 && this.props.products.products.map((product, key) => {
        
                            return (
                                <option key={key} value={product.id}>{product.name}</option>
                            )
                            
                        } ) }
                        
                    </select>
                </div>
                
                </div>
                
                <div className="product--controls-price">
                    <div className="product-controls--delete" onClick={this.disableRow.bind(this)}>
                        <img src="assets/img/trash.svg" alt="delete"/>
                    </div>
                    
                   <div className="product--number-controls">
                        <button className="product-controls--minus" onClick={this.decreaseQuantity.bind(this)} disabled={!(this.state.quantity - this.state.minimumQ)}>
                            -
                        </button>

                        <div className="product-count">
                             {this.state.quantity}
                        </div> 

                        <button className="product-controls--plus" onClick={this.increaseQuantity.bind(this)} disabled={!(this.state.maximumQ - this.state.quantity)}>
                            +
                        </button>
                    </div>

                    <div className="product-number--total-price">
                         {this.state.price * this.state.quantity}.00 €
                    </div>
                    
                </div>
            </div>
              
          
        )
    }
    
    componentWillUpdate(){
        
    }
}

/*
export default connect((store) => { 
    return {
            products: store.products
        
    }
    
})(Product)  
*/