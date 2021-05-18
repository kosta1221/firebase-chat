import { Link } from "react-router-dom";

function LandingPage({ user }) {
	return (
		<div>
			<Link to={`/signin`}>
				<button>Sign In</button>
			</Link>
			<Link to={`/signup`}>
				<button>Sign Up</button>
			</Link>
		</div>
	);
}

export default LandingPage;
