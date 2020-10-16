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
const { prices } = require('./data');

function animalsByIds(...ids) {
  // colocamos o spread para que na hora do resultado possamos colocar quantos id quisermos
  if (typeof ids === 'undefined') {
    return [];
  }
  return data.animals.filter(animal => ids.includes(animal.id));
  // usamos o filter dentro de animals, verificando se animal.id está contido em ids
}

function animalsOlderThan(name, age) {
  const nameOfAnimal = data.animals.filter(animalName => animalName.name === name);
  // fazemos o filter que retorna o objeto do name que queremos
  const ageOfAnimals = nameOfAnimal[0].residents.every(animalAge => animalAge.age >= age);
  // em seguida usamos o every para verificar se esse animal passa no requisito da idade
  return ageOfAnimals;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return data.employees.find(empName => (empName
    .firstName === employeeName || empName.lastName === employeeName));
    // usamos o find que procura dentro do array de funcionários
    // verifica se há alguem com esse nome ou sobrenome e retorna
}

function createEmployee(personalInfo, associatedWith) {
  const { id, lastName, firstName } = personalInfo;
  // usa-se o object destructing em personal info
  const { managers, responsibleFor } = associatedWith;
  // usa-se o object destructing em associatedWith
  const newEmployee = { id, lastName, firstName, managers, responsibleFor };
  // junta-se todas as keys dentro de um novo objeto
  return newEmployee;
}

function isManager(id) {
  return data.employees.some(isHimOrHerManager => isHimOrHerManager
    .managers.includes(id)); // usamos o include para checar se há o item ID dentro de managers
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // colocamos [] na frente dos itens
  // caso não coloquemos nada em seus valores retornem arrays vazios
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
  // adiciona-se um novo objeto ao array de objetos employees
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((acc, curr) => {
      // usamos o reduce, para percorrer todo o array
      acc[curr.name] = curr.residents.length;
      // guardamos o curr.name de animas no acumulador
      // igualamos a quantidade de animais de cada e retornamos
      return acc;
    }, {});
  }
  const specificAnimal = data.animals
  .find(specieOfAnimal => specieOfAnimal
    .name.includes(species));
    // procuramos em animals.name a specie que digitamos
  return specificAnimal.residents.length;
  // caso seja encontrada retorna a quantidade de animais dessa espécie
}

function entryCalculator(entrants = 0) {
  if (entrants === undefined) {
    return (entrants === 0);
  } else if (entrants === {}) {
    return (entrants === 0);
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  // usamos o destructing para poder criar uma nova variável
  // zeramos o valor de cada um para que caso nãoseja colocado nada ele não cobre o ingresso
  const value = (prices.Adult * Adult) + (prices.Child * Child) + (prices.Senior * Senior);
  return value;
}

function animalMap(options) {
}

function schedule(dayName) {
  const weekSchedule = {};
  Object.keys(data.hours).forEach((workingDays) => {
    // usamos o object.keys para retornar um objeto com as keys
    // usamos um foreach
    if (data.hours[workingDays].open === data.hours[workingDays].close) {
      // se a hora de entrada e de saida for igual quer dizer que é segunda e deve estar fechado
      weekSchedule[workingDays] = 'CLOSED';
    } else {
      weekSchedule[workingDays] = `Open from ${data.hours[workingDays].open}am until ${data.hours[workingDays].close - 12}pm`;
      // o for each vai atuar e vai retornar um array de terça a domingo nesse formato
    }
  });
  if (dayName !== undefined) {
    return { [dayName]: weekSchedule[dayName] };
    // retorna um objeto que contem o dia da semana com a função relativa weekschedule para esse dia
  }
  return weekSchedule;
}

function oldestFromFirstSpecies(id) {
  const employeeId = data.employees.find(idOfEmployee => idOfEmployee.id === id);
  // usamos o find para retornar o objeto de um funcionário com esse id
  const animalId = data.animals.find(idOfAnimals => idOfAnimals
    .id === employeeId.responsibleFor[0]);
    // usamos novamente o find
    // gera o objeto  do primeiro animal pelo qual o funcionário é responsável
  const findResidents = animalId.residents;
  // retornamos o array com os animais desse grupo
  const sortingAnmals = findResidents.sort((par1, par2) => par2.age - par1.age)[0];
  return [sortingAnmals.name, sortingAnmals.sex, sortingAnmals.age];
  // usa-se o sort para retornar o animal mais velho
}

function increasePrices(percentage) {
  const { Adult, Senior, Child } = prices;
  // usamos o destructing para alterar as keys
  const newAdult = Math.round(Adult * (1 + (percentage / 100)) * 100) / 100;
  // const newAdultRounded = newAdult.toFixed(2);
  const newSenior = Math.round(Senior * (1 + (percentage / 100)) * 100) / 100;
  // const newSeniorRounded = newSenior.toFixed(2);
  const newChild = Math.round(Child * (1 + (percentage / 100)) * 100) / 100;
  // const newChildRounded = newChild.toFixed(2);
  prices.Adult = newAdult;
  prices.Senior = newSenior;
  prices.Child = newChild;
  return prices;
}

function employeeCoverage(idOrName) {
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
