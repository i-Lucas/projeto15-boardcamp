import db from '../database/database.js';

export async function GetCategoriesController(req, res) {

    try {
        
        const result = await db.query("SELECT * FROM categories");
        res.send(result.rows);

    } catch (err) { return res.status(500).send('Error accessing database during GetCategoriesController.'); }
}

export async function PostCategoriesController(req, res) {

    try {

        const { name } = req.body;
        await db.query('INSERT INTO categories (name) VALUES ($1);', [name]);
        res.sendStatus(201);

    } catch (err) { return res.status(500).send('Error accessing database during PostCategoriesController.'); }
}