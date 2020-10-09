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

const animals = data.animals;
const employees = data.employees;
const hours = data.hours;
const prices = data.prices;

function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  if (ids.length === 1) return [animals.find(e => ids[0] === e.id)];
  return animals.filter((e, i) => e.id === ids[i]);
}

function animalsOlderThan(animal, age) {
  return animals.find(e => e.name === animal).residents.every(f => f.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  if (employees.find(e => e.lastName === employeeName) !== undefined) {
    return employees.find(e => e.lastName === employeeName);
  }
  return employees.find(e => e.firstName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.map(e => e.managers).reduce((acc, ind) => {
    ind.forEach(uni => acc.push(uni));
    return acc;
  }, []).includes(id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}
function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, v) => {
      acc[v.name] = v.residents.length;
      return acc;
    }, {});
  }

  return animals.reduce((acc, v, i) => {
    if (v.name === species) acc = animals[i];
    return acc;
  }).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.entries(entrants).length === 0) return 0;
  return Object.entries(entrants).map((e) => {
    if (e[0] === 'Adult') return e[1] * 49.99;
    if (e[0] === 'Child') return e[1] * 20.99;
    return e[1] * 24.99;
  }).reduce((a, v) => {
    a += v;
    return a;
  }, 0);
}

function animalMap(obj = {}) {
  function nomesBichos(nome) {
    return animals[animals.findIndex(bicho =>
      bicho.name === nome)].residents.reduce((acc, bicho) => {
        if (obj.sex === undefined) { acc.push(bicho.name); }
        if (obj.sex === 'female' && bicho.sex === 'female') { acc.push(bicho.name); }
        if (obj.sex === 'male' && bicho.sex === 'male') { acc.push(bicho.name); }
        return acc;
      }, []);
  }
  function especieNomes(especie) { return { [especie]: nomesBichos(especie) }; }
  function especieNomesSorted(especie) {
    return { [especie]: nomesBichos(especie).sort() };
  }
  const estrutura = { NE: [], NW: [], SE: [], SW: [] };
  if (!obj.includeNames || obj === undefined) {
    animals.forEach(ani => estrutura[ani.location].push(ani.name));
  }
  if (obj.includeNames && !obj.sorted) {
    animals.forEach(ani => estrutura[ani.location].push(especieNomes(ani.name)));
  }
  if (obj.includeNames && obj.sorted) {
    animals.forEach(ani => estrutura[ani.location].push(especieNomesSorted(ani.name)));
  }

  return estrutura;
}

function schedule(dayName) {
  const temp = {};
  Object.keys(hours).forEach((dia) => {
    if (hours[dia].open === 0 && hours[dia].close === 0) temp[dia] = 'CLOSED';
    else temp[dia] = `Open from ${hours[dia].open}am until ${hours[dia].close - 12}pm`;
  });
  if (dayName === undefined) return temp;
  return Object.fromEntries([[dayName, temp[dayName]]]);
}

function oldestFromFirstSpecies(id) {
  const bichoUmId = employees.find(e => e.id === id).responsibleFor[0];
  const listaBichos = animals.find(e => e.id === bichoUmId).residents;
  const vovoBicho = listaBichos.reduce((a, e) => {
    if (a.age > e.age) return a;
    return e;
  });
  return [vovoBicho.name, vovoBicho.sex, vovoBicho.age];
}

function increasePrices(percentage) {
  console.log(prices);
  Object.keys(prices).forEach((element) => {
    prices[element] = (Math.round(prices[element] * (([percentage] / 100)
    + 1) * 100).toPrecision(4) / 100);
  });
}

function employeeCoverage(idOrName) {
  function idToNomeBixo(id) {
    return animals.find(e => e.id === id).name;
  }

  const listaTratada = employees.reduce((a, e) => {
    a[`${e.firstName} ${e.lastName}`] = e.responsibleFor.map(idToNomeBixo);
    return a;
  }, {});
  if (idOrName === undefined) return listaTratada;
  if (idOrName.includes('-')) idOrName = employees.find(e => e.id === idOrName).firstName;
  const nomeCompleto = Object.keys(listaTratada).find(e => e.includes(idOrName) === true);
  return { [nomeCompleto]: listaTratada[nomeCompleto] };
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
