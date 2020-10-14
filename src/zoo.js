const { animals } = require('./data');
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
  const id = [...ids];
  const scanId = animals.filter(animal => animal.id === id[0] || animal.id === id[1]);
  return scanId;
}

function animalsOlderThan(animal, age) {
  const jaula = animals.find(animalo => animalo.name === animal);
  const idades = jaula.residents.every(bixos => bixos.age >= age);
  return idades;
}

function employeeByName(employeeName) {
  const nomes = data.employees;
  const nome = nomes.filter(n => n.firstName === employeeName || n.lastName === employeeName);
  if (nome[0] === undefined) {
    return {};
  }
  return nome[0];
}

function createEmployee(personalInfo, associatedWith) {
  const novo = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  novo.managers = managers;
  novo.responsibleFor = responsibleFor;
  return novo;
}

function isManager(id) {
  const P = data.employees;
  let R = false;
  P.map(pessoa => pessoa.managers.find((F) => {
    if (F === id) {
      R = true;
    }
    return R;
  }));
  return R;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species = 'total') {
  let contagem = {};
  if (species !== 'total') {
    data.animals.map((A) => {
      if (A.name === species) {
        contagem = A.residents.length;
      }
      return contagem;
    });
  } else {
    data.animals.map((animal) => {
      contagem[animal.name] = animal.residents.length;
      return contagem;
    });
  }
  return contagem;
}

function entryCalculator(entrants = {}) {
  let valor = 0;
  const { Adult, Child, Senior } = entrants;
  if (Adult !== undefined) { valor += Adult * 49.99; }
  if (Child !== undefined) { valor += Child * 20.99; }
  if (Senior !== undefined) { valor += Senior * 24.99; }
  return valor;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName = 'total') {
  let lista = {};
  if (dayName !== 'total' && dayName !== 'Monday') {
    lista[dayName] = 'Open from 8am until 6pm';
  } else if (dayName === 'Monday') {
    lista['Monday'] = 'CLOSED';
  } else {
    lista = {'Tuesday': 'Open from 8am until 6pm',
    'Wednesday': 'Open from 8am until 6pm',
    'Thursday': 'Open from 10am until 8pm',
    'Friday': 'Open from 10am until 8pm',
    'Saturday': 'Open from 8am until 10pm',
    'Sunday': 'Open from 8am until 8pm',
    'Monday': 'CLOSED'}
  }
  return lista;
}

function oldestFromFirstSpecies(id) {
  let idade = 0;
  let animalVelho = {};
  const pessoa = data.employees.find(find => find.id === id);
  const animal = data.animals.find(find => find.id === pessoa.responsibleFor[0]);
  for (let bixo = 0; bixo < animal.residents.length; bixo++) {
    if (animal.residents[bixo].age > idade) {
      idade = animal.residents[bixo].age;
      animalVelho = animal.residents[bixo];
    }
  }
  const {name, sex, age} = animalVelho;
  return [name, sex, age];
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
