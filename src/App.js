import "./styles/App.css";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

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

	return (
		<div className="App">
			{user ? (
				<Profile />
			) : (
				<div>
					<SignIn />
					<SignUp />
				</div>
			)}
		</div>
	);
}

export default App;
