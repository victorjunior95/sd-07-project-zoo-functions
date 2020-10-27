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
const { animals, employees, hours, prices } = require('./data');

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
  const isManagerTest = employees.some(employee => employee.managers.includes(id));
  return isManagerTest;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addNewEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(addNewEmployee);
}

function animalCount(species) {

}


function entryCalculator(entrants) {
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
  const weekSchedule = {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  if (dayName === undefined) return weekSchedule;
  return {
    [dayName]: `${weekSchedule[dayName]}`,
  };
}

function oldestFromFirstSpecies(id) {
  // console.log(residentsOffRoll)
}


function increasePrices(percentage) {
  const percentageTax = 1 + (percentage / 100);
  Object.entries(prices).forEach((entry) => {
    const [category, price] = entry;
    const updatedPrice = Math.round((price * percentageTax) * 100) / 100;
    prices[category] = updatedPrice;
  });
  return prices;
}

function retrieveanimalsBySpecieNames(animalsList) {
  return animalsList
      .map((specieId) => {
        const specieFound = animals.find(animal => animal.id === specieId);
        return specieFound.name;
      });
}

function retrieveDefaultEmployeeCoverage() {
  const employeesAndSpecies = {};
  employees.forEach((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    const speciesAssisted = retrieveanimalsBySpecieNames(employee.responsibleFor);
    employeesAndSpecies[fullName] = speciesAssisted;
  });
  return employeesAndSpecies;
}

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    return retrieveDefaultEmployeeCoverage();
  }
  const retrievedEmployee = employees.find(employee => (
    idOrName === employee.firstName ||
    idOrName === employee.lastName ||
    idOrName === employee.id
  ));
  const fullName = `${retrievedEmployee.firstName} ${retrievedEmployee.lastName}`;
  const speciesAssisted = retrieveanimalsBySpecieNames(retrievedEmployee.responsibleFor);
  return { [fullName]: speciesAssisted };
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
