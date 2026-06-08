import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    reportedUrl: { type: String, required: true }, // Şikayet edilen sahte site adresi
    reportedBy: { type: String }, // Şikayeti gönderen eklenti kullanıcısı/token
    status: {
      type: String,
      enum: ['PENDING', 'VERIFIED', 'FALSE_ALARM'],
      default: 'PENDING',
    },
    riskScore: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model('Report', reportSchema);
