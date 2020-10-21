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
      // criamos um objeto
      // em que  curr.name de animas é a key
      // a quanridade de animais é o value
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
  const value = (data.prices.Adult * Adult) + (data.prices
    .Child * Child) + (data.prices.Senior * Senior);
  return value;
}

function retrieveAvaliableLocations() {
  return ['NE', 'NW', 'SW', 'SE'];
}

function retriveFilteredAnimalsBylocation(location) {
  return data.animals.filter(animal => animal.location === location);
}

function retriveAnimalsPerLocation(locations) {
  const animalsPerLocation = {};
  // irá prcurar todas as regiões e verificar quais animais pertencem a ela
  locations.forEach((location) => {
    const filteredAnimals = retriveFilteredAnimalsBylocation(location)
    .map(animal => animal.name);
    // neste momento o filtered animals está retornando um array de objetos
    // cada array é composto por todos os dados dos animais da mesma região
    // precisamos transformar o array de objetos em array de strings
    // para isso usamos o map
    // com o mapjá retorna um array de strings com o nome dos animais de cada região
    // falta retornar um objeto com a key nome da região e os values são o que map retorna
    animalsPerLocation[location] = filteredAnimals;
    // abrimos no objeto vazio uma chave com a localização
    // seu value será o array de animais diultrados
  });
  return animalsPerLocation;
}

function retriveAnimalsPerLocationWithName(locations, sorted, sex) {
  const animalsPerLocation = {};

  locations.forEach((location) => {
    const filteredAnimals = retriveFilteredAnimalsBylocation(location).map((animal) => {
      const animalName = animal.name;
      const residents = animal.residents
      .filter((resident) => {
        const needFiltering = sex !== undefined;
        return needFiltering ? resident.sex === sex : true;
        // se sex for undefined ele não faz o filtro, caso contrário ele faz
      })
      .map(resident => resident.name);
      // nesse map queremos retornar objetos que tem como key o animal e value seus nomes
      if (sorted) residents.sort();

      return { [animalName]: residents };
      // retorna um onjeto, com a key animalName e value residents
      // neste momento está retornando  oque queremos mas sem o nome das regiões
    });
    if (filteredAnimals.length !== 0) animalsPerLocation[location] = filteredAnimals;
    // se houver filtered animals ele retorna o objeto
    // ele tem location de chaves e filtered animals de values
  });

  return animalsPerLocation;
}
// foi seguido o exercício guiado no plantão por Gabriel Oliva
function animalMap(options) {
  const locations = retrieveAvaliableLocations();
  if (!options) return retriveAnimalsPerLocation(locations);
  // locations são todas as localizações que eu quero filtrar
  // como as localizações disoniveis conseguimos filtrar as espécies dessa localização
  const { includeNames = false, sorted = false, sex } = options;
  // estamos desestruturando a propriedade includeNames do objeto options
  // se não colocarmos nada do sorted, e ele não for chamado viria como undefined
  // colocamos sorted = false para resolver isso
  // poderiamos colocar = true, mas no exercício pede para ordenar somente quando sorted = true
  if (includeNames) {
    return retriveAnimalsPerLocationWithName(locations, sorted, sex);
    // isso é a mesma coisa que includeNames === true
  } return retriveAnimalsPerLocation(locations);
}

  /* if (!options) {
    return categorazeAnimalsBylocation();
    // colocamos a função aqui e a construimos fora para não haver problemas de complexidade
  }
  return categorazeAnimalsBylocation(options);
}

function categorazeAnimalsBylocation() {
  return data.animals.reduce((acc, specie) => {
    return {
      ...acc, [specie.location]: [...acc[specie.location], specie.name]
      // keys do object
      // o spread pega tudo que tem no acumulator e colocando como propriedade do objeto
      // dessa forma retorna todas as regiões ao invés de somente a última
      // values do object
      // o rest pega tudo que tem no acumulador e coloca como value
      // esolhemos o specie.name para retorne o que queremos
      // na primeira vez ele pega a primeira especie e coloca dentro do array vazio da sua região
      // nas vezes seguintes ele vai colocando cada especie em seu respectivo array
    };
  }, {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
    // esse é o primeiro valor do acumulator, que é um valor iteravel
    // depois nossa função começa a preencher esse objeto
  });
} */

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
      // o for each vai atuar e vai retornar um objeto de terça a domingo nesse formato
    }
  });
  if (dayName !== undefined) {
    return { [dayName]: weekSchedule[dayName] };
    // retorna um objeto
    // contem o dia da semana como key e a função relativa weekschedule para esse dia como value
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
  const { Adult, Senior, Child } = data.prices;
  // usamos o destructing para alterar as keys
  const newAdult = Math.round(Adult * (1 + (percentage / 100)) * 100) / 100;
  // const newAdultRounded = newAdult.toFixed(2);
  const newSenior = Math.round(Senior * (1 + (percentage / 100)) * 100) / 100;
  // const newSeniorRounded = newSenior.toFixed(2);
  const newChild = Math.round(Child * (1 + (percentage / 100)) * 100) / 100;
  // const newChildRounded = newChild.toFixed(2);
  data.prices.Adult = newAdult;
  data.prices.Senior = newSenior;
  data.prices.Child = newChild;
  return data.prices;
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
