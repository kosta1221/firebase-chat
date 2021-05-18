import { useEffect } from "react";
import { useRouter } from "../hooks/useRouter";

function UserRouter({ user, inviteUrl, setInviteUrl, setDisplayedRoom }) {
	const router = useRouter();

	useEffect(() => {
		if (router.pathname.includes("/room/")) {
			setInviteUrl(() => router.pathname);
		}
	}, []);

	useEffect(() => {
		if (user) {
			if (inviteUrl) {
				setDisplayedRoom(() => inviteUrl.slice(6));
				router.push(inviteUrl);
			} else {
				router.push("/rooms");
			}
		} else {
			router.push("/landing");
		}
	}, [user]);

	return null;
}

export default UserRouter;
