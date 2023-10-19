import { useMemo } from "preact/hooks";
import { handleError } from "../errors";

export const useSession = ({ apiKey, sessionId }) => {
  const session = useMemo(() => {
    const session = OT.initSession(apiKey, sessionId);

    // Subscribe to a newly created stream
    session.on("streamCreated", (event) => {
      console.dir(event);
      const subscriberOptions = {
        insertMode: "append",
        width: "100%",
        height: "100%",
      };
      session.subscribe(
        event.stream,
        "subscriber",
        subscriberOptions,
        handleError
      );
    });

    session.on("sessionDisconnected", (event) => {
      console.log("You were disconnected from the session.", event.reason);
    });

    return session;
  }, []);

  return session;
};
