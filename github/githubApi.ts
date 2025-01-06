// import { Octokit } from "octokit";
import { Repo } from "./githubTypes";
import axios from "axios";

const { Octokit } = require("@octokit/rest");
export const octokit = new Octokit({
  auth: "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"
  ,
  retry: 3,
});

// This function will return the repos sorted by stars
//  TODO: fetch the top rated github repos sorted by start - is there any limit of results we want to bring
// and then get more id needed? //

//Todo: what is the diff between fetch the top rated by stars and enable sorting by the number of stars (enabling getting repos of x stars?)?
const getReposSortedByStars = async () => {
  try {
    const { data } = await octokit.request("GET /search/repositories", {
      q: "stars:>=1",
      sort: "stars",
      order: "desc",
      per_page: 10,
    });
    const repos = data.items ?? [];
    return repos;
    // const reposData = githubRepoTORepo(repos);
    // return reposData;
  } catch (e) {
    console.log(e);
    return [];
  }
};

// This function will return the repos with the amount of stars passed as a parameter
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

const githubRepoTORepo = (repos:any) => {
  let reposData = [];
  try {
    reposData = repos.map((githubRepo:any) => {
      const repo: Repo = {
        id: githubRepo.id,
        name: githubRepo.name,
        fullName: githubRepo.full_name,
        url: githubRepo.html_url,
        authorName: { name: "test", email: "test", userName: "test" },
        stars: githubRepo.stargazers_count,
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

// const filterReposByLanguage = async (language: string) => {
//   try {
//   } catch (e) {
//     console.log(e);
//     return []; //TODO-Change to return all the repos
//   }
// };

export {
  getReposSortedByStars,
  getReposOfAmountOfStars,
  saveRepoToFavoriteDatabase,
  filterReposByName,
  filterReposByAuthor,
};
//https://api.github.com/search/repositories?q=stars:>=1&sort=stars&order=desc

getReposSortedByStars()