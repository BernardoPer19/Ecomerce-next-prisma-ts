import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al obtener los productos." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, img, price } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "El campo 'name' es obligatorio." },
        { status: 400 }
      );
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return NextResponse.json(
        { error: "El campo 'price' debe ser un número válido mayor a 0." },
        { status: 400 }
      );
    }

    const newProd = await prisma.product.create({
      data: {
        name,
        description,
        img,
        price: parsedPrice, 
      },
    });

    return NextResponse.json(newProd);
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);

    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud." },
      { status: 500 }
    );
  }
}
