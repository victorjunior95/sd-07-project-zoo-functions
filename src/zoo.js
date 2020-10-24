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
  return data.animals.filter(x => ids.find(y => x.id === y));
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
  data.animals.forEach(x => animalInMap[x.location].push(x.name))
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
  if (options.includeNames === undefined) return animalEmCadaLugar();
  else return individuosDeCadaReigaoPorSexo(options);
}

function schedule(dayName) {
  let todasAsHoras = {}
  Object.entries(data.hours).map(x=>{
    if (x[1].open === 0 && x[1].close === 0) todasAsHoras[x[0]] = 'CLOSED'
    else todasAsHoras[x[0]] = `Open from ${x[1].open}am until ${x[1].close - 12}pm`

  })
  if (dayName !== undefined){
  todasAsHoras = { [dayName]: `${todasAsHoras[dayName]}`}
  }
  return todasAsHoras;
}
const compare = (a, b) => {
  if (a.age < b.age) return 1
  if (a.age > b.age) return -1
    return 0
}
function oldestFromFirstSpecies(id) {
  const responsavelPor = data.employees.find(x => x.id === id).responsibleFor;
  const animaisCuidados =[];
  responsavelPor.forEach(id => {
    animaisCuidados.push(data.animals.find(animal => animal.id === id));
  })
  let conjuntoDeResidentes = [];
  animaisCuidados.forEach(conjuntos => conjuntos.residents.forEach(x => conjuntoDeResidentes.push(x)));
  conjuntoDeResidentes.sort(compare);
  const resposta = [conjuntoDeResidentes[0].name, conjuntoDeResidentes[0].sex, conjuntoDeResidentes[0].age];
  console.log(resposta);
  return resposta;
}

function increasePrices(percentage) {
  percentage = (percentage / 100) + 1;
  for(x in data.prices) {
    data.prices[x] *= percentage;
    data.prices[x] = Math.round(data.prices[x] * 100) / 100
    console.log(data.prices[x]);
  }
  return data.prices
}

function employeeCoverage(idOrName = '') {
  let tabela = {}
  let nomeAlvo = '';
  if (idOrName.length > 30) {
    let x = data.employees.find(funcionario => funcionario.id === idOrName)
    nomeAlvo = `${x.firstName} ${x.lastName}`
  }
  else if (idOrName.length < 30 && idOrName.length > 0) {
    let x = data.employees.find(funcionario => funcionario.firstName === idOrName)
    if (x === undefined) x = data.employees.find(funcionario => funcionario.lastName === idOrName)
    nomeAlvo = `${x.firstName} ${x.lastName}`
  }
  data.employees.forEach(funcionarios => { 
    let lista = []
    let nomeDoFuncionario = `${funcionarios.firstName} ${funcionarios.lastName}`
    funcionarios.responsibleFor.forEach(responsabilidade => {
      let animaisCuidados = data.animals.find(x => x.id === responsabilidade);
      tabela[nomeDoFuncionario] = animaisCuidados.name
      lista.push(animaisCuidados.name)
    });
    tabela[nomeDoFuncionario] = lista

  })
  if (idOrName === '') return tabela
  return {[nomeAlvo]: tabela[nomeAlvo]};
}
employeeCoverage()
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
