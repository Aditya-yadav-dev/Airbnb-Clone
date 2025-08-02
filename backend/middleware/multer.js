
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
    // cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })
export default upload;


// import multer from 'multer';
// import fs from 'fs';

// const dir = './public';
// if (!fs.existsSync(dir)) {
//   fs.mkdirSync(dir);
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, dir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

// export default upload;
