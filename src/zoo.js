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
  if (ids === undefined) return [];

  return ids.map(element => data.animals.find(({ id }) => id === element));
}

function animalsOlderThan(animal, years) {
  return data.animals.find(({ name }) => name === animal).residents.every(e => e.age >= years);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(({ firstName, lastName }) => (firstName === employeeName
    || employeeName === lastName));
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.some(idManager => idManager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  }

  return data.animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined) return 0;

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;

  const totalAdult = data.prices.Adult * Adult;
  const totalChild = data.prices.Child * Child;
  const totalSenior = data.prices.Senior * Senior;

  return totalAdult + totalChild + totalSenior;
}

function animalMapDefault() {
  return data.animals.reduce((acc, { location, name }) => {
    if (acc[location] === undefined) {
      acc[location] = [name];
    } else acc[location].push(name);
    return acc;
  }, {});
}

function animalIncludedNames(paramDefault, options) {
  const newObj = {};
  Object.keys(paramDefault).forEach((locationAnimal) => {
    newObj[locationAnimal] = [];
    paramDefault[locationAnimal].forEach((animalName) => {
      let namesAnimals;
      if (options.sex !== undefined) {
        namesAnimals = (data.animals.find(element2 => element2.name === animalName).residents
        .filter(sexAnimal => sexAnimal.sex === options.sex).map(nameAnimal => nameAnimal.name));
      } else {
        namesAnimals = (data.animals.find(element2 => element2.name === animalName).residents
        .map(nameAnimal => nameAnimal.name));
      }
      if (options.sorted) {
        namesAnimals.sort();
      }
      const tempObj = {};
      tempObj[animalName] = namesAnimals;
      newObj[locationAnimal].push(tempObj);
    });
  });
  return newObj;
}

function animalMap(options) {
  const defaultOut = animalMapDefault();

  if (options === undefined) {
    return defaultOut;
  }

  const { includeNames = false } = options;

  if (includeNames) {
    const newOb = animalIncludedNames(defaultOut, options);
    return newOb;
  }

  return defaultOut;
}

function schedule(dayName) {
  if (dayName === undefined) {
    const days = Object.keys(data.hours);
    const outputDefault = {};
    days.forEach((day) => {
      if (data.hours[day].open === data.hours[day].close) {
        outputDefault[day] = 'CLOSED';
      } else {
        outputDefault[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
      }
    });
    return outputDefault;
  }

  const hour = (data.hours[dayName].open === data.hours[dayName].close ?
    'CLOSED' : `Open from ${data.hours[dayName].open}am until ${data.hours[dayName].close - 12}pm`);
  return { [dayName]: hour };
}

function oldestFromFirstSpecies(id) {
  const animalID = data.employees.find(cardEmployee => cardEmployee.id === id).responsibleFor[0];
  const animalCollection = data.animals.find(cardAnimal => cardAnimal.id === animalID);
  return animalCollection.residents.reduce((maisVelho, actual) => {
    if (actual.age > maisVelho[2]) {
      maisVelho[0] = actual.name;
      maisVelho[1] = actual.sex;
      maisVelho[2] = actual.age;
    }
    return maisVelho;
  }, [0, 0, 0]);
}

function increasePrices(percentage) {
  const convertIncrease = 1 + (percentage / 100);
  const keysPrices = Object.keys(data.prices);
  const value = data.prices;
  keysPrices.forEach((key) => {
    value[key] = Math.round(value[key] * convertIncrease * 100) / 100;
  });
}

function arrayAnimals(employeeCard) {
  return employeeCard.responsibleFor.map(animalID =>
    data.animals.find(element2 => element2.id === animalID).name);
}

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    const empData = data.employees.reduce((objTotal, actual) => {
      const fullName = `${actual.firstName} ${actual.lastName}`;
      objTotal[fullName] = arrayAnimals(actual);
      return objTotal;
    }, {});
    return empData;
  }

  const employeeCard = data.employees.find(actual =>
    (actual.id === idOrName || actual.firstName === idOrName || actual.lastName === idOrName));
  const objEmployeeID = {};
  const fullName = `${employeeCard.firstName} ${employeeCard.lastName}`;
  objEmployeeID[fullName] = arrayAnimals(employeeCard);

  return objEmployeeID;
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
