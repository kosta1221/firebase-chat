import React, { useState } from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatRoom from "./ChatRoom";

function Profile({ user }) {
	const firestore = firebase.firestore();
	const roomsRef = firestore.collection("rooms");

	const [rooms] = useCollectionData(roomsRef.where("creatorId", "==", user.uid));
	console.log(rooms);
	const [displayedRoom, setDisplayedRoom] = useState(null);

	const handleSignOut = (e) => {
		firebase.auth().signOut();
	};

	const handleRoomClick = (e) => {
		setDisplayedRoom(() => e.target.innerText);
	};

	return (
		<div>
			<h1>Welcome {user && user.displayName}</h1>
			{rooms?.map((room, i) => {
				console.log(room);
				return (
					<p onClick={handleRoomClick} key={i}>
						{room.creatorId}
					</p>
				);
			})}
			<ChatRoom roomId={displayedRoom} user={user} />

			<button onClick={handleSignOut}>Sign Out</button>
		</div>
	);
}

export default Profile;
