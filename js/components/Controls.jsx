export const Controls = ({
    videoOn,
    audioOn,
    setAudioToggle,
    setVideoToggle,
    screenOn,
    setScreenSharing,
    screenDisabled,
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
            >
                {screenOn ? "Stop sharing" : "Share screen"}
            </button>
        </div>
    );
};
