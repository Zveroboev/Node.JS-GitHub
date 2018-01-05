const github = require('./github');

const method = process.argv[2];
const userName = process.argv[3];
const repoName = process.argv[4];

switch (method) {
  case 'repos':
    github.getRepos(userName, (error, repos) => {
      if (error) return console.error(`Ошибка: ${error.message}`);

      repos.forEach(repo => console.log(repo.name));
    });
    break;

  case 'commits':
    github.getCommits(userName, repoName, (error, commits) => {
      if (error) return console.error(`Ошибка: ${error.message}`);

      commits.reverse().forEach((commit, index) => {
        const _index = index < 9 ? `0${index + 1}` : index + 1;
        const _date = commit.commit.committer.date;
        const _message = commit.commit.message;

        console.log(`${_index}. ${_date} - ${_message}`);
      });
    });
}
