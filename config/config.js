
/*      Dependencies 
---------------------------*/
var env  = require('node-env-file')('./.env');
var info = new Object();
var root = require('app-root-path').path+'/';




/* App Settings
..................*/

info.NODE_ENV            =    process.env.NODE_ENV;

info.MONGO_URI           =    process.env.MONGO_URI;

info.SERVER_URI          =    process.env.SERVER_URI;



/* App Directory Paths
..................*/

info.IMG_DIR            =    root+'public/images/';

info.APP_DIR            =    root

info.FILE_DIR           =    root+'public/files/';

info.CONF_DIR           =    __dirname+'/';

info.LIB_DIR            =    root+'lib/';

info.CTRL_DIR           =    root+'controllers/';

info.MODEL_DIR          =    root+'models/'



/* App Secret Keys
..................*/

info.TOKEN_SECRET        =    process.env.TOKEN_SECRET;

info.FACEBOOK_SECRET     =    process.env.FACEBOOK_SECRET;

info.FOURSQUARE_SECRET   =    process.env.FOURSQUARE_SECRET;

info.GOOGLE_SECRET       =    process.env.GOOGLE_SECRET;

info.GITHUB_SECRET       =    process.env.GITHUB_SECRET;

info.INSTAGRAM_SECRET    =    process.env.INSTAGRAM_SECRET;

info.LINKEDIN_SECRET     =    process.env.LINKEDIN_SECRET;

info.TWITCH_SECRET       =    process.env.TWITCH_SECRET;

info.WINDOWS_LIVE_SECRET =    process.env.WINDOWS_LIVE_SECRET;

info.YAHOO_SECRET        =    process.env.YAHOO_SECRET;

info.BITBUCKET_SECRET    =    process.env.BITBUCKET_SECRET;

info.SPOTIFY_SECRET      =    process.env.SPOTIFY_SECRET;

info.TWITTER_SECRET      =    process.env.TWITTER_SECRET;




/* SMTP Settings
..................*/

info.SMTP_HOST           =    process.env.SMTP_HOST;

info.SMTP_USER           =    process.env.SMTP_USER;

info.SMTP_PASS           =    process.env.SMTP_PASS;














module.exports = info;



