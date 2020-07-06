const fs = require('fs');
const del = require('del');
const gulp = require('gulp');
const zip = require('gulp-zip');
const rollup = require('rollup');
const connect = require('gulp-connect');

const {
    clearConsole,
    build,
} = require('./config/util');

const config = require('./package.json');
const pack_config = require('./config/gulp.config');
const dev_config = require('./config/dev.config');

const project_name = config.name;

gulp.task('clean', done => {
    del([
        'release/**',
        '!release',
        pack_config.output.file+'**',
    ]).then(() => {
        done();
    });
});

gulp.task('pack', callback => {
    const inputOptions = {
        input: pack_config.input,
        plugins: pack_config.plugins,
    },
    outputOptions = pack_config.output;

    build(inputOptions, outputOptions).then(() => {
        callback();
        console.log(new Date().toLocaleTimeString());
    });
})
gulp.task('watch', done => {
    const outputOptions = Object.assign({sourcemap: true}, pack_config.output);
    const watchOptions = {
        input: pack_config.input,
        output: outputOptions,
        watch: pack_config.watch
    };

    const watcher = rollup.watch(watchOptions);
    watcher.on('event', event => {
        if(event.code === 'START') {
            // clearConsole();
        }
        else if(event.code === 'END') {
            console.log(new Date().toLocaleTimeString());
        }
        else if(event.code === 'BUNDLE_END') {
            gulp.src(event.result.watchFiles)
                .pipe(connect.reload());
        }
    })
    done();
})

gulp.task('pack-min', gulp.series(
    'clean', 
    gulp.parallel('pack')
))


gulp.task('release-zip', realease_zip);
function realease_zip(){
    return gulp.src([
                'project/**',
            ])
            .pipe(zip(project_name + '.zip'))
            .pipe(gulp.dest('release'));
}

gulp.task('release', gulp.series(
    'clean', 
    gulp.parallel('pack-min'), 
    'release-zip',
    done => {
        done();
    }
));


gulp.task('create-release-fold', done => {
    if(!fs.existsSync('release')) {
        fs.mkdirSync('release');
    }
    done();
})

gulp.task('project-copy', gulp.parallel(
    () => gulp.src(['config/**'])
        .pipe(gulp.dest('release/dist/config')),
    () => gulp.src(['project/**'])
        .pipe(gulp.dest('release/dist/project')),
    () => gulp.src(['src/**'])
        .pipe(gulp.dest('release/dist/src')),
    () => gulp.src(['gulpfile.js', '.babelrc', 'package.json', 'README.md'])
        .pipe(gulp.dest('release/dist')),
    done => done()
))

gulp.task('project-zip', (done) => {
    return gulp.src(['release/dist/**'], {dot: true})
            .pipe(zip(project_name + '-project.zip'))
            .pipe(gulp.dest('release'));
});

gulp.task('project', gulp.series(
    'clean',
    gulp.parallel('create-release-fold', 'pack'),
    'project-copy',
    'project-zip',
    done => done()
))