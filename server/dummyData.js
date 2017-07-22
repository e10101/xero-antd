const People = require('./models/people');

module.exports = () =>
  People.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const list = [
      new People({ name: 'Jim', age: 30, gender: 'male' }),
      new People({ name: 'Jane', age: 55, gender: 'female' }),
      new People({ name: 'Bob', age: 20, gender: 'male' }),
      new People({ name: 'Sally', age: 24, gender: 'female' })
    ];

    People.create(list, (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
