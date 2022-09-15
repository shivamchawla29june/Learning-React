import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    CheckoutCancelled = () => {
        this.props.history.goBack();
    }

    CheckoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ingredients}
                    checkoutContinued={this.CheckoutContinued}
                    checkoutCancelled={this.CheckoutCancelled} />
                <Route path={this.props.match.url + '/contact-Data'}
                    component={ContactData} />
            </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);