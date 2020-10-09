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

const { animals, employees } = require('./data');
const data = require('./data');

//------------------------------------------------------------------------------------

function animalsByIds(...ids) {
  const array = [];
  ids.forEach(id => array.push(animals.find(element => element.id === id)));
  return array;
}

//------------------------------------------------------------------------------------

function animalsOlderThan(animal, age) {
  const array = animals.find(element => element.name === animal);
  return array.residents.every(element => element.age > age);
}

//------------------------------------------------------------------------------------

function employeeByName(employeeName) {
  let obj = {};
  if (employeeName !== undefined) {
    obj = employees.find(
      element =>
        element.firstName === employeeName || element.lastName === employeeName,
    );
  }
  return obj;
}

//------------------------------------------------------------------------------------

function createEmployee(
  { id, firstName, lastName },
  { managers, responsibleFor },
) {
  const obj = {};
  obj.id = id;
  obj.firstName = firstName;
  obj.lastName = lastName;
  obj.managers = managers;
  obj.responsibleFor = responsibleFor;
  return obj;
}

//------------------------------------------------------------------------------------

function isManager(id) {
  const array = [];
  employees.map(element =>
    element.managers.forEach(element2 => array.push(element2)),
  );

  return array.some(element => element === id);
}

//------------------------------------------------------------------------------------

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const obj = {};
  obj.id = id;
  obj.firstName = firstName;
  obj.lastName = lastName;
  obj.managers = managers;
  obj.responsibleFor = responsibleFor;
  employees.push(obj);
}

//------------------------------------------------------------------------------------

function animalCount(species) {
  if (species === undefined) {
    const obj = {};
    animals.forEach(element => (obj[element.name] = element.residents.length));
    return obj;
  } else {
    let obj = {};
    obj = animals.find(element => element.name === species);
    return obj.residents.length;
  }
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
