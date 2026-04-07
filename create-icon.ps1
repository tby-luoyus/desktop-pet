Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap(256,256)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::FromArgb(255,100,200,255))
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255,255,150,200))
$g.FillEllipse($brush, 50, 50, 156, 156)
$g.Dispose()
$bmp.Save("C:\Users\28170_jtdgmtl\Desktop\pet\app-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Output "Icon created"
