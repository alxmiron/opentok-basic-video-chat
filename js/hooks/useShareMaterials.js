import { useEffect, useState } from "preact/hooks";
import { useSession } from "./useSession";

export const useShareMaterials = () => {
    const { session } = useSession();

    const [materialsData, setMaterialsData] = useState(null);
    const isMaterialsSharing = materialsData?.role === "host";
    const isMaterialsViewing = materialsData?.role === "viewer";

    const setShareMaterials = (isOn) => {
        if (isOn) {
            session.signal({ type: "materials-show" }, (error) => {
                if (error) console.error(error);
            });
        } else {
            session.signal({ type: "materials-hide" }, (error) => {
                if (error) console.error(error);
            });
        }
    };

    useEffect(() => {
        session.on("signal:materials-show", (event) => {
            console.log(event);
            const isHost = event.from.connectionId === session.connection.id;
            setMaterialsData({
                role: isHost ? "host" : "viewer",
            });
        });

        session.on("signal:materials-hide", () => {
            setMaterialsData(null);
        });
    }, []);

    return {
        isMaterialsSharing,
        isMaterialsViewing,
        setShareMaterials,
    };
};
