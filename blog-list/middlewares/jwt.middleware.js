const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization');
    if (auth && auth.startsWith('Bearer')) return auth.replace('Bearer ', '');
}

module.exports = {
    tokenExtractor,
}