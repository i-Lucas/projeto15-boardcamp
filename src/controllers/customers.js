import db from '../database/database.js';

export async function GetCustomersController(req, res) {

    const { cpf } = req.query;
    const { id } = req.params;

    let { offset, limit } = req.query;
    if (!offset) offset = 0;
    if (!limit) limit = 10;

    try {

        if (offset !== 0 || limit !== 10) {

            const sendResults = [];
            const categories = await db.query(`SELECT * FROM customers ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`);
            categories.rows.forEach(category => sendResults.push(category));
            return res.send(sendResults);
        }

        if (id) {

            const GetCustomersFromId = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);
            if (GetCustomersFromId.rows.length === 0) return res.status(400).send('User not fond');
            return res.status(200).send(GetCustomersFromId.rows[0]);
        }

        if (cpf) {

            const GetCustomersFromCPF = await db.query(`SELECT * FROM customers WHERE cpf LIKE '${cpf}%'`);
            return res.status(200).send(GetCustomersFromCPF.rows);
        }

        const CustomersList = await db.query("SELECT * FROM customers");
        return res.send(CustomersList.rows);

    } catch (err) { return res.status(500).send('Error accessing database during GetCustomersController.'); }
}

export async function PostCustomersController(req, res) {

    const { name, phone, cpf, birthday } = req.body;

    try {

        const ValidateCPF = await db.query("SELECT * FROM customers WHERE cpf = $1", [cpf]);
        if (ValidateCPF.rows.length > 0) return res.status(409).send('User CPF already exists.');

        const ValidateBirthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!ValidateBirthdayRegex.test(birthday)) return res.status(400).send('Invalid birthday format.\n\nFormat: DD/MM/YYYY');

        await db.query('INSERT INTO customers (name, phone, "cpf", "birthday") VALUES ($1, $2, $3, $4);', [name, phone, cpf, birthday]);
        return res.sendStatus(201);

    } catch (err) { return res.status(500).send('Error accessing database during PostCustomersController.'); }
}

export async function PutCustomersController(req, res) {

    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    const uid = id.replace(/\s/g, '');
    if (!uid) return res.status(400).send('Empty user ID.');

    if (!Number.isInteger(Number(uid))) return res.status(400).send('Invalid user ID.');

    try {

        const ValidateCustomer = await db.query("SELECT * FROM customers WHERE id = $1", [uid]);
        if (ValidateCustomer.rows.length === 0) return res.status(404).send('User not found.');

        const ValidateCPF = await db.query("SELECT * FROM customers WHERE cpf = $1", [cpf]);

        if (ValidateCustomer.rows[0].cpf !== cpf) {
            if (ValidateCPF.rows.length > 0) return res.status(409).send('User CPF already exists.');
        }

        await db.query('UPDATE customers SET name = $1, phone = $2, cpf = $3, "birthday" = $4 WHERE id = $5;', [name, phone, cpf, birthday, uid]);
        res.sendStatus(200);

    } catch (err) { return res.status(500).send('Error accessing database during PutCustomersController.'); }
}