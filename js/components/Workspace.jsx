export const Workspace = ({
    layoutType,
    isScreenViewing,
    isMaterialsViewing,
}) => {
    return (
        <div className={`workspace ${layoutType === "grid" ? "hidden" : ""}`}>
            {isMaterialsViewing ? (
                <iframe src="https://www.britannica.com/quiz/guess-the-language"></iframe>
            ) : isScreenViewing ? (
                <div id="screen-view"></div>
            ) : null}
        </div>
    );
};
