const HTTPBaseError = require('./http_base_error');

const Resource_Not_Found_Error_Code = 2503;

class ResourceNotFoundError extends HTTPBaseError {
    constructor(resourceName, resourceId, httpMsg) {
        super(404, httpMsg, Resource_Not_Found_Error_Code, `${resourceName} is not found; this ${resourceName} is ${resourceId}`);
    }
}

module.exports = ResourceNotFoundError;