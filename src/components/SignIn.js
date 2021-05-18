import React, { useState } from "react";
import firebase from "firebase";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

function SignIn() {
	const auth = firebase.auth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);

	const handleSignInWithEmailAndPassword = (e) => {
		signInWithEmailAndPassword(email, password);
	};

	if (error) {
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
			<div>
				<p>Sign In</p>
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
					<button onClick={handleSignInWithEmailAndPassword}>Sign In</button>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
