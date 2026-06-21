# Raja Old Paper Store Website

A modern, responsive, and bilingual (English/Tamil) website for **Raja Old Paper Store**, Thanjavur. Features instant doorstep pickup scheduling via WhatsApp and real-time scrap rates fetched automatically from a Google Sheet.

## 🚀 Key Features
- **Bilingual Interface**: Quick language switcher for English and Tamil.
- **Dynamic Rates**: Scrap rates load directly from a Google Sheet. No code upload needed to change prices!
- **WhatsApp Form**: Fully-validated pickup request form that formats details into a WhatsApp message.
- **Mobile-First Design**: Completely optimized for mobile and desktop screens.
- **Eco-Friendly Theme**: Premium green-and-white visual aesthetic with smooth micro-interactions.

---

## 📊 How to Set Up Your Google Sheet for Rates

Follow these steps so you can update rates directly from your mobile phone using the Google Sheets app:

1. **Create the Spreadsheet**:
   - Open Google Sheets and create a new spreadsheet.
   - Set the first row (headers) as:
     - Column A: `Item`
     - Column B: `Rate`
   - List your scrap items and rates underneath. For example:
     | Item | Rate |
     | :--- | :--- |
     | Old Newspaper | 18 |
     | Iron Scrap | 25 |
     | Aluminium | 110 |
     | Copper | 650 |
     | Cardboard | 12 |
     | Plastic | 10 |
     | Books / Notebooks | 15 |

2. **Share the Sheet Publicly**:
   - Click the **Share** button in the top right.
   - Under *General Access*, change from **Restricted** to **Anyone with the link**.
   - Ensure the permission role is set to **Viewer**.
   - Copy the spreadsheet URL.

3. **Get the Spreadsheet ID**:
   - Look at your spreadsheet URL. It looks like this:
     `https://docs.google.com/spreadsheets/d/1XzB9BlyRmsV6xI5Z_vX_Z3tXj8m-H183t5wG05vT7G4/edit#gid=0`
   - Copy the long random letters and numbers between `/d/` and `/edit`. In this example, the ID is `1XzB9BlyRmsV6xI5Z_vX_Z3tXj8m-H183t5wG05vT7G4`.

4. **Link it to the Website**:
   - Open [js/app.js](file:///C:/Users/KANNAN/.gemini/antigravity/scratch/raja-old-paper-store/js/app.js) in your editor.
   - Go to line **9**:
     ```javascript
     const GOOGLE_SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
     ```
   - Replace the placeholder string with your copied Spreadsheet ID and save.

5. **Updating Rates on your Phone**:
   - Install the **Google Sheets** app on your iPhone or Android.
   - Open this sheet on your phone, edit the numbers in the `Rate` column, and close it.
   - The website updates automatically for all visitors!

---

## 📞 How to Change Phone Numbers & Shop Details

To update your contact number, WhatsApp number, and email:

1. Open [js/app.js](file:///C:/Users/KANNAN/.gemini/antigravity/scratch/raja-old-paper-store/js/app.js).
2. Edit lines **10 & 11**:
   - `const SHOP_PHONE = '919876543210';` (with country code `91` for WhatsApp redirection).
   - `const SHOP_CALL_NUMBER = '+919876543210';` (for direct dial buttons).
3. Open [index.html](file:///C:/Users/KANNAN/.gemini/antigravity/scratch/raja-old-paper-store/index.html).
4. Update the visual phone numbers, email addresses, and the Google Maps embed `iframe` link (near the bottom) as needed.

---

## 🌐 Deploying to GitHub Pages (Hosting for Free)

1. Create a new repository on your GitHub account (e.g., name it `raja-old-paper-store`).
2. Push this project code (`index.html`, `css/`, `js/`, and `images/`) to the repository.
3. On GitHub, go to your repository's **Settings** > **Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose the `main` or `master` branch and folder `/ (root)`. Click **Save**.
6. Within a minute, your website will be live at `https://<your-username>.github.io/raja-old-paper-store/`.
