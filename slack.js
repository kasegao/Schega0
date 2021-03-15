function doPost(e) {
  const verificationToken = e.parameter.token;
  if (verificationToken != APP_TOKEN) {
    throw new Error("Invalid token");
  }

  // コマンド確認
  const command = e.parameter.command;
  if (command != COMMAND_NAME) {
    return ContentService.createTextOutput();
  }

  // チャンネル確認
  const channel_id = e.parameter.channel_id;
  if (ALLOW_CHANNELS.length > 0 && ALLOW_CHANNELS.indexOf(channel_id) === -1) {
    return ContentService.createTextOutput(
      JSON.stringify({
        text: Utilities.formatString(
          "このチャンネルでは `%s` を使用できません．",
          command
        ),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // シート作成
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet_name = getRandomStr(12);
  const sheet = spreadsheet.insertSheet(sheet_name);
  const msgRange = sheet.getRange(1, 1);
  msgRange.setValue("現在シート作成中です．（最大で1分ほどかかります）");
  msgRange.setFontSize(24);
  msgRange.setFontWeight("bold");

  const ss_url = spreadsheet.getUrl();
  const sheet_id = sheet.getSheetId();
  const sheet_url = Utilities.formatString("%s#gid=%s", ss_url, sheet_id);

  // 3秒以内にレスポンス必要があるため重たい処理はジョブキューに入れて定期実行
  addJobQue(e.parameter.user_id, e.parameter.text, sheet_name);

  // レスポンス
  const response = {
    text: Utilities.formatString(
      "日程調整をお願いします．（シートの作成に最大で1分ほどかかります）\n<%s>",
      sheet_url
    ),
    response_type: "in_channel",
  };
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function getUserName(user_id) {
  try {
    const options = {
      method: "get",
      contentType: "application/x-www-form-urlencoded",
      payload: {
        token: BOT_TOKEN,
        user: user_id,
      },
    };

    const url = "https://slack.com/api/users.info";
    const response = UrlFetchApp.fetch(url, options);
    const userinfo = JSON.parse(response);
    if (!userinfo.ok) {
      return "";
    }
    return userinfo.user.profile.display_name;
  } catch (e) {
    return "";
  }
}

// シートの中身作成
function prepareSheet(user_id, text, sheet_name) {
  // オプション確認
  const options = getOptions(text);
  let startMember = 0;

  let date = new Date();
  if (options.length > 0) {
    const m_result = options[0].match(/((\d{0,4})\/)?(\d{1,2})\/(\d{1,2})/);
    if (m_result) {
      const strDate = !m_result[2]
        ? Utilities.formatString(
            "%d/%s/%s",
            date.getFullYear(),
            m_result[3],
            m_result[4]
          )
        : m_result[0];
      date = new Date(strDate);
      startMember++;
    }
  }

  let days = DEFAULT_DAYS;
  if (options.length > startMember) {
    const pDays = parseInt(options[startMember]);
    if (pDays) {
      startMember++;
      days = pDays;
    }
  }

  const memberIds = getIds(options.slice(startMember));
  const memberNames = memberIds
    .map((v) => {
      return getUserName(v);
    })
    .filter(String);

  // シート設定
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheet_name);
  const user_name = getUserName(user_id);
  memberNames.unshift(user_name);
  sheet.setName(
    Utilities.formatString(
      "%s-%s_%s",
      user_name,
      Utilities.formatDate(date, "Asia/Tokyo", "MM/dd"),
      getRandomStr(6)
    )
  );

  initSheet(sheet, memberNames, days);
}

function addJobQue(user_id, text, sheet_name) {
  const newQue = {
    user_id: user_id,
    text: text,
    sheet_name: sheet_name,
  };

  const cache = CacheService.getScriptCache();
  let data = cache.get(CACHE_KEY);
  if (data == null) {
    data = [];
  } else {
    data = data.split(";");
  }
  data.push(JSON.stringify(newQue));
  cache.put(CACHE_KEY, data.join(";"), 60 * 2);
  return;
}

// 定期実行
function timeDrivenFunction() {
  const cache = CacheService.getScriptCache();
  let data = cache.get(CACHE_KEY);
  cache.remove(CACHE_KEY);

  if (data == null) {
    return;
  } else {
    data = data.split(";");
  }
  for (var i = 0; i < data.length; i++) {
    data[i] = JSON.parse(data[i]);
    prepareSheet(data[i].user_id, data[i].text, data[i].sheet_name);
  }
  return;
}

function getOptions(text) {
  // <@id|name> の <> がGASと相性が悪いのか，愚直に text.split(" ") すると上手く分割できなかったので replace で対応．
  text = text.replace(/</g, " ");
  text = text.replace(/>/g, "");
  return text
    .split(" ")
    .map((v) => {
      return v.trim();
    })
    .filter(String);
}

function getIds(idNames) {
  return idNames
    .map((v) => {
      const res = v.match(/@([^|]+)|[^>]+/);
      return res ? res[1] : "";
    })
    .filter(String);
}

function getRandomStr(length) {
  const SOURCE = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += SOURCE[Math.floor(Math.random() * SOURCE.length)];
  }
  return result;
}
