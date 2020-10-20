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

const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  const IdAnimal = [];
  if (!ids) {
    return IdAnimal;
  }
  for (let item = 0; item < ids.length; item += 1) {
    IdAnimal[item] = animals.find(elemento => elemento.id === ids[item]);
  }
  return IdAnimal;
}

function animalsOlderThan(animal, age) {
  const comparaEspecie = animals.find(nomeAnimal => nomeAnimal.name === animal);
  const comparaAge = comparaEspecie.residents.every(nomeAnimal => nomeAnimal.age > age);
  return comparaAge;
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const employeeResponseName = employees.find((elemento) => {
    const name = elemento.firstName === employeeName;
    const finalName = elemento.lastName === employeeName;
    return name || finalName;
  });
  return employeeResponseName;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: [...associatedWith.managers],
    responsibleFor: [...associatedWith.responsibleFor],
  };
  return newEmployee;
}

function isManager(id) {
  const filtraManagers = employees.some((elemento) => {
    let result = false;
    for (let key = 0; key < elemento.managers.length; key += 1) {
      if (elemento.managers[key] === id) {
        result = true;
      }
    }
    return result;
  });
  return filtraManagers;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  if (!managers) {
    managers = [];
  }
  if (!responsibleFor) {
    responsibleFor = [];
  }
  const lastEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(lastEmployee);
}

function animalCount(species) {
  let resultado;
  const Count = {};
  if (!species) {
    const resulta = animals.map((elemento) => {
      Count[elemento.name] = elemento.residents.length;
      return Count;
    });
    resultado = resulta[0];
  } else {
    const result = animals.find(elemento => elemento.name === species);
    resultado = result.residents.length;
  }
  return resultado;
}

function entryCalculator(entrants) {
  let resultado;
  if (!entrants || entrants === {}) {
    resultado = 0;
  } else {
    const { Adult = 0, Child = 0, Senior = 0 } = entrants;
    const adultPreco = prices.Adult * Adult;
    const childPreco = prices.Child * Child;
    const seniorPreco = prices.Senior * Senior;
    resultado = adultPreco + childPreco + seniorPreco;
  }
  return resultado;
}

function animalMap(options) {
  // let resultado; 
  // if (!options) {
  //   resultado = animals.reduce(
  //     (acc, specie) => {
  //       return {
  //         ...acc,
  //         [specie.location]: [...acc[specie.location], specie.name]
  //       };
  //     },
  //     {
  //       NE: [],
  //       NW: [],
  //       SE: [],
  //       SW: [],
  //     }
  //   );
  // }
  // return resultado;
}

function schedule(...dayName) {
  let resultado = {};
  if (dayName.length === 0) {
    dayName = Object.keys(hours);
  }
  dayName.forEach((diasemana) => {
    if (diasemana !== 'Monday') {
      resultado = { ...resultado, [diasemana]: `Open from ${hours[diasemana].open}am until ${hours[diasemana].close - 12}pm` };
    } else {
      resultado = { ...resultado, [diasemana]: 'CLOSED' };
    }
  });
  return resultado;
}

function oldestFromFirstSpecies(id) {
  const employee = employees
    .filter(elemento => elemento.id === id)
    .map(elemento => elemento.responsibleFor[0]);
  const animalResp = animals
    .filter(elemento => elemento.id === employee[0])
    .map(elemento => elemento.residents.sort((a, b) => a.age - b.age))[0];
  const animalVelho = animalResp.map(elemento => elemento);
  const maisVelho = animalVelho[animalVelho.length - 1];
  return [maisVelho.name, maisVelho.sex, maisVelho.age];
}

function increasePrices(percentage) {
  const resultAdult = prices.Adult * (percentage / 100);
  const resultChild = prices.Child * (percentage / 100);
  const resultenior = prices.Senior * (percentage / 100);
  const adulto = Math.round((prices.Adult + resultAdult) * 100) / 100;
  const idoso = Math.round((prices.Senior + resultenior) * 100) / 100;
  const crianca = Math.round((prices.Child + resultChild) * 100) / 100;
  prices.Adult = adulto;
  prices.Child = crianca;
  prices.Senior = idoso;
}

function employeeCoverage(...idOrName) {
  // fazendo
  // let resultado;
  // if(idOrName.length === 0){
  //   resultado = listaEmployees.reduce((acc,func) => {
  //     return {...acc,
  //     [func.firstName + " " +func.lastName] : listaAnimal.map(nameAnimal => {
  //       if(func.responsibleFor === nameAnimal.id){
  //         return nomeAnimal.name
  //       }
  //     })
  //     }
  //   })
  // }
  // return resultado
}

// console.log(employeeCoverage())
/*
'Nigel Nelson': ['lions', 'tigers'],
'Burl Bethea': ['lions', 'tigers', 'bears', 'penguins'],
'Ola Orloff': ['otters', 'frogs', 'snakes', 'elephants'],
'Wilburn Wishart': ['snakes', 'elephants'],
'Stephanie Strauss': ['giraffes', 'otters'],
'Sharonda Spry': ['otters', 'frogs'],
'Ardith Azevado': ['tigers', 'bears'],
'Emery Elser': ['elephants', 'bears', 'lions']
};
*/

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
