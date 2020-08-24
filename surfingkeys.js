settings.hintAlign = "left";
settings.scrollStepSize = 50;
settings.focusFirstCandidate = true;
iunmap(":");
//Events.hotKey="<Meta-s>";

// Preserve the "don't activate on this site" funcionality on Mac.
map('<Ctrl-i>', '<Alt-s>');

// an example to create a new mapping `ctrl-y`
/*mapkey('<Ctrl-y>', 'Show me the money', function() {
    Front.showPopup('a well-known phrase uttered by characters in the 1996 film Jerry Maguire (Escape to close).');
});
*/

// F will open a link in a new tab, unfocused.
map('F', 'gf');

// sf will open a link in a new tab, focused.
map('sf', 'af');

// K will move to the tab to the right
map('K', 'R');

// J will move to the tab to the left
map('J', 'E');

// H will move back one history entry
map('H', 'S');

// L will move forward one history entry
map('L', 'D');

unmap('p');

mapkey('p', "Open the clipboard's URL in the current tab", function() {
    Clipboard.read(function(response) {
        window.location.href = response.data;
    });
});

mapkey(',', '#0enter ephemeral PassThrough mode to temporarily suppress SurfingKeys', function() {
    Normal.passThrough(1000);
});

mapkey('gxt', '#3Close tab on right', function() {
    RUNTIME("closeTabRight");});

mapkey('gxT', '#3Close tab on left', function () {
    RUNTIME("closeTabLeft"); }); 
    
mapkey('T', 'Choose a tab with omnibar', function() {
    Front.openOmnibar({type: "Tabs"});
});    

mapkey('P', '#7Open clipboard in new tab', function() {
    Clipboard.read(function(response) {
      tabOpenLink(response.data);
        });
    });

unmap('gn');

mapkey('gny', '#3Open Yext in New Tab', function(){
    tabOpenLink("https://www.yext.com/s/1029251/entities?entityGroupId=0")}, 
                {tabbed: true, active: true});

mapkey('gnk', '#3Open Kroger in New Tab', function(){
    tabOpenLink("https://www.kroger.com")}, 
                {tabbed: true, active: true});

mapkey('gnb', '#3Open YNAB in New Tab', function(){
    tabOpenLink("https://app.youneedabudget.com/9becfa68-4c59-4c2f-888d-617cb9416273/budget")}, 
                {tabbed: true, active: true});

mapkey('gnj', '#3Open Jira in New Tab', function(){
    tabOpenLink("https://jira.kroger.com/jira/secure/RapidBoard.jspa?rapidView=7037")}, 
                {tabbed: true, active: true});

mapkey('gns', '#3Open Search Console in New Tab', function(){
    tabOpenLink("https://search.google.com/u/1/search-console?resource_id=https://www.kroger.com/&hl=en")}, 
                {tabbed: true, active: true});


addSearchAliasX('k', 'Kroger', 'https://www.kroger.com/search?query=');
addSearchAliasX('y', 'Yext', 'https://www.yext.com/s/1029251/entities?entityGroupId=0#search=');

mapkey('oy', '#8Open Search with alias y', function() {
    Front.openOmnibar({type: "SearchEngine", extra: "y"});
});

mapkey('ok', '#8Open Search with alias k', function() {
    Front.openOmnibar({type: "SearchEngine", extra: "k"});
});

aceVimMap('jk', '<Esc>', 'insert');
aceVimMap('kj', '<Esc>', 'insert');

unmapAllExcept(['f', 'sf', '.'], /reddit.com/)

// For more information about using this blacklist, visit https://github.com/brookhong/Surfingkeys/issues/63
settings.blacklistPattern = /.*mail.google.com.*|.*reddit.com.*|.*todoist.com.*|.*drive.google.com.*|.*twitter.com.*/i

// This lets me use the Vim editor on Todoist, but the tasks won't update with the changed text for some reason.
//unmapAllExcept(['<Ctrl-i>'], /todoist.com/)
