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
  return data.animals
    .filter(animal => ids
    .some(id => id === animal.id,
  ));
}

function animalsOlderThan(animal, age) {
  return data.animals.some(specie => specie.name === animal &&
    specie.residents.every(resident => resident.age >= age,
  ));
}

function employeeByName(employeeName) {
  return employeeName === undefined ? {} :
  data.employees.find(employee =>
    employee.firstName === employeeName ||
    employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return data.employees.some(employee =>
    employee.managers.find(manager => manager === id,
  ));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function getAllAnimalNamesAndQuantity() {
  return data.animals.reduce((acc, current) => {
    acc[current.name] = current.residents.length;
    return acc;
  }, {});
}

function animalCount(species) {
  if (species === undefined) {
    return getAllAnimalNamesAndQuantity();
  }
  return data.animals.find(animal =>
    animal.name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  const price = Object.keys(entrants)
  .map(lifestage => data.prices[lifestage]);
  const parametersValues = Object.values(entrants);

  return price.reduce((acc, currentValue, index) => {
    acc += currentValue * parametersValues[index];
    return acc;
  }, 0);
}

function animalMap(options) {

}

function schedule(dayName) {

}

function oldestFromFirstSpecies(id) {

}

function increasePrices(percentage) {
  const keys = Object.keys(data.prices);
  const newValues = Object.values(data.prices)
    .map(price => ((price * 100) + Math.round(price * percentage)) / 100);

  data.prices = keys.reduce((acc, currentValue, index) => {
    acc[currentValue] = newValues[index];
    return acc;
  }, {});
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
