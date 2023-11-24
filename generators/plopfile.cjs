module.exports = function (plop) {
  plop.setGenerator('resource', {
    description: 'creates resources',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'nome do recurso a ser criado:',
      }
    ],
    actions: [
       {
        //CREATES CREATE-DTO
        type: 'add',
        path: '../src/application/DTOs/{{kebabCase name}}/create-{{kebabCase name}}.dto.ts',
        templateFile: './templates/dto/create.generator.hbs',
        skipIfExists: true,
      },
      {
        //CREATES UPDATE-DTO
        type: 'add',
        path: '../src/application/DTOs/{{kebabCase name}}/update-{{kebabCase name}}.dto.ts',
        templateFile: './templates/dto/update.generator.hbs',
        skipIfExists: true,
      },
       {
        //CREATE MODULE
        type: 'add',
        path: '../src/domain/{{kebabCase name}}.module.ts',
        templateFile: './templates/index.generator.module.hbs',
        skipIfExists: true,
      },
       {
        //CREATES CONTROLLER
        type: 'add',
        path: '../src/presentation/controllers/{{kebabCase name}}.controller.ts',
        templateFile: './templates/controller/index.generator.controller.hbs',
        skipIfExists: true,

      },

      {
        //CREATES ENTITIES
        type: 'add',
        path: '../src/domain/entities/{{kebabCase name}}.entity.ts',
        templateFile: './templates/entities/index.generator.hbs',
        skipIfExists: true,
      },
      {
        //CREATES REPOSITORY
        type: 'add',
        path: '../src/infraestructure/repositories/{{kebabCase name}}.repository.ts',
        templateFile: './templates/repositories/index.generator.hbs',
        skipIfExists: true,
      },
      {
        //CREATE SERVICE
        type: 'add',
        path: '../src/application/services/{{kebabCase name}}.service.ts',
        templateFile: './templates/services/index.generator.service.hbs',
        skipIfExists: true,
      }, 
      
    ],
  });
};
