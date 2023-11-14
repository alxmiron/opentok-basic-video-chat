import { useCallback, useEffect, useState } from "preact/hooks";
import { handleError } from "../errors";
import { suppressNoiseFromAudioStream } from "../noiseReduction";

let publisher;

export const usePublisher = () => {
    const [videoOn, setVideoToggle] = useState(false);
    const [audioOn, setAudioToggle] = useState(false);

    const getPublisher = useCallback(async () => {
        if (publisher) return publisher;

        const stream = await OT.getUserMedia({ audio: true, video: true });
        const noiseSuppresedStream = await suppressNoiseFromAudioStream(stream);

        const publisherOptions = {
            insertMode: "append",
            width: "100%",
            height: "100%",
            publishVideo: false,
            publishAudio: false,
            audioSource: noiseSuppresedStream.getAudioTracks()[0]
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
