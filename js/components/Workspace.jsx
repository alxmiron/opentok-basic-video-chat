export const Workspace = ({ layoutType, isScreenViewing, isIframeOn }) => {
    return (
        <div className={`workspace ${layoutType === "grid" ? "hidden" : ""}`}>
            {isScreenViewing && <div id="screen-view"></div>}
            {isIframeOn && (
                <iframe src="https://www.britannica.com/quiz/guess-the-language"></iframe>
            )}
        </div>
    );
};
