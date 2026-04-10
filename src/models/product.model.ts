import { prisma } from '../lib/prisma'

const fetchAll = async () => {
  return await prisma.product.findMany()
}

const fetchById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
  })
}

const add = async (data: { productName: string; price: number }) => {
  return await prisma.product.create({
    data,
  })
}

const update = async (
  id: number,
  data: { productName?: string; price?: number }
) => {
  return await prisma.product.update({
    where: { id },
    data,
  })
}

const remove = async (id: number) => {
  return await prisma.product.delete({
    where: { id },
  })
}

export default {
  fetchAll,
  fetchById,
  add,
  update,
  remove,
}