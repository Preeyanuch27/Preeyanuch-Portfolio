# Portfolio — ปรียานุช เบี้ยวบังเกืด

เว็บไซต์ Portfolio สไตล์ Creative Brutalist โทนดำ + Neon Lime สำหรับ Video Editor / Graphic Designer รองรับมือถือและ GitHub Pages โดยใช้ HTML, CSS และ Vanilla JavaScript

## ไฟล์ในโปรเจกต์
- `index.html` — โครงสร้างเว็บและข้อมูลแนะนำตัว
- `style.css` — ดีไซน์และ Responsive Layout
- `script.js` — ข้อมูลภาพนิ่ง/วิดีโอ ตัวกรอง และระบบ Preview
- `assets/images/profile.jpg` — เพิ่มรูปโปรไฟล์ของคุณ
- `assets/images/` — เพิ่มภาพผลงานในโฟลเดอร์นี้

## เพิ่มรูปภาพ
เปิด `script.js` แล้วค้นหา `IMAGE_PROJECTS` จากนั้นใส่ path หรือ URL ลงใน `thumbnail` และ `imageUrl` ตัวอย่าง:

```js
{
  id: "ai-image-1",
  title: "ชื่อผลงาน",
  category: "ai-image",
  label: "AI IMAGE",
  year: "2026",
  description: "รายละเอียดผลงาน",
  thumbnail: "assets/images/ai-01.jpg",
  imageUrl: "assets/images/ai-01.jpg"
}
```

มีช่องผลงานเตรียมไว้แล้ว 15 ช่อง:
- ภาพจาก AI 5 ภาพ (`ai-image`)
- ภาพรีทัช 5 ภาพ (`retouch`)
- งานโปรโมต / งานตามช็อป / งานป้าย 5 ภาพ (`promo-image`)

## เพิ่มลิงก์วิดีโอจาก Google Drive
เปิด `script.js` แล้วค้นหา `VIDEO_PROJECTS` จากนั้นวางลิงก์แชร์ใน `driveUrl` เช่น:

```js
{
  id: "ai-video-1",
  title: "AI VIDEO 01",
  category: "ai-video",
  label: "AI VIDEO",
  year: "2026",
  description: "รายละเอียดคลิป",
  driveUrl: "https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
}
```

มีช่องวิดีโอเตรียมไว้แล้ว 20 ช่อง:
- คลิปจาก AI 5 คลิป (`ai-video`)
- คลิปที่ถ่ายเอง 5 คลิป (`self-video`)
- คลิปโปรโมต 5 คลิป (`promo-video`)
- คลิปสำหรับโทรทัศน์ตามห้าง/ช็อป 5 คลิป (`shop-video`)

**สำคัญ:** ใน Google Drive ให้กด Share → General access → Anyone with the link → Viewer ก่อน วิดีโอจึงจะแสดงในหน้า Preview ได้ หากนโยบายบัญชีไม่อนุญาตให้ฝังวิดีโอ ผู้ชมยังสามารถกดปุ่มเปิดไฟล์ใน Google Drive ได้

## แก้รูปโปรไฟล์
นำรูปมาใส่ที่ `assets/images/profile.jpg` ชื่อไฟล์ต้องตรงตามนี้ หรือแก้ `src` ใน `index.html`

## Deploy บน GitHub Pages
1. สร้าง Repository ใหม่บน GitHub
2. อัปโหลดไฟล์และโฟลเดอร์ทั้งหมด โดยให้ `index.html` อยู่ที่ root ของ Repository
3. เข้า **Settings → Pages**
4. เลือก **Deploy from a branch**
5. เลือก branch `main` และ folder `/ (root)` จากนั้นกด **Save**
6. รอ GitHub สร้างเว็บไซต์ แล้วเปิด URL ที่แสดงในหน้า Pages

ตัวอย่าง URL: `https://ชื่อผู้ใช้.github.io/ชื่อ-repository/`

## หมายเหตุ
- ช่องภาพและวิดีโอที่ยังไม่ได้ใส่ลิงก์จะแสดงเป็น Placeholder แทนภาพเสีย
- ข้อมูลการศึกษาและประวัติการทำงานแสดงตามรายละเอียดที่ได้รับมา
- ใช้เฉพาะภาพและวิดีโอที่คุณมีสิทธิ์เผยแพร่
