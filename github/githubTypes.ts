import {Endpoints} from "@octokit/types";

// TODO: USE TYPES FROM @octokit/TYPES
export interface Repo{ 
    id: number;
    name: string;
    fullName: string;
    url: string;
    authorName: User;
    stars: number;
    isFavorite: boolean;
}

export interface User{
    login: string;
}

export type State = "desc" | "asc"

