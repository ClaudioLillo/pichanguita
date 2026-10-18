export type Match = {
    team1: {name: string}[];
    team2: {name: string}[];
    result: {
        team1: number;
        team2: number;
    },
    submittedBy: string;
    date: number;
}