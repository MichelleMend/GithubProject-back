import { Repo, State, User } from "./githubTypes";
import dotenv from 'dotenv';

dotenv.config();

const { Octokit } = require("@octokit/rest");
export const octokit = new Octokit({
  auth: process.env.GITHUB_PAT
  ,
  retry: 3,
});
 

const getReposSortedByStars = async (page:number, state: State) => {
  try {
    const { data } = await octokit.request("GET /search/repositories", {
      q: "stars:>=1",
      sort: "stars",
      order: state,
      per_page: 100,
      page: page
    });
    const repos = data.items ?? [];
    console.log(`amount of repos: ${repos.length}`)
    return repos;
  } catch (e) {
    console.log(e);
    return [];
  }
};

// didnt use this function
const getReposOfAmountOfStars = async (amount: number) => {
  try {
    const { data } = await octokit.request("GET /search/repositories", {
      q: `stars:>=${amount}`,
      sort: "stars",
      order: "desc",
      per_page: 10,
    });
    const repos = data.items ?? [];
    const reposData = githubRepoTORepo(repos);
    return reposData;
  } catch (e) {
    console.log(e);
    return [];
  }
};

// handling the result for each repo
const githubRepoTORepo = (repos: any) => {
  let reposData = [];
  try {
    reposData = repos.map((githubRepo:any) => {
      const repo: Repo = {
        id: githubRepo.id,
        name: githubRepo.name,
        fullName: githubRepo.full_name,
        url: githubRepo.html_url,
        authorName: { login: githubRepo.owner.login },
        stars: githubRepo.stargazers_count,
        isFavorite: false
      };
        return repo;
    });
  } catch (e) {
    console.log(e);
  }
  return reposData;
};

// This function will send the data of the repo we want to store in the database
// will happen onclick on star icon
const saveRepoToFavoriteDatabase = async (repo: any) => {
  try {
  } catch (e) {
    console.log(e);
  }
};
// This function will filter the repos by the parameter passed
const filterReposByName = async (name: string) => {
  try {
    
  } catch (e) {
    console.log(e);
    return []; //TODO-Change to return all the repos
  }
};

const filterReposByAuthor = async (author: string) => {
  try {
  } catch (e) {
    console.log(e);
    return []; //TODO-Change to return all the repos
  }
};

export {
  getReposSortedByStars,
  getReposOfAmountOfStars,
  saveRepoToFavoriteDatabase,
  filterReposByName,
  filterReposByAuthor,
  githubRepoTORepo
};


