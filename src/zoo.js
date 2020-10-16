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
  return data.animals.filter(animal => ids.some(id => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.some(especie =>
    especie.name === animal && especie.residents.every(resident =>
      resident.age >= age));
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(employer =>
    employer.firstName === employeeName || employer.lastName === employeeName);
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
  return data.employees.some(employer =>
    employer.managers.some(idManager =>
      idManager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const animalCounter = {};
  if (species !== undefined) {
    return data.animals.find(animal => animal.name === species).residents.length;
  }
  data.animals.forEach((animal) => {
    animalCounter[`${animal.name}`] = animal.residents.length;
  });
  return animalCounter;
}

function entryCalculator(entrants = {}) {
  let entryValue = 0;
  if (Object.keys(entrants).length === 0) return entryValue;
  Object.entries(entrants).forEach(([key, value]) => {
    entryValue += value * data.prices[key];
  });
  return entryValue;
}


function animalMap({ includeNames = false, sorted = false, sex = '' } = {}) {
  const animalLocation = {};
  data.animals.forEach((animal) => {
    animalLocation[`${animal.location}`] = [];
  });

  if (includeNames === undefined || includeNames === false) {
    data.animals.forEach(animal => animalLocation[animal.location].push(animal.name));
  } else {
    data.animals.forEach((animal) => {
      let selectedAnimals = [];
      if (sex !== '') {
        selectedAnimals = animal.residents.filter(animalSex =>
          animalSex.sex === sex).map(getName =>
            getName.name);
      } else {
        selectedAnimals = animal.residents.map(getName =>
          getName.name);
      }
      if (sorted === true) {
        selectedAnimals.sort();
      }
      animalLocation[animal.location].push({ [animal.name]: selectedAnimals });
    });
  }
  return animalLocation;
}

function schedule(dayName) {
  let objectValue = {};
  if (dayName === undefined) {
    Object.entries(data.hours).forEach(([key, value]) => {
      if (value.open === 0 && value.close === 0) {
        objectValue[key] = 'CLOSED';
      } else {
        objectValue[key] = `Open from ${value.open}am until ${value.close - 12}pm`;
      }
    });
  } else {
    objectValue = Object.entries(data.hours).find(([key]) =>
      key === dayName).reduce((previousValue, currentValue) => {
        if (currentValue.open === 0 && currentValue.close === 0) {
          return { [previousValue]: 'CLOSED' };
        }
        return { [previousValue]: `Open from ${currentValue.open}am until ${currentValue.close - 12}pm` };
      });
  }
  return objectValue;
}

function oldestFromFirstSpecies(idEmployer) {
  const employer = data.employees.find(({ id }) =>
    id === idEmployer);
  const animal = data.animals.find(({ id }) =>
    id === employer.responsibleFor[0]);
  const result = animal.residents.sort((a, b) =>
    b.age - a.age)[0];
  return [result.name, result.sex, result.age];
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
