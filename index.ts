import express, { Request, Response } from 'express';
import { getReposSortedByStars } from './github/githubApi';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Middleware to parse JSON input
app.use(express.json());

// GitHub API base URL
const GITHUB_API_URL = 'https://api.github.com/repos';

// Default number of repositories if no list or limit is provided
const DEFAULT_REPO_LIMIT = 10;

app.get('/debug', async (req: Request , res: Response) => {
    // const { repositoryList, pagination, limit } = req.body;

    try {
        // if (pagination) {
        //     const page = req.query.page || 1;
        //     const perPage = req.query.per_page || 10;

        const results = await getReposSortedByStars();

        res.json({ results });
         fs.writeFileSync('output.json', JSON.stringify(results, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

        

        // const repoList = repositoryList || await getTrendingRepositories(limit || DEFAULT_REPO_LIMIT);

        // const results = await Promise.all(
        //     repoList.map(async (repo: string) => {
        //         try {
        //             const response = await axios.get(`${GITHUB_API_URL}/${repo}`);
        //             return {
        //                 repository: repo,
        //                 stars: response.data.stargazers_count,
        //             };
        //         } catch (error) {
        //             // Narrow the error type
        //             if (axios.isAxiosError(error)) {
        //                 console.error(`Axios error for ${repo}:`, error.message);
        //                 return {
        //                     repository: repo,
        //                     stars: `Error fetching data: ${error.response?.status || 'Unknown status'}`,
        //                 };
        //             } else {
        //                 console.error(`Unexpected error for ${repo}:`, String(error));
        //                 return {
        //                     repository: repo,
        //                     stars: 'Error fetching data',
        //                 };
        //             }
        //         }
        //     })
        // );

        // res.json({ results });
//     } catch (error) {
//         if (error instanceof Error) {
//             console.error('Error processing request:', error.message);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             console.error('Unexpected error:', String(error));
//             res.status(500).json({ error: 'Unknown Error' });
//         }
//     }
// });


// Helper function to fetch trending repositories (dummy implementation)
async function getTrendingRepositories(limit: number): Promise<string[]> {
    // This function currently returns dummy repository names.
    // Replace this with an actual implementation if needed.
    return Array.from({ length: limit }, (_, i) => `octocat/repo-${i + 1}`);
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
