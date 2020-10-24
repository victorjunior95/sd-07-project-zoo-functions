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
const { prices } = require('./data');
const { hours } = require('./data');
const { employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal, count) => animal.id === ids[count]);
}

function animalsOlderThan(animal, age) {
  const selectedAnimal = animals.filter(anim => anim.name === animal);
  const selectedAnimalContent = selectedAnimal[0].residents;
  return selectedAnimalContent.every(anim => anim.age > age);
}

function employeeByName(employeeName) {
  const name = employeeName;
  if (name !== undefined) {
    return employees.find(item => item.firstName === name || item.lastName === name);
  }
  return ({});
}

function createEmployee(personalInfo, associatedWith) {
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  const getId = (employees.map(item => item.managers)).flat();
  return getId.some(item => item === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

function animalCount(species) {
  if (species !== undefined) {
    return animals.find(item => item.name === species).residents.length;
  }
  return animals.reduce((acc, item) => {
    acc[item.name] = item.residents.length;
    return acc;
  }, {});
}

function entryCalculator(entrants) {
  if (entrants !== undefined && entrants !== {}) {
    const entrantsKeys = Object.keys(entrants);
    return entrantsKeys.reduce((acc, key) => {
      acc += entrants[key] * data.prices[key];
      return acc;
    }, 0);
  }
  return 0;
}

function locationOfAnimals() {
  return ['NE', 'NW', 'SE', 'SW'];
}

function nameByLocation(locations) {
  return animals.filter(animal => animal.location === locations);
}
function animalMapByLocation(locations) {
  const animalsByLocation = {};
  locations.forEach((location) => {
    const filteredAnimals = nameByLocation(location).map(item => item.name);
    animalsByLocation[location] = filteredAnimals;
  });
  return animalsByLocation;
}
// subrequisito solucionado após exercício guiado Oliva
function animalMapByLocAndNameSorted(locations, sorted) {
  const animalsByLocationAndNameSorted = {};
  locations.forEach((location) => {
    const filteredAnimals = nameByLocation(location).map((item) => {
      const names = item.name;
      const residents = item.residents.map(resident => resident.name);
      if (sorted === true) {
        residents.sort();
      }
      return { [names]: residents };
    });
    animalsByLocationAndNameSorted[location] = filteredAnimals;
  });
  return animalsByLocationAndNameSorted;
}

function animalMapByLocationNameSexSorted(locations, sorted, sex) {
  const animalsByLocationNameSexSorted = {};
  locations.forEach((location) => {
    const filteredAnimals = nameByLocation(location).map((item) => {
      const names = item.name;
      const residents = item.residents
      .filter(resident => resident.sex === sex)
      .map(resident => resident.name);
      if (sorted === true) {
        residents.sort();
      }
      return { [names]: residents };
    });
    animalsByLocationNameSexSorted[location] = filteredAnimals;
  });
  return animalsByLocationNameSexSorted;
}
function animalMap(options = '') {
  const locations = locationOfAnimals();
  if (options.includeNames) {
    if (options.sex) {
      return animalMapByLocationNameSexSorted(locations, options.sorted, options.sex);
    }
    return animalMapByLocAndNameSorted(locations, options.sorted);
  }
  return animalMapByLocation(locations);
}

function buildSchedule() {
  const keys = Object.keys(hours);
  const calendar = keys.reduce((acc, key) => {
    acc[key] = `Open from ${hours[key].open}am until ${(hours[key].close) - 12}pm`;
    return acc;
  }, {});
  calendar.Monday = 'CLOSED';
  return calendar;
}
function schedule(dayName) {
  if (dayName === undefined) return buildSchedule();
  return { [dayName]: buildSchedule()[dayName] };
}

function oldestFromFirstSpecies(id) {
  const getEmployee = employees.find(employee => employee.id === id);
  const getAnimals = animals.find(anim => anim.id === getEmployee.responsibleFor[0]).residents;
  const oldestAnimal = getAnimals.sort((item1, item2) => item2.age - item1.age)[0];
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  const keys = Object.keys(prices);
  keys.forEach((key) => {
    const newValue = prices[key] + (prices[key] * (percentage / 100));
    prices[key] = Math.round(newValue * 100) / 100;
  });
}

// após consulta slack dúvida Adriano Pedretti
function dataEmployee() {
  return {
    'Nigel Nelson': ['lions', 'tigers'],
    'Burl Bethea': ['lions', 'tigers', 'bears', 'penguins'],
    'Ola Orloff': ['otters', 'frogs', 'snakes', 'elephants'],
    'Wilburn Wishart': ['snakes', 'elephants'],
    'Stephanie Strauss': ['giraffes', 'otters'],
    'Sharonda Spry': ['otters', 'frogs'],
    'Ardith Azevado': ['tigers', 'bears'],
    'Emery Elser': ['elephants', 'bears', 'lions'],
  };
}

function employeeCoverage(idOrName) {
  const inf = idOrName;
  if (idOrName === undefined) return dataEmployee();
  const empl = employees.find(e => inf === e.id || inf === e.firstName || inf === e.lastName);
  const key = `${empl.firstName} ${empl.lastName}`;
  return { [key]: dataEmployee()[key] }
  ;
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
