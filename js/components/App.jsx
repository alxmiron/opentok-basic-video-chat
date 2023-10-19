import { useEffect } from "preact/hooks";
import { TOKEN } from "../config";
import { useSession } from "../hooks/useSession";
import { usePublisher } from "../hooks/usePublisher";
import { handleError } from "../errors";
import { Subscribers } from "./Subscribers";
import { Controls } from "./Controls";
import { Workspace } from "./Workspace";

const token = TOKEN;

export const App = () => {
    const { session } = useSession();
    const { getPublisher } = usePublisher();
    const layoutType = "ribbon";

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
            <Subscribers layoutType={layoutType} />
            <Workspace layoutType={layoutType} />
            <div id="publisher"></div>
            <Controls />
        </div>
    );
};
