export const Controls = ({
    videoOn,
    audioOn,
    setAudioToggle,
    setVideoToggle,
    screenOn,
    setScreenSharing,
    screenDisabled,
    materialsOn,
    setShareMaterials,
    materialsDisabled,
}) => {
    return (
        <div className="publisherControls">
            <button
                onClick={() => setVideoToggle(!videoOn)}
                style={{ backgroundColor: videoOn ? "red" : undefined }}
            >
                Video
            </button>
            <button
                onClick={() => setAudioToggle(!audioOn)}
                style={{ backgroundColor: audioOn ? "red" : undefined }}
            >
                Audio
            </button>
            <button
                onClick={() => setScreenSharing(!screenOn)}
                disabled={screenDisabled}
                style={{ backgroundColor: screenOn ? "red" : undefined }}
            >
                {screenOn ? "Stop sharing" : "Share screen"}
            </button>
            <button
                onClick={() => setShareMaterials(!materialsOn)}
                disabled={materialsDisabled}
                style={{ backgroundColor: materialsOn ? "red" : undefined }}
            >
                {materialsOn ? "Hide materials" : "Show materials"}
            </button>
        </div>
    );
};
