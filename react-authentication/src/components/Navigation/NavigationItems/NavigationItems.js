import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems=(props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link="/" >BurgerBuilder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem>: null }
        { !props.isAuthenticated ? <NavigationItem link="/auth">LogIn/SignUp </NavigationItem>:<NavigationItem link="/logout">LogOut </NavigationItem> }
    </ul>
);

export default navigationItems;
