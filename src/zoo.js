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

const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return ids.map(id => animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const animalsAge = animals.find(zooAnimal => zooAnimal.name === animal);
  return animalsAge.residents.every(ages => ages.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(n => n.firstName === employeeName || n.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign(personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  return data.employees.some(element => element.managers.some(director => director === id));
}

function manager(managers) {
  if (managers === undefined) return [];
  return managers;
}

function responsible(responsibleFor) {
  if (responsibleFor === undefined) return [];
  return responsibleFor;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const manager2 = manager(managers);
  const responsible2 = responsible(responsibleFor);
  const employee =
    {
      id,
      firstName,
      lastName,
      managers: manager2,
      responsibleFor: responsible2,
    };
  data.employees.push(employee);
}

function animalCount(species) {
  if (species === undefined) {
    const animalsInZoo = {}; 
    data.animals.map(element => (
      animalsInZoo[element.name] = element.residents.length));
    return animalsInZoo;
  }
  else  {
    const animalsInZoo = data.animals.find(animal => animal.name === species);
    return animalsInZoo.residents.length;
  }
}
console.log(animalCount());

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  let sum = 0;
  sum = (data.prices.Adult*entrants.Adult + data.prices.Child*entrants.Child + data.prices.Senior*entrants.Senior);
  return sum;
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
