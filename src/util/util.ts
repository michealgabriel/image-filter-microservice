
import fs from "fs";
import Jimp = require("jimp");

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const photo = await Jimp.read(inputURL);
      const outpath = "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      photo
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(__dirname + outpath, (img) => {
                resolve(__dirname + outpath);
            });
    } catch (error) {
      reject(error);
    }
  });
}


// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(__dirname + '\\tmp\\' + file);
    // console.log(__dirname + '\\tmp\\' + file);
  }
}


// deleteLocalDir
// delete the tmp directory on a go
export async function deleteLocalDir() {
  fs.unlinkSync(__dirname + '\\tmp');
}


// getFilesInDir
// get all files in tmp directory
export async function getFilesInDir() {
  const files: string[] = fs.readdirSync(__dirname + '\\tmp');
  // console.log(files);
  return files;
}