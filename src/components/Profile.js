import React, { useState } from "react";
import firebase from "firebase";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";

function Profile({ user, displayedRoom, setDisplayedRoom }) {
	const firestore = firebase.firestore();
	const roomsRef = firestore.collection("rooms");

	const [roomIdsSnap] = useCollection(roomsRef.where("creatorId", "==", user && user.uid));
	const [rooms] = useCollectionData(roomsRef.where("creatorId", "==", user && user.uid));
	console.log("room ids: ", roomIdsSnap);
	console.log("rooms: ", rooms);

	const handleSignOut = (e) => {
		firebase.auth().signOut();
	};

	const handleCreateRoom = (e) => {
		roomsRef
			.add({
				creatorId: user.uid,
				participants: [{ uid: user.uid, name: user.displayName || "Anon" }],
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleRoomClick = (e) => {
		setDisplayedRoom(() => e.target.innerText);
	};

	return (
		<div>
			<h1>Welcome {(user && user.displayName) || "Anon"}</h1>
			{roomIdsSnap?.docs.map((doc, i) => {
				console.log(doc);
				return (
					<Link to={`/room/${doc.id}`} key={i}>
						<p onClick={handleRoomClick}>{doc.id}</p>
					</Link>
				);
			})}

			<button onClick={handleSignOut}>Sign Out</button>
			<button onClick={handleCreateRoom}>Create Room</button>
		</div>
	);
}

export default Profile;
