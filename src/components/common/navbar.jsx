import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {

 return (
 	<nav className="navbar navbar-expand-lg navbar-light bg-light">
 	<div className="navbar-brand">Vidly</div>
 		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
	    <span className="navbar-toggler-icon"></span>
  	</button>
 		<div className=" collapse navbar-collapse">
 			<ul className="navbar-nav">
 				<li className="nav-item">
 					<NavLink to="/movies" className="nav-link">Movies</NavLink>
 				</li>
 				<li className="nav-item">
 					<div>
 						 <NavLink to="/customers" className="nav-link">Customers</NavLink>
 					</div>
 				</li>
 				<li className="nav-item">
 					<NavLink to="/rentals" className="nav-link">Rentals</NavLink>
 				</li>
 				
 				{!user && (
 				 <React.Fragment>
 				 	<li className="nav-item">
 				 		<NavLink to="/login" className="nav-link">Login</NavLink>
 				 	</li>
 				 	<li className="nav-item">
 				 		<NavLink to="/register" className="nav-link">Register</NavLink>
 				 	</li>
 				 </ React.Fragment>
 				)}
 				{user && (
 				 <React.Fragment>
 				 	<li className="nav-item">
 				 		<NavLink to="/profile" className="nav-link">{user.name}</NavLink>
 				 	</li>
 				 	<li className="nav-item">
 				 		<NavLink to="/logout" className="nav-link">Logout</NavLink>
 				 	</li>
 				 </ React.Fragment>
 				)}
 			</ul>
 		</div>
 	</nav>	
 );
}

export default NavBar;