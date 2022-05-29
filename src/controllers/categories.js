import db from '../database/database.js';

export async function GetCategoriesController(req, res) {

    try {

        const CategoryList = await db.query("SELECT * FROM categories");
        res.send(CategoryList.rows);

    } catch (err) { return res.status(500).send('Error accessing database during GetCategoriesController.'); }
}

export async function PostCategoriesController(req, res) {

    try {

        const { name } = req.body;

        const ValidateCategory = await db.query("SELECT * FROM categories WHERE name = $1", [name]);
        if (ValidateCategory.rows.length > 0) return res.status(409).send('Category name already exists.');

        await db.query('INSERT INTO categories (name) VALUES ($1);', [name]);
        res.sendStatus(201);

    } catch (err) { return res.status(500).send('Error accessing database during PostCategoriesController.'); }
}