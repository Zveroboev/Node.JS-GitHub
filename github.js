const https = require('https');

const getRepos = (userName, done) => {
  const options = {
    hostname: 'api.github.com',
    path: `/users/${userName}/repos`,
    headers: {
      'User-Agent': 'Node.JS-GitHub'
    }
  };
  https.get(options, res => {
    let body = '';
    res.setEncoding('utf-8');
    res.on('data', data => body += data);
    res.on('end', () => {
      done(null, JSON.parse(body));
    });
  });
};

module.exports = {
  getRepos
};