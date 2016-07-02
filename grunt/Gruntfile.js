module.exports = function(grunt) {


grunt.initConfig({
  concat: 
    {
        options: 
        {
          separator: ';',
        },
        css: 
        {
          src: ['lib/scc/*.css'],
          dest: 'dist/common.css',
        },
    
    },
  
  watch: 
    {
        css: 
        {
          files: ['lib/css/*.css'],
          tasks: ['concat'],
        
        },
        css: 
        {
          files: ['lib/less/*.less'],
          tasks: ['less'],
        
        },
    },

    less: 
    {
        development: 
        {
            options: 
            {
                paths: ['lib/less']
             },
            files: 
            {
                 'lib/css/less.css': 'lib/less/*.less'
            },
        },
    },
  
  
});

grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-less');
}