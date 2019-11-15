const red = "\x1b[31m"
const green = "\x1b[32m"
const yellow = "\x1b[33m"
const blue = "\x1b[34m"
const magenta = "\x1b[35m"
const cyan = "\x1b[36m"
const white = "\x1b[37m"
const defaultColor = "\x1b[0m"


const highlight = (text, color = 0) => {
  switch(color) {
    case 6:
        return (`${blue}${text}${defaultColor}`);
    case 5:
        return (`${magenta}${text}${defaultColor}`);
    case 4:
        return (`${defaultColor}${text}${defaultColor}`);
    case 3:
      return (`${yellow}${text}${defaultColor}`);
    case 2:
        return (`${red}${text}${defaultColor}`);
    case 1:
      return (`${cyan}${text}${defaultColor}`);
    default:
      return (`${green}${text}${defaultColor}`);
  }
}

module.exports = { highlight };