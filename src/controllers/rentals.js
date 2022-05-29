export async function GetRentalsController(req, res) {

    console.log('GetRentalsController');

    try {

        // lista com todos os aluguéis, contendo o customer e o game do aluguel em questão em cada aluguel



        res.sendStatus(200);

    } catch (err) { return res.status(500).send('Error accessing database during GetRentalsController.'); }
}

/*
[
  {
    id: 1,
    customerId: 1,
    gameId: 1,
    rentDate: '2021-06-20',
    daysRented: 3,
    returnDate: null, // troca pra uma data quando já devolvido
    originalPrice: 4500,
    delayFee: null,
    customer: {
     id: 1,
     name: 'João Alfredo'
    },
    game: {
      id: 1,
      name: 'Banco Imobiliário',
      categoryId: 1,
      categoryName: 'Estratégia'
    }
  }
]
*/