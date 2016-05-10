# JavaScript Views

The JavaScript views in this directory are automatically mounted and unmounted
by the view loader based on the loaded controller and action.

## Defining a JavaScript View

A JavaScript view should be named after the controller and action so it can be loaded
automatically.

**Example:**

If we have a `RegistrationsController` and a `new` action, we would create a JS file
named `registrations/new.js` in the `views` directory. The file names should match
the names of the HTML views.

A view class contains two functions: `mount` and `unmount`:

```js
// views/registrations/new.js
export default class {
  // Run after the page is loaded and ready
  mount() {
    console.log('RegistrationsNewView mounted');
  }

  // Run when a new page is visited, before the new view is mounted.
  unmount() {
    console.log('RegistrationsNewView unmounted');
  }
}
```

## Shared JavaScript Views

There will be times when the same JavaScript View needs to be mounted on multiple pages.
There are a couple of ways we can share view code across pages.

### Inherit from a single view

If we have a shared form on `registrations#new` and `registrations#edit`, we might need the same JS on both pages.

**RegistrationsFormView**

The `RegistrationsFormView` will include the code that should be run on both pages.

```js
// views/registrations/form.js
export default class {
  mount() {
    // Initialize special form fields or whatever
  }

  unmount() {
    // Teardown
  }
}
```

**RegistrationsNewView**

The `RegistrationsNewView` inherits from `RegistrationsFormView`
so we can call its super functions for mount and unmount.

```js
// views/registrations/new.js
import RegistrationsFormView from 'form';

export default class extends RegistrationsFormView {
  mount() {
    // Call the RegistrationsFormView's mount function
    super.mount();

    // Run any additional JS specific to registrations#new
  }

  unmount() {
    // Call the RegistrationsFormView's unmount function
    super.unmount();

    // Any additional teardown
  }
}
```

**RegistrationsEditView**

The `RegistrationsEditView` would also inherit from `RegistrationsFormView`
and calls the super functions to perform the shared code.

```js
// views/registrations/edit.js
import RegistrationsFormView from 'form';

export default class extends RegistrationsFormView {
  mount() {
    // Call the RegistrationsFormView's mount function
    super.mount();

    // Run any additional JS specific to registrations#edit
  }

  unmount() {
    // Call the RegistrationsFormView's unmount function
    super.unmount();

    // Any additional teardown
  }
}
```

### Import the view and call `mount` and `unmount`

View inheritance works for pages that are similar, but we might want to use the
`RegistrationsFormView` on a lot of different pages.

We can import the `RegistrationsFormView` and mount it manually on each page:

```js
// views/pages/some-landing-page.js
import RegistrationsFormView from 'form';
let registrationsFormView = new RegistrationsFormView();

export default class {
  mount() {
    registrationsFormView.mount();

    // Run any additional JS specific to pages#some_landing_page
  }

  unmount() {
    // Call the RegistrationsFormView's unmount function
    registrationsFormView.unmount();

    // Any additional teardown
  }
}
```
