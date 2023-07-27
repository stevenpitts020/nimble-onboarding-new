module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a reusable component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        // Plop will create directories for us if they do not exist
        // so it's okay to add files in nested locations.
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: 'plop-templates/Component/Component.test.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'plop-templates/Component/Component.stories.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.sass',
        templateFile: 'plop-templates/Component/Component.sass.hbs',
      },
      {
        // Action type 'append' injects a template into an existing file
        type: 'append',
        path: 'src/components/index.ts',
        // Pattern tells plop where in the file to inject the template
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `export * from './{{pascalCase name}}/{{pascalCase name}}'`,
      }
    ],
  })

  plop.setGenerator('hook', {
    description: 'Create a custom react hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your hook name?',
      },
      {
        type: 'input',
        name: 'var',
        message: 'What is the name of the variable in state?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/hooks/{{pascalCase name}}Handler.ts',
        templateFile: 'plop-templates/Hook/Hook.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/hooks/index.ts',
        templateFile: 'plop-templates/injectable-index.js.hbs',
        skipIfExists: true,
      },
      {
        type: 'append',
        path: 'src/hooks/index.ts',
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `import use{{pascalCase name}}Handler from './{{pascalCase name}}Handler'`,
      },
      {
        type: 'append',
        path: 'src/hooks/index.ts',
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `\tuse{{pascalCase name}}Handler,`,
      },
    ],
  })
}
