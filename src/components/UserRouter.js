import { useEffect } from "react";
import { useRouter } from "../hooks/useRouter";

function UserRouter({ user }) {
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push("/rooms");
		} else {
			router.push("/landing");
		}
	}, [user]);

	return null;
}

export default UserRouter;
