import { useEffect } from "preact/hooks";
import { API_KEY, TOKEN, SESSION_ID } from "../config";
import { useSession } from "../hooks/useSession";
import { usePublisher } from "../hooks/usePublisher";
import { handleError } from "../errors";

const apiKey = API_KEY;
const sessionId = SESSION_ID;
const token = TOKEN;

export const App = () => {
  const session = useSession({ apiKey, sessionId });
  const publisher = usePublisher();

  useEffect(() => {
    // Connect to the session
    session.connect(token, (error) => {
      if (error) {
        handleError(error);
      } else {
        // If the connection is successful, publish the publisher to the session
        session.publish(publisher, handleError);
      }
    });
  }, [session]);

  return (
    <div id="videos">
      <div id="subscriber"></div>
      <div id="publisher"></div>
    </div>
  );
};
