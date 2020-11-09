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
  if (!ids) return [];
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(it => it.name === animal).residents.every(el => el.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const emp = data.employees.find(e => e.firstName === employeeName || e.lastName === employeeName);
  return emp;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    return data.animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) return 0;
  return Object.keys(entrants).reduce((ac, cur) => ac + (entrants[cur] * data.prices[cur]), 0);
}

// function retrieveAvailableLocations() {
//   return ['NE', 'E', 'NW', 'SW', 'SE'];
// }

// function retrieveAnimalsPerLocation(locations) {
  // const animalsPerLocation = {};

  // locations.forEach((location) => {
  //   const filteredAnimals = animals
  //   .filter((animal) => animal.location === location ).map((animal) => animal.name);
  //   console.log(`Localização: ${location}`);
  //   console.log(filteredAnimals);
  // });
// }

function animalMap(options) {
  // const locations = retrieveAvailableLocations();

  // if (!options)
  //   return retrieveAnimalsPerLocation(locations);
}

function schedule(dayName) {
  const open = Object.assign({}, data.hours);
  Object.keys(open).forEach((key) => {
    const init = open[key].init;
    const end = open[key].end;

    if (init === 0 || end === 0) open[key] = 'CLOSED';
    else open[key] = `Doors openen from ${init}am to ${end - 12}pm`;
  });
  if (!dayName) return open;

  return {
    [dayName]: open[dayName],
  };
}

function oldestFromFirstSpecies(id) {
  const firstAnimal = data.employees.find(emp => emp.id === id).responsibleFor[0];
  const animals = data.animals.find(animal => animal.id === firstAnimal).residents;
  const oldest = animals.reduce((acc, curr) => (acc.age > curr.age ? acc : curr), []);

  return Object.values(oldest);
}

function increasePrices(percentage) {
  data.prices.Adult = (data.prices.Adult * (0.99 + (percentage / 100))).toFixed(2);
  data.prices.Senior = (data.prices.Senior * (0.99 + (percentage / 100))).toFixed(2);
  data.prices.Child = (data.prices.Child * (0.99 + (percentage / 100))).toFixed(2);
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
