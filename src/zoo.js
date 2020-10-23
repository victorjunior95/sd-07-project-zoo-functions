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
  const idFiltrado = data.animals.filter(x => ids.find(y => x.id === y));
  return idFiltrado;
}

function animalsOlderThan(animal, age) {
  const selecionaAnimal = data.animals
    .find(x => x.name === animal)
    .residents.every(y => y.age >= age);
  return selecionaAnimal;
}

function employeeByName(employeeName) {
  if (typeof employeeName !== 'undefined') {
    const teste = data.employees.some(x => x.firstName === employeeName)
    if (teste) return data.employees.find(x => x.firstName === employeeName)
    return data.employees.find(x => x.lastName === employeeName)
  }
  return {};
}


function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith)
}

function isManager(id) {
  let teste = false;
  data.employees.forEach(element => {
    if (element.managers.includes(id)) teste = true
  });
  return teste
  // return data.employees.some(x => x.managers === id)
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  let novo = {id, firstName, lastName, managers, responsibleFor}
  data.employees.push(novo)
}

function animalCount(species) {
  const objeto = {};
  if (typeof species === 'undefined') {
    data.animals.map((name, residents) => {
      return objeto[name.name] = name.residents.length
    })
    return objeto;
  }
  return data.animals.find(x => x.name === species).residents.length
}
function entryCalculator(entrants) {
  let valor = 0;
  const { prices } = data;
  if (entrants !== undefined || Object.keys.length === 0) {
    return Object.entries(entrants).reduce((total, num) => (total + prices[num[0]] * num[1]), 0)
  }
  return 0
}

const localização = () => ({
  NE : [],
  NW : [],
  SE : [],
  SW : []
});


const animalEmCadaLugar = () => {
  const animalInMap = localização();
  data.animals.forEach(x => {
    animalInMap[x.location].push(x.name)
  })
  return animalInMap;
}

const individuosDeCadaReigaoPorSexo = (dados) => {
  if (dados.sex === undefined) dados.sex = false;
  const animalInMap = localização();
  data.animals.forEach(x => { 
    const objeto = {};
    if (dados.sex === false) objeto[x.name] = x.residents.map(residents => residents.name);
    else objeto[x.name] = x.residents.filter(residents => residents.sex === dados.sex).map(residents => residents.name);
    if (dados.sorted === true) objeto[x.name].sort();
    animalInMap[x.location].push(objeto);
  })
  return animalInMap
}

function animalMap(options = {}) {
  if (options.includeNames === undefined) return animalEmCadaLugar()
  else return individuosDeCadaReigaoPorSexo(options)
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
