import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import {connect} from 'react-redux';
//import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        readyToPurchase: false,
        // loading: false,
        // error: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el
        }, 0);
        return sum > 0
    }

    readyToPurchaseHandler = () => {
        this.setState({ readyToPurchase: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ readyToPurchase: false })
    }

    purchaseContinueHandler = () => {
        //alert
        // const queryParams =[];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) +'='+ encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + this.state.totalPrice)
        // const queryString= queryParams.join('&');

        // this.props.history.push({
        //     pathname: '/checkout',
        // search: '?'+ queryString});
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    }

    render() {

        const disabledInfo = {
            ...this.props.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;

        }

        let orderSummary=null;

        let burger=this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        
        if(this.props.ingredients){
            burger=(
                <Aux>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    orderingNow={this.readyToPurchaseHandler}
                    price={this.props.price}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={(igName) => this.props.onIngredientRemoved(igName)}
                    disabled={disabledInfo}
                    purchaseable={this.updatePurchaseState(this.props.ingredients)} />
                </Aux>
            );

            orderSummary=
            <OrderSummary
            purchasedCancelled={this.purchaseCancelHandler}
            purchasedContinue={this.purchaseContinueHandler}
            TotalPrice={this.props.price}
            ingredients={this.props.ingredients} />
        }

        // if(this.state.loading){
        //     orderSummary =<Spinner />
        // }

        return (
            <Aux>
                <Modal show={this.state.readyToPurchase} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: (igName) => dispatch(actions.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(actions.removeIngredient(igName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));