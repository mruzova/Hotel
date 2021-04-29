const CategoryRepo = require('../repos/CategoryRepo');

exports.getCategories = (req, res, next) => {
    const page = req.query.page;
    CategoryRepo.getCategories(page)
        .then(c => { res.status(200).json(c) })
        .catch(err => { console.log(err) });
}
exports.createCategory = (req, res, next) => {
    CategoryRepo.createCategory(req.body)
        .then(newCat => {
            res.status(201).json(newCat);
        })
        .catch(err => {
            next(err);
        });
};
exports.updateCategory = (req, res, next) => {
    const id = req.params.idCategory;
    CategoryRepo.updateCategory(id, req.body)
        .then(result => {
            res.status(200).json({ category: result });
        })
        .catch(err => {
            next(err);
        });
};
exports.deleteCategory = (req, res, next) => {
    const id = req.params.idCategory;
    CategoryRepo.deleteCategory(id)
        .then(result => {
            res.status(200).json({ category: result });
        })
        .catch(err => {
            next(err);
        });
};