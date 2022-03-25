# Casefile Management API
---

**Environments**
- Node version - v14.17.0


## Technologies used 
- NodeJS
- ExpressJS
- Typescript
- ESLint


**Overview**

A case file contains the tasks, history, and comments that are associated with the case. It mostly contains the documents used for the case, and essential details of every event which will allow anyone who picks up the file to track the history of the file as well as what is expected for the nearest future.

Below, is a typical engagement flow from the point of contact with a client till the end of their case

"From the point of contact, we get the brief of what the client wants, we then summarize to them to be sure we got the brief. We then issue an engagement letter outlining what is expected of us in terms of services to be rendered. Afterwhich we give regular updates as events unfold and in some cases, we hold regular meetings to evaluate the progress and restrategize if need be"


After the Firm’s services conclude, the Firm will, upon Client’s request, deliver the file for this matter to Client. If the Client does not request the file for this matter, the Firm will retain it for a period of five years after the matter is closed. If Client does not request delivery of the file for this matter before the end of the five-year period, the Firm will have no further obligation to retain the file and may, at the Firm’s discretion, destroy it without further notice to Client.
--- 



## Getting Started
- Clone the repo

`$ git clone https://github.com/Sholias-LP/casefile-management-api.git`

- Install dependencies by running

`$ npm install`

- Linting

`$ npm run lint`

- To start the application, run

`$ npm start`


---

## Sample ENDPOINTS

- Root route

`localhost:3000/`

- Users route

`localhost:3000/users`

---

## The Design Principles used are:

- DRY Principle
- KISS Principle
- YAGNI Principle


### DRY Principle:

```
I utilized this principle to make my code more composed and simpler to keep up. And furthermore spare my time at whatever point I need to change something later on.
```

### KISS Principle:

```
I utilized this principle to make it simpler for other software engineers to envision the different parts of the applications, intellectually planning the potential impacts of any change.
```

### YAGNI Principle:

```
I utilized this principle since it abstains from investing energy on features that may not be used and helps me avoid feature creep.
```

---

**Author:** Giwa Jossy

