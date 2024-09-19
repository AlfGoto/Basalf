**Basalf - A JavaScript library to interact with the Basalf.fr API**

This library provides a simple interface to interact with the Basalf.fr API. It allows you to insert, update, delete and select data in your Basalf.fr tables.

### Installation

Assuming you have Node.js and npm installed, you can install the Basalf library using the following command:

```bash
npm install basalf
```

### Utilisation

Here's a basic example of how to use the Basalf library:

```javascript
import Basalf from 'basalf';

const apiKey = 'YOUR_API_KEY';

const basalf = new Basalf(apiKey);
```

Insert a new record into the 'users' table
```
basalf.from('users')
  .insert({ name: 'John Doe', email: 'john.doe@example.com' })
  .where({ id: 1 })
  .then(response => {
    if (response.error) {
      console.error(response.error);
    } else {
      console.log('Record inserted successfully:', response.results);
    }
  });
```

Update an existing record in the 'users' table
```
basalf.from('users')
  .where({ id: 1 })
  .update({ email: 'new_email@example.com' })
  .then(response => {
    if (response.error) {
      console.error(response.error);
    } else {
      console.log('Record updated successfully:', response.results);
    }
  });
```

Select all records from the 'users' table
```
basalf.from('users')
  .select()
  .then(response => {
    if (response.error) {
      console.error(response.error);
    } else {
      console.log('Users:', response.results);
    }
  });
  ```

Delete a record from the 'users' table
```
basalf.from('users')
  .where({ id: 2 })
  .del()
  .then(response => {
    if (response.error) {
      console.error(response.error);
    } else {
      console.log('Record deleted successfully:', response.results);
    }
  });
```

### API Reference

The Basalf library provides the following methods:

* **constructor(apiKey):** Creates a new Basalf instance with your API key.
* **from(Table name):** Specifies the table you want to interact with.
* **where(object):** Defines a WHERE clause to filter results.
* **limit(string):** Limits the number of returned results.
* **select(string):** Selects data from the specified table, can be empty.
* **insert(object):** Inserts a new record into the specified table.
* **update(object):** Updates an existing record in the specified table.
* **del():** Deletes a record from the specified table.

### Additional Notes

* Error handling is included in each method to catch potential exceptions during API calls.

For more information on the Basalf.fr API, please refer to their official documentation.
