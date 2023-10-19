import { useCallback, useEffect, useState } from "preact/hooks";
import { handleError } from "../errors";

let publisher;

export const usePublisher = () => {
    const [videoOn, setVideoToggle] = useState(false);
    const [audioOn, setAudioToggle] = useState(false);

    const getPublisher = useCallback(() => {
        if (publisher) return publisher;

        const publisherOptions = {
            insertMode: "append",
            width: "100%",
            height: "100%",
            publishVideo: false,
            publishAudio: false,
        };

        publisher = OT.initPublisher(
            "publisher",
            publisherOptions,
            handleError,
        );

        return publisher;
    }, []);

    useEffect(() => {
        if (publisher) {
            publisher.publishVideo(videoOn);
        }
    }, [videoOn, publisher]);

    useEffect(() => {
        if (publisher) {
            publisher.publishAudio(audioOn);
        }
    }, [audioOn, publisher]);

    return {
        publisher,
        getPublisher,
        videoOn,
        setVideoToggle,
        audioOn,
        setAudioToggle,
    };
};
