import React from 'react';
import { IndexLink } from 'react-router'
import NavLink from './NavLink';

export default React.createClass({
    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul role="nav">
					{/*<li><IndexLink activeClassName="active" to="/">Home</IndexLink></li>*/}
                    <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
					<li><NavLink to="/repos">Repos</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                </ul>

                {this.props.children}
            </div>
        );
    }
})
