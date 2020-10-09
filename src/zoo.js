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
  // seu código aqui
  const result = [];
  if (ids !== undefined) {
    for (let i = 0; i < ids.length; i += 1) {
      data.animals.filter((animal) => {
        if (animal.id === ids[i]) {
          result.push(animal);
          return true;
        }
        return false;
      });
    }
  }
  return result;
}
function animalsOlderThan(animal, age) {
  // seu código aqui
  const lista = data.animals.find(bicho => bicho.name === animal)
  .residents.every(item => item.age >= age);
  return (lista);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  // seu código aqui
  return data.employees
  .find(name => name.firstName === employeeName || name.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
    // seu código aqui
  const gerente = data.employees.filter(item => item.managers.includes(id));
  return (gerente.length > 0);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const worker = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(worker);
}

function animalCount(species) {
  const animais = {};
  data.animals.forEach((item) => {
    const linha = item.name;
    const quant = item.residents.length;
    animais[linha] = quant;
  });
  if (species === undefined) {
    return animais;
  }
  return animais[species];
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || entrants === []) return 0;
  let total = 0;
  const { Adult, Child, Senior } = entrants;
  if (Adult !== undefined) total += (Adult * 49.99);
  if (Child !== undefined) total += (Child * 20.99);
  if (Senior !== undefined) total += (Senior * 24.99);
  return total;
}

// function animalMap(options) {

//   // - Com a opção `includeNames: true` especificada, retorna nomes de animais
//   // - Com a opção `sorted: true` especificada, retorna nomes de animais ordenados
//   // - Com a opção `sex: 'female'` ou `sex: 'male'` especificada,
// retorna somente nomes de animais macho/fêmea
//   // - Com a opção `sex: 'female'` ou `sex: 'male'` especificada e
// a opção `sort: true` especificada, retorna somente nomes de animais macho/fêmea
// com os nomes dos animais ordenados
//   // - Só retorna informações ordenadas e com sexo se a opção `includeNames: true` for
// especificada
//   const local = {
//     NE: [],
//     NW: [],
//     SE: [],
//     SW: [],
//   };
//  console.log ('options entrada' +options)
//   if (options === undefined) {
//      data.animals.forEach((item) => {
//     local[item.location].push(item.name);
//   });
//   return local;
//   }
//   const { includesNames, sorted, sex } = options;
//   console.log ('passou 1')
//   if (includesNames && sorted !== true){
//     console.log ('passou 2')
//     data.animals.forEach((animal) => {
//       let item ={}
//       item[animal.name] = animal.residents
//       .filter((sexo) => {if (sex !== undefined) {return (sexo.sex === 'male')} return true})
//       .filter((sexo) => {if (sex !== undefined) {return (sexo.sex === 'female')}return true})
//       .map (um => um.name)
//       console.log(item)
//       local[animal.location].push(item);
//     })
//     console.log(local)
//     return local;
//   } else if (includesNames && sorted){
//     console.log ('passou 3')
//     data.animals.forEach((animal) => {
//       let item ={}
//       item[animal.name] = animal.residents
// // .filter((sexo) => { if (sex !== undefined) {return (sexo.sex === 'male')} return true })
// // .filter((sexo) => { if (sex !== undefined) {return (sexo.sex === 'female')}return true})
// // .map (um => um.name)
// // .sort()
//       local[animal.location].push(item);
//     })
//     return local;
//   }
// }
// console.log (animalMap({includesNames: true, sex: 'male'}))
// animalMap({includesNames: true});
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
  // animalMap,
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
