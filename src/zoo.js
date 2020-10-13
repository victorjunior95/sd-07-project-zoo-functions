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

const { animals } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const listaAnimal = [];
  ids.forEach((idAtual) => {
    for (let index = 0; index < animals.length; index += 1) {
      if (idAtual === animals[index].id) {
        listaAnimal.push(animals[index]);
      }
    }
  });
  return listaAnimal;
}

function animalsOlderThan(animal, age) {
  const animalObject = animals.find(animalAtual => animalAtual.name === animal);
  return animalObject.residents.every(redidentAtual => redidentAtual.age > age);
}

function employeeByName(emplName) {
  if (emplName !== undefined) {
    return data.employees.find(atl => atl.firstName === emplName || atl.lastName === emplName);
  }
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return data.employees.find(empregadoAtual => empregadoAtual.id === id);
}

function isManager(id) {
  return data.employees.some(empregadoAtual => empregadoAtual.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    const contaAnimais = {};
    animals.forEach((animalAtual) => {
      contaAnimais[animalAtual.name] = animalAtual.residents.length;
    });
    return contaAnimais;
  }
  const totalDaEspecie = animals.find(animalAtual => animalAtual.name === species);
  return totalDaEspecie.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const somaTotal = (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
  return somaTotal;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const agenda = {};
  if (dayName === undefined) {
    agenda.Tuesday = `Open from ${hours.Tuesday.open}am until ${(hours.Tuesday.close) - 12}pm`;
    agenda.Wednesday = `Open from ${hours.Wednesday.open}am until ${(hours.Wednesday.close) - 12}pm`;
    agenda.Thursday = `Open from ${hours.Thursday.open}am until ${(hours.Thursday.close) - 12}pm`;
    agenda.Friday = `Open from ${hours.Friday.open}am until ${(hours.Friday.close) - 12}pm`;
    agenda.Saturday = `Open from ${hours.Saturday.open}am until ${(hours.Saturday.close) - 12}pm`;
    agenda.Sunday = `Open from ${hours.Sunday.open}am until ${(hours.Sunday.close) - 12}pm`;
    agenda.Monday = 'CLOSED';
    return agenda;
  }
  const horas = Object.entries(hours);
  const diaEncontrado = horas.find(diaAtual => diaAtual[0] === dayName);
  if (diaEncontrado[0] === 'Monday') {
    agenda[diaEncontrado[0]] = 'CLOSED';
  } else {
    agenda[diaEncontrado[0]] = `Open from ${diaEncontrado[1].open}am until ${(diaEncontrado[1].close) - 12}pm`;
  }
  return agenda;
}

function oldestFromFirstSpecies(employeeId) {
  const empregadoFound = data.employees.find(empregadoAtual => empregadoAtual.id === employeeId);
  const animalId = empregadoFound.responsibleFor[0];
  const animalEncontrado = animals.find(animalAtual => animalAtual.id === animalId);
  const residentsEspecie = animalEncontrado.residents;
  const animalOlder = residentsEspecie.sort((a, b) => b.age - a.age)[0];
  return [animalOlder.name, animalOlder.sex, animalOlder.age];
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = prices;
  const adultNewPrice = Math.round(Adult * (1 + (percentage / 100)) * 100) / 100;
  const seniorNewPrice = Math.round(Senior * (1 + (percentage / 100)) * 100) / 100;
  const childNewPrice = Math.round(Child * (1 + (percentage / 100)) * 100) / 100;
  prices.Adult = adultNewPrice;
  prices.Senior = seniorNewPrice;
  prices.Child = childNewPrice;
  return prices;
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
