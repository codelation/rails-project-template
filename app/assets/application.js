// Load the bundle's main stylesheet
require('./application.scss');

// Load all initializers
import './initializers/*.js';

// Make all images available using the file-loader
import './images/**/!(.DS_Store|.gitkeep)';
