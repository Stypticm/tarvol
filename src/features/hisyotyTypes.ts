export interface HistoryMonth {
    id: string,
    nameOfMonth: string,
    percentOfMonth: number,
    pointsOfMonth: number
}

export interface EditDeleteHistoryModalProps {
    searchParams: {
        id: string;
        nameOfMonth: string;
        percentOfMonth: string;
        pointsOfMonth: string;
    }
}