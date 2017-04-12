'use strict';

/**
 * Module dependencies.
 */
var mocha = require('mocha');

/**
 * Expose `JSON`.
 */

exports = module.exports = pencilReporter;

/**
 * Initialize a new `JSON` reporter.
 *
 * @api public
 * @param {Runner} runner
 */
function pencilReporter(runner) {
	mocha.reporters.Base.call(this, runner);

	var self = this;
	// var tests = [];
	// var pending = [];
	// var failures = [];
	var passes = [];

	// runner.on('test end', function(test) {
	// 	tests.push(test);
	// });

	runner.on('pass', function(test) {
		// passes.push(test);
		process.stdout.write(JSON.stringify(clean(test), null, 2));
	});

	// runner.on('fail', function(test) {
	// 	failures.push(test);
	// });

	// runner.on('pending', function(test) {
	// 	pending.push(test);
	// });

	// runner.on('end', function() {
	// 	var obj = {
	// 		stats: self.stats,
	// 		// tests: tests.map(clean),
	// 		// pending: pending.map(clean),
	// 		// failures: failures.map(clean),
	// 		passes: passes.map(clean)
	// 	};

	// 	runner.testResults = obj;

	// 	process.stdout.write(JSON.stringify(obj, null, 2));
	// });
}

/**
 * Return a plain-object representation of `test`
 * free of cyclic properties etc.
 *
 * @api private
 * @param {Object} test
 * @return {Object}
 */
function clean(test) {
	return {
		title: test.title,
		fullTitle: test.fullTitle(),
		duration: test.duration,
		currentRetry: test.currentRetry(),
		err: errorJSON(test.err || {})
	};
}

/**
 * Transform `error` into a JSON object.
 *
 * @api private
 * @param {Error} err
 * @return {Object}
 */
function errorJSON(err) {
	var res = {};
	Object.getOwnPropertyNames(err).forEach(function(key) {
		res[key] = err[key];
	}, err);
	return res;
}
