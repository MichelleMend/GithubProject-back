import { githubRepoTORepo } from "./githubApi";
import { Response } from 'express';
import fs from 'fs';

// rate limit tool

// authentication tool

// caching tool 


// handling the results + output for debugging 
export const handleResults = async (reposToShow: any, res: Response,file:string) => {
    reposToShow = githubRepoTORepo(reposToShow);
    res.json({ reposToShow });
    fs.writeFileSync('output.json', JSON.stringify(reposToShow, null, 2), 'utf-8');
}
