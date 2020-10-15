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

const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  return animals.filter(animal => (animal.id === ids[0] || animal.id === ids[1]));
}

function animalsOlderThan(animal, age) {
  const species = animals.find(currentAnimal => currentAnimal.name === animal);
  return species.residents.every(currentSpecies => (currentSpecies.age > age));
}

function employeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return {};
  return employees.find(currentEmployee => (
    currentEmployee.firstName === employeeName ||
    currentEmployee.lastName === employeeName
  ));
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
  const managerIds = employees.map(currentEmployee => currentEmployee.managers).flat();
  return managerIds.some(currentId => currentId === id);
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
  const objectAnimals = {};
  animals.forEach((currentAnimal) => {
    objectAnimals[currentAnimal.name] = currentAnimal.residents.length;
  });
  return typeof species === 'undefined' ? objectAnimals : objectAnimals[species];
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined' || Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const price = (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
  return price.toPrecision(5);
}

const defaultObject = (arrayLocation, objectAnimalsName) => {
  arrayLocation.forEach((currentLocation) => {
    const animalsLocation = animals.filter(cAn => cAn.location === currentLocation);
    const residentsNames = animalsLocation.map(currentLocal => currentLocal.name);
    objectAnimalsName[currentLocation] = residentsNames;
  });
  return objectAnimalsName;
};

const calcResidents = (local, options) => {
  const object = {};
  const animalsInitialsSex = local.residents
    .filter(curSex => curSex.sex === options.sex).map(curRes => curRes.name);
  const animalsInitials = local.residents.map(currRes => currRes.name);
  if (options.sorted === true && typeof options.sex === 'string') {
    object[local.name] = animalsInitialsSex.sort();
    return object;
  } else if (options.sorted === true && typeof options.sex === 'undefined') {
    object[local.name] = animalsInitials.sort();
    return object;
  } else if (options.sorted === undefined && typeof options.sex === 'string') {
    object[local.name] = animalsInitialsSex;
    return object;
  }
  object[local.name] = animalsInitials;
  return object;
};

function animalMap(options) {
  const arrayLocation = ['NE', 'NW', 'SE', 'SW'];
  const objectAnimalsName = {};
  if (typeof options === 'undefined' || options.includeNames !== true) {
    return defaultObject(arrayLocation, objectAnimalsName);
  }
  if (options.includeNames === true) {
    arrayLocation.forEach((currentLocation) => {
      const animalsLocation = animals.filter(cAni => cAni.location === currentLocation);
      const residentsNames = animalsLocation.map(local => calcResidents(local, options));
      objectAnimalsName[currentLocation] = residentsNames;
    });
  }
  return objectAnimalsName;
}

function schedule(dayName) {
  const arrayKeys = Object.keys(hours);
  const scheduleObject = {};
  const scheduleDayName = {};
  arrayKeys.forEach((element) => {
    if (element !== 'Monday') {
      scheduleObject[element] = `Open from ${hours[element].open}am until ${hours[element].close - 12}pm`;
    } else {
      scheduleObject[element] = 'CLOSED';
    }
  });
  if (typeof dayName === 'undefined') {
    return scheduleObject;
  }
  scheduleDayName[dayName] = scheduleObject[dayName];
  return scheduleDayName;
}

function oldestFromFirstSpecies(id) {
  const arrayResident = [];
  const animalID = employees.find(currentEmployee => currentEmployee.id === id)
  .responsibleFor[0];
  const resident = animals.filter(currentAnimal => currentAnimal.id === animalID)
  .map(animal => animal.residents.reduce((acc, currentName) => {
    if (acc.age >= currentName.age) {
      return acc;
    }
    acc = currentName;
    return acc;
  }), {});
  arrayResident.push(resident[0].name, resident[0].sex, resident[0].age);
  return arrayResident;
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((keys) => {
    prices[keys] = Math.round((prices[keys] * (1 + (percentage / 100))) * 100) / 100;
  });
  return prices;
}

function employeeCoverage(idOrName) {
  const object = {};
  employees.forEach((employee) => {
    const arrayAnimals = [];
    employee.responsibleFor.forEach((idEmployed) => {
      animals.forEach((currentAnimal) => {
        if (currentAnimal.id === idEmployed) {
          arrayAnimals.push(currentAnimal.name);
          object[`${employee.firstName} ${employee.lastName}`] = arrayAnimals;
        }
      });
    });
  });
  if (typeof idOrName === 'undefined') {
    return object;
  }
  const employeeSearch = employees.filter(employee =>
    employee.firstName === idOrName || employee.lastName === idOrName || employee.id === idOrName)
    .map(element => `${element.firstName} ${element.lastName}`);
  const result = {};
  result[employeeSearch[0]] = object[employeeSearch];
  return result;
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
