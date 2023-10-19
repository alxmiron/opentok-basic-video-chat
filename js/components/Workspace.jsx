export const Workspace = ({ layoutType }) => {
    return (
        <div className={`workspace ${layoutType === "grid" ? "hidden" : ""}`}>
            {layoutType === "ribbon" && (
                <iframe src="https://www.britannica.com/quiz/guess-the-language"></iframe>
            )}
        </div>
    );
};
