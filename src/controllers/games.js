import db from '../database/database.js';

export async function GetGamesController(req, res) {

    const { name } = req.query;

    try {

        if (name) {

            const GetGamesFromName = await db.query(`SELECT * FROM games WHERE name LIKE '%${name}%'`);
            return res.status(200).send(GetGamesFromName.rows);
        }

        const GamesList = await db.query("SELECT * FROM games");
        return res.status(200).send(GamesList.rows);

    } catch (err) { return res.status(500).send('Error accessing database during GetCategoriesController.'); }
}

export async function PostGamesController(req, res) {

    try {

        const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

        const ValidateName = await db.query("SELECT * FROM games WHERE name = $1", [name]);
        if (ValidateName.rows.length > 0) return res.status(409).send('Game name already exists.');

        const ValidateCategory = await db.query("SELECT * FROM categories WHERE id = $1", [categoryId]);
        if (ValidateCategory.rows.length === 0) return res.status(404).send('Game category does not exist.');

        await db.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);', [name, image, stockTotal, categoryId, pricePerDay]);
        return res.sendStatus(201);

    } catch (err) { return res.status(500).send('Error accessing database during PostCategoriesController.'); }

}