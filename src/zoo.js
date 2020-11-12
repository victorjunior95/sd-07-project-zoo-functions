/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');
// data é um {objeto de 4 chaves - animals: é um [array de {9 objects}], employees: [{8 objects}], hours:{object de 7 chaves}, prices: {object de 3 chaves}}
//data = {
//   animals: [
//    {9 especies, 5 chaves}
//   ], 
//   employees: [
//    {8 objects, 5 chaves}
//   ], 
//   hours:{7 chaves}, 
//   prices: {3 chaves}
// }

// let arrayOfIds = [];
// const animalsById = data.animals.forEach( animal => { console.log(Object.values(animal)) }); // array de 5(id de cada animal em string)

// console.log(animalsData); 

// console.log(typeof animalsData);
const {animals, employees, prices, hours} = data; // object destructuring
// console.log(animals); // retorna um array com os objetos

function animalsByIds(...ids) {
  const listAnimals = [];
  ids.forEach((id) => listAnimals.push(animals.filter(animal => animal.id === id)))
  return listAnimals;

  // const animalsData = Object.values(data.animals);
  // return animalsData.filter( animal => animal.id === ids)
  // // 1. retornar array vazio
  // 2. recuperar a especie, em array, especificada no parâmetro (id)
  // 3. msm q o '2.', mas em caso de mais de um id
  /* forEach */ 
}
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));

function animalsOlderThan(animal, age) {
  // seu código aqui
}

function employeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
