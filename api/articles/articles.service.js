const Article = require('./articles.schema')

class ArticleService {
    create(data, user) {
        data.user = user._id;
        const article = new Article(data);
        return article.save();
    }

    update(id, data) {
        return Article.findByIdAndUpdate(id, data, { new: true });
    }

    delete(id) {
        return Article.findByIdAndDelete({ _id: id });
    }

    getArticlesByUser(userId) {
        // Récupérer les articles associés à l'utilisateur et exclure les mots de passe
        const articles = Article.find({ user: userId })
            .populate({
                path: 'user',
                select: '-password' // Exclure le mot de passe des résultats
            })
            .exec();
        return articles;
    }
}

module.exports = new ArticleService();