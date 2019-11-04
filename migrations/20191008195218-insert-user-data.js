const userDocuments = [
  {
    name: 'Felipe Fernandes Bastos',
    addresses: [
      {
        cep: '92200470',
        type: 1,
        country: 'Brasil',
        state: 'RS',
        city: 'Canoas',
        address: 'Rua Princesa Isabel',
        number: 1290.0,
        main: true,
      },
    ],
    grade: 4.5,
    wishedWines: [],
    offeredWines: [],
  },
  {
    name: 'Vinicius de Borba',
    addresses: [
      {
        cep: '90010-001',
        type: 1,
        country: 'Brasil',
        state: 'RS',
        city: 'Porto Alegre',
        address: 'Rua Siqueira Campos',
        number: 1184.0,
        main: true,
      },
    ],
    grade: 4.8,
    wishedWines: [],
    offeredWines: [],
  },

];

module.exports = {
  async up(db) {
    await db.collection('users').insertMany(userDocuments);
  },

  down(db) {
    return db.dropCollection('users');
  },
};
