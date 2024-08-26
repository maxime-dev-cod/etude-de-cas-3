const request = require("supertest");
const { app } = require("../server");
const jwt = require("jsonwebtoken");
const config = require("../config");
const mongoose = require("mongoose");
const mockingoose = require("mockingoose");
const Article = require("../api/articles/articles.schema");



describe("tester Articles API", () => {
    let token;
  const ARTICLE_ID = "article_id";
  const USER_ID = "fakeAdminUserId";
  
  
    beforeEach(() => {
      token = jwt.sign({ userId: USER_ID, role: "admin"}, config.secretJwtToken); // On test avec le role admin, sinon échec pour l'update et le delete
      // Mock de l'article existant que nous voulons mettre à jour
      mockingoose(Article).toReturn({
        _id: ARTICLE_ID,
        title: "Original Title",
        content: "Original Content",
    }, "findOne");

    // Mock de la réponse après la mise à jour de l'article
    mockingoose(Article).toReturn({
        _id: ARTICLE_ID,
        title: "Updated Test Article",
        content: "This is an updated test article.",
    }, "findOneAndUpdate");
    });
  
    test("[Articles] Create Article", async () => {
        const newArticle = {
            title: "New Test Article",
            content: "This is a new test article.",
            user: USER_ID, 
          };
      
          const res = await request(app)
            .post("/api/articles/")
            .send(newArticle)
            .set("x-access-token", token); 
          expect(res.status).toBe(201);
          expect(res.body.title).toBe(newArticle.title);
          expect(res.body.content).toBe(newArticle.content);
    });

        test("[Articles] Update Article", async () => {
          const updatedArticle = {
            title: "Updated Test Article",
            content: "This is an updated test article.",
          };
          
          const res = await request(app)
            .put(`/api/articles/${ARTICLE_ID}`)
            .send(updatedArticle)
            .set("x-access-token", token); 
      
          
          expect(res.status).toBe(200);
          expect(res.body.title).toBe(updatedArticle.title);
          expect(res.body.content).toBe(updatedArticle.content);
      });

      test("[Articles] Delete Article", async () => {
        const res = await request(app)
        .delete(`/api/articles/${ARTICLE_ID}`)
        .set("x-access-token", token);
      expect(res.status).toBe(204); 
      });
  
    
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  });
  