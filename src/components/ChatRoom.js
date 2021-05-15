import React, { useState } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatRoom({ roomId, user }) {
	const firestore = firebase.firestore();
	const messagesRef = firestore.collection("messages");
	console.log(roomId);

	const [messages, error] = useCollectionData(messagesRef.where("roomId", "==", roomId));
	const [formInputValue, setFormInputValue] = useState("");

	console.log(messages);
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

	if (error) {
		console.log(messages);
		return <h1>ERROR!</h1>;
	}

	return (
		<div>
			{messages?.map((message, i) => {
				return <p key={i}>{message.content}</p>;
			})}

			<form onSubmit={handleSendMessage}>
				<input value={formInputValue} onChange={(e) => setFormInputValue(() => e.target.value)} />
				<button type="submit">Send Message</button>
			</form>
		</div>
	);
}

export default ChatRoom;
