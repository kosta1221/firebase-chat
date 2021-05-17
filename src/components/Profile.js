import React, { useState } from "react";
import firebase from "firebase";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";

function Profile({ user, displayedRoom, setDisplayedRoom }) {
	const firestore = firebase.firestore();
	const roomsRef = firestore.collection("rooms");

	const [roomIdsSnap] = useCollection(roomsRef.where("creatorId", "==", user.uid));
	const [rooms] = useCollectionData(roomsRef.where("creatorId", "==", user.uid));
	console.log("room ids: ", roomIdsSnap);
	console.log("rooms: ", rooms);

	const handleSignOut = (e) => {
		firebase.auth().signOut();
	};

	const handleRoomClick = (e) => {
		setDisplayedRoom(() => e.target.innerText);
	};

	return (
		<div>
			<h1>Welcome {user && user.displayName}</h1>
			{roomIdsSnap?.docs.map((doc, i) => {
				console.log(doc);
				return (
					<Link to={`/room/${doc.id}`} key={i}>
						<p onClick={handleRoomClick}>{doc.id}</p>
					</Link>
				);
			})}

			<button onClick={handleSignOut}>Sign Out</button>
		</div>
	);
}

export default Profile;
