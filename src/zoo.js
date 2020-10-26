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
  // seu código aqui
  return ids.map(id => animals.find(animal => animal.id === id));
}


function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.find(animalName => animalName.name === animal).residents.every(resident => resident.age > age)
}


function employeeByName(employeeName) {
  // seu código aqui
  if(employeeName === undefined) return {};
  return employees.find(employee => employee.firstName === employeeName || employee.lastName === employeeName)
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return {...personalInfo, ...associatedWith}
}

function isManager(id) {
  // seu código aqui
  return employees.some(employee => employee.managers.some(manager => manager === id))
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
  employees.push({ id: id, firstName: firstName, lastName: lastName, managers: [...managers], responsibleFor: [...responsibleFor]});
}
// addEmployee('4141da1c-a6ed-4cf7-90c4-99c657ba4ef3', 'Jane', 'Doe',
//       [
//         '546fe3d4-2d81-4bb4-83a7-92d5b7048d17',
//         'a67a36ee-3765-4c74-8e0f-13f881f6588a',
//       ],
//       [
//         'ee6139bf-b526-4653-9e1e-1ca128d0ad2e',
//         '210fcd23-aa7b-4975-91b7-0230ebb27b99',
//       ]);
//       console.log(employees)

function countAnimal(specie){
  const animalData = animals.filter(animal => animal.name === specie)
  const num = animalData[0].residents.length
  return {[specie]: num}

}

function animalCount(species) {
  // seu código aqui
  if(species === undefined) return animals.reduce((acc, crr) => Object.assign(acc, countAnimal(crr.name)) ,{})
  return Object.values(countAnimal(species))[0];

}


function entryCalculator(entrants) {
  // seu código aqui
  if(entrants === undefined || Object.keys(entrants).length === 0) return 0;
  const keys = Object.keys(prices)
  const value = keys.map((key, index) => {
    if(Object.keys(entrants).find(entrant => entrant === key)){
    return (Object.values(prices)[index]) * entrants[key];
    } return 0;
  })
  return value.reduce((acc, crr) => acc + crr, 0)
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
