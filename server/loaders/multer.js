import multer from "multer";

// diskStorage를 사용할 경우
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})


// memoryStorage를 사용할 경우
//const multerStorage = multer.memoryStorage();
const upload = multer({ storage: storage })

// multer 라이브러리가 현재 텍스트를 latin1 으로 처리하여 한글로된 파일 이름이 깨지는 문제가 있다.
// Parser 함수를 따로 구현하여 사용하도록 한다.
export const fileNameParser = (fileName) =>
  Buffer.from(fileName, "latin1").toString("utf8");

// 파일 데이터 여러개, JSON으로 된 텍스트 데이터 하나를 받는 폼
export const articleFormDataHandler = upload.fields([
  { name: "img", maxCount: 1 },
  { name: "title", maxCount: 1 },
  { name: "exLink", maxCount: 1 },
  { name: "description", maxCount: 1 },
  { name: "category", maxCount: 1 },
  { name: "price", maxCount: 1 },
]);
