const { animals, employees, prices } = require('./data');
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

function animalsByIds(ids, ...rest) {
  // seu código aqui
  const selectedAnimals = animals.filter((animal = []) => animal.id === ids
  || animal.id === rest[0]);
  return selectedAnimals;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const selected = animals.filter(species => species.name === animal);
  const result = selected[0].residents.every(iterator => iterator.age >= age);
  return result;
}

function employeeByName(employeeName) {
  // seu código aqui
  let result = employees.find(employ => employ.firstName === employeeName
  || employ.lastName === employeeName);
  if (result === undefined) {
    result = {};
  }
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  // seu código aqui
  const result = data.employees.map(iterator => iterator.managers.some(element => element === id));
  return result.includes(true);
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  // seu código aqui
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species = '') {
  // seu código aqui
  if (species === ' ') {
    const result = {};
    animals.forEach((animal) => {
      result[animal.name] = animal.residents.length;
      return result;
    });
    return result;
  }
  const dataAnimal = animals.find(animal => animal.name === species);
  return dataAnimal.residents.length;
}

function entryCalculator(...entrants) {
  // seu código aqui
  if (entrants.length === 0) {
    return 0;
  }
  const input = Object.entries(entrants[0]);
  if (input.length === 0) {
    return 0;
  }
  let result = 0;
  entrants.forEach(entries => Object.keys(entries)
  .forEach((item) => {
    result += prices[item] * entries[item];
  }));
  return result;
}

function animalMap(options = {}) {
  // seu código aqui
  const { includeNames = false, sorted = false, sex = false } = options;
      const allAnimals = {};
  animals.forEach((specie) => {
    if (!Object.hasOwnProperty.call(allAnimals, specie.location)) {
      Object.assign(allAnimals, { [specie.location]: [] });
    }
    if (!includeNames) {
    allAnimals[specie.location].push(specie.name);
  } else {
    const animalResidents = specie.residents.filter(animal => (animal.sex === sex) || (!sex));
    const names = animalResidents.map(currrent => currrent.name);
    if (sorted) {
      names.sort();
    }
    const animalsLocation = { [specie.name]: names };
    allAnimals[specie.location].push(animalsLocation);
  }
  });
  return allAnimals;
}

function schedule(dayName) {
  // seu código aqui
}

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
