import { useEffect } from "preact/hooks";
import { TOKEN } from "../config";
import { useSession } from "../hooks/useSession";
import { usePublisher } from "../hooks/usePublisher";
import { handleError } from "../errors";
import { Subscribers } from "./Subscribers";

const token = TOKEN;

export const App = () => {
    const { session } = useSession();
    const { getPublisher } = usePublisher();

    useEffect(() => {
        const publisher = getPublisher();

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
            <Subscribers />
            <div id="publisher"></div>
        </div>
    );
};
