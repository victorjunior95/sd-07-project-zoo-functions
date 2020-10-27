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

const { animals, employees, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if (ids === null) return [];
  const answer = [];
  ids.forEach(id => answer.push(animals.filter(animal => animal.id === id)[0]));
  return answer;
}

function animalsOlderThan(animal, age) {
  const ages = animals.filter(animalIndex => animalIndex.name === animal)[0];
  if (ages.residents.find(residents => residents.age < age)) return false;
  return true;
}

function nameEmployee(employee, employeeName) {
  if (employee.firstName === employeeName) return true;
  if (employee.lastName === employeeName) return true;
  return false;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find(employee => nameEmployee(employee, employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  personalInfo.managers = [];
  personalInfo.responsibleFor = [];
  associatedWith.managers.forEach(index => personalInfo.managers.push(index));
  associatedWith.responsibleFor.forEach(index => personalInfo.responsibleFor.push(index));
  return personalInfo;
}

function isManager(id) {
  if (employees.find(employee => employee.managers.find(manager => manager === id))) return true;
  return false;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const arrayManagers = [];
  if (managers !== undefined) managers.forEach(index => arrayManagers.push(index));
  const arrayResponsible = [];
  if (responsibleFor !== undefined) responsibleFor.forEach(index => arrayResponsible.push(index));
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: arrayManagers,
    responsibleFor: arrayResponsible,
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  const animalsCount = {};
  if (species === undefined) {
    animals.forEach(animal => (animalsCount[animal.name] = animal.residents.length));
    return animalsCount;
  }
  return animals.find(animal => species === animal.name).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined) return 0;
  if (Object.entries(entrants).length === 0) return 0;
  let adultTotal = 0;
  let childTotal = 0;
  let seniorTotal = 0;
  const { Adult: adultPrice, Child: childPrice, Senior: seniorPrice } = prices;
  const { Adult, Child, Senior } = entrants;
  if (Adult !== undefined) adultTotal = adultPrice * Adult;
  if (Child !== undefined) childTotal = childPrice * Child;
  if (Senior !== undefined) seniorTotal = seniorPrice * Senior;
  return adultTotal + childTotal + seniorTotal;
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
