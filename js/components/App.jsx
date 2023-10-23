import { useEffect } from "preact/hooks";
import { TOKEN } from "../config";
import { useSession } from "../hooks/useSession";
import { usePublisher } from "../hooks/usePublisher";
import { useSubscribers } from "../hooks/useSubscribers";
import { useShareMaterials } from "../hooks/useShareMaterials";
import { useScreenShare } from "../hooks/useScreenShare";
import { handleError } from "../errors";
import { Subscribers } from "./Subscribers";
import { Controls } from "./Controls";
import { Workspace } from "./Workspace";

export const App = () => {
    const { session } = useSession();
    const { getPublisher, videoOn, audioOn, setAudioToggle, setVideoToggle } =
        usePublisher();
    const { subscribers } = useSubscribers();
    const { isScreenSharing, isScreenViewing, setScreenSharing } =
        useScreenShare();
    const { isMaterialsSharing, isMaterialsViewing, setShareMaterials } =
        useShareMaterials();

    const isMaterialsDisplayed = isMaterialsSharing || isMaterialsViewing;
    const layoutType =
        isScreenViewing || isMaterialsDisplayed ? "ribbon" : "grid";

    useEffect(() => {
        const publisher = getPublisher();

        // Connect to the session
        session.connect(TOKEN, (error) => {
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
            <Subscribers subscribers={subscribers} layoutType={layoutType} />
            <Workspace
                layoutType={layoutType}
                isScreenViewing={isScreenViewing}
                isMaterialsViewing={isMaterialsDisplayed}
            />
            <div id="publisher"></div>
            {isScreenSharing && <div id="screen-preview"></div>}
            <Controls
                videoOn={videoOn}
                audioOn={audioOn}
                setAudioToggle={setAudioToggle}
                setVideoToggle={setVideoToggle}
                screenOn={isScreenSharing}
                screenDisabled={isScreenViewing}
                setScreenSharing={setScreenSharing}
                materialsOn={isMaterialsSharing}
                setShareMaterials={setShareMaterials}
                materialsDisabled={isMaterialsViewing}
            />
        </div>
    );
};
