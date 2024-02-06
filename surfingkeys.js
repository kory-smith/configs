// https://raw.githubusercontent.com/kory-smith/configs/master/surfingkeys.js
const {
    aceVimMap,
    mapkey,
    imap,
    imapkey,
    unmapAllExcept,
    getClickableElements,
    vmapkey,
    map,
    unmap,
    cmap,
    addSearchAlias,
    removeSearchAlias,
    tabOpenLink,
    readText,
    Clipboard,
    Front,
    Hints,
    Visual,
    RUNTIME
} = api;

settings.hintAlign = "left";
settings.scrollStepSize = 50;
settings.focusFirstCandidate = true;
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

// H will hover over links
map('H', '<Ctrl-h>');

unmap('p');
// Remove "x" to close tab
unmap('x');


mapkey(',', '#0enter ephemeral PassThrough mode to temporarily suppress SurfingKeys', function() {
    Normal.passThrough(1000);
});

mapkey('gxt', '#3Close tab on right', function() {
    RUNTIME("closeTabRight");});

mapkey('gxT', '#3Close tab on left', function () {
    RUNTIME("closeTabLeft"); }); 
    
mapkey('P', '#7Open clipboard in new tab', function() {
    Clipboard.read(function(response) {
      tabOpenLink(response.data);
        });
    });

mapkey('yY', '#1Copy all tabs url', function() {
    RUNTIME('getTabs', null, function (response) {
        Clipboard.write([window.location.href].concat(response.tabs.map(tab => tab.url)).join('\n'))
    })
});

mapkey("q", "#7View image in new tab", function() {
    Hints.create("img", i => tabOpenLink(i.src));
  });
  
// Map 'H' and 'L' to move to the beginning/end of lines in Ace editor
aceVimMap('H', '0', 'normal');
aceVimMap('L', '$', 'normal');

unmapAllExcept(['f', 'sf', '.'], /reddit.com/)

// For more information about using this blacklist, visit https://github.com/brookhong/Surfingkeys/issues/63
settings.blacklistPattern = /.*mail.google.com.*|.*reddit.com.*|.*todoist.com.*|.*drive.google.com.*|.*twitter.com.|.*github.dev.*/i
