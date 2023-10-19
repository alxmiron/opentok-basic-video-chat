import { usePublisher } from "../hooks/usePublisher";

export const Controls = () => {
    const { videoOn, audioOn, setAudioToggle, setVideoToggle } = usePublisher();

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
        </div>
    );
};
