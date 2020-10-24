const { animals } = require('./data');
const { prices } = require('./data');
const { employees } = require('./data');
const { hours } = require('./data');
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
  const arrayAnimal = [];

  if (!ids) {
    return arrayAnimal;
  }

  const animalsId = ids.map(animal => animals.find(element => element.id === animal));

  return animalsId;
}
function animalsOlderThan(animal, age) {
  const specie = animals.find(animalsName => animalsName.name === animal);

  const lifes = specie.residents.every(testAge => testAge.age >= age);

  return lifes;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const names = employees.find(
    name => name.firstName === employeeName || name.lastName === employeeName);
  return names;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  const manager = employees.some(managed => managed.managers.includes(id));
  return manager;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const employeeAdded = { id, firstName, lastName, managers: [], responsibleFor: [] };

  if (id) {
    employeeAdded.id = id;
  }
  if (firstName) {
    employeeAdded.firstName = firstName;
  }
  if (lastName) {
    employeeAdded.lastName = lastName;
  }
  if (managers) {
    employeeAdded.managers = managers;
  }
  if (responsibleFor) {
    employeeAdded.responsibleFor = responsibleFor;
  }

  employees.push(employeeAdded);
}

function animalCount(species) {
  if (!species) {
    const totalNumbers = {};
    animals.forEach(({ name, residents }) => {
      totalNumbers[name] = residents.length;
    });
    return totalNumbers;
  }
  const animalsType = animals.find(({ name }) => name === species);
  const animalsNumbers = animalsType.residents.length;

  return animalsNumbers;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;

  if (entrants === {}) return 0;

  let totalPrice = 0;

  if (entrants.Adult) {
    totalPrice += entrants.Adult * prices.Adult;
  }

  if (entrants.Senior) {
    totalPrice += entrants.Senior * prices.Senior;
  }

  if (entrants.Child) {
    totalPrice += entrants.Child * prices.Child;
  }

  return totalPrice;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const result = {};

  if (!dayName) {
    const days = Object.keys(hours);

    days.forEach((day) => {
      result[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
      if (day === 'Monday') {
        result[day] = 'CLOSED';
      }
    });
    return result;
  }

  if (dayName === 'Monday') {
    result[dayName] = 'CLOSED';
    return result;
  }

  result[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  return result;
}

console.log(schedule('Monday'));

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
