const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filePath = path.resolve(__dirname, "input.txt");

const inputStream = fs.createReadStream(filePath);

var lineReader = readline.createInterface({
  input: inputStream,
  terminal: false,
});

let currentPath = "/";

const paths = ["/"];
const files = [];

const moveCurrentLevel = (directory) => {
  if (directory === "/") {
    currentPath = "/";
  } else if (directory === "..") {
    const paths = currentPath.split("/");
    paths.splice(-1, 1);
    currentPath = paths.length === 1 ? "/" : paths.join("/");
  } else {
    if (currentPath === "/") {
      currentPath = `/${directory}`;
    } else {
      currentPath = `${currentPath}/${directory}`;
    }
  }
};

const fileExists = (fileName) => {
  files.some((file) => {
    return file.path === currentPath && file.name === fileName;
  });
};

const addFile = (size, fileName) => {
  const sizeAsNumber = Number(size);

  if (fileExists(fileName)) {
    return;
  }

  files.push({
    path: currentPath,
    name: fileName,
    size: sizeAsNumber,
  });
};

const addPath = (dir) => {
  const currentPathParts = currentPath.split("/");
  const pathToAdd = currentPath === "/" ? `/${dir}` : `${currentPath}/${dir}`;

  if (!paths.includes(pathToAdd)) {
    paths.push(pathToAdd);
  }
  const parentPath = currentPathParts
    .slice(0, currentPathParts.length - 1)
    .join("/");

  if (parentPath && !paths.includes(parentPath)) {
    paths.push(parentPath);
  }
};

lineReader.on("line", function (line) {
  const lineParts = line.split(" ");

  if (!isNaN(lineParts[0])) {
    addFile(lineParts[0], lineParts[1]);
    return;
  }

  if (line.includes("$ cd")) {
    moveCurrentLevel(lineParts.at(-1));
    return;
  }

  if (line.startsWith("dir ")) {
    addPath(lineParts.at(-1));
  }
});

lineReader.on("close", () => {
  let result = {};
  let total = 0;

  paths.forEach((path) => {
    let count = 0;
    files.forEach((file) => {
      if (file.path.startsWith(path)) {
        count += file.size;
      }
    });

    if (result[path]) {
      result[path] += count;
    } else {
      result[path] = count;
    }

    if (count <= 100000) {
      total += count;
    }
  });

  //part 1

  console.log(total); //PART 1 RESULT

  //part 2
  let sizeToDelete = 0;
  const usedSpace = 70000000 - result["/"];
  const neededSpace = 30000000 - usedSpace;

  Object.keys(result).map((key) => {
    if (
      !sizeToDelete ||
      (result[key] >= neededSpace && result[key] < sizeToDelete)
    ) {
      sizeToDelete = result[key];
    }
  });

  console.log(sizeToDelete); //PART 2 RESULT
});
