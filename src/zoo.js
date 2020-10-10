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
  const {
    animals,
  } = data;

  return ids.map(id => animals.find(animal => animal.id === id));
}


function animalsOlderThan(animal, age) {
  const {
    animals,
  } = data;

  const animalSpecie = animals.find(species => species.name === animal);

  return animalSpecie.residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  const {
    employees,
  } = data;
  if (!employeeName) return {};

  return employees.find(emp => emp.firstName === employeeName || emp.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign({}, personalInfo, associatedWith);
}

function isManager(id) {
  const {
    employees,
  } = data;
  return employees.some(manager => manager.managers.some(mana => mana === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const {
    employees,
  } = data;
  const newEmployer = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployer);

  return employees;
}

function animalCount(species) {
  if (species) return (data.animals.find(item => item.name === species)).residents.length;

  let exitObj = {};
  data.animals.forEach((animal) => {
    const obj = {};
    obj[animal.name] = animal.residents.length;
    exitObj = Object.assign(exitObj, obj);
  });

  return exitObj;
}

function entryCalculator(entrants) {
  const {
    prices,
  } = data;

  if (!entrants || Object.keys(entrants).length === 0) return 0;

  let exit = 0;
  const keys = Object.keys(entrants);

  for (let i = 0; i < keys.length; i += 1) {
    exit += entrants[keys[i]] * prices[keys[i]];
  }

  return exit;
}

function animalMap(options) {
  // seu código aqui
}

function checkSpindleUS(hour) {
  if (hour > 12) return hour - 12;
  return hour;
}

function schedule(dayName) {
  const {
    hours,
  } = data;
  const obj = {};

  if (dayName) {
    if (dayName === 'Monday') {
      obj[dayName] = 'CLOSED';
    } else {
      obj[dayName] = `Open from ${hours[dayName].open}am until ${checkSpindleUS(hours[dayName].close)}pm`;
    }
    return obj;
  }

  Object.keys(hours).forEach((day) => {
    if (day === 'Monday') {
      obj[day] = 'CLOSED';
    } else {
      const hour = hours[day].close;
      obj[day] = `Open from ${hours[day].open}am until ${checkSpindleUS(hour)}pm`;
    }
  });
  return obj;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

/** FONTE (arredondamento): https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary */
function increasePrices(percentage) {
  const { prices } = data;

  Object.keys(prices).forEach((key) => {
    let newValue = prices[key] * (percentage/100 + 1);
    prices[key] = Math.round(newValue * 100) / 100;
  });
  return prices;
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
