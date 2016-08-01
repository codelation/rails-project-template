import camelize from 'camelize';
import dasherize from 'dasherize';
import isPlainObject from 'lodash.isplainobject';
import pluralize from 'pluralize';

function pluralDasherize(key) {
  return dasherize(pluralize(key));
}

// Load Array Polyfills if needed
if (Array.find === undefined) {
  Array.find = require('core-js/fn/array/find');
}
if (Array.prototype.forEach === undefined) {
  Array.prototype.forEach = require('core-js/fn/array/for-each');
}

/**
  A serializer/deserializer for working with JSON API (http://jsonapi.org) compliant data.

  ```js
  import JsonApiSerializer from 'jsonapi-serializer';

  const serializer = new JsonApiSerializer();
  ```
*/
class JsonApiSerializer {
  /**
    Deserializes the JSON returned from an API into an object or array of objects.

    ```js
    let json = {
      "data": [{
        "id": "1",
        "type": "blog-posts",
        "attributes": {
          "author-name": "Brian Pattison",
          "title": "How to Tie Your Shoes"
        },
        "relationships": {
          "comments": {
            "data": [
              {
                "type": "comments",
                "id": "7"
              }
            ]
          }
        }
      }],
      "included": [{
        "id": "7",
        "type": "comments",
        "attributes": {
          "content": "Your blog post helped me so much! Thanks!"
        }
      }]
    };

    let records = serializer.deserialize(json);
    let blogPost = records[0];
    console.log(`The blog post "${blogPost.title}" was written by ${blogPost.authorName}.`);
    ```

    @method deserialize
    @param {Object} json
    @return {Object|Object[]}
  */
  deserialize(json) {
    if (Array.isArray(json.data)) {
      return json.data.map(function(item) {
        let itemJson = {};
        Object.assign(itemJson, json);
        itemJson.data = item;
        return this.deserialize(itemJson);
      }, this);
    }

    return Object.assign(this._extractAttributesFromJson(json), this._extractRelationshipsFromJson(json));
  }

  /**
    Parses errors returned by the API and parses them so the errors are tied
    to their related attributes or to an array of "base" errors.

    ```js
    TODO: Document example
    ```

    @method deserialize
    @param {Object} json
    @return {Object}
  */
  parseErrors(errors) {
    let parsedErrors = {};

    errors.forEach(function(error) {
      let attribute = 'base';

      if (error.source != null) {
        attribute = error.source.pointer.split('/').slice(-1);
      }

      let existingErrors = parsedErrors[attribute];
      if (existingErrors === undefined) {
        parsedErrors[attribute] = [];
      }

      let errorMessage = attribute === 'base' ? error.detail : error.title;
      parsedErrors[attribute].push(errorMessage);
    });

    return parsedErrors;
  }

  /**
    Serializes an object or array of objects into JSON complaint with the JSON API specification.

    ```js
    let blogPost = {
      title:      'How to Tie Your Shoes',
      authorName: 'Brian Pattison',
      comments: [
        content: 'Your blog post helped me so much! Thanks!'
      ]
    };

    let json = serializer.serialize('blog-posts', blogPost);

    fetch('/blog-posts', {
      body: JSON.stringify(json),
      headers: {
        'Accept':       'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      },
      method: 'POST'
    });
    ```

    @method serialize
    @param {String} type
    @param {Object} record
    @return {Object}
  */
  serialize(type, record) {
    return {
      data: this._extractDataFromRecord(type, record)
    };
  }

  _extractAttributesFromJson(json) {
    let attributes = {
      id:   json.data.id,
      type: json.data.type
    };

    Object.keys(json.data.attributes).forEach(function(key) {
      attributes[camelize(key)] = json.data.attributes[key];
    });

    return attributes;
  }

  _extractAttributesFromRecord(record) {
    let attributes = {};

    Object.keys(record).forEach(function(key) {
      let value = record[key];
      if (!Array.isArray(value) && !isPlainObject(value)) {
        attributes[dasherize(key)] = value;
      }
    });

    return attributes;
  }

  _extractDataFromRecord(type, record) {
    if (Array.isArray(record)) {
      return record.map(function(item) {
        return this._extractDataFromRecord(item);
      }, this);
    }

    let data = { type };
    if (record.id != null) {
      data.id = record.id + '';
    }

    delete record.id;
    delete record.type;

    data.attributes = this._extractAttributesFromRecord(record);
    data.relationships = this._extractRelationshipsFromRecord(record);

    return data;
  }

  _extractRelationshipFromJson(json, related) {
    if (Array.isArray(related)) {
      return related.map(function(item) {
        return this._extractRelationshipFromJson(json, item);
      }, this);
    }

    let record = { included: json.included };

    record.data = Array.find(json.included, function(item) {
      return item.id === related.id && item.type === related.type;
    });

    if (record.data.relationships === undefined) {
      record.data.relationships = {};
    }

    return Object.assign(this._extractAttributesFromJson(record), this._extractRelationshipsFromJson(record));
  }

  _extractRelationshipsFromRecord(record) {
    let relationships = {};

    Object.keys(record).forEach(function(key) {
      let value = record[key];

      if (Array.isArray(value)) {
        relationships[dasherize(key)] = {
          data: value.map(function(item) {
            return {
              id:   item.id + '',
              type: item.type
            };
          }, this)
        };
      } else if (isPlainObject(value)) {
        relationships[dasherize(key)] = {
          data: {
            id:   value.id + '',
            type: value.type
          }
        };
      }
    }, this);

    return relationships;
  }

  _extractRelationshipsFromJson(json) {
    if (json.data.relationships === undefined) { return {}; }

    let relationships = {};

    Object.keys(json.data.relationships).forEach(function(key) {
      let value = json.data.relationships[key];
      if (value.data) {
        relationships[camelize(key)] = this._extractRelationshipFromJson(json, value.data);
      }
    }, this);

    return relationships;
  }
}

/**
  A client JSON API (http://jsonapi.org) compliant APIs.
*/

// Load Promise Polyfill
if (typeof Promise === 'undefined') {
  const Promise = require('core-js/fn/promise');
}

class JsonApiClient {
  /**
    Initialize a client object for performing API actions by specifying the API endpoint.

    ```js
    import JsonApiClient from 'jsonapi-client';

    const client = new JsonApiClient('http://localhost:3000/api');
    ```

    @method constructor
    @param {String} endpoint
    @return {JsonApiClient}
  */
  constructor(endpoint) {
    if (endpoint === undefined) { endpoint = '/'; }
    this.endpoint = endpoint;
    this.serializer = new JsonApiSerializer();
  }

  /**
    Serializes the record and sends it to the server to create a record with the given type.

    ```js
    let blogPost = {
      title:      'How to Tie Your Shoes',
      authorName: 'Brian Pattison'
    };

    // POST /blog-posts
    client.create('blog-posts', blogPost).then(function(savedPost) {
      console.log('New post ID:', savedPost.id);
    });
    ```

    @method create
    @param {String} type
    @param {Object} record
    @param {Object} options
    @return {Promise}
  */
  create(type, record, options) {
    if (options === undefined) { options = {}; }

    // Build the request
    let request = new XMLHttpRequest();
    let serializer = this.serializer;
    let url = `${this._urlForType(type)}${this._queryStringFromOptions(options)}`;
    request.open('POST', url, true);
    request = this._setHeaders(request);

    let promise = new Promise(function(resolve, reject) {
      request.onreadystatechange = function() {
        // We only care when the request has finished
        if (request.readyState !== 4) { return; }

        // If we're not getting back a JSON API response, something went wrong
        if ((request.getResponseHeader('Content-Type') + '').indexOf('application/vnd.api+json') < 0) {
          let error = request.statusText;
          if (error + '' === '') {
            error = 'There was a problem with the submission.';
          }
          return reject({ base: [error] });
        }

        // Not all JSON responses are successful. It's possible that a JSON response may
        // contain error information such as a bad filter or include on the request.
        let json = JSON.parse(request.responseText);

        switch (request.status) {
        case 201:
          resolve(serializer.deserialize(json));
          return;
        case 202, 204:
          resolve(record);
          return;
        }

        if (json.hasOwnProperty('errors')) {
          reject(serializer.parseErrors(json.errors));
        } else {
          reject(json);
        }
      };
    });

    request.send(JSON.stringify(serializer.serialize(type, record)));
    return promise;
  }

  /**
    Sends the record's id to the server to delete the record with the given type.

    ```js
    // DELETE /blog-posts/1
    client.delete('blog-posts', 1).then(function(response) {
      // Do something...
    });
    ```

    @method delete
    @param {String} type
    @param {String} id
    @return {Promise}
  */
  delete(type, id) {
    // Build the request
    let request = new XMLHttpRequest();
    let serializer = this.serializer;
    let url = `${this._urlForType(type)}/${id}`;
    request.open('DELETE', url, true);
    request = this._setHeaders(request);

    let promise = new Promise(function(resolve, reject) {
      request.onreadystatechange = function() {
        // We only care when the request has finished
        if (request.readyState !== 4) { return; }

        // If we're not getting back a JSON API response, something went wrong
        if ((request.getResponseHeader('Content-Type') + '').indexOf('application/vnd.api+json') < 0) {
          return reject({ base: [request.statusText] });
        }

        // Not all JSON responses are successful. It's possible that a JSON response may
        // contain error information such as a bad filter or include on the request.
        let json = JSON.parse(request.responseText);

        switch (request.status) {
        case 200:
          resolve(serializer.deserialize(json));
          return;
        case 202, 204:
          resolve(id);
          return;
        }

        if (json.hasOwnProperty('errors')) {
          reject(serializer.parseErrors(json.errors));
        } else {
          reject(json);
        }
      };
    });

    request.send();
    return promise;
  }

  /**
    Fetches the record with the given id and type and deserializes the returned
    JSON into an object with the option to include related data.

    ```js
    let options = {
      include: ['comments']
    };

    // GET /blog-posts/1?include=comments
    client.find('blog-posts', 1, options).then(function(blogPost) {
      console.log('Number of comments:', blogPost.comments.length);
    });
    ```

    @method find
    @param {String} type
    @param {String} id
    @param {Object} options
    @return {Promise}
  */
  find(type, id, options) {
    if (options === undefined) { options = {}; }

    // Build the request
    let request = new XMLHttpRequest();
    let serializer = this.serializer;
    let url = `${this._urlForType(type)}/${id}${this._queryStringFromOptions(options)}`;
    request.open('GET', url, true);
    request = this._setHeaders(request);

    let promise = new Promise(function(resolve, reject) {
      request.onreadystatechange = function() {
        // We only care when the request has finished
        if (request.readyState !== 4) { return; }

        // If we're not getting back a JSON API response, something went wrong
        if ((request.getResponseHeader('Content-Type') + '').indexOf('application/vnd.api+json') < 0) {
          throw new Error(request.statusText);
        }

        // Not all JSON responses are successful. It's possible that a JSON response may
        // contain error information such as a bad filter or include on the request.
        let json = JSON.parse(request.responseText);
        if (request.status === 200) {
          resolve(serializer.deserialize(json));
        } else {
          reject(json);
        }
      };
    });

    request.send();
    return promise;
  }

  /**
    Return all records of a given type. Pagination data is also returned.

    ```js
    // GET /blog-posts
    client.findAll('blog-posts').then(function(payload) {
      console.log('Number of posts returned:', payload.records.length);
      console.log('URL for next page of results:', payload.links.next);
    });
    ```

    Include, pagination, and filtering are supported options:

    ```js
    let options = {
      filter: {
        after:       '2016-05-01',
        before:      '2016-05-27',
        isPublished: true
      },
      include: ['comments', 'comments.author'],
      page: {
        number: 2,
        size:   10
      }
    };

    // GET /blog-posts?filter[after]=2016-05-01&filter[before]=2016-05-27&filter[is-published]=true&include=comments,comments.author&page[number]=true&page[size]=10
    client.findAll('blog-posts', options).then(function(payload) {
      console.log('Number of posts returned:', payload.records.length);
      console.log('URL for next page of results:', payload.links.next);
    });
    ```

    @method findAll
    @param {String} type
    @param {Object} options
    @return {Promise}
  */
  findAll(type, options) {
    if (options === undefined) { options = {}; }

    // Build the request
    let request = new XMLHttpRequest();
    let serializer = this.serializer;
    let url = `${this._urlForType(type)}${this._queryStringFromOptions(options)}`;
    request.open('GET', url, true);
    request = this._setHeaders(request);

    let promise = new Promise(function(resolve, reject) {
      request.onreadystatechange = function() {
        // We only care when the request has finished
        if (request.readyState !== 4) { return; }

        // If we're not getting back a JSON API response, something went wrong
        if ((request.getResponseHeader('Content-Type') + '').indexOf('application/vnd.api+json') < 0) {
          throw new Error(request.statusText);
        }

        // Not all JSON responses are successful. It's possible that a JSON response may
        // contain error information such as a bad filter or include on the request.
        let json = JSON.parse(request.responseText);
        if (request.status === 200) {
          resolve({
            links:   json.links,
            records: serializer.deserialize(json)
          });
        } else {
          reject(json);
        }
      };
    });

    request.send();
    return promise;
  }

  /**
    Serializes the record and sends it to the server to update an existing record with the given type.

    ```js
    let blogPost = {
      id:         1,
      title:      'How to Eat with Chopsticks',
      authorName: 'Brian Pattison'
    };

    // PATCH /blog-posts/1
    client.update('blog-posts', blogPost).then(function(savedPost) {
      console.log('New post title:', savedPost.title);
    });
    ```

    @method update
    @param {String} type
    @param {Object} record
    @param {Object} options
    @return {Promise}
  */
  update(type, record, options) {
    if (options === undefined) { options = {}; }

    // Build the request
    let request = new XMLHttpRequest();
    let serializer = this.serializer;
    let url = `${this._urlForType(type)}/${record.id}${this._queryStringFromOptions(options)}`;
    request.open('PATCH', url, true);
    request = this._setHeaders(request);

    let promise = new Promise(function(resolve, reject) {
      request.onreadystatechange = function() {
        // We only care when the request has finished
        if (request.readyState !== 4) { return; }

        // If we're not getting back a JSON API response, something went wrong
        if ((request.getResponseHeader('Content-Type') + '').indexOf('application/vnd.api+json') < 0) {
          let error = request.statusText;
          if (error + '' === '') {
            error = 'There was a problem with the submission.';
          }
          return reject({ base: [error] });
        }

        // Not all JSON responses are successful. It's possible that a JSON response may
        // contain error information such as a bad filter or include on the request.
        let json = JSON.parse(request.responseText);

        switch (request.status) {
        case 200:
          resolve(serializer.deserialize(json));
          return;
        case 202, 204:
          resolve(record);
          return;
        }

        if (json.hasOwnProperty('errors')) {
          reject(serializer.parseErrors(json.errors));
        } else {
          reject(json);
        }
      };
    });

    request.send(JSON.stringify(serializer.serialize(type, record)));
    return promise;
  }

  _queryStringFromOptions(options) {
    let queries = [];

    if (options.filter !== undefined) {
      Object.keys(options.filter).forEach(function(key) {
        queries.push(`filter[${dasherize(key)}]=${options.filter[key]}`);
      });
    }

    if (options.include !== undefined) {
      queries.push(`include=${options.include.join(',')}`);
    }

    if (options.page !== undefined) {
      Object.keys(options.page).forEach(function(key) {
        queries.push(`page[${key}]=${options.page[key]}`);
      });
    }

    if (queries.length > 0) {
      return `?${queries.join('&')}`;
    } else {
      return '';
    }
  }

  _setHeaders(request) {
    request.setRequestHeader('Accept', 'application/vnd.api+json');
    request.setRequestHeader('Content-Type', 'application/vnd.api+json');

    let csrfTokenMeta = Array.find(document.getElementsByTagName('meta'), function(meta) {
      return meta.name === 'csrf-token';
    });

    if (csrfTokenMeta !== undefined) {
      request.setRequestHeader('X-CSRF-Token', csrfTokenMeta.content);
    }

    return request;
  }

  _urlForType(type) {
    let url = this.endpoint.replace(/\/$/, '').split('/');
    url.push(pluralDasherize(type));
    return url.join('/');
  }
}

export {
  JsonApiClient,
  JsonApiSerializer
};
