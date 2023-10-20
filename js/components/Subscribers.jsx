export const Subscribers = ({ subscribers, layoutType }) => {
    const cellsAmount = Object.keys(subscribers).length;

    return (
        <div
            className={`subscribers ${layoutType}`}
            style={getGridStyle(cellsAmount, layoutType)}
        >
            {Object.keys(subscribers).map((id) => (
                <div key={id} id={`subs-${id}`} className="subscriber"></div>
            ))}
        </div>
    );
};

const getGridStyle = (cellsAmount, layoutType) => {
    const { cols, rows } = getGridParams(cellsAmount, layoutType);

    if (layoutType === "ribbon") {
        return {
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
        };
    }

    return {
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
    };
};

const getGridParams = (cellsAmount, layoutType) => {
    if (layoutType === "ribbon") {
        return { cols: 1, rows: cellsAmount };
    }

    const maxCols = 5;
    const maxRows = 3;

    if (cellsAmount === 0) return { cols: 0, rows: 0 };
    if (cellsAmount === 1) return { cols: 1, rows: 1 };
    if (cellsAmount === 2) return { cols: 2, rows: 1 };

    if (cellsAmount / 2 <= maxCols) {
        return { cols: Math.ceil(cellsAmount / 2), rows: 2 };
    }

    if (cellsAmount / 3 <= maxCols) {
        return { cols: Math.ceil(cellsAmount / 3), rows: 3 };
    }

    if (cellsAmount > maxCols * maxRows) {
        return { cols: maxCols, rows: Math.floor(cellsAmount / maxCols) };
    }

    return { cols: 1, rows: 1 };
};
