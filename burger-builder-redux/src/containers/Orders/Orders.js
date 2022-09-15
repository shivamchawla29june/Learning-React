import React, { Component } from "react";

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';

import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = (this.props.orders.map(order => (
                <Order
                    price={order.price}
                    ingredients={order.ingredients}
                    key={order.id} />
            )))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));