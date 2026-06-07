import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Örn: "Instagram"
    originalUrl: { type: String, required: true }, // Örn: "instagram.com"
    category: { type: String }, // Örn: "Sosyal Medya", "Banka"
  },
  { timestamps: true },
); // Verinin ne zaman eklendiğini otomatik tutar

export default mongoose.model('Brand', brandSchema);
