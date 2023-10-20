import { useEffect, useState } from "preact/hooks";
import { useSession } from "./useSession";
import { handleError } from "../errors";

export const useSubscribers = () => {
    const [subscribers, setSubscribers] = useState({});
    const { session } = useSession();

    const renderSubscriber = (stream, session, id) => {
        const subscriberOptions = {
            insertMode: "append",
            width: "100%",
            height: "100%",
        };
        const subscriber = session.subscribe(
            stream,
            `subs-${id}`,
            subscriberOptions,
            handleError,
        );
        setSubscribers((prevSubscribers) => ({
            ...prevSubscribers,
            [id]: { ...prevSubscribers[id], subscriber, rendered: true },
        }));
    };

    useEffect(() => {
        session.on("streamCreated", (event) => {
            if (event.stream.videoType === "screen") return;
            setSubscribers((prevSubscribers) => ({
                ...prevSubscribers,
                [event.stream.streamId]: {
                    stream: event.stream,
                    rendered: false,
                },
            }));
        });

        session.on("streamDestroyed", (event) => {
            if (event.stream.videoType === "screen") return;
            setSubscribers((prevSubscribers) =>
                Object.keys(prevSubscribers).reduce((acc, key) => {
                    if (key !== event.stream.streamId) {
                        acc[key] = prevSubscribers[key];
                    }
                    return acc;
                }, {}),
            );
        });
    }, [session]);

    useEffect(() => {
        Object.entries(subscribers).forEach(([id, { stream, rendered }]) => {
            if (!rendered) {
                renderSubscriber(stream, session, id);
            }
        });
    }, [subscribers]);

    return {
        subscribers,
    };
};
