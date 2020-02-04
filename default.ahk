#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

;~LWin Up:: return ; This will (hopefully) prevent the start menu from getting opened whenever this shortcut runs.

#Enter::
     if WinExist("Administrator: Windows PowerShell")
        WinActivate
    else
        Run *RunAs Powershell.exe
Return

#!g::
    if WinExist("ahk_exe gvim.exe")
        WinActivate, ahk_exe gvim.exe
    else
        Run *RunAs "C:\tools\vim\vim82\gvim.exe" 
Return

psScript =
    (
        stop-process -name "TorGuardDesktopQt" -force
    )

#!t::
Process, exist, TorGuardDesktopQt.exe 
NewPID = %ErrorLevel%  ; Save the value immediately since ErrorLevel is often changed.
if NewPID = 0
{
    Run, "C:\Program Files (x86)\VPNetwork LLC\TorGuard\TorGuardDesktopQt.exe" 
}
else
{
    RunWait PowerShell.exe -Command &{%psScript%} ,, hide
}

#!d::
    if WinExist("ahk_exe Dashlane.exe")
        WinActivate, ahk_exe Dashlane.exe
    else
        Run *RunAs "C:\Users\kor54\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Dashlane.lnk" 
Return

; Media control keys
+ins::
    Send {Volume_Up}
Return
+del::
    Send {Volume_Down}
Return
#Space::
    Send {Media_Play_Pause}
Return

; Numpad work the same as numbers row
#Numpad1::Send #1
#Numpad2::Send #2 
#Numpad3::Send #3 
#Numpad4::Send #4
#Numpad5::Send #5
#Numpad6::Send #6
#Numpad7::Send #7
#Numpad8::Send #8
#Numpad9::Send #9
#Numpad0::Send #0

; Space-cadet-esque caps lock rebindings.
Capslock::
  Send {(}
Return
>+CapsLock::
  Send {{}
Return
<+CapsLock::
  Send {[}
Return

; Vim-esque keybindings
#!h::
   Send, {Left down}{Left up}
Return

#!j::
   Send, {Down down}{Down up}
Return

#!k::
   Send, {Up down}{Up up}
Return

#!l::
   Send, {Right down}{Right up}
Return
