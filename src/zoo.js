const { animals, employees, prices, hours } = require('./data');
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
  const paramIds = ids.map((id) => {
    const comparingIds = animals.find(animalById => animalById.id === id);
    return comparingIds;
  });
  return paramIds;
}

function animalsOlderThan(animal, age) {
  const getingParamAnimal = animals.find(animalParam => animalParam.name === animal);
  return getingParamAnimal.residents.every(animalsAges => animalsAges.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const allemployeeInfos = data.employees.find(allInfos =>
  allInfos.firstName === employeeName || allInfos.lastName === employeeName);
  return allemployeeInfos;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    ...personalInfo,
    ...associatedWith,
  };
  return newEmployee;
}

function isManager(id) {
  const managerId = employees.some(({ managers }) => managers.some(manager => manager === id));
  return managerId;
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
  if (species === undefined) {
    const allAnimalsObject = animals.reduce((allAnimals, animal) => {
      allAnimals[animal.name] = animal.residents.length;
      return allAnimals;
    }, {});
    return allAnimalsObject;
  }

  const amountSpecie = data.animals.reduce((residentsLength, animalSelected) => {
    if (animalSelected.name === species) {
      residentsLength = (animalSelected.residents).length;
    }
    return residentsLength;
  }, 0);
  return amountSpecie;
}

// requisito entendido com ajuda e código do Vanderson Benedito
function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  const entrantsAndPrices = Object.entries(entrants);
  return entrantsAndPrices.reduce((totalValues, entrant) => {
    totalValues += entrant[1] * prices[entrant[0]];
    return totalValues;
  }, 0);
}

function animalMap(options) {
  // seu código aqui
}

// requisito entendido com ajuda e código do Vanderson Benedito
function schedule(dayName) {
  const arrayHours = Object.entries(hours);
  return arrayHours.reduce((allDays, currentDay) => {
    const answer = `Open from ${currentDay[1].open}am until ${(currentDay[1].close) - 12}pm`;
    if (dayName === undefined && currentDay[1].open === 0) {
      allDays[currentDay[0]] = 'CLOSED';
    } else if (dayName === undefined && currentDay[1].open !== 0) {
      allDays[currentDay[0]] = answer;
    } else if (currentDay[0] === dayName && currentDay[1].open !== 0) {
      allDays[currentDay[0]] = answer;
    } else if (currentDay[0] === dayName && currentDay[1].open === 0) {
      allDays[currentDay[0]] = 'CLOSED';
    }
    return allDays;
  }, {});
}

function oldestFromFirstSpecies(id) {
  const employeeFirstSpecies = employees.find(employee => employee.id === id).responsibleFor[0];
  const firstSpeciesAllInfos = animals.find(animal => animal.id === employeeFirstSpecies);
  const residentsSpecies = firstSpeciesAllInfos.residents;
  const oldestAnimal = residentsSpecies.reduce((animal, currentAnimal) => {
    if (animal.age < currentAnimal.age) {
      animal = currentAnimal;
    }
    return animal;
  });
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function calculateNewPrice(price, percentage) {
  const newPrice = price + price * percentage / 100;
  const roundedNewPrice = Math.round(newPrice * 100) / 100
  
  return roundedNewPrice;
}


function increasePrices(percentage) {
  let {Adult, Child, Senior} = prices;
  
  prices.Adult = calculateNewPrice(Adult, percentage)
  prices.Child = calculateNewPrice(Child, percentage)
  prices.Senior = calculateNewPrice(Senior, percentage)
}

function employeeCoverage(idOrName) {
  let emp = employees;
  if (idOrName) {
    emp = emp.filter(({id, firstName, lastName}) => id === idOrName || firstName == idOrName || lastName == idOrName);
  }

  const findAnimalsName = (responsibleFor) => (
    responsibleFor.map((currentId) => {
      const animalSelected = animals.find(({id}) => id === currentId);
      return animalSelected.name;
    })
  )

  return emp
    .map(({firstName, lastName, responsibleFor}) => {
      obj = {};
      obj[`${firstName} ${lastName}`] = findAnimalsName(responsibleFor);
      return obj;
    })
    .reduce((acc, currentEmployee) => {
      return {
      ...acc,
      ...currentEmployee
      }
    }, {})
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
