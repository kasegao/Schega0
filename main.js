function onEdit(e) {
  const range = e.range;
  if (range.getColumn() === 2) {
    const sheet = range.getSheet();
    const oldValue = e.oldValue;
    const newValue = e.value;
    if (range.getRow() === MEMBERS_ROW) {
      if (newValue.trim()) {
        showDialogMembers(sheet, newValue, oldValue);
      } else {
        sheet.getRange(MEMBERS_ROW, 2).setValue(oldValue);
      }
    } else if (range.getRow() === DAYS_ROW) {
      showDialogDays(sheet, newValue, oldValue);
    }
  }
}

function convertStr2Members(str) {
  return str.split("\n").map((v) => {
    return v.trim();
  });
}

function showDialogMembers(sheet, newVal, oldVal) {
  const newMembers = convertStr2Members(newVal);
  const oldMembers = convertStr2Members(oldVal);
  const text = Utilities.formatString(
    "%s -> %s",
    oldMembers.join(", "),
    newMembers.join(", ")
  );
  const dialog = Browser.msgBox(
    "メンバーを変更しますか？",
    text,
    Browser.Buttons.OK_CANCEL
  );
  if (dialog == "cancel") {
    sheet.getRange(MEMBERS_ROW, 2).setValue(oldVal);
  } else {
    sheet.getRange(MEMBERS_ROW, 2).setValue(newVal);
    changeMembers(sheet, newMembers, oldMembers);
  }
}

function showDialogDays(sheet, newVal, oldVal) {
  const newDays = parseInt(newVal);
  const oldDays = parseInt(oldVal);
  const text = Utilities.formatString("%d日 -> %d日", oldDays, newDays);
  const dialog = Browser.msgBox(
    "日数を変更しますか？",
    text,
    Browser.Buttons.OK_CANCEL
  );
  if (dialog == "cancel") {
    sheet.getRange(DAYS_ROW, 2).setValue(oldVal);
  } else {
    sheet.getRange(DAYS_ROW, 2).setValue(newVal);
    changeDays(sheet, newDays, oldDays);
  }
}

const TIMES = [
  "'10:00",
  "'10:30",
  "'11:00",
  "'11:30",
  "'12:00",
  "'12:30",
  "'13:00",
  "'13:30",
  "'14:00",
  "'14:30",
  "'15:00",
  "'15:30",
  "'16:00",
  "'16:30",
  "'17:00",
  "'17:30",
  "'18:00",
  "'18:30",
  "'19:00",
  "'19:30",
  "'20:00",
  "'20:30",
  "'21:00",
  "'21:30",
  "'22:00",
];
const TOP_CONTENTS = [
  ["予定が埋まっているセルを塗りつぶしてください"],
  ["埋まっている"],
  ["怪しい"],
  ["参加者"],
  ["日数"],
];
const ORIGIN_ROW = 8;
const MEMBERS_ROW = 4;
const DAYS_ROW = MEMBERS_ROW + 1;
const DEFAULT_DAYS = 5;

const TRANSPOSE = (a) => a[0].map((_, c) => a.map((r) => r[c]));

function initSheet(sheet, members, days) {
  days = days ? days : DEFAULT_DAYS;
  sheet.clear();

  let numColumns = sheet.getMaxColumns();
  if (numColumns < 2 + TIMES.length) {
    sheet.insertColumnsAfter(numColumns - 1, 2 + TIMES.length - numColumns);
  }
  sheet.setColumnWidth(1, 160);
  sheet.setColumnWidth(2 + TIMES.length, 300);
  sheet.setColumnWidths(2, TIMES.length, 46);

  const names = [members];
  generateFrames(sheet, names, days);
}

function generateFrames(sheet, rowNames2d, days) {
  setConsts(sheet, days);
  sheet.setFrozenRows(3);
  setMembers(sheet, rowNames2d[0]);

  const colNames = TRANSPOSE(rowNames2d);
  for (let i = 0; i < days; i++) {
    let row = ORIGIN_ROW + i * (colNames.length + 1 + 2);
    setFrame(sheet, row, colNames.length + 1);
    setTitles(sheet, row, i);
    setColNames(sheet, row + 1, colNames);
  }
  const today = new Date();
  sheet
    .getRange(ORIGIN_ROW, 1)
    .setValue(Utilities.formatDate(today, "Asia/Tokyo", "MM/dd"));
}

function setConsts(sheet, days) {
  const constRange = sheet.getRange(
    1,
    1,
    TOP_CONTENTS.length,
    TOP_CONTENTS[0].length
  );
  constRange.setValues(TOP_CONTENTS);
  constRange.setFontSize(12);
  constRange.setVerticalAlignment("top");
  sheet.getRange(2, 2, 1, 2).setBackground("#ea4335");
  sheet.getRange(3, 2, 1, 2).setBackground("#fbbc04");
  const boldRanges = sheet.getRangeList(["A1", "A4:A5"]);
  boldRanges.setFontWeight("bold");

  const daysCell = sheet.getRange(DAYS_ROW, 2);
  daysCell.setValue(days);
  const daysRule = SpreadsheetApp.newDataValidation()
    .requireNumberBetween(1, 30)
    .setAllowInvalid(false)
    .setHelpText("Number must be between 1 and 30.")
    .build();
  daysCell.setDataValidation(daysRule);
}

function getMembers(sheet) {
  return sheet.getRange(MEMBERS_ROW, 2).getValue().split("\n");
}

function setMembers(sheet, members) {
  sheet.getRange(MEMBERS_ROW, 2).setValue(members.join("\n"));
}

// start_row: 1-indexed
function setFrame(sheet, start_row, numRows) {
  const numColumns = TIMES.length + 2;
  const frame = sheet.getRange(start_row, 1, numRows, numColumns);
  const solidRanges = sheet.getRangeList([
    sheet.getRange(start_row, 1, numRows, 1).getA1Notation(),
    sheet.getRange(start_row, 1, 1, numColumns).getA1Notation(),
    sheet.getRange(start_row, numColumns, numRows, 1).getA1Notation(),
  ]);
  // range.setBorder(top, left, bottom, right, vertical, horizontal, color, style)
  frame.setBorder(
    false,
    false,
    false,
    false,
    true,
    true,
    null,
    SpreadsheetApp.BorderStyle.DASHED
  );
  solidRanges.setBorder(
    true,
    true,
    true,
    true,
    null,
    null,
    null,
    SpreadsheetApp.BorderStyle.SOLID
  );
  frame.setBorder(
    true,
    true,
    true,
    true,
    null,
    null,
    null,
    SpreadsheetApp.BorderStyle.SOLID_THICK
  );
}

// row: 1-indexed
function setTitles(sheet, row, addDate) {
  const titles = [[Utilities.formatString("=A%d + %d", ORIGIN_ROW, addDate)]];
  Array.prototype.push.apply(titles[0], TIMES);
  const numColumns = titles[0].push("備考");
  const titleRange = sheet.getRange(row, 1, 1, numColumns);
  titleRange.setHorizontalAlignment("center");
  titleRange.setVerticalAlignment("middle");
  const boldRanges = sheet.getRangeList([
    sheet.getRange(row, 1).getA1Notation(),
    sheet.getRange(row, numColumns).getA1Notation(),
  ]);
  boldRanges.setFontWeight("bold");
  boldRanges.setFontSize(12);
  titleRange.setValues(titles);
}

// row: 1-indexed
function setColNames(sheet, start_row, colNames) {
  sheet.getRange(start_row, 1, colNames.length, 1).setValues(colNames);
}

function getDays(sheet) {
  return parseInt(sheet.getRange(DAYS_ROW, 2).getValue());
}

function wTest() {
  addDelMTest();
}

function changeMembers(sheet, newMembers, oldMembers) {
  const members = newMembers.filter(String); // 空白除去
  if (newMembers.length !== members) {
    setMembers(sheet, members);
  }
  const days = getDays(sheet);

  // delete member
  const delIdxs = [];
  const remMembers = [];
  for (let i = 0; i < oldMembers.length; i++) {
    if (members.indexOf(oldMembers[i]) === -1) {
      delIdxs.push(i);
    } else {
      remMembers.push(oldMembers[i]);
    }
  }
  delIdxs.sort((a, b) => {
    return b - a;
  }); // 下から消すため降順ソート
  // 一行ずつ削除（低速）
  // if (delIdxs.length > 0) {
  //   for(let i=days-1; i>=0; i--){
  //     const start_row = ORIGIN_ROW + i * (oldMembers.length + 1 + 2);
  //     for (let idx of delIdxs) {
  //       sheet.deleteRow(start_row + 1 + idx);
  //     }
  //   }
  // }

  // 隣接する行をまとめて削除（高速）
  if (delIdxs.length > 0) {
    delIdxsBatch = {};
    delIdxsBatchKeys = [];
    for (let i = 0; i < delIdxs.length; i++) {
      delIdxsBatchKeys.push(delIdxs[i]);
      delIdxsBatch[delIdxs[i]] = 1;
      if (i === delIdxs.length - 1) {
        break;
      }
      for (let j = i; j < delIdxs.length - 1; j++) {
        if (delIdxs[j] - delIdxs[j + 1] > 1) {
          i = j;
          break;
        }
        delIdxsBatch[delIdxs[i]] += 1;
        if (j === delIdxs.length - 2) {
          i = delIdxs.length - 1;
          break;
        }
      }
    }
    delIdxsBatchKeys.sort((a, b) => {
      return b - a;
    });
    for (let i = days - 1; i >= 0; i--) {
      const start_row = ORIGIN_ROW + i * (oldMembers.length + 1 + 2);
      for (let idx of delIdxsBatchKeys) {
        sheet.deleteRows(
          start_row + 1 + idx - delIdxsBatch[idx] + 1,
          delIdxsBatch[idx]
        );
      }
    }
  }
  // sheet.getRange(1, 13).setValue(Utilities.formatString("rem:\n%s", remMembers.join("\n")));

  // add member
  const numRemMembers = oldMembers.length - delIdxs.length;
  const addMembers = [];
  for (let member of members) {
    if (oldMembers.indexOf(member) === -1) {
      addMembers.push(member);
    }
  }
  if (addMembers.length > 0) {
    for (let i = days - 1; i >= 0; i--) {
      const start_row = ORIGIN_ROW + i * (numRemMembers + 1 + 2);
      sheet.insertRowsAfter(start_row + numRemMembers, addMembers.length);
      sheet
        .getRange(
          start_row + numRemMembers + 1,
          1,
          addMembers.length,
          TIMES.length + 2
        )
        .clear();
    }
  }

  // update frame
  const updateMembers = remMembers.concat(addMembers);
  const start_date = sheet.getRange(ORIGIN_ROW, 1).getValue();
  for (let i = 0; i < days; i++) {
    const start_row = ORIGIN_ROW + i * (updateMembers.length + 1 + 2);
    setFrame(sheet, start_row, updateMembers.length + 1);
    setTitles(sheet, start_row, i);
    setColNames(sheet, start_row + 1, TRANSPOSE([updateMembers]));
  }
  sheet.getRange(ORIGIN_ROW, 1).setValue(start_date);
  setMembers(sheet, updateMembers);
}

function changeDays(sheet, newDays, oldDays) {
  if (oldDays < newDays) {
    addDays(sheet, newDays, oldDays);
  } else {
    const members = getMembers(sheet);
    const start_row = ORIGIN_ROW + newDays * (members.length + 1 + 2);
    sheet
      .getRange(
        start_row,
        1,
        sheet.getLastRow() - start_row + 1,
        sheet.getLastColumn()
      )
      .clear();
  }
}

function addDays(sheet, newDays, oldDays) {
  const members = getMembers(sheet);
  const colNames = TRANSPOSE([members]);
  for (let i = oldDays; i < newDays; i++) {
    const start_row = ORIGIN_ROW + i * (members.length + 1 + 2);
    setFrame(sheet, start_row, colNames.length + 1);
    setTitles(sheet, start_row, i);
    setColNames(sheet, start_row + 1, colNames);
  }
}
