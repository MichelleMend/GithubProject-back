import {Endpoints} from "@octokit/types";

// TODO: USE TYPES FROM @octokit/TYPES
export interface Repo{ 
    id: number;
    name: string;
    fullName: string;
    url: string;
    authorName: User;
    stars: number;
}

export interface User{
    userName: string;
    name: string;
    email: string;
}

