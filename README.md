# Contact API Documentation

This API endpoint allows you to send contact information via a POST request.

## Endpoint

```
POST https://api-dympulse.vercel.app/api/contact
```

## Request Body

The request body must be sent as JSON with the following structure:

```json
{
  "name": "", // Required. The name of the person.
  "email": "", // Required. A valid email address.
  "subject": "", // Required. The subject of the message.
  "message": "" // Required. The message content.
}
```

### Example Request

```bash
curl -X POST https://api-dympulse.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "subject": "Inquiry about services",
    "message": "Hello, I would like to know more about your services."
  }'
```

## Response

- **200 OK**: The request was successful, and the message was received.
- **400 Bad Request**: The request body is missing required fields or has invalid data.

## Notes

- Ensure the `Content-Type` header is set to `application/json`.
- All fields are required for the request to be valid.
