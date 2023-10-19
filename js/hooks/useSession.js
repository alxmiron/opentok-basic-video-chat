import { useMemo } from "preact/hooks";
import { API_KEY, SESSION_ID } from "../config";

let sessionCached;

export const useSession = () => {
    const session = useMemo(() => {
        if (sessionCached) return sessionCached;

        sessionCached = OT.initSession(API_KEY, SESSION_ID);

        sessionCached.on("sessionDisconnected", (event) => {
            console.log(
                "You were disconnected from the session.",
                event.reason,
            );
        });

        return sessionCached;
    }, []);

    return {
        session,
    };
};
