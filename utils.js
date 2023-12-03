import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder where the file will be saved
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        // Set the filename to be unique (you can customize this logic)
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Create the multer instance with the storage configuration
export const upload = multer({ storage: storage });
