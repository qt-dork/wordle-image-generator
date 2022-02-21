// Duck Everlasting's change to firstLineTester
// Linked here: https://github.com/qt-dork/wordle-image-generator/pull/3
export const firstLine = (line: string) => {
  const regex = /(?<day>.* \d+) (?<count>[1-6x]\/6]*?)/gi
  const match = regex.exec(line);

  return {
    day: match?.groups.day === undefined ? '' : match?.groups.day,
    score: match?.groups.count === undefined ? '' : match?.groups.count,
  };
}

// Functions are based off of Cariad's wonderful wa11y website
export const describe = (indexes: number[]) => {
  if (indexes.length === 0) return null;

  const ords = indexes.map((i) => ord(i));

  if (ords.length === 1) return ords[0];

  return ords.reduce((text, value, i, array) => {
    return text + (i < array.length - 1 ? ', ' : ' and ') + value;
  });
}

export const describeLine = (line: string, num: number, chopAggression: number) => {
  const decoded = blockTypes(line);

  const hasPerfect = decoded.perfectIndexes.length > 0;
  const hasMisplaced = decoded.misplacedIndexes.length > 0;

  const perfectWord = chopAggression >= 8 ? 'yes' : 'perfect';
  const perfect = hasPerfect
    ? `${describe(decoded.perfectIndexes)} ${perfectWord}`
    : null;
  
  const misplacedList = describe(decoded.misplacedIndexes);

  const wrongPlace =
    chopAggression >= 6
      ? chopAggression >= 7
        ? 'no'
        : 'wrong'
      : 'in the wrong place';
  const correctBut =
    chopAggression >= 3
      ? `${misplacedList} ${wrongPlace}`
      : `${misplacedList} correct but ${wrongPlace}`;
  const perfectBut =
    chopAggression >= 2
      ? `. ${misplacedList} ${wrongPlace}`
      : `, but ${misplacedList} ${wrongPlace}`;
  
  const misplaced = hasPerfect ? perfectBut : correctBut;

  let explanation = '';

  if (!hasPerfect && !hasMisplaced) explanation = 'Nothing.';
  else if (decoded.perfectIndexes.length === 5) explanation = 'Won!';
  else if (decoded.misplacedIndexes.length === 5)
    explanation =
      chopAggression >= 1
        ? 'all in the wrong order.'
        : 'all the correct letters but in the wrong order.';
  else if (hasPerfect && hasMisplaced)
    explanation = `${perfect}${misplaced}.`;
  else if (hasMisplaced) explanation = `${misplaced}.`;
  else explanation = `${perfect}.`;

  const prefix = chopAggression >= 5 ? `${num}.` : `Line ${num}:`;

  const result = `${prefix} ${explanation}\n`;

  if (chopAggression >= 4) return result.replaceAll(' and ', ' & ');

  return result;
}

export const ord = (i: number) => {
  switch (i) {
    case 1:
      return '1st';
    case 2:
      return '2nd';
    case 3:
      return '3rd';
    default:
      return `${i}th`;
  }
}

export const blockTypes = (line: string) => {
  let actualIndex = 0;
  let visualIndex = 1;

  const misplacedIndexes = [];
  const perfectIndexes = [];

  while (actualIndex < line.length) {
    switch (line.charCodeAt(actualIndex)) {
      // Dark mode:
      case 11035:
      // Light mode:
      // falls through
      case 11036:
        actualIndex += 1;
        visualIndex += 1;
        break;
      case 55357:
        switch (line.charCodeAt(actualIndex + 1)) {
          // High contrast:
          case 57318:
          // Regular contrast:
          // falls through
          case 57320:
            misplacedIndexes.push(visualIndex++);
            break;
          // High contrast:
          case 57319:
          // Regular contrast:
          // falls through
          case 57321:
            perfectIndexes.push(visualIndex++);
            break;
          default:
            return;
        }
        actualIndex += 2;
        break;
      default:
        return;
    }
  }

  return {
    misplacedIndexes: misplacedIndexes,
    perfectIndexes: perfectIndexes,
  };
}

export const isGameLine = (line: string) => {
  return line && line.length > 0 && blockTypes(line) !== undefined;
}

export const deviceIsMobile = ():boolean => {
  let Result = false

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore don't care about literal indexing
  // eslint-disable-next-line no-useless-escape
  ;(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) Result = true})(navigator.userAgent||navigator.vendor||window['opera'])

  return Result;
}