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
  return ids.map(id => data.animals.find(animal => animal.id === id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(species => species.name === animal).residents.every(i => i.age >= age);
}

function employeeByName(emp) {
  if (!emp) return {};
  return data.employees.find(({ firstName, lastName }) => firstName === emp || lastName === emp);
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some(sereal => sereal.managers.includes(id));
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

function animalCount(species) {
  if (!species) {
    const geral = {};
    data.animals.forEach(({ name, residents }) => {
      geral[name] = residents.length;
    });
    return geral;
  }

  const escolido = data.animals.find(({ name }) => name === species);
  const { residents } = escolido;
  return residents.length;
}

function entryCalculator(entrants) {
  const { prices } = data;
  if (!entrants || entrants === {}) return 0;

  return Object.entries(entrants).reduce((rest, now) => rest + (prices[now[0]] * now[1]), 0);
}

function animalMap(options) {
  // seu cod...
}

const daysList = (dayName) => {
  if (dayName === 'Monday') return 'CLOSED';
  return `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
};

function schedule(dayName) {
  const days = {};
  if (!dayName) {
    Object.keys(data.hours).forEach((key) => {
      days[key] = daysList(key);
    });
  } else {
    days[dayName] = daysList(dayName);
  }
  return days;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const value = Object.keys(data.prices);
  value.forEach((price) => {
    const ajustment = Math.round((data.prices[price] * (1 + (percentage / 100))) * 100) / 100;
    data.prices[price] = ajustment;
  });
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
