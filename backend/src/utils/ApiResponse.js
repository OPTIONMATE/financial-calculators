/**
 * Custom API Response class
 * Standardizes all success responses
 */
class ApiResponse {
  constructor(data, message = 'Success') {
    this.success = true;
    this.data = data;
    this.message = message;
  }

  // Factory method for consistent response creation
  static success(data, message = 'Success') {
    return new ApiResponse(data, message);
  }
}

module.exports = ApiResponse;
