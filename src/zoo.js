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
  return data.animals.filter(animal => ids.includes(animal.id));
  // Feito com a orientação do Murilo Wolf na fechamento do primeiro dia do projeto
}

function animalsOlderThan(animal, age) {
  const findAnimal = data.animals.find(item => item.name === animal);
  return findAnimal.residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(NM => NM.firstName === employeeName || NM.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
  // Consulta realizada em https://www.tutorialspoint.com/object-assign-in-javascript
}

function isManager(id) {
  return data.employees.some((manager, index) => manager.managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const nameAnimals = data.animals.map(animal => animal.name);
  const numberAnimals = data.animals.map(animal => animal.residents.length);
  const obj = {};

  if (species === undefined) {
    nameAnimals.forEach((nameAnimal, value) => {
      obj[nameAnimal] = numberAnimals[value];
    });
    return obj;
  }
  const amount = data.animals.find(nameAnimal => nameAnimal.name === species).residents.length;
  return amount;
}


function entryCalculator(...entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  let general = 0;

  const { Adult, Senior, Child } = data.prices;

  entrants.map((visitants) => {
    if (visitants.Adult) {
      general += visitants.Adult * Adult;
    }
    if (visitants.Senior) {
      general += visitants.Senior * Senior;
    }
    if (visitants.Child) {
      general += visitants.Child * Child;
    }
    return general;
  });
  return general;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const hour = Object.keys(data.hours);

  if (dayName === undefined) {
    hour.forEach((day) => {
      data.hours[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
    });
    data.hours.Monday = 'CLOSED';
    return data.hours;
  }
  return { [dayName]: data.hours[dayName] };
}

function oldestFromFirstSpecies(id) {
  const responsableEmployee = data.employees.find(employee => employee.id === id).responsibleFor[0];
  const animalId = data.animals.find(animal => animal.id === responsableEmployee);
  const oldAnimals = animalId.residents.sort((itemA, itemB) => itemB.age - itemA.age)[0];
  return [oldAnimals.name, oldAnimals.sex, oldAnimals.age];
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = data.prices;
  data.prices.Adult = (Math.round((Adult + ((Adult * percentage) / 100)) * 100) / 100);
  data.prices.Senior = (Math.round((Senior + ((Senior * percentage) / 100)) * 100) / 100);
  data.prices.Child = (Math.round((Child + ((Child * percentage) / 100)) * 100) / 100);
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
