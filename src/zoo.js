const { animals, employees, prices } = require('./data');
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

function animalsByIds(ids, ...rest) {
  // seu código aqui
  const selectedAnimals = animals.filter((animal = []) => animal.id === ids
  || animal.id === rest[0]);
  return selectedAnimals;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const selected = animals.filter(species => species.name === animal);
  const result = selected[0].residents.every(iterator => iterator.age >= age);
  return result;
}

function employeeByName(employeeName) {
  // seu código aqui
  let result = employees.find(employ => employ.firstName === employeeName
  || employ.lastName === employeeName);
  if (result === undefined) {
    result = {};
  }
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  // seu código aqui
  const result = data.employees.map(iterator => iterator.managers.some(element => element === id));
  return result.includes(true);
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  // seu código aqui
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species = '') {
  // seu código aqui
  if (species === '') {
    const result = {};
    animals.forEach((animal) => {
      result[animal.name] = animal.residents.length;
      return result;
    });
    return result;
  }
  const dataAnimal = animals.find(animal => animal.name === species);
  return dataAnimal.residents.length;
}

function entryCalculator(...entrants) {
  // seu código aqui
  if (entrants.length === 0) {
    return 0;
  }
  const input = Object.entries(entrants[0]);
  if (input.length === 0) {
    return 0;
  }
  let result = 0;
  entrants.forEach(entries => Object.keys(entries)
  .forEach((item) => {
    result += prices[item] * entries[item];
  }));
  return result;
}

function animalMap(options = {}) {
  // seu código aqui
  const { includeNames = false, sorted = false, sex = false } = options;
  const allAnimals = {};
  animals.forEach((specie) => {
    if (!Object.hasOwnProperty.call(allAnimals, specie.location)) {
      Object.assign(allAnimals, { [specie.location]: [] });
    }
    if (!includeNames) {
      allAnimals[specie.location].push(specie.name);
    } else {
      const animalResidents = specie.residents.filter(animal => (animal.sex === sex) || (!sex));
      const names = animalResidents.map(currrent => currrent.name);
      if (sorted) {
        names.sort();
      }
      const animalsLocation = { [specie.name]: names };
      allAnimals[specie.location].push(animalsLocation);
    }
  });
  return allAnimals;
}
const format = (hour) => {
  if (hour > 12) {
    return `${hour - 12}pm`;
  }
  return `${hour}am`;
};
const msgDay = (iterator, obj) => {
  const mensage = data.hours[iterator].open === 0 ? 'CLOSED'
    : `Open from ${format(data.hours[iterator].open)} until ${format(data.hours[iterator].close)}`;
  obj[iterator] = mensage;
  return obj;
};
function schedule(dayName) {
  // seu código aqui
  const schedules = {};
  const daysOfWeek = Object.keys(data.hours);
  if (!dayName) {
    daysOfWeek.forEach(day => msgDay(day, schedules));
  } else {
    const slDay = daysOfWeek.find(current => current === dayName);
    msgDay(slDay, schedules);
  }
  return schedules;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  let getAnimal;
  const getEmploy = employees.find(current => current.id === id);
  animals.forEach((animal) => {
    if (animal.id === getEmploy.responsibleFor[0]) {
      const ages = animal.residents.map(resident => resident.age);
      const ageOld = ages.reduce((pre, acc) => Math.max(pre, acc));
      getAnimal = animal.residents.find(cAnimal => cAnimal.age === ageOld);
    }
  });

  return [getAnimal.name, getAnimal.sex, getAnimal.age];
}
const expUp = 'e+';
const expDown = 'e-';
const roundDecimal = (number, decimals) => {
  decimals = typeof decimals !== 'undefined' ? decimals : 2;
  return +(Math.round(number + (expUp + decimals)) + (expDown + decimals));
};

function increasePrices(percentage) {
  // seu código aqui
  Object.keys(prices).forEach((current) => {
    prices[current] = roundDecimal((prices[current] * (percentage / 100)) + prices[current], 2);
  });
  return prices;
}

const getAnimalsForEmploy= (string, objReturn) => {
  const employSl = employees.find(cEmploy => cEmploy.id === string ||
    cEmploy.firstName === string || cEmploy.lastName === string ); 
    employSl.responsibleFor.forEach((currentID, index) => {
    employSl.responsibleFor[index] = animals.find(iterator => iterator.id === currentID).name;
    });
    const fullName = `${employSl.firstName} ${employSl.lastName}`;
    objReturn[fullName] = employSl.responsibleFor;
    return objReturn;
}

function employeeCoverage(idOrName) {
  // seu código aqui
  const getEmploy = {};
  if(!idOrName) {
    employees.forEach((current) => {
      current.responsibleFor.forEach((currentID, index) => {
        current.responsibleFor[index] = animals.find(iterator => iterator.id === currentID).name;
      });
      const fullName = `${current.firstName} ${current.lastName}`;
      getEmploy[fullName] = current.responsibleFor;
    });
  } else {
    getAnimalsForEmploy(idOrName, getEmploy);
  } 
  return getEmploy;
}
//console.log(employeeCoverage('Azevado'));

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
