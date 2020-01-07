#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

~LWin Up:: return ; This will (hopefully) prevent the start menu from getting opened whenever this shortcut runs.

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

+ins::
    Send {Volume_Up}
Return

+del::
    Send {Volume_Down}
Return
