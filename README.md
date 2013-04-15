# grunt-behat

A [grunt][grunt] task to run your [Behat][behat] BDD tests

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-behat`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-behat');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
[behat]: http://behat.org/

## Documentation
This task is a [multi task][types_of_tasks], meaning that grunt will automatically iterate over all `behat` targets if a target is not specified.

###Example Config

```javascript
grunt.initConfig({
  behat: {
    example: {
      options: {
        output: false,
        failOnUndefined: false,
        failOnFailed: false
      },
      cmd: './bin/behat',
      features: 'features/',
      flags: '-f pretty'
    },
    example2: {
      features: 'features/',
    }
  }
});
```

####Features
Set this to be the path to your features directory

####Cmd
Set path to behat binary if not in PATH

####Options
Options can be used to set when the task should fail and the output that will be displayed when its does.

####Flags
The flags can be used to configure Behat, see http://docs.behat.org/guides/6.cli.html for the flags that behat accepts.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
*   __24/08/2012 - 0.1.0__: Initial release.

## License
Copyright (c) 2012 Paul Dixon  
Licensed under the MIT license.
