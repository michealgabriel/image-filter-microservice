import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, getFilesInDir} from './util/util';
import { setTimeout } from 'timers';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8000;
  
  // Use the body parser middleware for post requests
  app.use((req, res, next) => {
    bodyParser.json();
    res.header('Access-Control-Allow-Origin', '*');

    next();
  }
);


  app.get('/api/v0/filteredImage', async (req: Request, res: Response) => {
    const image_url: string = req.query.image_url as string;
      if(!image_url){
          // require image url query param
          res.status(422).send({message: "an image url is required"});
      }else{
          try{
            const return_data: string = await filterImageFromURL(image_url);
            res.sendFile(return_data);

            // set timeout of 0.5 second (500) before removing files in tmp directory
            setTimeout(async () => {
              const localFiles: string[] = await getFilesInDir();
              await deleteLocalFiles(localFiles);
            }, 500); 

          }catch(ex) {
            console.log(ex);
            res.status(500).send({message: "sorry, something went wrong on our side. we're on it"});
          }
      }
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET api/v0/filteredImage?image_url={{any public image link}}");
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();