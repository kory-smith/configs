if not A_IsAdmin
Run *RunAs "%A_ScriptFullPath%"

#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
SetTitleMatchMode, RegEx

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
        Run *RunAs "C:\tools\vim\vim81\gvim.exe" 
Return

#!p::  ; "p" for "passwords"
    if WinExist("ahk_exe KeePass.exe")
        WinActivate, ahk_exe KeePass.exe
    else
        Run *RunAs "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\KeePass 2.lnk" 
Return

#!b::
  IfWinExist, \bBrave\b
    WinActivate
  else
    Run *RunAs "C:\Users\KS61347\AppData\Local\BraveSoftware\Brave-Browser\Application\brave.exe" 
Return

#!t::
  IfWinExist, \bTodoist\b
    WinActivate
  Else
    Run *RunAs "C:\Users\KS61347\Shortcuts\Todoist (1).lnk"
Return

#!c::
  if WinExist("ahk_exe Code.exe")
    WinActivate, ahk_exe Code.exe
  else
    Run *RunAs "C:\Program Files\Microsoft VS Code\Code.exe"
Return

#!m::  ; "m" for "eMail"
  if WinExist("ahk_exe OUTLOOK.EXE")
    WinActivate, ahk_exe OUTLOOK.EXE
  else
    Run *RunAs "C:\Program Files (x86)\Microsoft Office\root\Office16\OUTLOOK.EXE"
Return

#!n:: ; "n" for "noisy"?
  If WinExist("ahk_exe Teams.exe")
    WinActivate, ahk_exe Teams.exe
  else
    Run *RunAs "C:\Users\KS61347\AppData\Local\Microsoft\Teams\Update.exe"
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

#!e::
  Send, {Esc}
Return
