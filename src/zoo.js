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
  return ids.reduce(function (acc, idCurrent) {
    const items = data.animals.filter(function (element) {
      return element.id === idCurrent;
    });
    acc.push(...items);
    return acc;
  }, []);
}

function animalsOlderThan(animal, age) {
  const animalFound = data.animals.find(function (it) {
    return it.name === animal;
  });
  const { residents: animalsResidents } = animalFound;
  const animalWithMinimumAge = animalsResidents.every(function (itAnimal) {
    return itAnimal.age >= age;
  });
  return animalWithMinimumAge;
}

function employeeByName(employeeName) {
  if (employeeName !== null && employeeName !== undefined) {
    const employee = data.employees.find(function (person) {
      return person.firstName === employeeName || person.lastName === employeeName;
    }); return employee;
  }
  {
    const obj = {};
    return obj;
  }
}
function createEmployee(personalInfo, associatedWith) {
  const person = { ...personalInfo, ...associatedWith };
  return person;
}

function isManager(id) {
  const employeeWithManager = data.employees.filter(function (person) {
    return person.managers.some(function (element) { return element === id; });
  });
  if (employeeWithManager.length !== 0) {
    return true;
  }
  return false;
}
function addEmployee(...information) {
  const [id1, firstName1, lastName1, managers1 = [], responsibleFor1 = []] = information;
  const newEmployee = {
    id: id1,
    firstName: firstName1,
    lastName: lastName1,
    managers: managers1,
    responsibleFor: responsibleFor1,
  };
  return data.employees.push(newEmployee);
}

function animalCount(species) {
  if (species === null || species === undefined) {
    const animalList = data.animals;
    const objAnimalCount = animalList.reduce(function (acc, it) {
      acc[it.name] = it.residents.length;
      return acc;
    }, {});
    return objAnimalCount;
  }
  {
    const animalFound = data.animals.find(function (element) {
      return element.name === species;
    });
    return animalFound.residents.length;
  }
}

function entryCalculator(entrants) {
}

function animalMap(options) {
  // seu código aqui
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
