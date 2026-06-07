import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Linki sildik, yerine kasadaki (env) şifreyi çağırdık
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'webshield', // Veritabanı inadını kıran o sihirli kodumuz burada kalıyor
    });

    console.log(
      `☁️ MongoDB Atlas Baglantisi Basarili: ${conn.connection.host}`,
    );
  } catch (error) {
    console.error(`❌ MongoDB Baglanti Hatasi: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
