import { useCallback } from "preact/hooks";
import { handleError } from "../errors";

export const usePublisher = () => {
    const getPublisher = useCallback(() => {
        const publisherOptions = {
            insertMode: "append",
            width: "100%",
            height: "100%",
        };

        return OT.initPublisher("publisher", publisherOptions, handleError);
    }, []);

    return {
        getPublisher,
    };
};
