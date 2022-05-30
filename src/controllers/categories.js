import db from '../database/database.js';

export async function GetCategoriesController(req, res) {

    let { offset, limit } = req.query;

    if (!offset) offset = 0;
    if (!limit) limit = 10;

    try {

        if (offset !== 0 || limit !== 10) {

            const sendResults = [];
            const categories = await db.query(`SELECT * FROM categories ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`);
            categories.rows.forEach(category => sendResults.push(category));
            return res.send(sendResults);
        }

        const CategoryList = await db.query("SELECT * FROM categories");
        return res.send(CategoryList.rows);

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