const path = require('path');

const serveManifest = (req, res, next) => {
  if (req.path === '/site.webmanifest') {
    return res.sendFile(path.join(__dirname, '..', 'public', 'site.webmanifest'), {
      headers: {
        'Content-Type': 'application/manifest+json'
      }
    });
  }
  next();
};

module.exports = serveManifest;
