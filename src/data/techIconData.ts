import { getAnalogousColor } from "../helpers/colors/getAnalogousColor";
import { getComplementaryColor } from "../helpers/colors/getComplementaryColor";
import { hexToHSL } from "../helpers/colors/hexToHSL";
import { hslToString } from "../helpers/colors/hslToString";
import { TechIcon } from "../types/techIcons";

export const techIconsBase = [
  {
    id: 1,
    name: "Java",
    fileName: "java-icon.svg",
    techType: "language",
    hexColor: "#f89820"
  },
  {
    id: 2,
    name: "JavaScript",
    fileName: "javascript-icon.svg",
    techType: "language",
    hexColor: "#f7df1e"
  },
  {
    id: 3,
    name: "Linux",
    fileName: "linux-icon.svg",
    techType: "os",
    hexColor: "#333333"
  },
  {
    id: 4,
    name: "MongoDB",
    fileName: "mongodb-icon.svg",
    techType: "database",
    hexColor: "#47A248"
  },
  {
    id: 5,
    name: "MySQL",
    fileName: "mysql-icon.svg",
    techType: "database",
    hexColor: "#4479A1"
  },
  {
    id: 6,
    name: "Node.js",
    fileName: "nodejs-icon.svg",
    techType: "backend",
    hexColor: "#339933"
  },
  {
    id: 7,
    name: "React.js",
    fileName: "reactjs-icon.svg",
    techType: "frontend",
    hexColor: "#61DAFB"
  },
  {
    id: 8,
    name: "React Router",
    fileName: "reactrouter-icon.svg",
    techType: "framework",
    hexColor: "#CA4245"
  },
  {
    id: 9,
    name: "TypeScript",
    fileName: "typescriptlang-icon.svg",
    techType: "language",
    hexColor: "#3178C6"
  },
  {
    id: 10,
    name: "Vite.js",
    fileName: "vitejsdev-icon.svg",
    techType: "framework",
    hexColor: "#646CFF"
  },
  {
    id: 11,
    name: "CSS3",
    fileName: "w3_css-official.svg",
    techType: "frontend",
    hexColor: "#1572B6"
  },
  {
    id: 12,
    name: "HTML5",
    fileName: "w3_html5-icon.svg",
    techType: "frontend",
    hexColor: "#E34F26"
  }
];

export const techIconsData: TechIcon[] = techIconsBase.map(icon => {
  const hsl = hexToHSL(icon.hexColor);
  const analogous = getAnalogousColor(hsl);
  const complementary = getComplementaryColor(hsl);

  return {
    id: icon.id,
    name: icon.name,
    fileName: icon.fileName,
    techType: icon.techType,
    color: hslToString(hsl),
    backgroundColor: hslToString(complementary)
  };
});