const { animals } = require('./data');
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
  let paramIds = ids.map((id) => {
    const comparingIds = animals.find((animalById) => {
      return animalById.id === id
    }, [])
    return comparingIds;
  })
  return paramIds
}

function animalsOlderThan(animal, age) {
  const getingParamAnimal = animals.find((animalParam) => {
    animalParam.name === animal
    return animalParam;
  })
  return getingParamAnimal.residents.every((animalsAges) => animalsAges.age >= age);
}

function employeeByName(employeeName) {
  function conditions() {
    if (employeeName === undefined) {
      return {};
    } else {
      const allemployeeInfos = data.employees.find((infosEmployee) => {
        return infosEmployee.firstName === employeeName || infosEmployee.lastName === employeeName;
      })
      return allemployeeInfos;
    }
  } 
  return conditions();
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
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
