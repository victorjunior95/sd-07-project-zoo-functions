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
const { animals, employees } = require('./data');

// solução apresentada pelo Murillo Wolf - Instrutor Trybe
function animalsByIds(...ids) {
  return data.animals.filter(animal => ids.includes(animal.id));
}

// parte do código abaixo foi implementado usando como referencia: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/every

function animalsOlderThan(animal, age) {
  return animals
    .find(item => item.name === animal)
    .residents.every(item => item.age >= age);
}


function employeeByName(employeeName) {
  const employeeNameEntries = employeeName;
  let ShowEmployedName;
  const showObjectEmployedByFirstName = employees.find(
    nameFirst => nameFirst.firstName === employeeName);
  const showObjectEmployedBylastName = employees
  .find(nameLast => nameLast.lastName === employeeName);

  if (showObjectEmployedByFirstName) {
    ShowEmployedName = showObjectEmployedByFirstName;
  }
  if (showObjectEmployedBylastName) {
    ShowEmployedName = showObjectEmployedBylastName;
  }
  if (!employeeNameEntries) {
    ShowEmployedName = {};
  }
  return ShowEmployedName;
}


function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  // const { employees } = require('./data');
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addNewEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(addNewEmployee);
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function retrieveAvailablelocation() {
  return ['NE', 'NW', 'SE', 'SW', 'E', 'N'];
}

function retriveFilteredAnimalsByLocation(location) {
  return animals.filter(animal => animal.location === location);
}

function retriveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};
  locations.forEach((location) => {
    const filteredAnimals = retriveFilteredAnimalsByLocation(location).map(animal => animal.name);

    if (filteredAnimals.length !== 0) {
      animalsPerLocation[location] = filteredAnimals;
    }
  });

  return animalsPerLocation;
}

function retriveAnimalsPerLocationWithName(locations, sorted, sex) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retriveFilteredAnimalsByLocation(location).map(
      (animal) => {
        const animalName = animal.name;
        const residents = animal.residents
          .filter((resident) => {
            const needFiltering = sex !== undefined;

            if (needFiltering) {
              return resident.sex === sex;
            }
            return true;
          })
          .map(resident => resident.name);

        if (sorted) residents.sort();

        return { [animalName]: residents };
      });
    if (filteredAnimals.length !== 0) {
      animalsPerLocation[location] = filteredAnimals;
    }
  });
  return animalsPerLocation;
}

// solução apresentada pelo Especialista Gabriel Oliva

function animalMap(options) {
  const locations = retrieveAvailablelocation();

  if (!options) return retriveAnimalsPerLocation(locations);

  const { includeNames = false, sorted = false, sex } = options;

  if (includeNames) {
    return retriveAnimalsPerLocationWithName(locations, sorted, sex);
  }
  return retriveAnimalsPerLocation(locations);
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
