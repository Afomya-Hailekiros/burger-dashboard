import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    burgerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Burger', required: true },
    name: String,
    category: String,
    price: Number,
    image: String,
     status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
  },
  
  { timestamps: true }
)

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)
