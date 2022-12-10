# AWS Image Filter Microservice

An AWS cloud applicatiion that processes live images and filters them.

### Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

```typescript
import {filterImageFromURL, deleteLocalFiles} from './util/util';
```

### Deploying your system

`eb init` a new application and `eb create` a new environment to deploy your image-filter service! You can use `eb deploy` to push changes.
