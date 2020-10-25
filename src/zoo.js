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
  // seu código aqui
  // aqui
  return animals.filter((animal) => {
    if (ids.includes(animal.id)) {
      return true;
    }
    return false;
  });
}

function animalsOlderThan(specie, age) {
  // seu código aqui
  const selectedAnimals = data.animals.find(animal => animal.name === specie);
  const residents = selectedAnimals.residents;
  const verify = residents.every(resident => resident.age >= age);
  return (verify);
}

function employeeByName(employeeName = '') {
  // seu código aqui
  if (employeeName === '') {
    return ({});
  }

  const employeeOutput = data.employees.find(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return (employeeOutput);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const receivedPersonalInfo = personalInfo;
  const receivedAssociatedWith = associatedWith;

  const newEmployee = {
    id: receivedPersonalInfo.id,
    firstName: receivedPersonalInfo.firstName,
    lastName: receivedPersonalInfo.lastName,
    managers: receivedAssociatedWith.managers,
    responsibleFor: receivedAssociatedWith.responsibleFor,
  };

  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
  const receivedId = id;
  const receivedFirstName = firstName;
  const receivedLastName = lastName;
  const receivedManagers = managers;
  const receivedResponsibleFor = responsibleFor;

  const newEmployee = {
    id: receivedId,
    firstName: receivedFirstName,
    lastName: receivedLastName,
    managers: receivedManagers,
    responsibleFor: receivedResponsibleFor,
  };
  return data.employees.push(newEmployee);
}

function animalCount(inputSpecies) {
  // seu código aqui
  if (inputSpecies === '' || inputSpecies === null) {
    const speciesAndCount = [];
    data.animals.forEach((animal) => {
      let selectedAnimalCount = 0;
      animal.residents.forEach(selectedAnimalCount += 1);
      speciesAndCount.push({
        specie: animal.name,
        count: selectedAnimalCount,
      });
    });
    return speciesAndCount;
  }
  const selectedSpecies = data.animals.find(animal => animal.name === inputSpecies);
  let selectedSpeciesCount = 0;
  selectedSpecies.residents.forEach(selectedSpeciesCount += 1);
  return selectedSpeciesCount;
}
function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === null || entrants === {}) {
    return 0;
  }
  let totalEntrancesPrice = (entrants.Adult * data.prices.Adult);
  totalEntrancesPrice += (entrants.Senior * data.prices.Senior);
  totalEntrancesPrice += (entrants.Child * data.prices.Child);
  return totalEntrancesPrice;
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
  const actualPrices = data.prices;
  actualPrices.Adult += Math.round((actualPrices.Adult / 100) * percentage);
  actualPrices.Senior += ((actualPrices.Senior / 100) * percentage);
  actualPrices.Child += ((actualPrices.Child / 100) * percentage);
  return (data.prices = {
    Adult: parseFloat(actualPrices.Adult.toFixed(2)),
    Senior: parseFloat(actualPrices.Senior.toFixed(2)),
    Child: parseFloat(actualPrices.Child.toFixed(2)),
  });
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
