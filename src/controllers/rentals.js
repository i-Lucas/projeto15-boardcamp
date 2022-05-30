import db from '../database/database.js';

export async function PostRentalController(req, res) {

    const { customerId, gameId, daysRented } = req.body;
    const rentDate = new Date().toLocaleDateString('pt-br');

    try {

        const ValidateCustomer = await db.query(`SELECT * FROM customers WHERE id = $1`, [customerId]);
        if (ValidateCustomer.rows.length === 0) return res.status(400).send('User not fond');

        const ValidateGame = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId]);
        if (ValidateGame.rows.length === 0) return res.status(400).send('Game not fond');

        const originalPrice = ValidateGame.rows[0].pricePerDay * daysRented;

        const InsertRental = await db.query(`

            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
            VALUES ($1, $2, $3, $4, $5, $6, $7)`, [customerId, gameId, rentDate, daysRented, null, originalPrice, null]);

        if (InsertRental.rowCount === 0) return res.status(400).send('Error on insert new rental');
        res.sendStatus(201);

    } catch (err) { return res.status(500).send('Error accessing database during PostRentalController.'); }
}

export async function GetRentalsController(req, res) {

    const sendResults = [];
    const { customerId: userID } = req.query;

    try {

        const result = await db.query(`

        SELECT rentals.*,

        games.name AS "gameName",
        customers.name AS "customerName",

        games."categoryId",
        categories.name AS "CategoryName"
        
        FROM rentals

        JOIN games ON rentals."gameId" = games.id
        JOIN customers ON rentals."customerId" = customers.id
        JOIN categories ON games."categoryId" = categories.id
        
    `);

        for (let i of result.rows) {

            sendResults.push({

                id: i.id,
                customerId: i.customerId,
                gameId: i.gameId,
                rentDate: i.rentDate,
                daysRented: i.daysRented,
                returnDate: i.returnDate,
                originalPrice: i.originalPrice,
                delayFee: i.delayFee,

                customer: {

                    id: i.customerId,
                    name: i.customerName
                },

                game: {

                    id: i.gameId,
                    name: i.gameName,
                    categoryId: i.categoryId,
                    categoryName: i.CategoryName
                }
            });
        }

        if (userID) {

            const userRentals = sendResults.filter(rental => rental.customerId == userID);
            return res.send(userRentals);
        }

        res.send(sendResults);

    } catch (err) { return res.status(500).send('Error accessing database during GetRentalsController.'); }
}

export async function FinalizeRentController(req, res) {

    const { id } = req.params;
    const returnDate = new Date().toLocaleDateString('pt-br');

    try {

        const GetThisRental = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);

        if (GetThisRental.rows.length === 0) return res.status(400).send('Rental not found');
        if (GetThisRental.rows[0].returnDate) return res.status(400).send('Rental already returned');

        await db.query('UPDATE rentals SET "returnDate" = $1 WHERE id = $2', [returnDate, id]);

        const daysRented = GetThisRental.rows[0].daysRented;
        const originalPrice = GetThisRental.rows[0].originalPrice;

        const dayOfWeek = new Date().toLocaleDateString('pt-br').split('/')[0];
        const rentDateDay = new Date(GetThisRental.rows[0].rentDate).toLocaleDateString('pt-br').split('/')[0];

        const delayFee = undefined;
        dayOfWeek > rentDateDay ? delayFee = daysRented * originalPrice : 0;

        await db.query('UPDATE rentals SET "delayFee" = $1 WHERE id = $2', [delayFee, id]);
        res.sendStatus(200);

    } catch (err) { return res.status(500).send('Error accessing database during FinalizeRentController.'); }
}

export async function DeleteRentalController(req, res) {

    const { id } = req.params;

    try {

        const GetThisRental = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);

        if (GetThisRental.rows.length === 0) return res.status(404).send('Rental not found');
        if (GetThisRental.rows[0].returnDate === null) return res.status(400).send('This lease has not been finalized yet');

        await db.query('DELETE FROM rentals WHERE id = $1', [id]);
        res.sendStatus(200);

    } catch (err) { return res.status(500).send('Error accessing database during DeleteRentalController.'); }
}