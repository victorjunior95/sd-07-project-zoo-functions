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

/* const { animals } = require('./data'); */
const data = require('./data');

function animalsByIds(...ids) {
  /*
  Ao receber como parâmetro um único id, retorna um array com a espécie referente à esse id
  Ao receber mais de um id, retorna um array com as espécies referentes aos ids
  */
  const animalsArray = [];

  if (ids != undefined) {
    return ids.map(selectedId => data.animals.find(animalId => animalId.id === selectedId));
  }
  
  return animalsArray;
}

function animalsOlderThan(animal, age) {
  const animalSpecie = data.animals.filter(species => species.name === animal);

  const specieOlderThan = animalSpecie[0].residents.every(item => item.age >= age);

  return specieOlderThan;
}

function employeeByName(employeeName) {
  const newObject = {};

  const getEmployee = data.employees.find(name => name.firstName === employeeName ||
  name.lastName === employeeName);

  return employeeName == null ? newObject : getEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;

  const { managers, responsibleFor } = associatedWith;

  const createNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  return createNewEmployee;
}

function isManager(id) {
  return data.employees.some(manager => manager.managers.find(theId => theId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const createNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  const actualEmployees = data.employees.push(createNewEmployee);

  return actualEmployees;
}

function animalCount(species) {
  /*
  Sem parâmetros, retorna animais e suas quantidades
  Com o nome de uma espécie de animal, retorna somente a quantidade
  */
  if (species === undefined) {
    return data.animals.reduce((accumulator, nextAnimals) => {
      accumulator[nextAnimals.name] = nextAnimals.residents.length;
      return accumulator; /* Pedir explicação aqui */
    }, {});
  }
  return data.animals.find(animalSpecie => animalSpecie.name === species).residents.length;
}

function entryCalculator(entrants) {
  /*
  Retorna 0 se nenhum argumento for passado
  Retorna 0 se um objeto vazio for passado
  Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
  */
  const ticketsPeople = Object.keys(data.prices).sort().flat();
  const ticketsValue = ticketsPeople.reduce((accumulator, nextAge) =>
    accumulator + (entrants[nextAge] * data.prices[nextAge]), 0);

  return entrants === undefined || Object.entries(entrants).length === 0 ? 0 : ticketsValue;
}

function animalMap(options) {
}

function schedule(dayName) {
  /* let scheduleWeek = {}; */
}

function oldestFromFirstSpecies(id) {
  const animalIds = data.employees.find(employeeId => employeeId.id === id).responsibleFor;

  const animalsData = data.animals.find(animalId => animalId.id === animalIds[0]);

  return Object.values(animalsData.residents.reduce((a, b) => (a.age > b.age ? a : b)));
}

function increasePrices(percentage) {
  /*
  Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas casas decimais
  */
}

function employeeCoverage(idOrName) {

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
