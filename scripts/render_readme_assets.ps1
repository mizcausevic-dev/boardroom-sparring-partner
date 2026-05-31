$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ProofImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7,10,15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233,243,255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186,200,218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55,255,139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25,199,255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Boardroom Sparring Partner", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic proof render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ProofImage -Title "Board-prep snapshot for the next memo and meeting" -Subtitle "One executive surface for board questions, pushback risk, memo confidence, and what leadership should rehearse now." -Bullets @(
  "The overview keeps readiness, board confidence, memo-defensible count, evidence gaps, and downside in one board-prep view.",
  "Leadership can see which themes belong in the active board memo and which still attract too much pushback.",
  "This layer sits after the scorecards, board brief, diligence pack, registry, radar, timing, relationship graph, and exit room."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ProofImage -Title "Question lane keeps the hard board questions visible" -Subtitle "Every theme retains buyer, board question, priority band, readiness, and the next preparation move." -Bullets @(
  "The lane makes it obvious which themes are must-fix, which should shore up next, and which can already be defended.",
  "Board questions stay attached to actual operators and systems instead of drifting into generic positioning.",
  "Leadership can rehearse the weak answers before the live meeting."
) -OutputPath (Join-Path $screenshots "02-question-lane-proof.png")

New-ProofImage -Title "Pushback map ties downside and evidence back to real surfaces" -Subtitle "Evidence state, board confidence, downside risk, company tags, and related surfaces stay visible in one executive table." -Bullets @(
  "This view keeps IBM, Azure, FinTech, biotech, nonprofit, PropTech, and robotics traces tied to actual live surfaces.",
  "Confidence and evidence quality remain visible before any claim is promoted upward.",
  "Leadership can see where the memo is strong and where it is still exposed."
) -OutputPath (Join-Path $screenshots "03-pushback-map-proof.png")

New-ProofImage -Title "Memo posture and rehearsal room keep the narrative honest" -Subtitle "Priority band, downside, and next move remain attached to the actual board theme." -Bullets @(
  "The partner keeps the board narrative grounded in what is actually defensible.",
  "Downside remains attached to the specific theme instead of disappearing into summary prose.",
  "This creates a repeatable executive cadence for board preparation and investor follow-up."
) -OutputPath (Join-Path $screenshots "04-memo-posture-proof.png")
