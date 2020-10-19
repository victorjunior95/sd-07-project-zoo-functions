const { animals } = require('./data');
const { employees } = require('./data');
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
  let arr = [];
  const idAnimals = animals.filter((animal, i) => animal.id === ids[i]);
  if (idAnimals !== undefined) {
    arr = idAnimals;
  }

  return arr;
}

function animalsOlderThan(animal, age) {
  return animals.some(
    animalName =>
      animalName.name === animal &&
      animalName.residents.every(residents => residents.age >= age),
  );
}

function employeeByName(employeeName) {
  let obj = {};

  const employInput = employees.find(
    employ =>
      employ.firstName === employeeName || employ.lastName === employeeName,
  );
  // find retorna o valor do primeiro elemento do array q satisfizer a função teste provida.

  if (employInput !== undefined) {
    obj = employInput;
  }
  return obj;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(man => man.id === id && man.managers.length === 1);
}
// some testa se ao menos um dos elementos do array pasasa no teste e retorna true.
function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(species) {
  const obj = {
    lions: 4,
    tigers: 2,
    bears: 3,
    penguins: 4,
    otters: 4,
    frogs: 2,
    snakes: 2,
    elephants: 4,
    giraffes: 6,
  };
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  for (let i = 0; i <= keys.length - 1; i += 1) {
    if (keys[i] === species) {
      return values[i];
    }
  }
  return obj;
}

const prices = {
  Adult: 49.99,
  Child: 20.99,
  Senior: 24.99,
};

function entryCalculator(entrants = 0) {
// entrants precisa de um valor inicial, pois nao e possivel
// converter null ou  undefined em objeto
// ( nao e possivel utilizar Object.values
  if (Object.values(entrants).length === 0) {
    entrants = 0;
// para o caso de entrants ser um objeto vazio.
  } else if (Object.values(entrants).length > 0) {
    const { Adult = 0, Senior = 0, Child = 0 } = entrants;
    entrants = (Adult * prices.Adult) + (Senior * prices.Senior) + (Child * prices.Child);
  }
// uso de object destructuring:
// https://dmitripavlutin.com/javascript-object-destructuring/
  return entrants;
}
// consultei o repositorio de krammer para refatoramento desta funçao
// https://github.com/tryber/sd-07-project-zoo-functions/blob/544898ad4e7bca13bb04afc1dfabe4c7ee1da3ca/src/zoo.js

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const out = {};
  Object.keys(data.hours).forEach(function (hour) {
    if (data.hours[hour].open === data.hours[hour].close) {
      out[hour] = 'CLOSED';
    } else {
      out[hour] = `Open from ${data.hours[hour].open}am until ${data.hours[hour].close - 12}pm`;
    }
  });
  if (dayName !== undefined) {
    return { [dayName]: out[dayName] };
  }
  return out;
}
// Consultei o repositorio de Elano para refatoraçao desta funçao.
// https://github.com/tryber/sd-07-project-zoo-functions/blob/cf21a6980049d60316081f5dca352d1e04a14fee/src/zoo.js
function oldestFromFirstSpecies(id) {}

function increasePrices(percentage) {
  const increase = 1 + (percentage / 100);
  data.prices.Adult = Math.round(data.prices.Adult * increase * 100) / 100;
  data.prices.Senior = Math.round(data.prices.Senior * increase * 100) / 100;
  data.prices.Child = Math.round(data.prices.Child * increase * 100) / 100;
}
// consultei o repositório de Kramer para a refatoração desta função.
// https://github.com/tryber/sd-07-project-zoo-functions/blob/544898ad4e7bca13bb04afc1dfabe4c7ee1da3ca/src/zoo.js

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    const out = {};
    employees.forEach(
      employeeSelected =>
        (out[
          `${employeeSelected.firstName} ${employeeSelected.lastName}`
        ] = employeeSelected.responsibleFor.map(
          isresponsible => animals.find(animal => animal.id === isresponsible).name,
        )),
    );
    return out;
  }
// Este if cria o objeto com todos os nomes de empregados e respectivos animais cuidados.
// Com o forEach, adiciona as chaves do objeto ( nomes dos empregados)
// Com o find, encontra-se pelo id do animal o seu nome (.name)
// Com  = ...map , adiciona valores as chaves. Os valores que eram ids (.responsibleFor)
// sao substituidos pelos nomes encontrados pelo find.

// O método map() invoca a função callback passada por argumento
// para cada elemento do Array e devolve um novo Array como resultado.
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  const employeer = employees.find(
    employeeSelected =>
      employeeSelected.firstName === idOrName ||
      employeeSelected.lastName === idOrName ||
      employeeSelected.id === idOrName,
  );
  const responsible = employeer.responsibleFor.map(
    isresponsible => animals.find(animal => animal.id === isresponsible).name,
  );

  return { [`${employeer.firstName} ${employeer.lastName}`]: responsible };
}
// consultei o repositorio de Elano para refatoraçao dest afunçao.
// https://github.com/tryber/sd-07-project-zoo-functions/blob/cf21a6980049d60316081f5dca352d1e04a14fee/src/zoo.js

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
