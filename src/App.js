import React, { useState } from "react";
import "./styles/App.css";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import UserRouter from "./components/UserRouter";
import LandingPage from "./components/LandingPage";

firebase.initializeApp({
	apiKey: "AIzaSyB3LayRm8BR6Tp2rVMq9IAteL2uo50NmJ4",
	authDomain: "kosta-chat.firebaseapp.com",
	projectId: "kosta-chat",
	storageBucket: "kosta-chat.appspot.com",
	messagingSenderId: "87432162609",
	appId: "1:87432162609:web:84bb56bd0cda26a5c75410",
	measurementId: "G-YQZ9E3HCM3",
});

const auth = firebase.auth();

function App() {
	const [user] = useAuthState(auth);
	const [displayedRoom, setDisplayedRoom] = useState(null);

	return (
		<BrowserRouter>
			<div className="App">
				<h1>Firechat</h1>
				<UserRouter user={user} />

				<Switch>
					<Route exact path="/landing" render={(props) => <LandingPage user={user} {...props} />} />
					<Route exact path="/signin" render={(props) => <SignIn {...props} />} />
					<Route exact path="/signup" render={(props) => <SignUp {...props} />} />
					<Route
						exact
						path="/rooms"
						render={(props) => (
							<Profile
								user={user}
								displayedRoom={displayedRoom}
								setDisplayedRoom={setDisplayedRoom}
								{...props}
							/>
						)}
					/>
					<Route
						exact
						path="/room/:id"
						render={(props) => <ChatRoom roomId={displayedRoom} user={user} {...props} />}
					/>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
