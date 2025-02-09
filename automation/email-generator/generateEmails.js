import fs from "fs";
import { parse } from "json2csv";

const padTwoDigits = (num) => num.toString().padStart(2, "0");

const generateDate = function (date) {
  const thisMonth = padTwoDigits(date.getMonth() + 1);
  const todayDate = padTwoDigits(date.getDate());
  const todayYear = date.getFullYear();
  return { thisMonth, todayDate, todayYear };
};

const assembleEmail = function (
  userName,
  month,
  day,
  year,
  upperLimit,
  domain,
  signifier = "default"
) {
  const emailArr = [];
  for (let i = 1; i <= upperLimit; i++) {
    let emailStr = ``;

    signifier === "default"
      ? (emailStr = `${userName}+${month}${day}${year}-${padTwoDigits(
          i
        )}@${domain}`)
      : (emailStr = `${userName}+${signifier}${month}${day}${year}-${padTwoDigits(
          i
        )}@${domain}`);
    emailArr.push(emailStr);
  }
  console.log("Function Log - Email Array: ", emailArr);
  return emailArr;
};

const details = {
  userName: "thalamoosie",
  domain: "thalamoosie.com",
  testPw: "SafeP4assword!",
};

const date = new Date();
const { thisMonth, todayDate, todayYear } = generateDate(date);
console.log(`Month: ${thisMonth} | Day: ${todayDate} | Year: ${todayYear}`);

let email = assembleEmail(
  details.userName,
  thisMonth,
  todayDate,
  todayYear,
  20,
  details.domain
);

// Write emails to a text file so I can admire them later
const data = email.join("\n");
console.log(data);

const pw = details.testPw;
const csvData = email.map((email) => ({ email, pw }));

console.log(csvData);

function checkCreateDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); // Use recursive to create parent directories if needed
    console.log(`Directory '${dirPath}' created.`);
  } else {
    console.log(`Directory ${dirPath} already exists`);
  }
}

function writeTextFile(data) {
  const outDir = "output/txt";
  checkCreateDir(outDir);
  fs.writeFile(`./${outDir}/-${new Date().getTime()}.txt`, data, (err) => {
    if (err) {
      console.log(`Error during email generation: ${err}`);
    } else {
      console.log(`Email addresses written to file.`);
    }
  });
}

function writeToCSV(data) {
  const outDir = "output/csv";
  checkCreateDir(outDir);
  const csv = parse(data);
  fs.writeFile(`./${outDir}/-${new Date().getTime()}.csv`, csv, (err) => {
    if (err) {
      console.log(`Error during csv write: ${err}`);
    } else {
      console.log(`Email addresses written to CSV file in ${outDir}`);
    }
  });
}

writeTextFile(data);
writeToCSV(csvData);
