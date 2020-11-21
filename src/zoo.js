const data = require('./data');
const { employees, animals, prices, hours } = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const filteredAnimals = animals.filter(currentAnimal => currentAnimal.name === animal);
  return filteredAnimals[0].residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  if (typeof employeeName === 'undefined') 
  return {};
  return employees.find(currentEmployee =>
    currentEmployee.firstName === employeeName || currentEmployee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  const isManager = employees.find(currentEmployee => currentEmployee.managers.includes(id));
  return typeof isManager !== 'undefined';
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const Species = {};
    animals.forEach((animal) => {
      Species[animal.name] = animal.residents.length;
    });
    return Species;
  }
  const findByAnimal = animals.find(animal => animal.name === species);
  return findByAnimal.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  const keys = Object.keys(entrants);
  let counter = 0;
  keys.forEach((age) => {
    counter += entrants[age] * prices[age];
  });
  return count;
}

function animalMap(options) {
}

function schedule(dayName) {
  const resultDay = {};
  Object.keys(hours).forEach(function (hour) {
    if (hours[hour].open === hours[hour].close) {
      resultDay[hour] = 'CLOSED';
    } else {
      resultDay[hour] = `Open from ${hours[hour].open}am until ${hours[hour].close - 12}pm`;
    }
  });
  if (dayName !== undefined) {
    return { [dayName]: result[dayName] };
  }
  return result;
}

function oldestFromFirstSpecies(id) {
  const find = employees.find(element => element.id === id);
  const findEspecie = animals.find(animal => animal.id === find.responsibleFor[0]);
  let result = [];
  let mostOlderAnimal = 0;
  findEspecie.residents.forEach((resident) => {
    if (resident.age > mostOlderAnimal) {
      mostOlderAnimal = resident.age;
      result = [resident.name, resident.sex, resident.age];
    }
  });
  return result;
}

function increasePrices(percentage) {
  Object.keys(prices).map(
    key => (prices[key] = Math.round(prices[key] * ((percentage / 100) + 1) * 100) / 100),
  );
}

function listAnimals(responsavelPor) {
  const listaDeAnimais = [];
  responsavelPor.forEach((idAtual) => {
    const animalNome = animals.find(animalAtual => animalAtual.id === idAtual).name;
    listaDeAnimais.push(animalNome);
  });
  return listaDeAnimais;
}

function employeeCoverage(idOrName) {
  const empregadoAnimais = {};
  if (idOrName === undefined) {
    let listaDeAnimais = [];
    data.employees.forEach((empregadoAtual) => {
      const responsavelPor = empregadoAtual.responsibleFor;
      listaDeAnimais = listAnimals(responsavelPor);
      empregadoAnimais[`${empregadoAtual.firstName} ${empregadoAtual.lastName}`] = listaDeAnimais;
    });
  } else {
    let listaDeAnimais = [];
    let nomeSobrenome = '';
    const responsavelPor = data.employees.find((Atual) => {
      nomeSobrenome = `${Atual.firstName} ${Atual.lastName}`;
      return Atual.id === idOrName || Atual.firstName === idOrName || Atual.lastName === idOrName;
    }).responsibleFor;
    listaDeAnimais = listAnimals(responsavelPor);
    empregadoAnimais[`${nomeSobrenome}`] = listaDeAnimais;
  }
  return empregadoAnimais;
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
