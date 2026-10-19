import type { Player } from "./player";

export type Match = {
    team1: Player[];
    team2: Player[];
    result: {
        team1: number;
        team2: number;
    },
    submittedBy: string;
    date: string;
}