const notFound = (req, res) => res.statue(404).send('Route does not exist');

module.exports = notFound;