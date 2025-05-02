import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },
    filename:function(req, file, cb){
        const uniqfname = Date.now() + "-" + file.originalname;
        cb(null, uniqfname);
    }
})

const upload = multer({storage:storage});
export default upload