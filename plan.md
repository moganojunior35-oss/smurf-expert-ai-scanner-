# AI Neural Scanner Upgrade Plan

## 1. Type Definitions (src/types/index.ts)
- Add `AssetType`: 'INDICES' | 'COMMODITIES' | 'CRYPTO' | 'FOREX'.
- Add `ICTAnalysis`: Detailed structure for MSS, FVG, Liquidity Sweeps, Killzones.
- Add `ScannerState`: IDLE, UPLOADING, OCR, ANALYZING, COMPLETED.

## 2. AIScanner Component (src/components/AIScanner.tsx)
- **OCR Integration**: Use `tesseract.js` to extract text from the top-left region of uploaded images.
- **Asset Identification**:
  - `INDICES`: US30, NAS100, SPX500, GER40, etc.
  - `COMMODITIES`: XAUUSD (GOLD), XAGUSD (SILVER), USOIL.
  - `CRYPTO`: BTCUSD, ETHUSD, SOLUSD.
- **ICT Strategy Logic**:
  - Check current time (EST) for Killzones (London 02:00-05:00, NY 07:00-10:00).
  - Simulate/Analyze Trend (H4/D1 vs M15).
  - Check for Liquidity Sweeps (Previous Day H/L).
  - Detect FVG and Order Blocks (OB).
  - Calculate Risk/Reward (min 1:3).
- **UI Design**:
  - Drag-and-drop file upload zone.
  - Real-time "Processing Log" with cyberpunk animations.
  - Final Signal Card with Signal Strength (0-100%).

## 3. Layout Cleanup (src/App.tsx & src/components/Sidebar.tsx)
- Remove Dashboard and History components/views.
- Simplify Sidebar to only show "Neural Scanner" and "Settings".
- Ensure mobile-first design and preserve the purple/magenta theme.
- Remove "Three lines navigation" (the hamburger menu) for a more direct, focus-oriented UI.

## 4. Contract Specifications
- Define a lookup table for Pip/Point values per asset class.
- Indices: 1 point = $1 or $10 based on contract.
- Commodities: Gold pip value.
- Crypto: Decimal point precision.
