function initFollowerCount() {
  // sets up sheet names and Instagram accounts
  insertFollowerCount("sheet1", "profile1");
  insertFollowerCount("sheet2", "profile2");
}

function insertFollowerCount(sheetName, instagramAccountName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  accountdata = getInstagramData(instagramAccountName);
  sheet.appendRow([Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd"), accountdata.followerCount]);  
 };

function getInstagramData(username) {
  var r = new RegExp('<script type="text\/javascript">' + 
                   '([^{]+?({.*profile_pic_url.*})[^}]+?)' +
                   '<\/script>');
  var url = "https://www.instagram.com/" + username
  var source = UrlFetchApp.fetch(url).getContentText();
  var jsonStr = source.match(r)[2];
  var data = JSON.parse(jsonStr);
  console.log('data', data);
  var oldVariantOfData = data['entry_data']['ProfilePage'][0];
  console.log('oldVariantOfData', oldVariantOfData);
   
  return {
    followerCount : oldVariantOfData.graphql.user.edge_followed_by.count,
    followCount : oldVariantOfData.graphql.user.edge_follow.count, 
    mediaCount : oldVariantOfData.graphql.user.edge_owner_to_timeline_media.count
  };  
}