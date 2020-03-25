if not A_IsAdmin
Run *RunAs "%A_ScriptFullPath%"
#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

;~LWin Up:: return ; This will (hopefully) prevent the start menu from getting opened whenever this shortcut runs.

#Enter::
     if WinExist("Administrator: Windows PowerShell")
        WinActivate
    else
        Run *RunAs "C:\Users\kor54\Shortcuts\Windows Terminal (Preview) - Shortcut.lnk"
Return

#!g::
    if WinExist("ahk_exe gvim.exe")
        WinActivate, ahk_exe gvim.exe
    else
        Run *RunAs "C:\tools\vim\vim82\gvim.exe" 
Return

#!c::
  if WinExist("ahk_exe Code.exe")
    WinActivate, ahk_exe Code.exe
  else
    Run *RunAs "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Visual Studio Code\Visual Studio Code.lnk"
Return

#!f::
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
Return

#!p::
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

CapsLock::
  Send {Esc}
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

; Sensible alt commands on my tiny home keyboard

!4::
  Send, {Alt}{F4}
Return

!5::
  Send, {Alt}{F5}
Return
