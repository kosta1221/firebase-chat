import React from "react";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Profile({ user }) {
	console.log(user);

	const firestore = firebase.firestore();
	const postsRef = firestore.collection("posts");
	// const query = postsRef.get().then((results) => {
	// 	console.log(results.docs[0].data());
	// });

	const [posts] = useCollectionData(postsRef);

	const handleSignOut = (e) => {
		firebase.auth().signOut();
	};

	return (
		<div>
			<h1>Welcome {user && user.displayName}</h1>
			{posts?.map((post) => {
				return (
					<>
						<h1>{post.title}</h1>
						<p>{post.content}</p>
					</>
				);
			})}
			<button onClick={handleSignOut}>Sign Out</button>
		</div>
	);
}

export default Profile;
