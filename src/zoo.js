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
const { employees, animals, prices, hours } = require('./data');


function animalsByIds(...ids) {
  // seu código aqui
  /* Implemente a função animalsByIds:
Caso receba nenhum parâmetro, necessário retornar um array vazio
Ao receber como parâmetro um único id, retorna os animais com este id
Ao receber mais de um id, retorna os animais que têm um desses ids*/

  if (ids.length === 0) return [];

  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const filteredAnimalByName = animals.filter(currentAnimal => currentAnimal.name === animal);

  return filteredAnimalByName[0].residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (typeof employeeName === 'undefined') return {};

  return employees.find(currentEmployee =>
    currentEmployee.firstName === employeeName || currentEmployee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  // seu código aqui
  const manager = employees.find(currentEmployee => currentEmployee.managers.includes(id));
  return typeof manager !== 'undefined';
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const namesSpecies = {};
    animals.forEach((animal) => {
      namesSpecies[animal.name] = animal.residents.length;
    });

    return namesSpecies;
  }
  const findAnimal = animals.find(animal => animal.name === species);
  return findAnimal.residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || entrants === {}) return 0;

  const keys = Object.keys(entrants);
  let count = 0;
  keys.forEach((age) => {
    count += entrants[age] * prices[age];
  });

  return count;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
  const result = {};
  Object.keys(hours).forEach(function (hour) {
    if (hours[hour].open === hours[hour].close) {
      result[hour] = 'CLOSED';
    } else {
      result[hour] = `Open from ${hours[hour].open}am until ${hours[hour].close - 12}pm`;
    }
  });
  if (dayName !== undefined) {
    return { [dayName]: result[dayName] };
  }
  return result;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const findItem = employees.find(func => func.id === id);
  const findSpecie = animals.find(animal => animal.id === findItem.responsibleFor[0]);
  let result = [];
  let mostOlderAnimal = 0;
  findSpecie.residents.forEach((resident) => {
    if (resident.age > mostOlderAnimal) {
      mostOlderAnimal = resident.age;
      result = [resident.name, resident.sex, resident.age];
    }
  });
  return result;
}

function increasePrices(percentage) {
  // seu código aqui
  Object.keys(prices).map(
    key => (prices[key] = Math.round(prices[key] * ((percentage / 100) + 1) * 100) / 100),
  );
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
