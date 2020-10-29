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
const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');


function animalsByIds(...ids) {
  // o includes buscar o objeto que eu estou indicando
  const filterAnimals = data.animals.filter(objAnimals => ids.includes(objAnimals.id));
  return filterAnimals;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const species = data.animals.find(specie => specie.name === animal);
  return species.residents.every(resid => resid.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  return employees.find(employee =>
    employee.firstName === employeeName ||
    employee.lastName === employeeName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
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
  // o find ele acha o primeiro elemento  e o includes acha o elemente que você deseja.
  const employee = data.employees.find(element => element.managers.includes(id));
  return employee !== undefined;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    return animals.reduce((animalObj, animal) => {
      animalObj[animal.name] = animal.residents.length;
      return animalObj;
    }, {});
  }

  return animals.find(animal => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || entrants === {}) {
    return 0;
  }

  const valueEntrants = Object.keys(entrants);

  const ticketSum = valueEntrants.reduce((sum, keys) => {
    sum += entrants[keys] * prices[keys];
    return sum;
  }, 0);

  return ticketSum;
}
function noParameterAnimalmap() {
  let directionsObject = { NE: [], NW: [], SE: [], SW: [] };

  animals.forEach((animal) => {
    directionsObject = { ...directionsObject,
      [animal.location]: [...directionsObject[animal.location], animal.name] };
  });
  return directionsObject;
}

function animalMapWithIncludeNames(locations, sorting, animalSex) {
  const animalMapObject = {};

  locations.forEach((direction) => {
    const filterAnimals = animals
    .filter(specie => specie.location === direction).map((animal) => {
      const animalName = animal.name;

      const sexAnimals = animal.residents.filter((resident) => {
        if (animalSex !== undefined) {
          return resident.sex === animalSex;
        }
        return true;
      }).map(residentSpecie => residentSpecie.name);

      if (sorting) sexAnimals.sort();
      return { [animalName]: sexAnimals };
    });

    animalMapObject[direction] = filterAnimals;
  });

  return animalMapObject;
}

function animalMap(options) {
  // seu código aqui
  if (!options) return noParameterAnimalmap();

  const directions = ['NE', 'NW', 'SE', 'SW'];
  const { includeNames = false, sorted = false, sex } = options;

  if (includeNames) {
    return animalMapWithIncludeNames(directions, sorted, sex);
  }

  return noParameterAnimalmap();
}

function schedule(...dayName) {
  // seu código aqui
  if (dayName.length === 0) {
    dayName = Object.keys(hours);
  }

  let times = {};

  dayName.forEach((day) => {
    if (day === 'Monday') {
      times = { ...times, [day]: 'CLOSED' };
    } else {
      times = { ...times, [day]: `Open from ${hours[day].open}am until ${hours[day].close - 12}pm` };
    }
  });

  return times;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const firstSpecie = employees.find(employee => employee.id === id).responsibleFor[0];

  const animalSpecie = animals
  .find(animal => animal.id === firstSpecie).residents
  .sort((animalA, animalB) => animalB.age - animalA.age);

  return Object.values(animalSpecie[0]);
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
