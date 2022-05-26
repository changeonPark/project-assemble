
//import fs from "fs";
//const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

export const testAuthentication = () => {
    const url = `https://api.pinata.cloud/data/pinning/pinFileToIPFS`;
//we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    //data.append('file', fs.createReadStream('./yourfile.png'));

    //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
    //metadata is optional
    const metadata = JSON.stringify({
        name: 'testname',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);


    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: process.env.PINATA_API_KEY,
                pinata_secret_api_key: process.env.PINATA_API_SECRETKEY
            }
        })
        .then(function (response:any) {
            console.log("response:",response);
        })
        .catch(function (error:any) {
            console.log("error:",error);
        });



         // NEXT JS  Sample PINATA
        // convert file into binary
    //   const data = new FormData();
    //   data.append("title", file.name);
    //   data.append("file", file);

    //  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    //     // pass binary data into post request
    //     const result = await axios.post(url, data, {
    //       maxContentLength: -1,
    //       headers: {
    //         "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
    //         pinata_api_key: "your_pinata_key",
    //         pinata_secret_api_key:
    //           "your_pinata_secret",
    //         path: "somename",
    //       },
    //     });
    //     console.log("RESULT", result);
};