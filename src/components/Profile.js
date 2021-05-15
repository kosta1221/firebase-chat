import React, { useState } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Profile({ user }) {
	const firestore = firebase.firestore();
	const messagesRef = firestore.collection("messages");

	const [formInputValue, setFormInputValue] = useState("");

	const [messages] = useCollectionData(
		messagesRef.where("uid", "==", user.uid).orderBy("createdAt")
	);

	const handleSignOut = (e) => {
		firebase.auth().signOut();
	};

	const handleSendMessage = (e) => {
		e.preventDefault();

		messagesRef
			.add({
				content: formInputValue,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				uid: user.uid,
			})
			.then((response) => {
				console.log(response);
				setFormInputValue("");
			});
	};

	return (
		<div>
			<h1>Welcome {user && user.displayName}</h1>
			{messages?.map((message, i) => {
				return <p key={i}>{message.content}</p>;
			})}

			<form onSubmit={handleSendMessage}>
				<input value={formInputValue} onChange={(e) => setFormInputValue(() => e.target.value)} />
				<button type="submit">Send Message</button>
			</form>
			<button onClick={handleSignOut}>Sign Out</button>
		</div>
	);
}

export default Profile;
