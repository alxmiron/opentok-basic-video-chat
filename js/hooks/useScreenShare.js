import { useEffect, useState } from "preact/hooks";
import { useSession } from "./useSession";
import { handleError } from "../errors";

export const useScreenShare = () => {
    const [screenSubscriberData, setScreenSubscriber] = useState(null);
    const isScreenSharing = screenSubscriberData?.role === "host";
    const isScreenViewing = screenSubscriberData?.role === "viewer";
    const { session } = useSession();

    const renderScreenStream = (stream, session) => {
        const subscriberOptions = {
            insertMode: "append",
            width: "100%",
            height: "100%",
        };
        const subscriber = session.subscribe(
            stream,
            `screen-view`,
            subscriberOptions,
            handleError,
        );
        setScreenSubscriber((prevData) => ({
            ...prevData,
            rendered: true,
            subscriber,
        }));
    };

    const setScreenSharing = (isOn) => {
        if (isOn) {
            setScreenSubscriber({
                role: "host",
                rendered: false,
            });
        } else {
            setScreenSubscriber(null);
        }
    };

    useEffect(() => {
        session.on("streamCreated", (event) => {
            if (event.stream.videoType !== "screen") return;
            setScreenSubscriber((prevData) => ({
                role: "viewer",
                rendered: false,
                ...prevData,
                stream: event.stream,
            }));
        });

        session.on("streamDestroyed", (event) => {
            if (event.stream.videoType !== "screen") return;
            setScreenSubscriber(null);
        });

        session.on("mediaStopped", () => {
            setScreenSubscriber(null);
        });
    }, [session]);

    useEffect(() => {
        if (
            screenSubscriberData &&
            !screenSubscriberData.rendered &&
            screenSubscriberData.role === "viewer"
        ) {
            renderScreenStream(screenSubscriberData.stream, session);
        }
    }, [screenSubscriberData]);

    useEffect(() => {
        if (isScreenSharing) {
            OT.checkScreenSharingCapability((response) => {
                if (
                    !response.supported ||
                    response.extensionRegistered === false
                ) {
                    // This browser does not support screen sharing.
                } else if (response.extensionInstalled === false) {
                    // Prompt to install the extension.
                } else {
                    // Screen sharing is available. Publish the screen.
                    const publisher = OT.initPublisher(
                        "screen-preview",
                        {
                            insertMode: "append",
                            width: "100%",
                            height: "100%",
                            videoSource: "screen",
                        },
                        (error) => {
                            if (error) {
                                // Look at error.message to see what went wrong.
                                console.error(error);
                            } else {
                                session.publish(publisher, function (error) {
                                    if (error) {
                                        console.error(error);
                                    }
                                });
                                setScreenSubscriber({
                                    role: "host",
                                    rendered: true,
                                    publisher,
                                });
                            }
                        },
                    );
                }
            });
        }
    }, [isScreenSharing]);

    return {
        isScreenSharing,
        isScreenViewing,
        setScreenSharing,
    };
};
