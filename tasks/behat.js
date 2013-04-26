/*
 * grunt-behat
 * https://github.com/mintbridge/grunt-behat
 *
 * Copyright (c) 2012 Paul Dixon
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // ==========================================================================
  // TASKS
  // ==========================================================================

  var cp = require('child_process');

  grunt.registerMultiTask('behat', 'Run your Behat BDD tests', function() {
    // Get target-specific options override the default options.
    var options, globals, tmp;

    tmp = grunt.config(['behat', this.target, 'options']);
    if (typeof tmp === 'object') {
      grunt.verbose.writeln('Using "' + this.target + '" Behat options.');
      options = tmp;
    } else {
      grunt.verbose.writeln('Using master Behat options.');
      options = grunt.config('behat.options');
    }
    grunt.verbose.writeflags(options, 'Options'); 

    var data = {
      cmd: 'behat',
      args: [],
      options: options
    }

    if(typeof this.data.flags !== 'undefined') {
      data.args.push(this.data.flags);
    }
    if(typeof this.data.features !== 'undefined') {
      data.args.push(this.data.features);
    }
    if (typeof this.data.cmd !== 'undefined') {
      data.cmd = this.data.cmd;
    }

    var done = this.async();

    behatRunner(data, function(err, res) {
      if (err) {
        grunt.warn(err);
        done(false);

        return;
      }

      done();
    });
  });

  function hasUndefinedSteps(res){
    var regexp = new RegExp("undefined");
    return regexp.test(res);
  }

  function hasFailedSteps(res){
    var regexp = new RegExp('fail', 'i');
    return regexp.test(res);
  }
  // ==========================================================================
  // HELPERS
  // ==========================================================================

  function behatRunner(data, callback) {

    var spawn = require('child_process').spawn,
    behat     = spawn(data.cmd, data.args),
    stderr    = '',
    stdout    = '',
    options   = data.options || {};

    if(typeof options.failOnUndefined === 'undefined') {
      options.failOnUndefined = false;
    }
    if(typeof options.failOnFailed === 'undefined') {
      options.failOnFailed = true;
    }

    behat.stdout.on('data', function (data) {
      stdout += data;
    });

    behat.stderr.on('data', function (data) {
      stderr += data;
    });

    behat.on('exit', function (code) {
      if (code === 127) {
        grunt.log.errorlns(
          'In order for this task to work properly, Behat must be ' +
          'installed and in the system PATH (if you can run "behat" at' +
          ' the command line, this task should work). Unfortunately, ' +
          'Behat cannot be installed automatically via npm or grunt. ' +
          'See the Behat installation instructions: ' +
          'http://docs.behat.org/quick_intro.html#installation'
        );
        grunt.warn('Behat not found.', code);
      }
      else {
        if(options.failOnUndefined && hasUndefinedSteps(stdout)) {
          grunt.verbose.writeln(stdout);
          stderr = 'Undefined Steps';
          if(options.output) {
            stderr = stdout;
          }
        }
        if(options.failOnFailed && hasFailedSteps(stdout)) {
          grunt.verbose.writeln(stdout);
          stderr = 'Failed Steps';
          if(options.output) {
            stderr = stdout;
          }
        }
        if (stderr === '' && options.output) {
            grunt.log.write(stdout);
        }
      }
      callback(stderr, stdout);
    });

  };

};
