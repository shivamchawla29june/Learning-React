import React, { Component,Suspense } from 'react';
//import axios from '../../axios';
//import axios from 'axios';
import './Blog.css';
import Posts from '../Blog/Posts/Posts';
//import NewPost from './NewPost/NewPost';
//import FullPost from '../Blog/FullPost/FullPost';

import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

// import asyncComponent from '../../hoc/asyncComponent';

// const AsyncNewPost = asyncComponent(() => {
//     return import('./NewPost/NewPost');
// })

const AsyncNewPost = React.lazy(() => import('./NewPost/NewPost'));

class Blog extends Component {
    state = {
        auth: true
    }

    render() {
        //       console.log(this.props.match);
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                exact
                                to="/posts"
                                activeClassName="active"
                                activeStyle={{
                                    color: '#fa923f', textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-Post',
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {/* {this.state.auth ? <Route
                        path="/new-Post"
                        exact
                        component={AsyncNewPost} /> : null} */}
                    {this.state.auth ? <Route
                        path="/new-Post"
                        exact
                        render={() => <Suspense fallback={<h1>Loading...</h1>}>
                            <AsyncNewPost />
                        </Suspense>} /> : null}

                    <Route
                        path="/posts"
                        component={Posts} />
                    {/* <Route render={() => <h1>Not found</h1>} /> */}
                    <Redirect from='/' to="/posts" />
                </Switch>

                {/* <Route 
                path="/" 
                exact 
                render={() => <Posts />}/> */}
                {/* <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section> */}
            </div>
        );
    }
}

export default Blog;