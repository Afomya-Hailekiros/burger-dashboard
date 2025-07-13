import mongoose, { Schema, model, models } from 'mongoose'

const BurgerSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Beef', 'Chicken', 'Veggie'], required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
}, { timestamps: true })

BurgerSchema.index({ name: 'text', category: 'text' })

export const Burger = models.Burger || model('Burger', BurgerSchema)
