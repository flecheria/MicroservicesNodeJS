const config = require('./config/config.json');

class Utils {

    static getHost = (service) => {
        // configuration
        const host = true // [process.env.NODE_ENV] === 'production'
            ? config.production.host
            : `${config.development.host}:${config.development.port[service]}`; // eslint-disable-next-line
        
            // debug
        console.log(`host: ${host}`)

        return host;
    };
};

export default Utils;
