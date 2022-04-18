# Casefile Management API
Tracks and records the tasks, history, and comments that are associated with a case

## Environments
- Node version - v16.13.0


## Technologies used 
- NodeJS
- ExpressJS
- Typescript
- ESLint
- Supertest


## Overview

A case file contains the tasks, history, and comments that are associated with the case. It mostly contains the documents used for the case, and essential details of every event which will allow anyone who picks up the file to track the history of the file as well as what is expected for the nearest future.

Typical engagement flow from the point of contact with a client till the end of their case

"From the point of contact, we get the brief of what the client wants, we then summarize to them to be sure we got the brief. We then issue an engagement letter outlining what is expected of us in terms of services to be rendered. Afterwhich we give regular updates as events unfold and in some cases, we hold regular meetings to evaluate the progress and restrategize if need be"

After the Firm’s services conclude, the Firm will, upon Client’s request, deliver the file for this matter to Client. If the Client does not request the file for this matter, the Firm will retain it for a period of five years after the matter is closed. If Client does not request delivery of the file for this matter before the end of the five-year period, the Firm will have no further obligation to retain the file and may, at the Firm’s discretion, destroy it without further notice to Client.

## Getting Started

**Clone the repo**

```
$ git clone https://github.com/Sholias-LP/casefile-management-api.git
```

**Install dependencies**

```
$ yarn
```

**Linting**

```
$ yarn lint
```

**Test**

```
$ yarn test
```

**Start application**

```
$ yarn start
```


---

## Sample ENDPOINTS

**Root route** - `{{baseUrl}}/` - method (GET)

**Response format**

```json
{
    "status": {
        "code": 200,
        "message": "Success"
      },
      "message": "Welcome to the Casefile Management Syetem API"
}
```


**USER**

**Register a user** - `{{baseUrl}}/api/v1/users/register` - method (POST)

**payload**

```json
{
    "firstName":"Sheila",
    "lastName":"Awanle",
    "email":"sheila@sholiaslp.com",
    "role":"partner",
    "password":"sheila",
    "confirmPassword":"sheila"
}
```

**Response format**

```json
{
  "success": true,
    "message": "Sign Up Sucessful!",
    "data": {
        "fullname": "Sheila Awanle",
        "email": "sheila@sholiaslp.com",
        "role": "partner",
        "token": "{{{SAMPLE TOKEN, OBVIOUSLY}}}eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJOaWtlIiwibGFzdE5hbWUiOiJBZGVyaWJpZ2JlIiwiZW1haWwiOiJkZW5pa2VAc2hvbGlhc2xwLmNvbW1tIiwiaWQiOjQxLCJyb2xlIjoiYXNzb2NpYXRlIiwiaWF0IjoxNjUwMzA3NDUyfQ.Uab9sU0BAvqFzc7eN8523j-9qx41LqCsTvV-PAYFk10"
    }
}
```

---

**CASEFILE**

**Create a casefile** - `{{baseUrl}}/api/v1/casefiles/new` - method (POST)

**payload**
```json
{
    "caseID":"SHO_35RD69_LP",
    "caseType":"Divorce",
    "client":"Wanye Kest",
    "gender":"Male",
    "occupation":"Rapper",
    "brief":"This is simply a dummy summary of the client_s brief. Some more dummy content. Some more dummy content. Some more dummy content. Some more dummy content. Some more dummy content.",
    "letter_of_engagement":"A draft of the letter of engagement. Some more dummy content. Some more dummy content. Some more dummy content. Some more dummy content. Some more dummy content. Some more dummy content. Some more dummy content."
}

```

**Response format**

```json
{
  "success": true,
    "message": "Casefile added successfully",
    "data": {
        "id": 12,
        "caseID": "SHO_fbb42fb6-8f0a-4a91-a52d-9091a89a6d49",
        "caseType": "Divorce",
        "client": "Wanye Kest",
        "gender": "Male",
        "occupation": "Rapper",
        "brief": "This is simply a dummy summary of the client_s brief. Some more dummy content. Some more dummy content. Some more dummy content. Some more dummy content. Some more dummy content.",
        "letter_of_engagement": "A draft of the letter of engagement. Some more dummy content. Some more dummy content. Some more dummy content. Some more dummy content. Some more dummy content. Some more dummy content. Some more dummy content.",
        "updatedAt": "2022-04-18T18:50:59.895Z",
        "createdAt": "2022-04-18T18:50:59.895Z"
    }
}
```


---

## The Design Principles used are:

- DRY Principle
- KISS Principle
- YAGNI Principle


### DRY Principle:

```
Utilized this principle to make the code more composed and simpler to keep up. And furthermore spare time at whatever point we need to change something later on.
```

### KISS Principle:

```
Utilized this principle to make it simpler for other software engineers to envision the different parts of the applications, intellectually planning the potential impacts of any change.
```

### YAGNI Principle:

```
Utilized this principle since it abstains from investing energy on features that may not be used and helps us avoid feature creep.
```

---

**Authors:** [Giwa Jossy](https://github.com/giwajossy) & [Janet Ogenyi](https://github.com/JanetEne):

