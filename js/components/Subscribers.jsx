import { useSubscribers } from "../hooks/useSubscribers";

export const Subscribers = () => {
    const { subscribers } = useSubscribers();
    const cellsAmount = Object.keys(subscribers).length;
    const { cols, rows } = getGridParams(cellsAmount);

    return (
        <div
            className="subscribers"
            style={{
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
            }}
        >
            {Object.keys(subscribers).map((id) => (
                <div key={id} id={`subs-${id}`} className="subscriber"></div>
            ))}
        </div>
    );
};

const getGridParams = (cellsAmount) => {
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
