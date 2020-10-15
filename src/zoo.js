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
  let animalsList = [];
  if (ids === []) {
    animalsList = [];
  } else {
    ids.forEach((id) => {
      const animalByIdList = data.animals.filter(animal => animal.id === id);
      animalsList = animalsList.concat(animalByIdList);
    });
  }
  return animalsList;
}

function animalsOlderThan(animal, age) {
  const animals = data.animals.find(animalObject => animalObject.name === animal);
  return animals.residents.every(resident => resident.age > age);
}


function employeeByName(employeeName) {
  let employeeObj = null;
  if (employeeName === undefined) {
    employeeObj = {};
  } else {
    employeeObj = data.employees.find((employee) => {
      let nameVerify = false;
      if (employee.firstName === employeeName || employee.lastName === employeeName) {
        nameVerify = true;
      }
      return nameVerify;
    });
  }
  return employeeObj;
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.some(manager => manager === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (managers === undefined) {
    managers = [];
  }
  if (responsibleFor === undefined) {
    responsibleFor = [];
  }
  data.employees.push(createEmployee({ id, firstName, lastName }, { managers, responsibleFor }));
}

function animalCount(species) {
  let animalsCont = null;
  if (species === undefined) {
    animalsCont = {};
    data.animals.forEach((animal) => {
      animalsCont = Object.assign(animalsCont, { [animal.name]: animal.residents.length });
      return animalsCont;
    });
  } else {
    animalsCont = data.animals.find(animal => animal.name === species).residents.length;
  }
  return animalsCont;
}

function entryCalculator(entrants) {
  let totalCost = null;
  if (entrants === undefined || Object.entries(entrants).length === 0) {
    totalCost = 0;
  } else {
    const { Adult = 0, Child = 0, Senior = 0 } = entrants;
    const prices = data.prices;
    totalCost = (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
  }
  return totalCost;
}

const animalZone = zone =>
  data.animals.filter(animal => animal.location === zone).map(animal => `${animal.name}`);

function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];
  let animalObj = {};
  if (options === undefined) {
    const animalsObj = locations.map(zone => ({ [zone]: animalZone(zone) }));
    animalsObj.forEach((obj) => {
      animalObj = Object.assign(animalObj, obj);
      return animalObj;
    });
  }
  return animalObj;
}

function schedule(dayName) {
  const scheduleObj = {};
  let daysAndHours = Object.entries(data.hours);
  if (typeof dayName === 'string') {
    daysAndHours = [daysAndHours.find(day => day[0] === dayName)];
  }
  daysAndHours.forEach((day) => {
    if (day[0] !== 'Monday') {
      scheduleObj[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
    } else {
      scheduleObj[day[0]] = 'CLOSED';
    }
  });
  return scheduleObj;
}

function getOldest(previous, current) {
  let oldest = previous;
  if (current.age >= previous.age) {
    oldest = current;
  }
  return oldest;
}

function oldestFromFirstSpecies(id) {
  const listOfResponsible = data.animals.filter(animal =>
    data.employees.find(employee => employee.id === id).responsibleFor.includes(animal.id));
  const oldestAnimal = listOfResponsible.map(animal =>
    animal.residents.reduce((previous, current) =>
      getOldest(previous, current))).reduce((previous, current) => getOldest(previous, current));
  const { name, sex, age } = oldestAnimal;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const priceEntries = Object.entries(data.prices);
  for (let key in priceEntries) {
    const percentCalc = parseFloat(priceEntries[key][1]).toFixed(1) * (percentage / 100);
    const priceKey = priceEntries[key][0];
    data.prices[priceKey] = (parseFloat(priceEntries[key][1]) + percentCalc).toFixed(2);
  }
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
