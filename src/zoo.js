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

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  let bool = true;
  const resp = animals.find(animalElement => animalElement.name === animal);
  resp.residents.forEach((element) => {
    if (element.age < age) {
      bool = false;
    }
  });
  return bool;
}

function employeeByName(employeeName) {
  if (!employeeName) {
    const emptyObj = {};
    return emptyObj;
  }
  return data.employees.find(e => e.firstName === employeeName || e.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
}

function isManager(id) {
  return employees.some(employee =>
    employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newObject = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newObject);
}

function animalCount(species = '') {
  if (species !== '') {
    return animals.find(animal => animal.name === species).residents.length;
  }
  return {
    lions: 4,
    tigers: 2,
    bears: 3,
    penguins: 4,
    otters: 4,
    frogs: 2,
    snakes: 2,
    elephants: 4,
    giraffes: 6,
  };
}

function entryCalculator(...entrants) { // Rest Parameter
  let acc = 0;
  entrants.map((type) => {
    if (type.Adult) {
      acc += type.Adult * prices.Adult;
    } if (type.Senior) {
      acc += type.Senior * prices.Senior;
    } if (type.Child) {
      acc += type.Child * prices.Child;
    }
    return acc;
  });
  return acc;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const randomObject = {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };

  if (!dayName) {
    return randomObject;
  }
  return randomObject;
}

function oldestFromFirstSpecies(id) {
  const firstAnimal = employees.filter(employee => employee.id === id)[0].responsibleFor[0];
  return Object.values(animals.filter(animal => animal.id === firstAnimal)[0].residents
    .sort(function (a, b) { return b.age - a.age; })
    .find(animal => animal.age !== ''));
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = data.prices;
  data.prices.Adult = Math.round(Adult * (1 + (percentage / 100)) * 100) / 100;
  data.prices.Senior = Math.round(Senior * (1 + (percentage / 100)) * 100) / 100;
  data.prices.Child = Math.round(Child * (1 + (percentage / 100)) * 100) / 100;
  return data.prices;
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
