import React from "react"
import {Link} from "react-router-dom"
export default function LandingPage() {

	return(
		<div className="header-background">
		<header className="header-landing content">
    		<div className="header-overlay"></div>
 			<div className="header-content">
    			<h1>APP Countries</h1>
    			<p><strong>Travel</strong> the <strong>world</strong>. The whole <strong>world</strong>, in your <strong>hands</strong>.</p>
				<Link to="/home"  >
					<div className="btn btn-home">
						<span>Home</span>	
					</div>
					
				</Link>		    			
				</div>	
		</header>
		</div>
		)
}