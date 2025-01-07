import express, { Request, Response } from 'express';
import { getReposSortedByStars, githubRepoTORepo } from './github/githubApi';
import { Repo } from './github/githubTypes';
import { handleResults } from './github/githubHelper';
import cors from "cors";


const app = express();
const PORT = 3000;
const TOTAL_PAGES = 10;

let favorites: Repo[] = [];

// Middleware to parse JSON input
app.use(express.json());
app.use(cors());

// creating the github api requests concurntly and paging
app.get('/desc', async (req: Request, res: Response) => {

    try {
        const reqsPerPage = Array.from({ length: TOTAL_PAGES }, (_, i) => getReposSortedByStars(i, "desc"));
        const result = await Promise.all(reqsPerPage);
        let reposToShow = result.flat();
        
        handleResults(reposToShow, res, 'output.json');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/asc', async (req: Request, res: Response) => {
    try {
        const reqsPerPage = Array.from({ length: TOTAL_PAGES }, (_, i) => getReposSortedByStars(i, "asc"));
        const result = await Promise.all(reqsPerPage);
        let reposToShow = result.flat();
        handleResults(reposToShow, res,'output.json');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// not implemnted yet
app.post("/favorites", (req: Request, res: Response) => {
    const repo = req.body;
    console.log("Received favorite repo:", repo);
    favorites.push(repo);
    handleResults([repo],res,'favorites.json')
    res.status(200).json({ message: "Repository added to favorites" });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
