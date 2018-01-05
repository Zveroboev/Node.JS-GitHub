const https = require('https');

const sendRequest = (options, done) => {
  const req = https.get(options, res => {
    let body = '';

    if (res.statusCode === 200) {
      res.setEncoding('utf-8');
      res.on('data', data => body += data);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          done(null, result);
        } catch (error) {
          done(new Error(`Не удалось обработать данные (${error.message})`));
        }

      });
    } else {
      done(new Error(`Не удалось получить данные от сервера (${res.statusCode} ${res.statusMessage})`));
    }
  });

  req.on('error', error => done(new Error(`Не удалось отправить запрос (${error.message})`)));
};

const getRepos = (userName, done) => {
  if (!userName) return done(new Error('Необходимо указать имя пользователя'));

  const options = {
    hostname: 'api.github.com',
    path: `/users/${userName}/repos`,
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Node.JS-GitHub'
    }
  };

  sendRequest(options, done);
};

const getCommits = (userName, repoName, done) => {
  if (!repoName) return done(new Error('Необходимо указать имя репозитория'));

  const options = {
    hostname: 'api.github.com',
    path: `/repos/${userName}/${repoName}/commits`,
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Node.JS-GitHub'
    }
  };

  sendRequest(options, done);
};

module.exports = {
  getRepos,
  getCommits
};