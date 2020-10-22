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
const { animals, prices } = require('./data');
const { employees, hours } = require('./data');

function animalsByIds(...ids) {
  const idAnimal = animals.filter(justId => ids.includes(justId.id));
  return idAnimal;
} // feito com a ajuda do Murilo Wolf no plantão
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/contains

function animalsOlderThan(animal, age) {
  const theAnimal = animals.find(element => element.name === animal);
  const aboutAge = theAnimal.residents.every(older => older.age >= age);
  return aboutAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const employee = employees.find(
    justName => justName.firstName === employeeName || justName.lastName === employeeName);
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  // cria as propriedades e acrescenta os valores associados a elas;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor }; // une todas as informações;
}

function isManager(id) {
  const manager = employees.some(
    (justManager, index) => justManager.managers[index] === id);
  return manager;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  let addManagers = managers;
  let addResponsible = responsibleFor;
  if (managers === undefined || responsibleFor === undefined) {
    addManagers = [];
    addResponsible = [];
  }
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: addManagers,
    responsibleFor: addResponsible,
  };
  return employees.push(newEmployee);
}

function animalCount(species) {
  // referência: Moisés Santana
  const justObject = animals.reduce((theObject, element) => {
    theObject[element.name] = element.residents.length; // colchetes indicam a key
    return theObject; // = para atribuir valor à key
  }, {}); // inicia como um objeto vazio
  // pode usar o reduce, porque no final o resultado é 1 objeto só, com várias keys
  if (species === undefined) return justObject;

  const justOne = animals.find(speciesName => species === speciesName.name);
  return justOne.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) return 0;
  const justKeys = Object.keys(entrants);
  const sum = justKeys.reduce((acc, keys) => {
    acc += entrants[keys] * prices[keys];
    return acc;
  }, 0); // pra indicar que sum inicia em 0
  return sum;
}

function animalMapNoParameter() {
  let theObject = { NE: [], NW: [], SE: [], SW: [] };
  animals.forEach((element) => {
    theObject = {
      ...theObject,
      [element.location]: [...theObject[element.location], element.name],
    }; // referência: plantão do Hamaji
  });
  return theObject;
}

function animalMapWithIncludeNames(locations, sortation, animalSex) {
  const newObject = {};
  locations.forEach((element) => {
    const filteredAnimals = animals
      .filter(specie => specie.location === element) // filtrar a localização
      .map((item) => {
        const animalName = item.name; // pegar o nome da espécie
        const justResidents = item.residents.filter((filterSex) => {
          if (animalSex !== undefined) { // só filtra se for passado parâmetro
            return filterSex.sex === animalSex;
          }
          return true;
        }).map(resident => resident.name);
        // pegar os nomes dos residentes e devolver em array
        if (sortation) justResidents.sort();
        return { [animalName]: justResidents }; // valor da chave
      });
    newObject[element] = filteredAnimals;
      // pra poder alimentar o newObject a cada iteração do forEach
  });
  return newObject;
}
function animalMap(options) { // referência: plantão Gabriel Oliva
  const justLocations = ['NE', 'NW', 'SE', 'SW'];
  if (options === undefined) return animalMapNoParameter();

  const { includeNames = false, sorted = false, sex } = options;
  // desestruturação para evitar repetição
  if (includeNames) {
    return animalMapWithIncludeNames(justLocations, sorted, sex);
  }
  return animalMapNoParameter();
}

function schedule(...dayName) {
  // referência: Thiago Pederzolli
  // usando spread vira array
  if (dayName.length === 0) {
    // se é array tem length
    dayName = Object.keys(hours); // se veio vazio, recebe as keys e vira array
  }
  let theObject = {};
  dayName.forEach((element) => {
    // forEach se usa em array e não em objeto
    if (element === 'Monday') {
      // é o último a ser acrescentado
      theObject = { ...theObject, [element]: 'CLOSED' };
    } else {
      theObject = {
        ...theObject,
        [element]: `Open from ${hours[element].open}am until ${
          hours[element].close - 12
        }pm`,
      };
    } // o spread aqui funciona como += para objeto, para acrescentar e não substituir os valores
  });
  return theObject; // retorno tudo o que estiver nele
}

function oldestFromFirstSpecies(id) {
  const findingEmployee = employees.find(element => id === element.id);
  const findingAnimal = animals.find(
    firstId => firstId.id === findingEmployee.responsibleFor[0],
  );
  let older = 0;
  for (let i = 0; i < findingAnimal.residents.length; i += 1) {
    if (older < findingAnimal.residents[i].age) {
      older = findingAnimal.residents[i].age;
    }
  }
  const findingTheOne = findingAnimal.residents.find(theOne => theOne.age === older);
  return Object.values(findingTheOne);
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((element) => {
    // se guia pelas keys
    prices[element] = Math.ceil(prices[element] * (100 + percentage)) / 100;
    // exemplo: 49.99 * (100 + 50) / 100 = 74.985; Math.ceil para arredondar para cima
  });
}

function employeeCoverage(idOrName) {
  // referência: Francisco Berilo
  let theObject = {};
  if (idOrName === undefined) {
    employees.forEach((element) => {
      theObject = { ...theObject,
        [`${element.firstName} ${element.lastName}`]: element.responsibleFor.map(idNumber =>
          animals.find(theOne => theOne.id === idNumber).name) };
    });
    return theObject;
  }
  const findingEmployee = employees.find(
    ({ id, firstName, lastName }) =>
      idOrName === id || idOrName === firstName || idOrName === lastName);
  // encontra o employee e retorna o array de species que é responsável
  const findingSpecieName = findingEmployee.responsibleFor.map(idNumber =>
    animals.find(theOne => theOne.id === idNumber).name);
  return {
    [`${findingEmployee.firstName} ${findingEmployee.lastName}`]: findingSpecieName,
  };
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
