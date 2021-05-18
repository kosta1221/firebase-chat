import { useEffect } from "react";
import { useRouter } from "../hooks/useRouter";

function LandingPage({ user }) {
	const router = useRouter();
	console.log(user);
	useEffect(() => {
		if (user) {
			router.push("/rooms");
		} else {
			router.push("/signin");
		}
	}, [user]);

	return null;
}

export default LandingPage;
