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

#!p::
    if WinExist("ahk_exe KeePass.exe")
        WinActivate, ahk_exe KeePass.exe
    else
        Run *RunAs "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\KeePass 2.lnk" 
Return

#!b::
  if WinExist("*Brave")
    WinActivate, ahk_exe brave.exe
  else
    Run *RunAs "C:\Users\KS61347\AppData\Local\BraveSoftware\Brave-Browser\Application\brave.exe" 

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
~LShift::
	KeyWait, LShift
	If (A_TimeSinceThisHotkey < 300 and A_PriorKey = "LShift") {
		Send, (
	}
return

~RShift::
	KeyWait, RShift
	If (A_TimeSinceThisHotkey < 300 and A_PriorKey = "RShift") {
		Send, )
	}
return

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
