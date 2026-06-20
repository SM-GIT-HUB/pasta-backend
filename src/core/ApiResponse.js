
class ApiResponse {
    constructor(message, data = null)
    {
        this.data = data;
        this.success = true;
        this.message = message;
    }
}

export default ApiResponse