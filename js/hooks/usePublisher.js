import { useMemo } from "preact/hooks";
import { handleError } from "../errors";

export const usePublisher = () => {
  const publisher = useMemo(() => {
    const publisherOptions = {
      insertMode: "append",
      width: "100%",
      height: "100%",
    };

    const publisher = OT.initPublisher(
      "publisher",
      publisherOptions,
      handleError
    );

    return publisher;
  });

  return publisher;
};
