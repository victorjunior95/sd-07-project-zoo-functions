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
const data = require('./data');

function animalsByIds(...ids) {
  /* 
  Caso receba nenhum parâmetro, necessário retornar um array vazio
  Ao receber como parâmetro um único id, retorna um array com a espécie referente à esse id
  Ao receber mais de um id, retorna um array com as espécies referentes aos ids 
  */
  let arrayOfAnimalsIds = [];

  ids.forEach((id) => {
    console.log(id);
    if (id == null) {
      return arrayOfAnimalsIds;
    } else if (id !== null && id == data.animals.id) {
      arrayOfAnimalsIds.push(data.animals);
    }
  })
  return arrayOfAnimalsIds;
}

function animalsOlderThan(animal, age) {
  /* OK
  Ao passar o nome de uma espécie e uma idade, testa se todos os animais desta espécie possuem a idade mínima especificada
  */
  const animalSpecie = data.animals.filter((species) => species.name === animal);

  const specieOlderThan = animalSpecie[0].residents.every((animals) => animals.age >= age);

  return specieOlderThan;
}

function employeeByName(employeeName) {
  /* OK
  Sem parâmetros, retorna um objeto vazio
  Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário
  Quando provido o último nome do funcionário, retorna o objeto do funcionário
  */
  const newObject = {};

  const getEmployee = data.employees.find((nameOrLastName) => nameOrLastName.firstName === employeeName || nameOrLastName.lastName === employeeName);

  if (employeeName == null) {
    return newObject;
  } else {
    return getEmployee;
  }
}

function createEmployee(personalInfo, associatedWith) {
  /*
  Cria um novo colaborador a partir de objetos contendo informações pessoais e gerentes e animais gerenciados.
  */
  const { id, firstName, lastName } = personalInfo;

  const { managers, responsibleFor } = associatedWith;

  const createNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor
  };

  return createNewEmployee;
}

function isManager(id) {
  /*
  Testa se o id passado é de um gerente
  */
  const getTheManager = data.employees.some((manager) => {
    return manager.managers.find((theId) => {
      return (theId === id);
    })
  });

  return getTheManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  /*
  Adiciona um funcionário no fim da lista
  */
  const createNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor
  };

  const actualEmployees = data.employees.push(createNewEmployee);

  return actualEmployees;
}

function animalCount(species) {
  /*
  Sem parâmetros, retorna animais e suas quantidades
  Com o nome de uma espécie de animal, retorna somente a quantidade
  */
  if (species === undefined) {
    return data.animals.reduce((accumulator, nextAnimals) => {
      accumulator[nextAnimals.name] = nextAnimals.residents.length;
      return accumulator; /* Pedir explicação aqui */
    }, {});
  } else {
    return data.animals.find((animalSpecie) => animalSpecie.name === species).residents.length;
  }
}

function entryCalculator(entrants) {
  /*
  Retorna 0 se nenhum argumento for passado
  Retorna 0 se um objeto vazio for passado
  Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos
  */
  const ticketsPeople = Object.keys(data.prices).sort().flat();

  if (entrants === undefined || Object.entries(entrants).length === 0) {
    return 0;
  } else {
    return ticketsPeople.reduce((accumulator, nextAge) =>
    accumulator + (entrants[nextAge] * data.prices[nextAge]), 0);
  };
}

/*   return arrays.reduce((accumulator, nextValue) => {
    nextValue.map(arrayConcat => accumulator.push(arrayConcat));
    return accumulator;
  }, []);  */



function animalMap(options) {
  /*
  Sem parâmetros, retorna animais categorizados por localização
  Com a opção includeNames: true especificada, retorna nomes de animais
  Com a opção sorted: true especificada, retorna nomes de animais ordenados
  Com a opção sex: 'female' ou sex: 'male' especificada, retorna somente nomes de animais macho/fêmea
  Com a opção sex: 'female' ou sex: 'male' especificada e a opção sort: true especificada, retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados
  Só retorna informações ordenadas e com sexo se a opção includeNames: true for especificada
  */
}

function schedule(dayName) {
  /*
  Sem parâmetros, retorna um cronograma legível para humanos
  Se um único dia for passado, retorna somente este dia em um formato legível para humanos
  */
  let schedule = {};

  const week = Object.keys(data.hours).forEach((day) => {
    console.log (day);
    if (day == 'Monday') {
      return schedule[day] = 'CLOSED';
    } else {
      return schedule[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close}pm`
    }
  });

  if (dayName === undefined) {
    return { [dayName]: schedule[dayName] };
  }
  return week;
}

function oldestFromFirstSpecies(id) {
  /*
  Passado o id de um funcionário, encontra a primeira espécie de animal gerenciado pelo funcionário, e retorna um array com nome, sexo e idade do animal mais velho dessa espécie
  */
  const animalIds = data.employees.find((employeeId) => employeeId.id === id).responsibleFor;

  const animals = data.animals.find((animalId) => animalId.id === animalIds[0]);

  const getOlderAnimalAge = animals.residents.reduce((positionA, positionB) => {
    if (positionA.age > positionB.age) {
      return positionA;
    } else {
      return positionB;
    }
  });

  const toArray = Object.values(getOlderAnimalAge);
  return toArray;
}

function increasePrices(percentage) {
  /*
  Ao passar uma porcentagem, incrementa todos os preços, arrendondados em duas casas decimais
  */
}

function employeeCoverage(idOrName) {
  /*
  Sem parâmetros, retorna uma lista de funcionários e os animais pelos quais eles são responsáveis
  Com o id de um funcionário, retorna os animais pelos quais o funcionário é responsável
  Com o primeiro nome de um funcionário, retorna os animais pelos quais o funcionário é responsável
  Com o último nome de um funcionário, retorna os animais pelos quais o funcionário é responsável
  */
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
