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

/* const { animals } = require('./data'); */
const data = require('./data');

function animalsByIds(...ids) {
  const animalsArray = [];

  if (ids !== undefined) {
    return ids.map(selectedId => data.animals.find(animalId => animalId.id === selectedId));
  }

  return animalsArray;
}

function animalsOlderThan(animal, age) {
  const animalSpecie = data.animals.filter(species => species.name === animal);

  const specieOlderThan = animalSpecie[0].residents.every(item => item.age >= age);

  return specieOlderThan;
}

function employeeByName(employeeName) {
  const newEmployeeObject = {};

  const getEmployee = data.employees.find(name => name.firstName === employeeName ||
  name.lastName === employeeName);

  return employeeName == null ? newEmployeeObject : getEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;

  const { managers, responsibleFor } = associatedWith;

  const createNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  return createNewEmployee;
}

function isManager(id) {
  return data.employees.some(manager => manager.managers.find(theId => theId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const createNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  const actualEmployees = data.employees.push(createNewEmployee);

  return actualEmployees;
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((accumulator, nextAnimals) => {
      accumulator[nextAnimals.name] = nextAnimals.residents.length;
      return accumulator; /* Pedir explicação aqui */
    }, {});
  }
  return data.animals.find(animalSpecie => animalSpecie.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;

  return ((Adult * data.prices.Adult) +
  (Child * data.prices.Child) +
  (Senior * data.prices.Senior));
}

function animalMap(options) {
}

function schedule(dayName) {
  /* let scheduleWeek = {}; */
}

function oldestFromFirstSpecies(id) {
  const animalIds = data.employees.find(employeeId => employeeId.id === id).responsibleFor;

  const animalsData = data.animals.find(animalId => animalId.id === animalIds[0]);

  return Object.values(animalsData.residents.reduce((a, b) => (a.age > b.age ? a : b)));
}

function increasePrices(percentage) {
  const factor = ((percentage / 100) + 1);

  const ticketValue = data.prices;

  ticketValue.Adult = (Math.round(data.prices.Adult * factor * 100) / 100);
  ticketValue.Child = (Math.round(data.prices.Child * factor * 100) / 100);
  ticketValue.Senior = (Math.round(data.prices.Senior * factor * 100) / 100);

  return ticketValue;
}

function employeeCoverage(idOrName) {

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
