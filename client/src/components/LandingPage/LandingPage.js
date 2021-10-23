import React from "react"
import {Link} from "react-router-dom"
import videoLanding from "../../img/video/production ID_4156415.mp4"
export default function LandingPage() {

	return(
		<>
		<header className="header-landing content">
			<div className="header-video">
				<video autoPlay loop muted>
					<source src={videoLanding}/>	
				</video>
			</div>		
    		<div className="header-overlay"></div>
 			<div className="header-content">
    			<h1>Countries</h1>
    			<p><strong>Travel</strong> the <strong>world</strong>. The whole <strong>world</strong>, in your <strong>hands</strong>.</p>
				<Link to="/home"  >
					<div className="btn btn-home">
						<span>Home</span>	
					</div>
					
				</Link>		    			
				</div>	
		</header>
		<footer className="footer">
			<p>Vídeo de <a href="https://www.pexels.com/es-es/@tobias-wagner-2563626?utm_content=attributionCopyText&utm_medium=referral&utm_source=pexels"target="_blank" rel="noreferrer">Tobias Wagner</a> en Pexels</p>
		</footer>
		</>
		)
}