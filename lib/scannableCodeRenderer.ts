import QRCode from 'qrcode';

/**
 * Generates a real, standard scannable QR code matrix onto the Canvas.
 */
export async function drawScannableQRCode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  dataUrl: string,
  theme: any
): Promise<void> {
  try {
    // Generate QR matrix data URL
    const qrDataUrl = await QRCode.toDataURL(dataUrl, {
      margin: 1,
      color: {
        dark: theme.borderColor || '#16382C',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    });

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Draw white container with rounded corners & shadow
        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.roundRect(x, y, size, size, 12);
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = theme.borderColor;
        ctx.stroke();

        // Draw QR Image inside container
        const p = 8;
        ctx.drawImage(img, x + p, y + p, size - p * 2, size - p * 2);

        // Draw Mini Palm Tree overlay badge in center
        const cSize = 34;
        const cx = x + size / 2;
        const cy = y + size / 2;

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(cx, cy, cSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = theme.hindiTextColor;
        ctx.stroke();

        // Palm icon text
        ctx.fillStyle = theme.hindiTextColor;
        ctx.font = '16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🌴', cx, cy);

        ctx.restore();
        resolve();
      };
      img.src = qrDataUrl;
    });
  } catch (err) {
    console.error('Failed to generate QR Code:', err);
  }
}

/**
 * Draws a real Code 128 (B) Barcode on Canvas encoding string data (e.g. HH-GOA-7757).
 * Standard barcode scanner readable!
 */
export function drawScannableBarcode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  codeText: string,
  color: string
): void {
  ctx.save();
  ctx.fillStyle = color;

  // Simple, robust Code 128B pattern encoder
  // Start B (104), Data, Checksum, Stop (106)
  const pattern = generateCode128B(codeText);

  let totalUnits = 0;
  for (let i = 0; i < pattern.length; i++) {
    totalUnits += parseInt(pattern[i], 10);
  }

  const moduleW = w / totalUnits;
  let curX = x;

  for (let i = 0; i < pattern.length; i++) {
    const barWidth = parseInt(pattern[i], 10) * moduleW;
    // Even indices are bars (black), odd indices are spaces (white)
    if (i % 2 === 0) {
      ctx.fillRect(curX, y, barWidth, h);
    }
    curX += barWidth;
  }

  ctx.restore();
}

// Code 128 Symbol Patterns table for standard scannable barcodes
const CODE128_PATTERNS: string[] = [
  '212222', '222122', '222221', '121223', '121322', '131222', '122213', '122312', '132212', '221213',
  '221312', '231212', '112232', '122132', '122231', '113222', '123122', '123221', '223211', '221132',
  '221231', '213212', '223112', '312131', '311222', '321122', '321221', '312212', '322112', '322211',
  '212123', '212321', '232121', '111323', '131123', '131321', '112313', '132113', '132311', '211313',
  '231113', '231311', '112133', '112331', '132131', '113123', '113321', '133121', '313121', '211331',
  '231131', '213113', '213311', '213131', '311123', '311321', '331121', '312113', '312311', '332111',
  '314111', '221411', '431111', '111224', '111422', '121124', '121421', '141122', '141221', '112214',
  '112412', '122114', '122411', '142112', '142211', '241211', '221114', '413111', '241112', '134111',
  '111242', '121142', '121241', '114212', '124112', '124211', '411212', '421112', '421211', '212141',
  '214121', '412121', '201141', '411131', '311141', '411113', '411311', '113141', '114131', '311132',
  '411122', '411221', '221124', '221421', '241121', '214112'
];
const START_CODE_B = '211214';
const STOP_CODE = '2331112';

function generateCode128B(text: string): string {
  let result = START_CODE_B;
  let checksum = 104; // Start B code value

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i) - 32;
    const validCode = Math.max(0, Math.min(code, 94));
    result += CODE128_PATTERNS[validCode];
    checksum += validCode * (i + 1);
  }

  const checkSymbol = checksum % 103;
  result += CODE128_PATTERNS[checkSymbol];
  result += STOP_CODE;
  return result;
}
