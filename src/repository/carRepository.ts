import prisma from "../config/database.js";
import { Car, NewCar } from "../protocols.js";

async function getCars() {
  const cars: Car[] = await prisma.cars.findMany();
  return cars;
}

async function getCar(id: number) {
  const data: Car = await prisma.cars.findUnique({
    where: {
      id: id,
    },
  });
  return data;
}

async function getCarWithLicensePlate(licensePlate: string) {
  const data: Car = await prisma.cars.findUnique({
    where: {
      licensePlate: licensePlate,
    },
  });
  return data;
}

async function createCar(
  model: string,
  licensePlate: string,
  year: string,
  color: string
) {
  const newCar: NewCar = { model, licensePlate, year, color };
  await prisma.cars.create({
    data: newCar,
  });
}

async function deleteCar(id: number) {
  await prisma.cars.delete({
    where: {
      id: id,
    },
  });
}

const carRepository = {
  getCar,
  getCarWithLicensePlate,
  getCars,
  createCar,
  deleteCar,
};

export default carRepository;
