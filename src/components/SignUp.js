import React, { useState } from "react";
import firebase from "firebase";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

function SignUp() {
	const auth = firebase.auth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [createUserWithEmailAndPassword, , loading, error] =
		useCreateUserWithEmailAndPassword(auth);

	const handleSignUpWithEmailAndPassword = (e) => {
		createUserWithEmailAndPassword(email, password);
	};

	const handleSignUpWithGoogle = (e) => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider);
	};

	if (error) {
		console.log(error);
		return (
			<div>
				<p>Error: {error.message}</p>
			</div>
		);
	}
	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<p>Sign Up</p>
			<div className={"vertical-flex"}>
				<input
					type="email"
					value={email}
					placeholder="email..."
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					value={password}
					placeholder="password..."
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={handleSignUpWithEmailAndPassword}>Register</button>
				<button onClick={handleSignUpWithGoogle}>Sign Up With Google</button>
			</div>
		</div>
	);
}

export default SignUp;
