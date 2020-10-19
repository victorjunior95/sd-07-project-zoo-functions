const { animals, employees, hours, prices } = require('./data');
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
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const animalSpeciesName = animal;
  const animalSpeciesAge = age;
  const findSpecies = animals.find(animalSpecies => animalSpecies.name === animalSpeciesName);
  const checkAge = findSpecies.residents.every(species => (
    species.age >= animalSpeciesAge));
  return checkAge;
}

function employeeByName(employeeName) {
  if (employeeName) {
    return employees.find(employee =>
      employee.firstName === employeeName || employee.lastName === employeeName);
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some(employee => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species) {
    return animals.find(animal =>
      animal.name === species).residents.length;
  }
  const allAnimalsName = animals.map(animal => animal.name);
  const allAnimalsNumber = animals.map(animal => animal.residents.length);
  const object = {};
  allAnimalsName.forEach((animal, index) => (
    object[animal] = allAnimalsNumber[index]));
  return object;
}

function entryCalculator(entrants) {
  if (entrants) {
    if (Object.keys(entrants).length === 0) {
      return 0;
    }
    return Object.entries(entrants).reduce((acc, [key, value], index) => {
      if (key === 'Adult') return acc + (value * 49.99);
      if (key === 'Senior') return acc + (value * 24.99);
      if (key === 'Child') return acc + (value * 20.99);
      return acc;
    }, 0);
  }
  return 0;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = hours;
  const theDay = {};
  const allDays = { Tuesday: `Open from ${Tuesday.open}am until ${Tuesday.close - 12}pm`,
    Wednesday: `Open from ${Wednesday.open}am until ${Wednesday.close - 12}pm`,
    Thursday: `Open from ${Thursday.open}am until ${Thursday.close - 12}pm`,
    Friday: `Open from ${Friday.open}am until ${Friday.close - 12}pm`,
    Saturday: `Open from ${Saturday.open}am until ${Saturday.close - 12}pm`,
    Sunday: `Open from ${Sunday.open}am until ${Sunday.close - 12}pm`,
    Monday: 'CLOSED' };
  if (dayName) {
    theDay[dayName] = allDays[dayName];
    return theDay;
  }
  return allDays;
}

function oldestFromFirstSpecies(id) {
  const findEmployee = employees.filter(employee => employee.id === id);
  const getAnimalId = (findEmployee.map(element => element.responsibleFor[0])).toString();
  const findAnimalById = animals.find(animal => animal.id === getAnimalId).residents;
  const sortResidents = findAnimalById.sort((a, b) => b.age - a.age);
  const { name, sex, age } = sortResidents[0];
  return [name, sex, age];
}

function increasePrices(percentage) {
  const { Adult, Child, Senior } = prices;
  const percentageNumber = percentage / 100;
  prices.Adult = (Math.round((Adult + (Adult * percentageNumber)) * 100)) / 100;
  prices.Child = (Math.round((Child + (Child * percentageNumber)) * 100)) / 100;
  prices.Senior = (Math.round((Senior + (Senior * percentageNumber)) * 100)) / 100;
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
