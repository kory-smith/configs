settings.hintAlign = "left";
settings.scrollStepSize = 50;

// an example to create a new mapping `ctrl-y`
mapkey('<Ctrl-y>', 'Show me the money', function() {
    Front.showPopup('a well-known phrase uttered by characters in the 1996 film Jerry Maguire (Escape to close).');
});

map('sf', 'gf');
map('F', 'af')
map('mf', 'cf');
map('K', 'R');
map('J', 'E');
map('H', 'S');
map('L', 'D');

mapkey('p', "Open the clipboard's URL in the current tab", function() {
    Front.getContentFromClipboard(function(response) {
        window.location.href = response.data;
    });
});

mapkey('gxt', '#3Close tab on right', function() {
    RUNTIME("closeTabRight");})

mapkey('gxT', '#3Close tab on left', function () {
    RUNTIME("closeTabLeft"); }); 
    
mapkey('T', 'Choose a tab with omnibar', function() {
    Front.openOmnibar({type: "Tabs"});
});    

mapkey('P', '#7Open clipboard in new tab', function() {
    Clipboard.read(function(response) {
      tabOpenLink(response.data);
        })
    });

unmap('gn');

mapkey('gny', '#3Open Yext in New Tab', function(){
    tabOpenLink("https://www.yext.com/s/1029251/entities?entityGroupId=0")}, 
{tabbed: true, active: true});

mapkey('gnk', '#3Open Kroger in New Tab', function(){
    tabOpenLink("https://www.kroger.com")}, 
{tabbed: true, active: true});

mapkey('gnb', '#3Open YNAB in New Tab', function(){
    tabOpenLink("https://app.youneedabudget.com")}, 
{tabbed: true, active: true});

mapkey('gnj', '#3Open Jira in New Tab', function(){
    tabOpenLink("https://jira.kroger.com/jira/secure/RapidBoard.jspa?rapidView=5354")}, 
{tabbed: true, active: true});

mapkey('gns', '#3Open Search Console in New Tab', function(){
    tabOpenLink("https://search.google.com/u/1/search-console?resource_id=https://www.kroger.com/&hl=en")}, 
{tabbed: true, active: true});

cmap('<Ctrl-j>', '<Tab>')
cmap('<Ctrl-k', '<Shift-Tab>')

addSearchAliasX('k', 'Kroger', 'https://www.kroger.com/search?query=')
addSearchAliasX('y', 'Yext', 'https://www.yext.com/s/1029251/entities?entityGroupId=0#search=')

mapkey('oy', '#8Open Search with alias y', function() {
    Front.openOmnibar({type: "SearchEngine", extra: "y"});
});


mapkey('ok', '#8Open Search with alias k', function() {
    Front.openOmnibar({type: "SearchEngine", extra: "k"});
});

aceVimMap('jk', '<Esc>', 'insert');
aceVimMap('kj', '<Esc>', 'insert');
