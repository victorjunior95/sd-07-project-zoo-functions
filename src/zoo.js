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
}
// const objectAnimal = data.animals.filter(animal => animal.name === 'lions');
// console.log(objectAnimal);
// const arrayResidents = objectAnimal[0].residents;
// console.log(arrayResidents);
// const arrayAges = arrayResidents.map(animal => animal.age);

// const arrayAges = objectAnimal[0].residents.map(animal => animal.age);
// console.log(arrayAges);
// console.log(objectAnimal[0].residents.map(animal => animal.age).every(age => age >= 10));

function animalsOlderThan(animal, age) {
  const objectAnimal = data.animals.filter(species => species.name === animal);
  const arrayAges = objectAnimal[0].residents.map(speciesAge => speciesAge.age);
  return arrayAges.every(animalAge => animalAge >= age);
}
// console.log(animalsOlderThan('otters', 7));
// console.log(employee);

function employeeByName(employeeName) {
  const employee = data.employees.find(
    name => name.firstName === employeeName || name.lastName === employeeName);
  if (typeof employee === 'object') return employee;
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

// const manager = data.employees.map(employee => employee.managers);
// console.log(manager);
// const result = manager.flat(Infinity);
// console.log(result);
// const isMng = result.some(id => id === '0e7b460e-acf4-4e17-bcb3-ee472265db83');
// console.log(isMng);
// const result = manager.forEach(element => {
//   return element.some(id => id === '0e7b460e-acf4-4e17-bcb3-ee472265db83')
// });


// let arrayManagers = [];
// const ids = [...manager];
// console.log(ids);
// console.log(manager.some(idManager => idManager === '0e7b460e-acf4-4e17-bcb3-ee472265db83'));

// console.log(idsManagers);
function isManager(id) {
  const managers = data.employees.map(employee => employee.managers);
  const arrayManagers = managers.flat(Infinity);

  return arrayManagers.some(idMng => idMng === id);
}

function addEmployee(id1, firstName1, lastName1, managers1, responsibleFor1) {
  if (managers1 === undefined) managers1 = [];
  if (responsibleFor1 === undefined) responsibleFor1 = [];
  const newEmployee = {
    id: id1,
    firstName: firstName1,
    lastName: lastName1,
    managers: managers1,
    responsibleFor: responsibleFor1,
  };

  return data.employees.push(newEmployee);
}

// const allAnimals = data.animals.map(animal => animal.name);
// console.log(allAnimals);
// const numberAnimals = data.animals.map(animal => animal.residents.length);
// console.log(numberAnimals);
// let objAnimals = {};
// console.log(object);
// allAnimals.forEach((animal, index) => {
//   objAnimals[animal] = numberAnimals[index];
// });
// console.log(objAnimals);

// const mapAnimal = data.animals.map(animal => {
//   if (animal.name === 'lions') return animal.residents.length;
// });
// console.log(mapAnimal);

// console.log(data.animals.filter(animal => animal.name === 'lions')[0].residents.length);


function animalCount(species) {
  const allAnimals = data.animals.map(animal => animal.name);
  const numberAnimals = data.animals.map(animal => animal.residents.length);
  const objAnimals = {};
  if (species === undefined) {
    allAnimals.forEach((animal, index) => {
      objAnimals[animal] = numberAnimals[index];
    });
    return objAnimals;
  }
  const oneAnimal = data.animals.filter(animal => animal.name === species)[0].residents.length;
  return oneAnimal;
}
// Retorna 0 se nenhum argumento for passado
// Retorna 0 se um objeto vazio for passado
// Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
// let entrants = { 'Adult': 2, 'Child': 3, 'Senior': 1 };
// let totalValue = 0;
// const array = Object.entries(entrants);
// console.log(array);
// array.forEach((entry, index) => {
//   if (entry[0] === 'Adult') totalValue += entry[1] * 49.99;
//   if (entry[0] === 'Child') totalValue += entry[1] * 20.99;
//   if (entry[0] === 'Senior') totalValue += entry[1] * 24.99;
// });
// console.log(totalValue);

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  let totalValue = 0;
  const array = Object.entries(entrants);
  array.forEach((entry, index) => {
    if (entry[0] === 'Adult') totalValue += entry[1] * 49.99;
    if (entry[0] === 'Child') totalValue += entry[1] * 20.99;
    if (entry[0] === 'Senior') totalValue += entry[1] * 24.99;
  });
  return totalValue;
}

function animalMap(options) {
  // seu código aqui
}
// const expected = {
//   'Tuesday': 'Open from 8am until 6pm',
//   'Wednesday': 'Open from 8am until 6pm',
//   'Thursday': 'Open from 10am until 8pm',
//   'Friday': 'Open from 10am until 8pm',
//   'Saturday': 'Open from 8am until 10pm',
//   'Sunday': 'Open from 8am until 8pm',
//   'Monday': 'CLOSED'
// };

// const days = Object.entries(data.hours);
// console.log(days);
// const objDays = {};
// days.forEach((day) => {
//   if (day[0] === 'Monday') objDays[day[0]] = 'CLOSED';
//   else objDays[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
// });
// console.log(objDays);
// const oneDay = days.filter(day => day[0] === 'Tuesday')[0];
// const oneDayObj = {};
// oneDayObj[oneDay[0]] = `Open from ${oneDay[1].open}am until ${oneDay[1].close - 12}pm`;
// console.log(oneDayObj);
// console.log({'Tuesday': objDays.Tuesday});
// console.log(Object.entries(objDays).filter(day => day[0] ==='Monday')[0]);

function schedule(dayName) {
  const days = Object.entries(data.hours);
  const objDays = {};
  days.forEach((day) => {
    if (day[0] === 'Monday') objDays[day[0]] = 'CLOSED';
    else objDays[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
  });
  if (dayName === undefined) return objDays;
  const objOneDay = {};
  const array = Object.entries(objDays).filter(day => day[0] === dayName)[0];
  objOneDay[array[0]] = array[1];
  return objOneDay;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  const obj = {};
  const array = Object.entries(data.prices);
  array.forEach((price) => {
    obj[price[0]] = Math.round((price[1] * (1 + (percentage / 100)) * 100)) / 100;
  });
  data.prices = obj;
  return data.prices;
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
