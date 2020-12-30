
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';

import crypto from 'crypto';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

export default {
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET || '',
        acl: 'public-read',
        key: function (req, file, cb) {
            const hash = crypto.randomBytes(16).toString('hex');
            cb(null, `ecoleta/${hash}-${file.originalname}`);
        }
    })
}