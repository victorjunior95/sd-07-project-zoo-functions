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
  const allByIds = data.animals.filter(({ id: animalId }) => ids.find(id => id === animalId));

  return ids ? allByIds : [];
}

function animalsOlderThan(animal, age) {
  const animalThan = data.animals.find(({ name }) => animal === name);

  const olderNotThan = animalThan.residents.some(resident => resident.age < age);

  return !olderNotThan;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const employeed = data.employees.find(({ firstName, lastName }) => {
    const verified = employeeName === firstName || employeeName === lastName;

    return verified;
  });

  return employeed;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;

  const { managers, responsibleFor } = associatedWith;

  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  const manager = data.employees.some(({ managers }) => {
    const existId = managers.some(idManager => idManager === id);

    return existId;
  });

  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  data.employees.push(newEmployee);
}

function animalCount(species) {
  let animalCurrent = {};

  data.animals.forEach(({ name, residents }) => {
    if (!species) animalCurrent[name] = residents.length;

    if (species === name) animalCurrent = residents.length;
  });

  return animalCurrent;
}

function entryCalculator(entrants) {
  let priceTotal = 0;

  if (entrants && entrants !== {}) {
    const entrantsKey = Object.keys(entrants);
    const entrantsValue = Object.values(entrants);

    entrantsKey.forEach((key, index) => {
      Object.entries(data.prices).forEach(([description, price]) => {
        if (description === key) priceTotal += entrantsValue[index] * price;
      });
    });
  }

  return priceTotal;
}

function animalMap(options) {
  const maped = {};

  data.animals.forEach(({ name, location }) => {
    if (!maped[location]) maped[location] = [name];
    else maped[location].push(name);
  });

  return maped;
}

function schedule(dayName) {
  let scheduled = {};

  Object.entries(data.hours).forEach((day) => {
    scheduled[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
    if (day[1].open === 0 && day[1].close === 0) scheduled[day[0]] = 'CLOSED';
  });

  if (dayName) {
    scheduled = {};
    scheduled[dayName] = `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`;
    if (data.hours[dayName].open === 0) scheduled[dayName] = 'CLOSED';
  }

  return scheduled;
}

function oldestFromFirstSpecies(id) {
  //
}

function increasePrices(percentage) {
  const calc = percentage / 100;

  for (price in data.prices) {
    data.prices[price] = Math.round(
      parseFloat(
        (data.prices[price] + (data.prices[price] * calc)) * 100
      ).toPrecision(4)
    ) / 100;
  }

  return data.prices;
}

function employeeCoverage(idOrName) {
  //
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
