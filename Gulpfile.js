const gulp = require('gulp')
const exec = require('child_process').exec

gulp.task('jsdoc', () => {
  return exec('jsdoc -c jsdoc.conf')
})
