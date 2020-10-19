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

function animalsByIds(...ids) {
  return data.animals.filter(animal => ids.includes(animal.id));
}
// const objectAnimal = data.animals.filter(animal => animal.name === 'lions');
// console.log(objectAnimal);
// const arrayResidents = objectAnimal[0].residents;
// console.log(arrayResidents);
// const arrayAges = arrayResidents.map(animal => animal.age);

// const arrayAges = objectAnimal[0].residents.map(animal => animal.age);
// console.log(arrayAges);
// console.log(objectAnimal[0].residents.map(animal => animal.age).every(age => age >= 10));

function animalsOlderThan(animal, age) {
  const objectAnimal = data.animals.filter(species => species.name === animal);
  const arrayAges = objectAnimal[0].residents.map(speciesAge => speciesAge.age);
  return arrayAges.every(animalAge => animalAge >= age);
}
// console.log(animalsOlderThan('otters', 7));
// console.log(employee);

function employeeByName(employeeName) {
  const employee = data.employees.find(
    name => name.firstName === employeeName || name.lastName === employeeName);
  if (typeof employee === 'object') return employee;
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

// const manager = data.employees.map(employee => employee.managers);
// console.log(manager);
// const result = manager.flat(Infinity);
// console.log(result);
// const isMng = result.some(id => id === '0e7b460e-acf4-4e17-bcb3-ee472265db83');
// console.log(isMng);
// const result = manager.forEach(element => {
//   return element.some(id => id === '0e7b460e-acf4-4e17-bcb3-ee472265db83')
// });


// let arrayManagers = [];
// const ids = [...manager];
// console.log(ids);
// console.log(manager.some(idManager => idManager === '0e7b460e-acf4-4e17-bcb3-ee472265db83'));

// console.log(idsManagers);
function isManager(id) {
  const managers = data.employees.map(employee => employee.managers);
  const arrayManagers = managers.flat(Infinity);

  return arrayManagers.some(idMng => idMng === id);
}

function addEmployee(id1, firstName1, lastName1, managers1, responsibleFor1) {
  if (managers1 === undefined) managers1 = [];
  if (responsibleFor1 === undefined) responsibleFor1 = [];
  const newEmployee = {
    id: id1,
    firstName: firstName1,
    lastName: lastName1,
    managers: managers1,
    responsibleFor: responsibleFor1,
  };

  return data.employees.push(newEmployee);
}

// const allAnimals = data.animals.map(animal => animal.name);
// console.log(allAnimals);
// const numberAnimals = data.animals.map(animal => animal.popularity);
// console.log(numberAnimals);
// let objAnimals = {};
// const object = allAnimals.reduce((animal, currentAnimal, index) => {animal, currentAnimal}, {});
// console.log(object);
function animalCount(species) {
  // if (species === null) {
  //   const allAnimals = data.animals.map(animal => animal.name);
  // }
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}
// const expected = {
//   'Tuesday': 'Open from 8am until 6pm',
//   'Wednesday': 'Open from 8am until 6pm',
//   'Thursday': 'Open from 10am until 8pm',
//   'Friday': 'Open from 10am until 8pm',
//   'Saturday': 'Open from 8am until 10pm',
//   'Sunday': 'Open from 8am until 8pm',
//   'Monday': 'CLOSED'
// };
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
