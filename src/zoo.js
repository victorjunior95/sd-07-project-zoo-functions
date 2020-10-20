const { animals, employees, hours, prices } = require('./data');
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

// Caso receba nenhum parâmetro, necessário retornar um array vazio
// Ao receber como parâmetro um único id, retorna um array com a espécie referente à esse id
// Ao receber mais de um id, retorna um array com as espécies referentes aos ids

function animalsByIds(...ids) {
  return animals.filter(animal => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(bicho => bicho.name === animal)
    .residents.every(resident => resident.age >= age);
}

// Sem parâmetros, retorna um objeto vazio
// Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
// Quando provido o último nome do funcionário, retorna o objeto do funcionário

function employeeByName(employeeName) {
  return Object.assign({},
    employees.find(
      employee => employee.firstName === employeeName ||
        employee.lastName === employeeName));
}

// Adiciona um funcionário no fim da lista

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some(employee => employee.managers.some(manager => manager === id));
}

// Adiciona um funcionário no fim da lista

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const add = {
    id,
    firstName,
    lastName,
    managers: managers || [],
    responsibleFor: responsibleFor || [],
  };
  employees.push(add);
}

// Sem parâmetros, retorna animais e suas quantidades
// Com o nome de uma espécie de animal, retorna somente a quantidade

function animalCount(species) {
  if (species === undefined) {
    const noInput = {};
    animals.forEach(animal => (noInput[animal.name] = animal.residents.length));
    return noInput;
  }
  return animals.find(animal => animal.name === species).residents.length;
}

// Retorna 0 se nenhum argumento for passado
// Retorna 0 se um objeto vazio for passado
// Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos

function entryCalculator(entrants) {
  if (entrants !== {} && entrants !== undefined) {
    const entrantKeys = Object.keys(entrants);
    return entrantKeys.reduce((acc, curr) => {
      acc += entrants[curr] * prices[curr];
      return acc;
    }, 0);
  }
  return 0;
}

function animalMap(options) {
  // if (!options) {
  //   return animalByLocation(options);
  // }
}

// function animalByLocation() {
  // return animals.reduce((acc, specie) => {
  // console.log('current: ', specie);
  // console.log('acumulado: ', acc);
  //   return {
  //     ...acc,
  //     [specie.location]: [
  //       ...acc[specie.location],
  //       // specie.name
  //       {
  //         [specie.name]: specie.residents.map(resident => resident.name)
  //       }
  //     ]
  //   };
  // }, {
  //   NE: [],
  //   NW: [],
  //   SE: [],
  //   SW: []
  // });
// }

// console.log(animalMap('lions'));

// Sem parâmetros, retorna um cronograma legível para humanos
// Se um único dia for passado, retorna somente este dia em um formato legível para humanos

function schedule(dayName) {
  return hours;
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
