import { BuilderProfile } from '@/types/builder';
import { CARD_THEMES } from '@/lib/cardThemes';
import { drawScannableQRCode, drawScannableBarcode } from '@/lib/scannableCodeRenderer';

export const CANVAS_WIDTH = 1080;
export const CANVAS_HEIGHT = 1620;

interface RenderOptions {
  userImageElement?: HTMLImageElement | null;
  originUrl?: string;
}

export async function drawCardOnCanvas(
  canvas: HTMLCanvasElement,
  profile: BuilderProfile,
  options: RenderOptions = {}
): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const theme = CARD_THEMES[profile.theme] || CARD_THEMES.classic_goa;

  // ─────────────────────────────────────────────────────────────
  // 1. BACKGROUND
  // ─────────────────────────────────────────────────────────────
  ctx.fillStyle = theme.bgColor;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const M = 28; // margin
  const cardW = CANVAS_WIDTH - M * 2;
  const cardH = CANVAS_HEIGHT - M * 2;

  // Outer card border
  roundRect(ctx, M, M, cardW, cardH, 32, theme.borderColor, theme.bgColor, 12);
  // Inner accent line
  roundRect(ctx, M + 18, M + 18, cardW - 36, cardH - 36, 22, theme.accentColor, null, 2.5);
  // Golden corner brackets
  drawCornerBrackets(ctx, M + 30, M + 30, cardW - 60, cardH - 60, '#FFDF00', 3, 28);

  // ─────────────────────────────────────────────────────────────
  // 2. TOP ROW: Stamp | Ribbon Badge | Seal  (y = 50..235)
  // ─────────────────────────────────────────────────────────────
  // Left Postal Stamp
  drawPostalStamp(ctx, 72, 52, 158, 128, theme);

  // Center HH GOA 2026 Ribbon Badge hanging from top
  const badgeW = 130, badgeH = 140;
  const badgeX = CANVAS_WIDTH / 2 - badgeW / 2;
  const badgeY = M - 6;
  drawRibbonBadge(ctx, badgeX, badgeY, badgeW, badgeH, theme);

  // Right Foil Seal
  drawFoilSeal(ctx, CANVAS_WIDTH - 148, 118, 62, theme);

  // ─────────────────────────────────────────────────────────────
  // 3. HACKER गोवा HOUSE HEADER  (y ≈ 200..270)
  // Safe zone: left = 270, right = 810 (avoids stamp & seal)
  // ─────────────────────────────────────────────────────────────
  const headerY = 250;
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  // HACKER
  ctx.fillStyle = theme.headerTextColor;
  ctx.font = `900 62px Georgia, "Times New Roman", serif`;
  ctx.fillText('HACKER', 270, headerY);

  // गोवा (centered)
  ctx.fillStyle = theme.hindiTextColor;
  ctx.font = `900 72px "Noto Sans Devanagari", Arial, sans-serif`;
  ctx.fillText('गोवा', 540, headerY + 8);

  // HOUSE
  ctx.fillStyle = theme.headerTextColor;
  ctx.font = `900 62px Georgia, "Times New Roman", serif`;
  ctx.fillText('HOUSE', 810, headerY);
  ctx.restore();

  // Horizontal rule under header
  ctx.save();
  ctx.strokeStyle = theme.accentColor;
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 5]);
  ctx.beginPath();
  ctx.moveTo(72, 270);
  ctx.lineTo(CANVAS_WIDTH - 72, 270);
  ctx.stroke();
  ctx.restore();

  // ─────────────────────────────────────────────────────────────
  // 4. SIDE DECORATIONS  (y = 290..530)
  // Left: Surfboards + Signpost   Right: House + Scooter + Tag
  // ─────────────────────────────────────────────────────────────
  drawSurfboardSignpost(ctx, 52, 290, theme);
  drawGoaHouseScooter(ctx, CANVAS_WIDTH - 260, 290, theme);

  // ─────────────────────────────────────────────────────────────
  // 5. CIRCULAR PHOTO FRAME  (center-x = 540, center-y = 460)
  // ─────────────────────────────────────────────────────────────
  const photoX = 540, photoY = 460, photoR = 195;

  drawSunburstRing(ctx, photoX, photoY, photoR + 20, 36);

  ctx.save();
  ctx.beginPath();
  ctx.arc(photoX, photoY, photoR + 3, 0, Math.PI * 2);
  ctx.lineWidth = 8;
  ctx.strokeStyle = theme.borderColor;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(photoX, photoY, photoR, 0, Math.PI * 2);
  ctx.clip();

  if (options.userImageElement) {
    const img = options.userImageElement;
    const scale = profile.photoScale || 1;
    const ox = profile.photoOffsetX || 0;
    const oy = profile.photoOffsetY || 0;
    const frame = photoR * 2;
    const ar = img.width / img.height;
    let dw = ar > 1 ? frame * ar : frame;
    let dh = ar > 1 ? frame : frame / ar;
    dw *= scale; dh *= scale;
    ctx.drawImage(img, photoX - dw / 2 + ox, photoY - dh / 2 + oy, dw, dh);
  } else {
    drawAvatarPlaceholder(ctx, photoX, photoY, photoR, theme);
  }
  ctx.restore();

  // Vertical side texts (safe zone, not overlapping photo)
  drawVertText(ctx, M + 18, 460, `✦ ${profile.dateText} ✦`, -Math.PI / 2, theme.accentColor, 17);
  drawVertText(ctx, CANVAS_WIDTH - M - 18, 460, `✦ ${profile.locationText} ✦`, Math.PI / 2, theme.accentColor, 17);

  // ─────────────────────────────────────────────────────────────
  // 6. NAME PLATE  (y = 680..750)
  // ─────────────────────────────────────────────────────────────
  const npW = 720, npH = 72, npX = 540 - npW / 2, npY = 685;

  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.2)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 5;
  roundRect(ctx, npX, npY, npW, npH, 18, '#FFDF00', theme.nameBgColor, 4);

  // Inner thin line
  ctx.shadowColor = 'transparent';
  roundRect(ctx, npX + 7, npY + 7, npW - 14, npH - 14, 12, 'rgba(255,223,0,0.35)', null, 1.5);

  ctx.fillStyle = theme.nameTextColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const nameStr = `✦  ${profile.name.toUpperCase()}  ✦`;
  let nfs = 36;
  ctx.font = `900 ${nfs}px Inter, "Arial Black", sans-serif`;
  while (ctx.measureText(nameStr).width > npW - 44 && nfs > 20) {
    nfs -= 2;
    ctx.font = `900 ${nfs}px Inter, "Arial Black", sans-serif`;
  }
  ctx.fillText(nameStr, 540, npY + npH / 2);
  ctx.restore();

  // ─────────────────────────────────────────────────────────────
  // 7. ROLE PILL  (y = 768..822)
  // ─────────────────────────────────────────────────────────────
  const rpW = 580, rpH = 54, rpX = 540 - rpW / 2, rpY = 772;
  roundRect(ctx, rpX, rpY, rpW, rpH, 27, theme.borderColor, theme.roleBgColor, 3);
  ctx.save();
  ctx.fillStyle = theme.roleTextColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const roleStr = `⚡  ${profile.role.toUpperCase()}  ⚡`;
  let rfs = 25;
  ctx.font = `900 ${rfs}px Inter, "Arial Black", sans-serif`;
  while (ctx.measureText(roleStr).width > rpW - 32 && rfs > 14) {
    rfs -= 1;
    ctx.font = `900 ${rfs}px Inter, "Arial Black", sans-serif`;
  }
  ctx.fillText(roleStr, 540, rpY + rpH / 2);
  ctx.restore();

  // ─────────────────────────────────────────────────────────────
  // 8. THREE-COLUMN INFO SECTION  (y = 848..1430)
  // ─────────────────────────────────────────────────────────────
  const secY = 848;
  const secH = 490;
  const gapX = 360;   // column x positions: 60, 60+360=420, 60+720=780
  const c1x = 60, c2x = 380, c3x = 700;
  const colInner = 300;

  // Dotted vertical dividers
  dottedLine(ctx, c2x - 12, secY + 20, secH - 40, theme.hindiTextColor);
  dottedLine(ctx, c3x - 12, secY + 20, secH - 40, theme.hindiTextColor);

  // ── COL 1: Builder Class ──────────────────────────────────────
  colHeader(ctx, c1x + colInner / 2, secY + 28, '✦ BUILDER CLASS ✦', theme.hindiTextColor);

  ctx.save();
  ctx.fillStyle = theme.headerTextColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  let btfs = 22;
  ctx.font = `900 ${btfs}px Inter, "Arial Black", sans-serif`;
  while (ctx.measureText(profile.builderTitle.toUpperCase()).width > colInner - 10 && btfs > 14) {
    btfs--;
    ctx.font = `900 ${btfs}px Inter, "Arial Black", sans-serif`;
  }
  ctx.fillText(profile.builderTitle.toUpperCase(), c1x + colInner / 2, secY + 72);
  ctx.restore();

  // Real scannable QR code
  const qrTarget = options.originUrl
    ? `${options.originUrl}/share/${profile.ticketId}`
    : `https://hh-goa-2026.vercel.app/share/${profile.ticketId}`;

  await drawScannableQRCode(ctx, c1x + colInner / 2 - 88, secY + 88, 176, qrTarget, theme);

  ctx.save();
  ctx.fillStyle = '#10B981';
  ctx.font = '700 12px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✓ SCAN TO VERIFY BADGE', c1x + colInner / 2, secY + 278);
  ctx.restore();

  // ── COL 2: Beach Bag ─────────────────────────────────────────
  colHeader(ctx, c2x + colInner / 2, secY + 28, '✦ BEACH BAG ✦', theme.hindiTextColor);

  const bagItems = (profile.beachBag && profile.beachBag.length > 0)
    ? profile.beachBag
    : [{ icon: '🥥', label: 'COCONUT' }, { icon: '💻', label: 'VS CODE' }, { icon: '🎧', label: 'LO-FI BEATS' }];

  bagItems.slice(0, 3).forEach((item, i) => {
    const iy = secY + 80 + i * 62;

    // pill background
    ctx.save();
    roundRect(ctx, c2x + 16, iy - 20, colInner - 32, 48, 12, theme.accentColor + '33', null, 0);
    ctx.font = '26px sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText(item.icon, c2x + 36, iy + 4);

    ctx.fillStyle = theme.headerTextColor;
    ctx.font = '800 18px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(item.label.toUpperCase(), c2x + 72, iy + 4);
    ctx.restore();
  });

  // Mini sunset graphic
  drawSunsetMini(ctx, c2x + colInner / 2, secY + 310, theme);

  // ── COL 3: Currently Shipping + Barcode ──────────────────────
  colHeader(ctx, c3x + colInner / 2, secY + 28, '✦ CURRENTLY SHIPPING ✦', theme.hindiTextColor);

  ctx.save();
  ctx.fillStyle = theme.hindiTextColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  let mfs = 20;
  ctx.font = `900 ${mfs}px Inter, "Arial Black", sans-serif`;
  while (ctx.measureText(profile.motto.toUpperCase()).width > colInner - 12 && mfs > 12) {
    mfs--;
    ctx.font = `900 ${mfs}px Inter, "Arial Black", sans-serif`;
  }
  ctx.fillText(profile.motto.toUpperCase(), c3x + colInner / 2, secY + 72);
  ctx.restore();

  // Wave divider
  waveLine(ctx, c3x + 20, secY + 100, colInner - 40, theme.accentColor);

  // Builder ID box
  ctx.save();
  roundRect(ctx, c3x + 16, secY + 118, colInner - 32, 66, 10, theme.borderColor + '40', theme.bgColor, 1.5);
  ctx.fillStyle = theme.headerTextColor;
  ctx.font = '700 13px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('BUILDER ID', c3x + colInner / 2, secY + 147);
  ctx.font = '900 20px "Courier New", monospace';
  ctx.fillStyle = theme.hindiTextColor;
  ctx.fillText(`#${profile.ticketId}`, c3x + colInner / 2, secY + 172);
  ctx.restore();

  // Real Code-128 barcode
  drawScannableBarcode(
    ctx,
    c3x + 20,
    secY + 198,
    colInner - 40,
    62,
    profile.ticketId.replace(/[^A-Za-z0-9]/g, ''),
    theme.headerTextColor
  );

  // Verified sticker
  drawVerifiedSticker(ctx, c3x + colInner / 2, secY + 278);

  // Stars / decorative sparkles in col 3
  ctx.save();
  ctx.fillStyle = theme.accentColor;
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦', c3x + colInner / 2 - 60, secY + 360);
  ctx.fillText('✦', c3x + colInner / 2, secY + 370);
  ctx.fillText('✦', c3x + colInner / 2 + 60, secY + 360);
  ctx.restore();

  // ─────────────────────────────────────────────────────────────
  // 9. THIN SEPARATOR  (y ≈ 1358)
  // ─────────────────────────────────────────────────────────────
  ctx.save();
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 2;
  ctx.setLineDash([]);
  ctx.globalAlpha = 0.3;
  ctx.beginPath();
  ctx.moveTo(M + 40, secY + secH + 20);
  ctx.lineTo(CANVAS_WIDTH - M - 40, secY + secH + 20);
  ctx.stroke();
  ctx.restore();

  // ─────────────────────────────────────────────────────────────
  // 10. BOTTOM DECORATIVE WAVE + FOOTER  (y = 1380..1580)
  // ─────────────────────────────────────────────────────────────
  drawBottomWave(ctx, CANVAS_HEIGHT - 190, theme);

  // #FRAMEINGOA banner
  const footW = 500, footH = 60;
  const footX = 540 - footW / 2, footY = CANVAS_HEIGHT - M - 105;
  roundRect(ctx, footX, footY, footW, footH, 16, '#FFFFFF', theme.hindiTextColor, 3);
  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '900 30px Inter, "Arial Black", sans-serif';
  ctx.fillText('✦  #FRAMEINGOA  ✦', 540, footY + footH / 2);
  ctx.restore();

  // Small sub-text
  ctx.save();
  ctx.fillStyle = theme.headerTextColor;
  ctx.globalAlpha = 0.5;
  ctx.font = '600 14px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('HACKER HOUSE GOA 2026  •  BUILD • SHIP • REPEAT', 540, CANVAS_HEIGHT - M - 28);
  ctx.restore();
}

// ───────────────────────────────────────────────────────────────
// HELPERS
// ───────────────────────────────────────────────────────────────

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
  strokeColor: string | null, fillColor: string | null, lineWidth: number
) {
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fillColor) { ctx.fillStyle = fillColor; ctx.fill(); }
  if (strokeColor && lineWidth > 0) { ctx.strokeStyle = strokeColor; ctx.lineWidth = lineWidth; ctx.stroke(); }
  ctx.restore();
}

function drawCornerBrackets(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  color: string, lw: number, len: number
) {
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = lw;
  const pairs: [number, number, number, number, number, number][] = [
    [x, y + len, x, y, x + len, y],
    [x + w - len, y, x + w, y, x + w, y + len],
    [x, y + h - len, x, y + h, x + len, y + h],
    [x + w - len, y + h, x + w, y + h, x + w, y + h - len],
  ];
  pairs.forEach(([ax, ay, bx, by, cx2, cy]) => {
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.lineTo(cx2, cy); ctx.stroke();
  });
  ctx.restore();
}

function drawRibbonBadge(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, theme: any
) {
  ctx.save();
  ctx.fillStyle = theme.hindiTextColor;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h - 18);
  ctx.arcTo(x + w, y + h, x + w - 18, y + h, 14);
  ctx.lineTo(x + 18, y + h);
  ctx.arcTo(x, y + h, x, y + h - 18, 14);
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = 4; ctx.strokeStyle = theme.borderColor; ctx.stroke();

  drawMiniPalmTree(ctx, x + w / 2, y + 34, '#FFDF00');

  ctx.fillStyle = '#FFFFFF'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.font = '900 20px Inter, "Arial Black", sans-serif'; ctx.fillText('HH', x + w / 2, y + 75);
  ctx.font = '900 22px Inter, "Arial Black", sans-serif'; ctx.fillText('GOA', x + w / 2, y + 97);
  ctx.fillStyle = '#FFDF00'; ctx.font = '700 15px Inter, sans-serif'; ctx.fillText('2026', x + w / 2, y + 117);
  ctx.restore();
}

function drawPostalStamp(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, theme: any
) {
  ctx.save();
  // White card
  ctx.fillStyle = '#FFFFFF'; ctx.fillRect(x, y, w, h);
  // Perforations
  ctx.fillStyle = theme.bgColor;
  const step = 13;
  for (let px = x; px <= x + w; px += step) {
    [y, y + h].forEach(py => { ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2); ctx.fill(); });
  }
  for (let py = y; py <= y + h; py += step) {
    [x, x + w].forEach(px => { ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2); ctx.fill(); });
  }
  // Inner content
  const im = 10;
  ctx.fillStyle = '#16382C'; ctx.fillRect(x + im, y + im, w - im * 2, h - im * 2);
  ctx.fillStyle = '#FFDF00'; ctx.font = '900 12px Inter, sans-serif'; ctx.textAlign = 'center';
  ctx.fillText('GOA INDIA', x + w / 2, y + im + 15);
  // Mini sun
  ctx.fillStyle = '#FF5E00'; ctx.beginPath(); ctx.arc(x + w / 2, y + h / 2 + 12, 18, Math.PI, 0); ctx.fill();
  drawMiniPalmTree(ctx, x + w / 2 - 18, y + h / 2 + 16, '#10B981');
  drawMiniPalmTree(ctx, x + w / 2 + 16, y + h / 2 + 18, '#10B981');
  ctx.restore();
}

function drawFoilSeal(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, theme: any) {
  ctx.save();
  const grad = ctx.createRadialGradient(cx - 18, cy - 18, 4, cx, cy, r);
  grad.addColorStop(0, '#FFE875'); grad.addColorStop(0.5, '#F7B733'); grad.addColorStop(1, '#C57900');
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = grad; ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = theme.borderColor; ctx.stroke();
  ctx.beginPath(); ctx.arc(cx, cy, r - 7, 0, Math.PI * 2); ctx.lineWidth = 1.5; ctx.stroke();

  const text = 'BUILD IN GOA • SHIP FROM PARADISE •';
  ctx.font = '700 9px Inter, sans-serif'; ctx.fillStyle = '#2A1700'; ctx.textAlign = 'center';
  for (let i = 0; i < text.length; i++) {
    const angle = (i / text.length) * Math.PI * 2 - Math.PI / 2;
    ctx.save();
    ctx.translate(cx + Math.cos(angle) * (r - 14), cy + Math.sin(angle) * (r - 14));
    ctx.rotate(angle + Math.PI / 2); ctx.fillText(text[i], 0, 0); ctx.restore();
  }
  drawMiniPalmTree(ctx, cx, cy + 6, '#2A1700');
  ctx.restore();
}

function drawMiniPalmTree(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.moveTo(x, y + 12); ctx.quadraticCurveTo(x + 4, y, x + 2, y - 8); ctx.stroke();
  [-130, -80, -25, 30, 80, 130].forEach(deg => {
    const rad = deg * Math.PI / 180;
    ctx.beginPath(); ctx.moveTo(x + 2, y - 8);
    ctx.quadraticCurveTo(x + 2 + Math.cos(rad) * 14, y - 8 + Math.sin(rad) * 14, x + 2 + Math.cos(rad) * 20, y - 8 + Math.sin(rad) * 20);
    ctx.stroke();
  });
  ctx.restore();
}

function drawSurfboardSignpost(ctx: CanvasRenderingContext2D, x: number, y: number, theme: any) {
  ctx.save();
  // Board 1 (Yellow)
  ctx.save(); ctx.translate(x + 8, y + 75); ctx.rotate(-0.26);
  ctx.fillStyle = '#FFD000';
  ctx.beginPath(); ctx.ellipse(0, 0, 22, 82, 0, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 2.5; ctx.strokeStyle = theme.borderColor; ctx.stroke();
  ctx.fillStyle = '#FF007A'; ctx.fillRect(-22, -15, 44, 18);
  ctx.restore();
  // Board 2 (Pink)
  ctx.save(); ctx.translate(x + 52, y + 80); ctx.rotate(0.17);
  ctx.fillStyle = '#E84A7F';
  ctx.beginPath(); ctx.ellipse(0, 0, 20, 78, 0, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 2.5; ctx.strokeStyle = theme.borderColor; ctx.stroke();
  ctx.restore();
  // Pole
  ctx.fillStyle = '#78350F'; ctx.fillRect(x + 100, y, 14, 200);
  // Signs
  drawArrow(ctx, x + 36, y + 14, 122, 34, '#FFD000', 'BUILD', 'left', theme.borderColor);
  drawArrow(ctx, x + 44, y + 60, 122, 34, '#E84A7F', 'SHIP', 'right', theme.borderColor);
  drawArrow(ctx, x + 36, y + 106, 122, 34, '#12362A', 'REPEAT', 'left', theme.borderColor);
  ctx.restore();
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  bg: string, label: string, dir: 'left' | 'right', border: string
) {
  ctx.save();
  ctx.fillStyle = bg;
  ctx.beginPath();
  if (dir === 'left') {
    ctx.moveTo(x + 14, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + h);
    ctx.lineTo(x + 14, y + h); ctx.lineTo(x, y + h / 2);
  } else {
    ctx.moveTo(x, y); ctx.lineTo(x + w - 14, y); ctx.lineTo(x + w, y + h / 2);
    ctx.lineTo(x + w - 14, y + h); ctx.lineTo(x, y + h);
  }
  ctx.closePath(); ctx.fill();
  ctx.lineWidth = 2; ctx.strokeStyle = border; ctx.stroke();
  ctx.fillStyle = bg === '#FFD000' ? '#000' : '#FFF';
  ctx.font = '900 16px Inter, "Arial Black", sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(label, x + w / 2, y + h / 2 + 1);
  ctx.restore();
}

function drawGoaHouseScooter(ctx: CanvasRenderingContext2D, x: number, y: number, theme: any) {
  ctx.save();
  // "LET'S BUILD!" tag
  ctx.save(); ctx.translate(x + 50, y - 36); ctx.rotate(0.21);
  ctx.fillStyle = '#FFD000';
  ctx.beginPath(); ctx.roundRect(0, 0, 130, 44, 8); ctx.fill();
  ctx.lineWidth = 2.5; ctx.strokeStyle = theme.borderColor; ctx.stroke();
  ctx.fillStyle = '#000'; ctx.font = '900 16px Inter, sans-serif'; ctx.textAlign = 'center';
  ctx.fillText("LET'S BUILD!", 65, 26);
  ctx.restore();

  const hx = x + 20, hy = y + 45;
  // Walls
  ctx.fillStyle = '#E84A7F'; ctx.fillRect(hx, hy + 36, 130, 105);
  ctx.lineWidth = 2.5; ctx.strokeStyle = theme.borderColor; ctx.strokeRect(hx, hy + 36, 130, 105);
  // Roof
  ctx.fillStyle = '#10B981'; ctx.beginPath();
  ctx.moveTo(hx - 12, hy + 36); ctx.lineTo(hx + 65, hy - 22); ctx.lineTo(hx + 142, hy + 36);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  // Windows
  ctx.fillStyle = '#FFDF00';
  [[hx + 16, hy + 55, 28, 32], [hx + 86, hy + 55, 28, 32]].forEach(([wx, wy, ww, wh]) => {
    ctx.fillRect(wx, wy, ww, wh); ctx.strokeRect(wx, wy, ww, wh);
  });
  // Door
  ctx.fillStyle = '#78350F'; ctx.fillRect(hx + 51, hy + 96, 28, 45); ctx.strokeRect(hx + 51, hy + 96, 28, 45);
  // Scooter
  const sx = hx + 88, sy = hy + 118;
  ctx.fillStyle = '#D0104C';
  ctx.beginPath(); ctx.ellipse(sx + 26, sy + 8, 26, 13, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#333';
  [sx + 10, sx + 44].forEach(wx => { ctx.beginPath(); ctx.arc(wx, sy + 20, 9, 0, Math.PI * 2); ctx.fill(); });
  ctx.restore();
}

function drawSunburstRing(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, teeth: number) {
  const colors = ['#FFD000', '#E84A7F', '#10B981', '#FF5E00', '#00F0FF', '#9333EA'];
  const step = (Math.PI * 2) / teeth;
  ctx.save();
  for (let i = 0; i < teeth; i++) {
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, i * step, (i + 1) * step);
    ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}

function drawAvatarPlaceholder(
  ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, theme: any
) {
  ctx.save();
  ctx.fillStyle = '#1A2540';
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = theme.accentColor;
  ctx.beginPath(); ctx.arc(cx, cy - 30, 58, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx, cy + 110, 110, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFFFFF'; ctx.font = '800 20px Inter, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('TAP TO UPLOAD PHOTO', cx, cy + 28);
  ctx.restore();
}

function drawVertText(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, text: string, angle: number, color: string, size: number
) {
  ctx.save();
  ctx.translate(x, y); ctx.rotate(angle);
  ctx.fillStyle = color; ctx.font = `800 ${size}px Inter, sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, 0, 0);
  ctx.restore();
}

function colHeader(ctx: CanvasRenderingContext2D, x: number, y: number, text: string, color: string) {
  ctx.save();
  ctx.fillStyle = color; ctx.font = '900 14px Inter, "Arial Black", sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.fillText(text, x, y);
  ctx.restore();
}

function dottedLine(ctx: CanvasRenderingContext2D, x: number, y: number, h: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + h); ctx.stroke();
  ctx.restore();
}

function waveLine(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(x, y);
  const steps = 6, sw = w / steps;
  for (let i = 0; i < steps; i++) {
    ctx.bezierCurveTo(
      x + i * sw + sw / 4, y + (i % 2 === 0 ? -7 : 7),
      x + i * sw + sw * 3 / 4, y + (i % 2 === 0 ? 7 : -7),
      x + (i + 1) * sw, y
    );
  }
  ctx.stroke(); ctx.restore();
}

function drawSunsetMini(ctx: CanvasRenderingContext2D, cx: number, cy: number, theme: any) {
  ctx.save();
  ctx.fillStyle = '#FFD000'; ctx.beginPath(); ctx.arc(cx, cy, 30, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#0D9488'; ctx.fillRect(cx - 55, cy, 110, 18);
  ctx.fillStyle = '#FFDF00';
  [[cx - 28, cy + 4, 56, 3], [cx - 18, cy + 9, 36, 3], [cx - 8, cy + 14, 16, 3]]
    .forEach(([rx, ry, rw, rh]) => ctx.fillRect(rx, ry, rw, rh));
  ctx.restore();
}

function drawVerifiedSticker(ctx: CanvasRenderingContext2D, cx: number, cy: number) {
  ctx.save();
  ctx.beginPath(); ctx.roundRect(cx - 92, cy - 13, 184, 26, 13);
  const g = ctx.createLinearGradient(cx - 92, cy, cx + 92, cy);
  g.addColorStop(0, '#FFE875'); g.addColorStop(0.5, '#F7B733'); g.addColorStop(1, '#FFE875');
  ctx.fillStyle = g; ctx.fill();
  ctx.lineWidth = 1.5; ctx.strokeStyle = '#78350F'; ctx.stroke();
  ctx.fillStyle = '#3B1A00'; ctx.font = '900 11px Inter, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('✓  VERIFIED BUILDER 2026', cx, cy);
  ctx.restore();
}

function drawBottomWave(ctx: CanvasRenderingContext2D, y: number, theme: any) {
  ctx.save();
  ctx.fillStyle = theme.borderColor;
  ctx.beginPath();
  ctx.moveTo(0, CANVAS_HEIGHT);
  ctx.lineTo(0, y);
  ctx.quadraticCurveTo(CANVAS_WIDTH / 4, y - 20, CANVAS_WIDTH / 2, y);
  ctx.quadraticCurveTo(CANVAS_WIDTH * 3 / 4, y + 20, CANVAS_WIDTH, y);
  ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.closePath(); ctx.fill();

  // sailboat
  const sx = 100, sy = y - 4;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + 20, sy); ctx.lineTo(sx + 16, sy + 8); ctx.lineTo(sx + 4, sy + 8); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(sx + 10, sy - 2); ctx.lineTo(sx + 10, sy - 22); ctx.lineTo(sx + 22, sy - 6); ctx.closePath(); ctx.fill();
  ctx.restore();
}

function drawSparkles(ctx: CanvasRenderingContext2D, color: string) {
  ctx.save(); ctx.fillStyle = color;
  [{ x: 96, y: 330, s: 8 }, { x: 984, y: 318, s: 9 }, { x: 540, y: 115, s: 6 }].forEach(({ x, y, s }) => {
    ctx.font = `${s * 2}px sans-serif`; ctx.textAlign = 'center'; ctx.fillText('✦', x, y);
  });
  ctx.restore();
}
