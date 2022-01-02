import { Link } from "react-router-dom";
export default function LandingPage() {
	return (
		<div className="landing-container">
			<div className="overlay"></div>
			<div className="landing-content">
				<h1>APP Countries</h1>
				<p>
					<strong>Discover</strong> & <strong>Explore</strong> the
					<strong> Whole World.</strong>
				</p>
				<Link to="/home">
					<div className="btn btn-home">
						<span>Get Started</span>
					</div>
				</Link>
			</div>
		</div>
	);
}
