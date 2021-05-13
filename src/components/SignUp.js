import React from "react";
import firebase from "firebase";

function SignUp() {
	const handleSignUpWithGoogle = (e) => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider);
	};

	return (
		<div>
			<p>Sign Up</p>
			<button onClick={handleSignUpWithGoogle}>Sign Up</button>
		</div>
	);
}

export default SignUp;
