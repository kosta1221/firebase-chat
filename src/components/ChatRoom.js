import React, { useState } from "react";
import firebase from "firebase";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";

function ChatRoom({ roomId, user }) {
	const firestore = firebase.firestore();
	const messagesRef = firestore.collection("messages");
	const roomsRef = firestore.collection("rooms");

	const [room, roomLoading, roomError] = useDocumentData(firestore.doc(`rooms/${roomId}`));

	const [messages, messagesLoading, messagesError] = useCollectionData(
		messagesRef.where("roomId", "==", roomId)
	);
	const [formInputValue, setFormInputValue] = useState("");

	const handleSendMessage = (e) => {
		e.preventDefault();

		if (roomId) {
			messagesRef
				.add({
					content: formInputValue,
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					uid: user.uid,
					roomId,
				})
				.then((response) => {
					console.log(response);
					setFormInputValue("");
				});
		}
	};

	if (messagesError || roomError) {
		return <h1>ERROR!</h1>;
	}

	if (messagesLoading || roomLoading) {
		return <h1>Loading!</h1>;
	}

	if (room) {
		const foundUser = room.participants.find((participant) => participant.uid === user.uid);
		if (!foundUser) {
			roomsRef
				.doc(roomId)
				.update({
					participants: [...room.participants, { uid: user.uid, name: user.displayName || "Anon" }],
				})
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	return (
		<div>
			{messages?.map((message, i) => {
				const foundUser = room?.participants.find((participant) => participant.uid === message.uid);
				if (foundUser) {
					return <p key={i}>{`${foundUser.name}: ${message.content}`}</p>;
				}
				return null;
			})}

			<form onSubmit={handleSendMessage}>
				<input value={formInputValue} onChange={(e) => setFormInputValue(() => e.target.value)} />
				<button type="submit">Send Message</button>
			</form>
		</div>
	);
}

export default ChatRoom;
