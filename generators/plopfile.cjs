module.exports = function (plop) {
  plop.setGenerator('resource', {
    description: 'creates resources',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'resource name please',
      },
    ],
    actions: [
      {
        //CREATES REPOSITORY
        type: 'add',
        path: '../src/repositories/{{kebabCase name}}.repository.ts',
        templateFile: './templates/repositories/index.generator.hbs',
      },
      {
        //CREATES ENTITIES
        type: 'add',
        path: '../src/entities/{{kebabCase name}}.entity.ts',
        templateFile: './templates/entities/index.generator.hbs',
      },
      {
        //CREATES CONTROLLER
        type: 'add',
        path: '../src/resources/{{kebabCase name}}/{{kebabCase name}}.controller.ts',
        templateFile: './templates/resources/index.generator.controller.hbs',
      },
      {
        //CREATES MODULE
        type: 'add',
        path: '../src/resources/{{kebabCase name}}/{{kebabCase name}}.module.ts',
        templateFile: './templates/resources/index.generator.module.hbs',
      },
      {
        //CREATES SERVICE
        type: 'add',
        path: '../src/resources/{{kebabCase name}}/{{kebabCase name}}.service.ts',
        templateFile: './templates/resources/index.generator.service.hbs',
      },
      {
        //CREATES CREATE-DTO
        type: 'add',
        path: '../src/resources/{{kebabCase name}}/dto/create-{{kebabCase name}}.dto.ts',
        templateFile: './templates/dto/create.generator.hbs',
      },
      {
        //CREATES UPDATE-DTO
        type: 'add',
        path: '../src/resources/{{kebabCase name}}/dto/update-{{kebabCase name}}.dto.ts',
        templateFile: './templates/dto/update.generator.hbs',
      },
    ],
  });
};
