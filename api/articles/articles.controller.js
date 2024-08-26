const articlesService = require("./articles.service");


class ArticlesController{
    async create(req, res, next){
        try {
            const user = req.user;
            const article = await articlesService.create(req.body, user);
            req.io.emit("article:create", article);
            res.status(201).json(article);
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        if(req.user.role === "admin" ){
            try {
                const id = req.params.id;
                const data = req.body;
            const articleModified = await articlesService.update(id, data);
            req.io.emit("article:update", articleModified);
            res.status(200).json(articleModified);
            } catch (err) {
            next(err);
            }
        } else {
            res.status(403).json({ message: "Accès refusé, administrateur requis" });
      }
    }


    async delete(req, res, next) {
    if(req.user.role === "admin" ){
        try {
          const id = req.params.id;
          await articlesService.delete(id);
          req.io.emit("article:delete", { id });
          res.status(204).send();
        } catch (err) {
          next(err);
        }
      } else {
        res.status(403).json({ message: "Accès refusé, administrateur requis" });
      }
    }
}

module.exports = new ArticlesController()